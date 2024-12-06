# AI Video Generator

This project generates short videos from text input using various AI technologies. It combines AI-generated images, text overlays, and voice narration to create engaging video content.

## Features

- Text to video generation
- AI-generated images for each text segment
- Text overlay on images
- AI voice narration
- Modern web interface

## Tech Stack

### Frontend
- Next.js 14
- TailwindCSS
- Shadcn/ui
- TypeScript

### Backend
- FastAPI
- Python 3.11+
- MoviePy (for video generation)
- Stability AI SDK (for image generation)
- ElevenLabs (for voice synthesis)

## Setup Instructions

1. Clone the repository
2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. Create a `.env` file in the backend directory with your API keys:
   ```
   STABILITY_API_KEY=your_key_here
   ELEVENLABS_API_KEY=your_key_here
   ```

## Project Structure

```
.
├── frontend/           # Next.js frontend
├── backend/           # FastAPI backend
│   ├── app/          # Application code
│   ├── static/       # Static files
│   └── tests/        # Test files
└── README.md
```

## API Keys Required

This project requires API keys from:
- Stability AI (for image generation)
- ElevenLabs (for voice synthesis)

Please obtain these keys from their respective platforms before running the application. 