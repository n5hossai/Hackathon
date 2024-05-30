from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/chat")
async def options_chat():
    return {"Allow": "POST"}

@app.post("/chat")
async def chat(message: dict):
    user_message = message.get('message')
    bot_response = "Bot: I received your message - " + user_message
    #implementation 
    return {"bot_response": bot_response}