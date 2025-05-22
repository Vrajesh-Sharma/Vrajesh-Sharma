import os
from typing import List, Dict, Any, Optional, Tuple
import google.generativeai as genai
from pinecone import Pinecone
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import BaseModel
from dotenv import load_dotenv
import json
import logging
import sys
from datetime import datetime
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging to console only
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Gemini and Pinecone
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_INDEX_NAME = os.getenv('PINECONE_INDEX_NAME', 'portfolio-chatbot')

if not GOOGLE_API_KEY or not PINECONE_API_KEY:
    logger.error("Missing required API keys. Please check your .env file.")
    sys.exit(1)

# Initialize Google's Generative AI
try:
    genai.configure(api_key=GOOGLE_API_KEY)
    logger.info("Successfully configured Google Generative AI")
except Exception as e:
    logger.error(f"Failed to configure Google Generative AI: {e}")
    sys.exit(1)

# Initialize Pinecone
try:
    pc = Pinecone(api_key=PINECONE_API_KEY)
    logger.info("Successfully initialized Pinecone client")
except Exception as e:
    logger.error(f"Failed to initialize Pinecone client: {e}")
    sys.exit(1)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define request and response models
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

def create_embeddings(text: str) -> List[float]:
    """Create embeddings using Google's Gemini model."""
    model = "models/embedding-001"
    try:
        embedding = genai.embed_content(
            model=model,
            content=text,
            task_type="retrieval_query",
        )
        return embedding["embedding"]
    except Exception as e:
        logger.error(f"Error creating embedding: {e}")
        return []

def retrieve_context(query: str, top_k: int = 5) -> List[str]:
    """Retrieve relevant context from Pinecone based on the query."""
    try:
        # Create query embedding
        query_embedding = create_embeddings(query)
        
        if not query_embedding:
            logger.warning("Failed to create query embedding")
            return []
        
        # Query Pinecone
        index = pc.Index(PINECONE_INDEX_NAME)
        results = index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )
        
        # Extract relevant text from matches
        contexts = []
        for match in results.matches:
            if "text" in match.metadata:
                contexts.append(match.metadata["text"])
        
        logger.info(f"Retrieved {len(contexts)} relevant contexts")
        return contexts
    except Exception as e:
        logger.error(f"Error retrieving context from Pinecone: {e}")
        return []

def format_conversation_history(conversation_history: List[Dict[str, str]]) -> str:
    """Format conversation history for the LLM."""
    formatted = ""
    for message in conversation_history:
        role = message.get("role", "").lower()
        content = message.get("content", "")
        
        if role == "user":
            formatted += f"User: {content}\n"
        elif role == "assistant":
            formatted += f"Assistant: {content}\n"
    
    return formatted

def create_prompt(query: str, contexts: List[str], conversation_history: Optional[List[Dict[str, str]]] = None) -> str:
    """Create a prompt for the LLM."""
    # Format conversation history
    history_text = ""
    if conversation_history:
        history_text = format_conversation_history(conversation_history)
    
    # Join contexts with separator
    context_text = "\n\n".join(contexts)
    
    # Create the prompt
    prompt = f"""
You are Vrajesh Sharma, having a direct conversation with someone through your portfolio website's chatbot.
Your goal is to be friendly, professional, and authentic while sharing information about yourself.

# Your Information:
{context_text}

# Previous Conversation:
{history_text}

# Current Question:
User: {query}

Guidelines for your response:
1. Always respond in first person (using "I", "me", "my", etc.) as if you are Vrajesh directly speaking
2. Be warm and conversational, but maintain professionalism
3. Share personal experiences and insights when relevant
4. If you don't have specific information about something, be honest about it
5. Keep responses concise but engaging
6. Use a friendly tone while maintaining your professional identity
7. Feel free to ask follow-up questions to keep the conversation flowing
8. If the information provided doesn't contain the answer, respond based on your professional context without making up specific details

FORMAT INSTRUCTIONS:
- Always format your response using Markdown
- Use headings (## or ###) for main topics and sections
- Use bullet points or numbered lists for multiple items
- Use **bold** for emphasis on important points
- Use `code blocks` for technical terms or code
- Structure longer responses with clear hierarchy using headings
- Break up large blocks of text with subheadings for better readability

Vrajesh:
"""
    return prompt

def generate_response(prompt: str) -> str:
    """Generate a response using Google's Gemini model."""
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return "I'm sorry, I encountered an issue while processing your request. Please try again."

def terminal_chat():
    """Run the chatbot in terminal mode."""
    print("\n" + "="*50)
    print("🤖 Welcome to Vrajesh's Portfolio Chatbot!")
    print("="*50)
    print("\n💡 Available commands:")
    print("  • Type 'exit' or 'quit' to end the conversation")
    print("  • Type 'clear' to clear the conversation history")
    print("  • Type 'help' to see this message again")
    print("\n" + "-"*50 + "\n")
    
    conversation_history = []
    
    while True:
        try:
            # Get user input
            user_input = input("\n👤 You: ").strip()
            
            # Check for exit command
            if user_input.lower() in ['exit', 'quit']:
                print("\n👋 Thank you for chatting! Have a great day!")
                break
            
            # Check for clear command
            if user_input.lower() == 'clear':
                conversation_history = []
                print("\n🧹 Conversation history cleared!")
                continue
            
            # Check for help command
            if user_input.lower() == 'help':
                print("\n💡 Available commands:")
                print("  • Type 'exit' or 'quit' to end the conversation")
                print("  • Type 'clear' to clear the conversation history")
                print("  • Type 'help' to see this message again")
                continue
            
            if not user_input:
                continue
            
            # Log the user input
            logger.info(f"User input: {user_input}")
            
            print("\n⏳ Processing your request...")
            
            # Retrieve context
            contexts = retrieve_context(user_input)
            
            # Create prompt
            prompt = create_prompt(user_input, contexts, conversation_history)
            
            # Generate response
            response = generate_response(prompt)
            
            # Log the response
            logger.info(f"Bot response: {response}")
            
            # Print the response
            print(f"\n🤖 Vrajesh: {response}")
            
            # Update conversation history
            conversation_history.append({"role": "user", "content": user_input})
            conversation_history.append({"role": "assistant", "content": response})
            
        except KeyboardInterrupt:
            print("\n\n⚠️  Chat interrupted by user. Goodbye!")
            break
        except Exception as e:
            logger.error(f"Error in chat loop: {e}")
            print("\n❌ I encountered an error. Please try again.")

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint."""
    try:
        data = request.get_json()
        query = data.get('message', '')
        conversation_history = data.get('conversation_history', [])
        
        logger.info(f"Received chat request: {query}")
        
        # Retrieve relevant context
        contexts = retrieve_context(query)
        
        # Create prompt
        prompt = create_prompt(query, contexts, conversation_history)
        
        # Generate response
        response = generate_response(prompt)
        logger.info(f"Generated response: {response}")
        
        return jsonify({"response": response})
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy"})

def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """Send a contact form email using Gmail SMTP."""
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
            logger.info(f"Attempting to send email from sender_email to receiver_email")
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, sender_password.strip())
            server.send_message(msg)
            server.quit()
            logger.info(f"Email sent successfully to receiver_email")
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

@app.route('/contact', methods=['POST'])
def contact():
    """Contact form endpoint."""
    try:
        data = request.get_json()
        
        required_fields = ['name', 'email', 'subject', 'message']
        if not all(field in data for field in required_fields):
            logger.warning(f"Missing required fields in contact form: {[f for f in required_fields if f not in data]}")
            return jsonify({
                "error": "Missing required fields",
                "required": required_fields
            }), 400
            
        success = send_contact_email(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )
        
        if success:
            logger.info(f"Contact form submitted successfully from {data['email']}")
            return jsonify({
                "message": "Message sent successfully!",
                "status": "success"
            })
        else:
            logger.error(f"Failed to send contact form from {data['email']}")
            return jsonify({
                "error": "Failed to send message",
                "status": "error"
            }), 500
            
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "status": "error"
        }), 500

def main():
    """Main function to run the application."""
    if len(sys.argv) > 1 and sys.argv[1] == '--terminal':
        terminal_chat()
    else:
        app.run(host='0.0.0.0', port=5000, debug=True)

if __name__ == "__main__":
    main() 