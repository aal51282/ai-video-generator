from elevenlabs import generate, set_api_key, Voice, VoiceSettings
import os
from typing import Dict, Optional

class VoiceGenerator:
    VOICE_PRESETS = {
        "natural": {
            "voice_id": "21m00Tcm4TlvDq8ikWAM",  # Rachel
            "settings": {
                "stability": 0.75,
                "similarity_boost": 0.75
            }
        },
        "friendly": {
            "voice_id": "EXAVITQu4vr4xnSDxMaL",  # Bella
            "settings": {
                "stability": 0.8,
                "similarity_boost": 0.7
            }
        },
        "professional": {
            "voice_id": "AZnzlk1XvdvUeBnXmlld",  # Adam
            "settings": {
                "stability": 0.85,
                "similarity_boost": 0.65
            }
        },
        "newscast": {
            "voice_id": "MF3mGyEYCl7XYWbV9V6O",  # Elli
            "settings": {
                "stability": 0.9,
                "similarity_boost": 0.6
            }
        }
    }

    def __init__(self):
        set_api_key(os.getenv('ELEVENLABS_API_KEY'))
        self.default_voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel

    async def generate_voice(self, text: str, style: str = "natural", optimize_streaming_latency: int = 4) -> bytes:
        """Generate voice from text with specified style"""
        try:
            # Get voice preset
            voice_preset = self.VOICE_PRESETS.get(style.lower(), self.VOICE_PRESETS["natural"])
            voice_id = voice_preset["voice_id"]
            settings = voice_preset["settings"]

            # Generate audio with specified settings
            audio = generate(
                text=text,
                voice=voice_id,
                model="eleven_monolingual_v1",
                optimize_streaming_latency=optimize_streaming_latency,
                voice_settings=VoiceSettings(
                    stability=settings["stability"],
                    similarity_boost=settings["similarity_boost"]
                )
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