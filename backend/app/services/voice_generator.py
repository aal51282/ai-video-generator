from elevenlabs import generate, set_api_key
import os

class VoiceGenerator:
    def __init__(self):
        set_api_key(os.getenv('ELEVENLABS_API_KEY'))
        self.voice_id = "21m00Tcm4TlvDq8ikWAM"  # Default voice ID (Rachel)

    async def generate_voice(self, text: str, voice_id: str = None) -> bytes:
        """Generate voice from text"""
        try:
            audio = generate(
                text=text,
                voice=voice_id or self.voice_id,
                model="eleven_monolingual_v1"
            )
            return audio
        except Exception as e:
            raise Exception(f"Failed to generate voice: {str(e)}")

    def set_voice(self, voice_id: str):
        """Change the voice ID"""
        self.voice_id = voice_id 