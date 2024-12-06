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
    } catch {
      setGenerationState({
        status: 'error',
        error: 'Failed to generate video. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-300">
            Enter your text
          </label>
          <div className="relative">
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400"
              placeholder="Enter a paragraph or two to generate a video..."
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {text.length} characters
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-300">
              Image Style
            </label>
            <select
              id="imageStyle"
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
            >
              <option value="digital art">Digital Art</option>
              <option value="realistic">Realistic</option>
              <option value="anime">Anime</option>
              <option value="watercolor">Watercolor</option>
              <option value="oil painting">Oil Painting</option>
              <option value="cinematic">Cinematic</option>
              <option value="3d render">3D Render</option>
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="voiceStyle" className="block text-sm font-medium text-gray-300">
              Voice Style
            </label>
            <select
              id="voiceStyle"
              value={voiceStyle}
              onChange={(e) => setVoiceStyle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
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
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            generationState.status === 'generating'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {generationState.status === 'generating' ? (
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Generating Video...</span>
            </div>
          ) : (
            'Generate Video'
          )}
        </button>
      </form>

      {generationState.status === 'error' && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-200 text-sm">{generationState.error}</p>
        </div>
      )}

      {generationState.status === 'success' && generationState.videoUrl && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-medium text-gray-200">Generated Video</h3>
          <div className="relative rounded-lg overflow-hidden bg-gray-900">
            <video
              controls
              className="w-full aspect-video"
              src={generationState.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <a
            href={generationState.videoUrl}
            download="generated-video.mp4"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Video
          </a>
        </div>
      )}
    </div>
  );
} 