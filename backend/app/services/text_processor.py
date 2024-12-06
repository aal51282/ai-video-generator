import nltk
from typing import List, Dict
import re

class TextProcessor:
    def __init__(self):
        nltk.download('punkt')
        nltk.download('averaged_perceptron_tagger')
        nltk.download('maxent_ne_chunker')
        nltk.download('words')

    def process_text(self, text: str) -> List[Dict[str, str]]:
        """
        Process the input text into segments with enhanced prompts for image generation
        Returns a list of dictionaries containing the original text and enhanced prompt
        """
        # Split into sentences
        sentences = nltk.sent_tokenize(text)
        
        # Process each sentence
        segments = []
        for sentence in sentences:
            # Clean the sentence
            cleaned = self._clean_text(sentence)
            
            # Generate an enhanced prompt for better image generation
            enhanced_prompt = self._enhance_prompt(cleaned)
            
            segments.append({
                "text": cleaned,
                "prompt": enhanced_prompt
            })
        
        return segments

    def _clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        # Remove special characters but keep basic punctuation
        text = re.sub(r'[^a-zA-Z0-9\s.,!?-]', '', text)
        return text

    def _enhance_prompt(self, text: str) -> str:
        """
        Enhance the text to create better image generation prompts
        by identifying key subjects and actions
        """
        # Tokenize and tag parts of speech
        tokens = nltk.word_tokenize(text)
        tagged = nltk.pos_tag(tokens)
        
        # Extract key nouns and verbs
        key_words = []
        for word, tag in tagged:
            if tag.startswith(('NN', 'VB', 'JJ')):  # Nouns, Verbs, Adjectives
                key_words.append(word)
        
        # Create an enhanced prompt
        base_prompt = " ".join(key_words)
        enhanced_prompt = f"{base_prompt}, detailed, high quality, cinematic, 4K"
        
        return enhanced_prompt 