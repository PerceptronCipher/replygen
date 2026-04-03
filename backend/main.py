from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class EmailRequest(BaseModel):
    email_content: str
    context: str = ""

TONES = {
    "professional": "formal, clear, and straight to the point. Business language, no fluff.",
    "casual": "relaxed and easy going. Like you're replying a colleague you vibe with.",
    "friendly": "warm, genuine, and upbeat. Make them feel good reading it.",
}
def generate_reply(email: str, context: str, tone: str, description: str) -> str:
    prompt = f"""You are helping someone reply to an email.

Incoming email:
\"\"\"
{email}
\"\"\"

{"Additional context: " + context if context else ""}

Write a reply in a {tone} tone — {description}

Rules:
- Email body only, no subject line
- No placeholders like [Your Name]
- Under 150 words
- Sound like a real human wrote it, not AI
"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
        temperature=0.85,
    )
    return response.choices[0].message.content.strip()

@app.post("/generate")
async def generate_replies(req: EmailRequest):
    if not req.email_content.strip():
        raise HTTPException(status_code=400, detail="Email content is required.")
    
    replies = {}
    for tone, desc in TONES.items():
        replies[tone] = generate_reply(req.email_content, req.context, tone, desc)
    
    return {"replies": replies}


@app.get("/health")
def health():
    return {"status": "ok"}