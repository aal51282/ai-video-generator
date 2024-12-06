from moviepy.editor import ImageClip, AudioFileClip, CompositeVideoClip, TextClip, concatenate_videoclips
import tempfile
import os
from PIL import Image
import io

class VideoComposer:
    def __init__(self):
        self.temp_dir = tempfile.mkdtemp()

    async def create_video(self, images: list[bytes], audio: bytes, texts: list[str], duration: int = 5) -> str:
        """Create a video from images, audio, and text"""
        try:
            # Save audio to temp file
            audio_path = os.path.join(self.temp_dir, "audio.mp3")
            with open(audio_path, "wb") as f:
                f.write(audio)
            
            # Create audio clip
            audio_clip = AudioFileClip(audio_path)
            
            # Process each image and create video clips
            clips = []
            for idx, (image_bytes, text) in enumerate(zip(images, texts)):
                # Save image to temp file
                img = Image.open(io.BytesIO(image_bytes))
                image_path = os.path.join(self.temp_dir, f"image_{idx}.png")
                img.save(image_path)
                
                # Create image clip
                image_clip = ImageClip(image_path).set_duration(duration)
                
                # Create text clip
                text_clip = TextClip(
                    text,
                    fontsize=30,
                    color='white',
                    bg_color='rgba(0,0,0,0.5)',
                    size=(image_clip.w, None),
                    method='caption'
                ).set_duration(duration)
                
                # Position text at bottom
                text_clip = text_clip.set_position(('center', 'bottom'))
                
                # Combine image and text
                composite = CompositeVideoClip([image_clip, text_clip])
                clips.append(composite)
            
            # Concatenate all clips
            final_clip = concatenate_videoclips(clips)
            
            # Add audio
            final_clip = final_clip.set_audio(audio_clip)
            
            # Write final video
            output_path = os.path.join(self.temp_dir, "output.mp4")
            final_clip.write_videofile(
                output_path,
                fps=24,
                codec='libx264',
                audio_codec='aac'
            )
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Failed to create video: {str(e)}")
        finally:
            # Cleanup temp files
            for file in os.listdir(self.temp_dir):
                if file != "output.mp4":
                    os.remove(os.path.join(self.temp_dir, file)) 