import os
import httpx
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(request: ChatRequest):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "BWashishtha.github.io",  # important for OpenRouter free access
        "X-Title": "Conversational Support AI"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",  # or another model available on OpenRouter
        "messages": [
            {"role": "user", "content": request.message}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload
        )
    print(f"Using OpenRouter Key: {OPENROUTER_API_KEY[:5]}...")
    print(f"DEBUG AUTH HEADER: {headers}")
    
    data = response.json()

    # 🛑 ADD THIS CHECK
    if "choices" not in data:
        print("DEBUGGING FULL RESPONSE: ", data)  # Helpful debug line
        return {"error": "Unexpected response from OpenRouter", "raw_response": data}

    return {"reply": data["choices"][0]["message"]["content"]}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "your-github-username.github.io",  # important for OpenRouter free tier
        "X-Title": "Conversational Support AI"
    }
    
    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": request.message}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload
        )

    data = response.json()

    if "choices" not in data:
        # Instead of crashing, return error response to frontend
        return {"error": "Unexpected response from OpenRouter", "raw_response": data}

    return {"reply": data["choices"][0]["message"]["content"]}

