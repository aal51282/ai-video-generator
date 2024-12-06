'use client';

import { useState } from 'react';

interface GenerationState {
  status: 'idle' | 'generating' | 'success' | 'error';
  videoUrl?: string;
  error?: string;
}

export default function VideoGenerator() {
  const [text, setText] = useState('');
  const [imageStyle, setImageStyle] = useState('digital art');
  const [voiceStyle, setVoiceStyle] = useState('natural');
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setGenerationState({ status: 'generating' });
    
    try {
      const response = await fetch('http://localhost:8000/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          style: voiceStyle,
          image_style: imageStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      setGenerationState({ status: 'success', videoUrl });
    } catch (error) {
      setGenerationState({
        status: 'error',
        error: 'Failed to generate video. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium mb-2">
            Enter your text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter a paragraph or two to generate a video..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="imageStyle" className="block text-sm font-medium mb-2">
              Image Style
            </label>
            <select
              id="imageStyle"
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="digital art">Digital Art</option>
              <option value="realistic">Realistic</option>
              <option value="anime">Anime</option>
              <option value="watercolor">Watercolor</option>
              <option value="oil painting">Oil Painting</option>
            </select>
          </div>

          <div>
            <label htmlFor="voiceStyle" className="block text-sm font-medium mb-2">
              Voice Style
            </label>
            <select
              id="voiceStyle"
              value={voiceStyle}
              onChange={(e) => setVoiceStyle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="natural">Natural</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="newscast">Newscast</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={generationState.status === 'generating'}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            generationState.status === 'generating'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {generationState.status === 'generating' ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Generating Video...
            </div>
          ) : (
            'Generate Video'
          )}
        </button>
      </form>

      {generationState.status === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
          {generationState.error}
        </div>
      )}

      {generationState.status === 'success' && generationState.videoUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Generated Video</h3>
          <video
            controls
            className="w-full rounded-lg"
            src={generationState.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
          <a
            href={generationState.videoUrl}
            download="generated-video.mp4"
            className="mt-4 inline-block py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
} 