---
title: Vrajesh Portfolio Chatbot
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# Vrajesh Portfolio Chatbot API

FastAPI backend for the portfolio chatbot, using Groq (`llama-3.3-70b-versatile`) for generation, Google `gemini-embedding-001` for embeddings, and Pinecone for retrieval.

## Endpoints
- `POST /chat` — main chat endpoint
- `GET /health` — health check
- `POST /contact` — contact form email
- `GET /keep-alive` — pinger endpoint
- `POST /cold-start` — cold start check
- `POST /debug` — inspect retrieval quality

## Required Secrets (set in Space Settings → Variables and secrets)
- `GOOGLE_API_KEY`
- `GROQ_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`
- `GROQ_MODEL` (optional, defaults to `openai/gpt-oss-20b`)
- `EMAIL_ADDRESS`, `EMAIL_PASSWORD`, `RECEIVER_EMAIL` (for `/contact`)
