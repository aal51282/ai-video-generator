from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from services.image_generator import ImageGenerator
from services.voice_generator import VoiceGenerator
from services.video_composer import VideoComposer
import nltk
from typing import List
import asyncio

# Download required NLTK data
nltk.download('punkt')

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Video Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
image_generator = ImageGenerator()
voice_generator = VoiceGenerator()
video_composer = VideoComposer()

class TextInput(BaseModel):
    text: str
    style: str = "natural"  # Voice style
    image_style: str = "digital art"  # Image generation style

def split_into_sentences(text: str) -> List[str]:
    """Split text into sentences using NLTK"""
    return nltk.sent_tokenize(text)

@app.get("/")
async def read_root():
    return {"status": "ok", "message": "AI Video Generator API is running"}

@app.post("/generate-video")
async def generate_video(input_data: TextInput, background_tasks: BackgroundTasks):
    try:
        # Split text into sentences
        sentences = split_into_sentences(input_data.text)
        
        # Generate images for each sentence
        images = []
        for sentence in sentences:
            image = await image_generator.generate_image(sentence, input_data.image_style)
            images.append(image)
        
        # Generate voice narration
        audio = await voice_generator.generate_voice(input_data.text, input_data.style)
        
        # Create video
        video_path = await video_composer.create_video(images, audio, sentences)
        
        # Return video file
        return FileResponse(
            video_path,
            media_type="video/mp4",
            filename="generated_video.mp4"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 