import VideoGenerator from '@/components/VideoGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI Video Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your text into engaging videos with AI-generated images, voice narration, and beautiful visuals.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <VideoGenerator />
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Next.js, FastAPI, and AI technologies</p>
        </footer>
      </div>
    </main>
  );
}
