import VideoGenerator from '@/components/VideoGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements - reduced blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-transparent rounded-full blur-lg animate-slow-spin" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-500/5 via-purple-500/3 to-transparent rounded-full blur-lg animate-slow-spin-reverse" />
      </div>

      <div className="relative">
        {/* Background pattern - reduced opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJsLTIgMnYyaDJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-3" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-12">
          <header className="text-center mb-16 space-y-6">
            <div className="inline-block animate-float">
              <div className="relative">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  AI Video Generator
                </h1>
                {/* Reduced blur on decorative elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-md opacity-15" />
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-15" />
              </div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Transform your text into engaging videos with AI-generated images, voice narration, and beautiful visuals.
              Perfect for content creators, educators, and storytellers.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-200 rounded-full border border-blue-500/20 shadow-sm">
                AI-Powered
              </span>
              <span className="px-4 py-1.5 bg-purple-500/10 text-purple-200 rounded-full border border-purple-500/20 shadow-sm">
                Fast Generation
              </span>
              <span className="px-4 py-1.5 bg-pink-500/10 text-pink-200 rounded-full border border-pink-500/20 shadow-sm">
                Easy to Use
              </span>
            </div>
          </header>

          <div className="max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px] rounded-2xl shadow-xl">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition duration-300" />
                <VideoGenerator />
              </div>
            </div>
          </div>

          <footer className="mt-20 text-center">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <p className="text-gray-300 text-sm font-medium">
                  Powered by cutting-edge AI technologies
                </p>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="https://stability.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform hover:-translate-y-0.5"
                >
                  <span className="px-4 py-2 bg-gray-800 rounded-xl text-gray-200 flex items-center gap-2 hover:bg-gray-750 transition-colors shadow-md">
                    <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:animate-pulse" />
                    Stability AI
                    <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
                <a
                  href="https://elevenlabs.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform hover:-translate-y-0.5"
                >
                  <span className="px-4 py-2 bg-gray-800 rounded-xl text-gray-200 flex items-center gap-2 hover:bg-gray-750 transition-colors shadow-md">
                    <span className="w-2 h-2 rounded-full bg-purple-400 group-hover:animate-pulse" />
                    ElevenLabs
                    <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
                <a
                  href="https://zulko.github.io/moviepy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-transform hover:-translate-y-0.5"
                >
                  <span className="px-4 py-2 bg-gray-800 rounded-xl text-gray-200 flex items-center gap-2 hover:bg-gray-750 transition-colors shadow-md">
                    <span className="w-2 h-2 rounded-full bg-pink-400 group-hover:animate-pulse" />
                    MoviePy
                    <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
