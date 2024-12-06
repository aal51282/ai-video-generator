from moviepy.editor import ImageClip, AudioFileClip, CompositeVideoClip, concatenate_videoclips
import tempfile
import os
from PIL import Image, ImageDraw, ImageFont
import io

class VideoComposer:
    def __init__(self):
        self.temp_dir = tempfile.mkdtemp()

    def _add_text_to_image(self, image: Image.Image, text: str) -> Image.Image:
        """Add text to image using PIL instead of MoviePy"""
        # Create a copy of the image
        img_with_text = image.copy()
        draw = ImageDraw.Draw(img_with_text)
        
        # Calculate text size and position
        img_w, img_h = image.size
        text_height = 80  # Approximate height for text area
        
        # Create semi-transparent overlay for text background
        overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.rectangle(
            [(0, img_h - text_height), (img_w, img_h)],
            fill=(0, 0, 0, 128)
        )
        
        # Composite the overlay onto the image
        if img_with_text.mode != 'RGBA':
            img_with_text = img_with_text.convert('RGBA')
        img_with_text = Image.alpha_composite(img_with_text, overlay)
        
        # Add text
        draw = ImageDraw.Draw(img_with_text)
        text_y = img_h - text_height + 20  # 20px padding from top of overlay
        
        # Wrap text if too long
        words = text.split()
        lines = []
        current_line = []
        for word in words:
            current_line.append(word)
            if len(' '.join(current_line)) > 50:  # Approximate character limit per line
                lines.append(' '.join(current_line[:-1]))
                current_line = [word]
        if current_line:
            lines.append(' '.join(current_line))
        
        # Draw each line
        for i, line in enumerate(lines):
            draw.text(
                (img_w // 2, text_y + i * 30),  # Center text, 30px between lines
                line,
                fill='white',
                anchor='mm'  # Center alignment
            )
        
        return img_with_text

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
                # Open image and add text using PIL
                img = Image.open(io.BytesIO(image_bytes))
                img_with_text = self._add_text_to_image(img, text)
                
                # Save the image with text
                image_path = os.path.join(self.temp_dir, f"image_{idx}.png")
                img_with_text.save(image_path, 'PNG')
                
                # Create video clip from image
                clip = ImageClip(image_path).set_duration(duration)
                clips.append(clip)
            
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
                    try:
                        os.remove(os.path.join(self.temp_dir, file))
                    except Exception:
                        pass