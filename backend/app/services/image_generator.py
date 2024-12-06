import os
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from PIL import Image
import io
from typing import Dict, Optional

class ImageGenerator:
    STYLE_PRESETS = {
        "digital art": "digital art, concept art, detailed, vibrant",
        "realistic": "realistic, photographic, detailed, 4K",
        "anime": "anime style, manga, cel shaded",
        "watercolor": "watercolor painting, artistic, flowing, colorful",
        "oil painting": "oil painting, classical, detailed brushwork",
        "cinematic": "cinematic, movie scene, dramatic lighting",
        "3d render": "3D render, octane render, detailed textures",
    }

    def __init__(self):
        self.stability_api = client.StabilityInference(
            key=os.getenv('STABILITY_API_KEY'),
            verbose=True,
        )

    async def generate_image(self, prompt: str, style: str = "digital art", cfg_scale: float = 7.0) -> bytes:
        """Generate an image from a text prompt with style options"""
        try:
            # Get style preset and combine with prompt
            style_prompt = self.STYLE_PRESETS.get(style.lower(), self.STYLE_PRESETS["digital art"])
            full_prompt = f"{prompt}, {style_prompt}"
            
            # Generate the image
            answers = self.stability_api.generate(
                prompt=full_prompt,
                seed=0,  # Random seed for variety
                steps=30,  # Higher steps for better quality
                cfg_scale=cfg_scale,  # Prompt influence strength
                width=1024,
                height=576,  # 16:9 aspect ratio
                samples=1,
                sampler=generation.SAMPLER_K_DPMPP_2M
            )

            for resp in answers:
                for artifact in resp.artifacts:
                    if artifact.type == generation.ARTIFACT_IMAGE:
                        # Process the image
                        img = Image.open(io.BytesIO(artifact.binary))
                        
                        # Add text overlay area (dark gradient at bottom)
                        gradient = Image.new('RGBA', img.size, (0, 0, 0, 0))
                        # Create gradient for text overlay
                        for y in range(img.height - 100, img.height):
                            alpha = int(255 * (y - (img.height - 100)) / 100 * 0.7)
                            for x in range(img.width):
                                gradient.putpixel((x, y), (0, 0, 0, alpha))
                        
                        # Convert to RGBA if necessary
                        if img.mode != 'RGBA':
                            img = img.convert('RGBA')
                        
                        # Composite the gradient onto the image
                        img = Image.alpha_composite(img, gradient)
                        
                        # Convert back to bytes
                        img_byte_arr = io.BytesIO()
                        img.save(img_byte_arr, format='PNG')
                        return img_byte_arr.getvalue()
            
            raise Exception("No image generated")
            
        except Exception as e:
            raise Exception(f"Failed to generate image: {str(e)}")

    @classmethod
    def get_available_styles(cls) -> Dict[str, str]:
        """Return available style presets"""
        return cls.STYLE_PRESETS