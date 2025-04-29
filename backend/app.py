# import os
# import httpx
# from fastapi import FastAPI
# from pydantic import BaseModel
# from dotenv import load_dotenv
# from fastapi.middleware.cors import CORSMiddleware

# load_dotenv()

# OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# app = FastAPI()

# # Add CORS middleware immediately after app creation
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Or your specific frontend domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class ChatRequest(BaseModel):
#     message: list

# @app.post("/api/chat")
# async def chat(request: ChatRequest):
#     if not OPENROUTER_API_KEY:
#         return {"error": "Missing OpenRouter API Key!"}

#     headers = {
#         "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#         "Content-Type": "application/json",
#         "HTTP-Referer": "BWashishtha.github.io",  # your domain
#         "X-Title": "Conversational Support AI"
#     }

#     payload = {
#         "model": "openai/gpt-3.5-turbo",  # or another model
#         "messages": [
#             {"role": "user", "content": request.message}
#         ]
#     }

#     async with httpx.AsyncClient() as client:
#         response = await client.post(
#             "https://openrouter.ai/api/v1/chat/completions",
#             headers=headers,
#             json=payload
#         )

#     print(f"Using OpenRouter Key: {OPENROUTER_API_KEY[:5]}...")  # Only first few chars for safety
#     print(f"DEBUG AUTH HEADER: {headers}")
    
#     data = response.json()

#     if "choices" not in data:
#         print("DEBUGGING FULL RESPONSE: ", data)
#         return {"error": "Unexpected response from OpenRouter", "raw_response": data}

#     return {"reply": data["choices"][0]["message"]["content"]}
import os
import httpx
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://care-agent.netlify.app"],  # ← YOUR NETLIFY FRONTEND ✅
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: list  # <-- Now expects full chat history

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        return {"error": "Missing OpenRouter API Key!"}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "care-agent.netlify.app",
        "X-Title": "Conversational Support AI",
        "TestKey": "TestValue"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": request.messages
    }
    print("=== DEBUG: Headers being sent to OpenRouter ===")
    for key, value in headers.items():
        print(f"{key}: {value}")
    print("===============================================")
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload
        )

    data = response.json()

    if "choices" not in data:
        return {"error": "Unexpected response", "raw_response": data}

    return {"reply": data["choices"][0]["message"]["content"]}


@app.get("/debug/env")
def debug_env():
    return {"OPENROUTER_API_KEY": os.getenv("OPENROUTER_API_KEY")}