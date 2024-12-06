from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Video Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str
    style: str = "natural"  # Voice style
    image_style: str = "digital art"  # Image generation style

@app.get("/")
async def read_root():
    return {"status": "ok", "message": "AI Video Generator API is running"}

@app.post("/generate-video")
async def generate_video(input_data: TextInput):
    try:
        # This is a placeholder for the actual implementation
        # We'll implement these functions in separate modules
        return {
            "status": "success",
            "message": "Video generation started",
            "data": {
                "text": input_data.text,
                "style": input_data.style,
                "image_style": input_data.image_style
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 