import os
from typing import List, Dict, Any, Optional
from google import genai
from google.genai import types
from groq import Groq
from pinecone import Pinecone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import logging
import sys
from datetime import datetime
import pytz
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME', 'portfolio-chatbot')
GROQ_MODEL = os.getenv('GROQ_MODEL', 'openai/gpt-oss-20b')

if not GOOGLE_API_KEY or not PINECONE_API_KEY or not GROQ_API_KEY:
    logger.error("Missing required API keys. Need GOOGLE_API_KEY, GROQ_API_KEY, PINECONE_API_KEY.")
    sys.exit(1)

try:
    embed_client = genai.Client(api_key=GOOGLE_API_KEY)
    logger.info("Successfully initialized Google GenAI client (embeddings)")
except Exception as e:
    logger.error(f"Failed to initialize Google GenAI client: {e}")
    sys.exit(1)

try:
    groq_client = Groq(api_key=GROQ_API_KEY)
    logger.info("Successfully initialized Groq client (generation)")
except Exception as e:
    logger.error(f"Failed to initialize Groq client: {e}")
    sys.exit(1)

try:
    pc = Pinecone(api_key=PINECONE_API_KEY)
    logger.info("Successfully initialized Pinecone client")
except Exception as e:
    logger.error(f"Failed to initialize Pinecone client: {e}")
    sys.exit(1)

app = FastAPI(title="Vrajesh Portfolio Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Dict[str, str]]] = []


class ChatResponse(BaseModel):
    response: str


class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class ColdStartRequest(BaseModel):
    query: str


class DebugRequest(BaseModel):
    query: str = "tell me about projects"


def create_embeddings(text: str) -> List[float]:
    try:
        result = embed_client.models.embed_content(
            model="gemini-embedding-001",
            contents=text,
            config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY")
        )
        return result.embeddings[0].values
    except Exception as e:
        logger.error(f"Error creating embedding: {e}")
        return []


def retrieve_context(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    try:
        query_embedding = create_embeddings(query)
        if not query_embedding:
            logger.warning("Failed to create query embedding")
            return []

        index = pc.Index(PINECONE_INDEX_NAME)
        results = index.query(vector=query_embedding, top_k=top_k, include_metadata=True)

        contexts = []
        for match in results.matches:
            meta = match.metadata or {}
            if "text" in meta:
                contexts.append({
                    "text": meta["text"],
                    "category": meta.get("category", "general"),
                    "title": meta.get("title", ""),
                    "score": round(match.score, 4)
                })

        logger.info(f"Retrieved {len(contexts)} relevant contexts")
        return contexts
    except Exception as e:
        logger.error(f"Error retrieving context from Pinecone: {e}")
        return []


def format_conversation_history(conversation_history: List[Dict[str, str]]) -> str:
    formatted = ""
    for message in conversation_history:
        role = message.get("role", "").lower()
        content = message.get("content", "")
        if role == "user":
            formatted += f"User: {content}\n"
        elif role == "assistant":
            formatted += f"Assistant: {content}\n"
    return formatted


def create_prompt(query: str, contexts: List[Dict[str, Any]],
                   conversation_history: Optional[List[Dict[str, str]]] = None):
    history_text = format_conversation_history(conversation_history) if conversation_history else ""

    if not contexts:
        context_text = "No specific database information available for this query."
    else:
        context_text = "\n\n".join(
            f"[{c['category'].upper()}] {c.get('title', '')}\n{c['text']}" for c in contexts
        )

    system_message = """You are Vrajesh Sharma, having a direct conversation with someone through your portfolio website's chatbot.
Your goal is to be friendly, professional, and authentic while sharing information about yourself.

Guidelines for your response:
1. Always respond in first person (using "I", "me", "my", etc.) as if you are Vrajesh directly speaking.
2. Be warm and conversational, but maintain professionalism.
3. Share personal experiences and insights ONLY when they are explicitly provided in the context.
4. If you don't have specific information about something, be honest about it.
5. Keep responses concise but engaging.
6. Feel free to ask follow-up questions to keep the conversation flowing.
7. CRITICAL: If the provided context doesn't contain the answer, politely admit you don't have that specific detail right now and suggest they contact you directly. Do NOT guess or make up details.

FORMAT INSTRUCTIONS:
- Always format your response using Markdown.
- Use headings (## or ###) for main topics and sections.
- Use bullet points or numbered lists for multiple items.
- Use **bold** for emphasis on important points (like metrics or skills).
- Use `code blocks` for technical terms or code.
- Structure longer responses with clear hierarchy using headings."""

    user_message = f"""# My Information (The ONLY Source of Truth):
{context_text}

# Previous Conversation:
{history_text}

# Current Question:
User: {query}

Vrajesh:"""

    return system_message, user_message


def generate_response(system_message: str, user_message: str) -> str:
    try:
        response = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=1024
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return "I'm sorry, I encountered an issue while processing your request. Please try again."


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        logger.info(f"Received chat request: {req.message}")
        contexts = retrieve_context(req.message)
        system_message, user_message = create_prompt(req.message, contexts, req.conversation_history)
        response = generate_response(system_message, user_message)
        logger.info(f"Generated response: {response}")
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health_check():
    return {"status": "healthy"}


def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    try:
        sender_email = os.getenv('EMAIL_ADDRESS')
        sender_password = os.getenv('EMAIL_PASSWORD')
        receiver_email = os.getenv('RECEIVER_EMAIL')

        if not all([sender_email, sender_password, receiver_email]):
            missing = []
            if not sender_email: missing.append('EMAIL_ADDRESS')
            if not sender_password: missing.append('EMAIL_PASSWORD')
            if not receiver_email: missing.append('RECEIVER_EMAIL')
            logger.error(f"Missing environment variables: {', '.join(missing)}")
            return False

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = f"Portfolio Website: {subject}"
        msg['Reply-To'] = email

        body = f"""Name: {name}
Email: {email}
Subject: {subject}
Message:
{message}"""
        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password.strip())
            server.send_message(msg)
            server.quit()
            logger.info("Email sent successfully")
            return True
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {str(e)}")
            return False
        except smtplib.SMTPException as e:
            logger.error(f"SMTP Error occurred: {str(e)}")
            return False
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


@app.post("/contact")
def contact(req: ContactRequest):
    success = send_contact_email(
        name=req.name, email=req.email, subject=req.subject, message=req.message
    )
    if success:
        logger.info(f"Contact form submitted successfully from {req.email}")
        return {"message": "Message sent successfully!", "status": "success"}
    else:
        logger.error(f"Failed to send contact form from {req.email}")
        raise HTTPException(status_code=500, detail={"error": "Failed to send message", "status": "error"})


@app.get("/keep-alive")
def keep_alive():
    return {"status": "success", "message": "Server is alive."}


@app.post("/cold-start")
def cold_start(req: ColdStartRequest):
    if req.query != "Are you awake":
        raise HTTPException(status_code=400, detail="Invalid query. Expected: 'Are you awake'.")

    ist = pytz.timezone('Asia/Kolkata')
    now_ist = datetime.now(ist).strftime('%Y-%m-%d %H:%M:%S %Z')
    return {"message": f"I am awake at {now_ist}"}


@app.post("/debug")
def debug_retrieval(req: DebugRequest):
    embedding = create_embeddings(req.query)
    if not embedding:
        raise HTTPException(status_code=500, detail="Embedding failed — check GOOGLE_API_KEY")

    logger.info(f"Embedding dims: {len(embedding)}")

    try:
        index = pc.Index(PINECONE_INDEX_NAME)
        results = index.query(vector=embedding, top_k=5, include_metadata=True)
        matches = [
            {
                "id": m.id,
                "score": round(m.score, 4),
                "category": m.metadata.get("category", ""),
                "title": m.metadata.get("title", ""),
                "text_preview": m.metadata.get("text", "")[:100],
                "metadata_keys": list(m.metadata.keys())
            }
            for m in results.matches
        ]
        return {"embedding_dims": len(embedding), "matches": matches}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)
