import os
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from PIL import Image
import io

class ImageGenerator:
    def __init__(self):
        self.stability_api = client.StabilityInference(
            key=os.getenv('STABILITY_API_KEY'),
            verbose=True,
        )

    async def generate_image(self, prompt: str, style: str = "digital art") -> bytes:
        """Generate an image from a text prompt"""
        # Combine style with prompt for better results
        full_prompt = f"{prompt}, {style}, high quality, detailed"
        
        answers = self.stability_api.generate(
            prompt=full_prompt,
            seed=0,
            steps=30,
            cfg_scale=7.0,
            width=1024,
            height=576,  # 16:9 aspect ratio
            samples=1,
        )

        for resp in answers:
            for artifact in resp.artifacts:
                if artifact.type == generation.ARTIFACT_IMAGE:
                    # Convert to PIL Image for potential processing
                    img = Image.open(io.BytesIO(artifact.binary))
                    
                    # Convert back to bytes for storage/transmission
                    img_byte_arr = io.BytesIO()
                    img.save(img_byte_arr, format='PNG')
                    return img_byte_arr.getvalue()
        
        raise Exception("Failed to generate image") 