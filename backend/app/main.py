from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from app.services.image_generator import ImageGenerator
from app.services.voice_generator import VoiceGenerator
from app.services.video_composer import VideoComposer
from app.services.text_processor import TextProcessor
from typing import List, Dict
import asyncio

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
text_processor = TextProcessor()
image_generator = ImageGenerator()
voice_generator = VoiceGenerator()
video_composer = VideoComposer()

class TextInput(BaseModel):
    text: str
    style: str = "natural"  # Voice style
    image_style: str = "digital art"  # Image generation style

@app.get("/")
async def read_root():
    return {"status": "ok", "message": "AI Video Generator API is running"}

@app.get("/styles")
async def get_styles():
    """Get available voice and image styles"""
    return {
        "voice_styles": voice_generator.get_available_voices(),
        "image_styles": image_generator.get_available_styles()
    }

@app.post("/generate-video")
async def generate_video(input_data: TextInput, background_tasks: BackgroundTasks):
    try:
        # Process and segment the text
        segments = text_processor.process_text(input_data.text)
        
        # Generate images for each segment
        images = []
        for segment in segments:
            image = await image_generator.generate_image(
                segment["prompt"],
                input_data.image_style
            )
            images.append(image)
        
        # Generate voice narration
        audio = await voice_generator.generate_voice(
            input_data.text,
            input_data.style
        )
        
        # Extract just the text from segments for video composition
        texts = [segment["text"] for segment in segments]
        
        # Create video
        video_path = await video_composer.create_video(
            images=images,
            audio=audio,
            texts=texts
        )
        
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