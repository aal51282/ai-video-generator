'use client';

import { useState } from 'react';

interface GenerationState {
  status: 'idle' | 'generating' | 'success' | 'error';
  videoUrl?: string;
  error?: string;
  progress?: number;
  stage?: string;
}

export default function VideoGenerator() {
  const [text, setText] = useState('');
  const [imageStyle, setImageStyle] = useState('digital art');
  const [voiceStyle, setVoiceStyle] = useState('natural');
  const [videoTitle, setVideoTitle] = useState('');
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle'
  });

  const updateProgress = (stage: string, progress: number) => {
    setGenerationState(prev => ({
      ...prev,
      stage,
      progress
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setGenerationState({ 
      status: 'generating', 
      progress: 0,
      stage: 'Initializing...'
    });

    try {
      // Text processing stage (0-10%)
      updateProgress('Processing text...', 5);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Image generation stage (10-40%)
      const sentences = text.split('.').filter(s => s.trim().length > 0);
      const imageProgress = 30 / sentences.length;
      updateProgress('Generating images...', 10);

      // Simulate image generation progress
      for (let i = 0; i < sentences.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress('Generating images...', 10 + (i + 1) * imageProgress);
      }

      // Voice generation stage (40-70%)
      updateProgress('Generating voice narration...', 40);
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateProgress('Generating voice narration...', 55);
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateProgress('Generating voice narration...', 70);

      // Video composition stage (70-90%)
      updateProgress('Composing video...', 70);

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

      // Final stage (90-100%)
      updateProgress('Finalizing...', 90);
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      setVideoTitle(text.split('.')[0].slice(0, 50));
      
      // Success
      setGenerationState({ 
        status: 'success', 
        videoUrl,
        progress: 100,
        stage: 'Complete!'
      });
    } catch {
      setGenerationState({
        status: 'error',
        error: 'Failed to generate video. Please try again.',
      });
    }
  };

  const getDownloadFilename = () => {
    const sanitizedTitle = videoTitle
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .trim();
    return `${sanitizedTitle || 'generated_video'}.mp4`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-200">
            Enter your text
          </label>
          <div className="relative">
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400 shadow-sm"
              placeholder="Enter a paragraph or two to generate a video..."
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md shadow-sm">
              {text.length} characters
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-200">
              Image Style
            </label>
            <div className="relative">
              <select
                id="imageStyle"
                value={imageStyle}
                onChange={(e) => setImageStyle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 appearance-none cursor-pointer shadow-sm"
              >
                <option value="digital art">Digital Art</option>
                <option value="realistic">Realistic</option>
                <option value="anime">Anime</option>
                <option value="watercolor">Watercolor</option>
                <option value="oil painting">Oil Painting</option>
                <option value="cinematic">Cinematic</option>
                <option value="3d render">3D Render</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="voiceStyle" className="block text-sm font-medium text-gray-200">
              Voice Style
            </label>
            <div className="relative">
              <select
                id="voiceStyle"
                value={voiceStyle}
                onChange={(e) => setVoiceStyle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 appearance-none cursor-pointer shadow-sm"
              >
                <option value="natural">Natural</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="newscast">Newscast</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={generationState.status === 'generating'}
          className={`relative w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm ${
            generationState.status === 'generating'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {generationState.status === 'generating' ? (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                <span>{generationState.stage}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${generationState.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-300 text-center">
                {generationState.progress}%
              </div>
            </div>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Video
            </span>
          )}
        </button>
      </form>

      {generationState.status === 'error' && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-200 text-sm">{generationState.error}</p>
          </div>
        </div>
      )}

      {generationState.status === 'success' && generationState.videoUrl && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-200">Generated Video</h3>
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Generation Complete
            </div>
          </div>

          {/* Video Title Input */}
          <div className="space-y-3">
            <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-200">
              Video Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter a title for your video"
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 shadow-sm"
                maxLength={100}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {videoTitle.length}/100
              </div>
            </div>
            <p className="text-xs text-gray-400">
              This title will be used as the filename when downloading the video
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-gray-900 shadow-lg">
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
            download={getDownloadFilename()}
            className="group relative inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Video
            </span>
          </a>
        </div>
      )}
    </div>
  );
} 