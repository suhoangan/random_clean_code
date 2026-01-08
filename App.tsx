import React, { useState, useCallback } from 'react';
import { ArrowRight, Shuffle, Code2, Github } from 'lucide-react';
import { EXAMPLES } from './constants';
import CodeCard from './components/CodeCard';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentExample = EXAMPLES[currentIndex];

  const handleNext = useCallback(() => {
    // Randomize next card, but avoid immediate repetition if possible
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * EXAMPLES.length);
    } while (nextIndex === currentIndex && EXAMPLES.length > 1);
    
    setCurrentIndex(nextIndex);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/10 p-2 rounded-lg">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white">Clean Code Cards</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Master JavaScript principles one card at a time</p>
            </div>
          </div>
          <a 
            href="https://github.com/ryanmcdermott/clean-code-javascript" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">Source Repo</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress / Title Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                {currentExample.category}
              </span>
              <span className="text-slate-500 text-xs font-mono">
                Card {currentIndex + 1} / {EXAMPLES.length}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">{currentExample.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Shuffle className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
              Next Card
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Principle Banner */}
        <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-xl p-4 md:p-6">
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-2">The Principle</h3>
          <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">
            {currentExample.principle}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1 min-h-[400px]">
          <CodeCard type="bad" code={currentExample.bad.code} />
          <CodeCard type="good" code={currentExample.good.code} />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Clean Code Cards</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <p>Built with React & Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;