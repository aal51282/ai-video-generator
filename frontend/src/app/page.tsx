import VideoGenerator from '@/components/VideoGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJsLTIgMnYyaDJ2MmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-12">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              AI Video Generator
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Transform your text into engaging videos with AI-generated images, voice narration, and beautiful visuals.
              Perfect for content creators, educators, and storytellers.
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-1 rounded-2xl">
              <VideoGenerator />
            </div>
          </div>

          <footer className="mt-20 text-center">
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Powered by Next.js, FastAPI, and AI technologies
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                  Stability AI
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                  ElevenLabs
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-400">
                  MoviePy
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
