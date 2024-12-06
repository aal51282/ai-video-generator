from elevenlabs import generate, set_api_key, Voice
import os
from typing import Dict

class VoiceGenerator:
    VOICE_PRESETS = {
        "natural": {
            "name": "Rachel",
            "voice_id": "21m00Tcm4TlvDq8ikWAM"
        },
        "friendly": {
            "name": "Bella",
            "voice_id": "EXAVITQu4vr4xnSDxMaL"
        },
        "professional": {
            "name": "Adam",
            "voice_id": "AZnzlk1XvdvUeBnXmlld"
        },
        "newscast": {
            "name": "Elli",
            "voice_id": "MF3mGyEYCl7XYWbV9V6O"
        }
    }

    def __init__(self):
        set_api_key(os.getenv('ELEVENLABS_API_KEY'))
        self.default_voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel

    async def generate_voice(self, text: str, style: str = "natural") -> bytes:
        """Generate voice from text with specified style"""
        try:
            # Get voice preset
            voice_preset = self.VOICE_PRESETS.get(style.lower(), self.VOICE_PRESETS["natural"])
            
            # Generate audio
            audio = generate(
                text=text,
                voice=voice_preset["voice_id"],
                model="eleven_monolingual_v1"
            )
            
            return audio
        except Exception as e:
            raise Exception(f"Failed to generate voice: {str(e)}")

    def set_voice(self, voice_id: str):
        """Change the default voice ID"""
        self.default_voice_id = voice_id

    @classmethod
    def get_available_voices(cls) -> Dict[str, Dict]:
        """Return available voice presets"""
        return cls.VOICE_PRESETS