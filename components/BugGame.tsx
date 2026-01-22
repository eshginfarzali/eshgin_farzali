
import React, { useState, useEffect, useRef } from 'react';

const BugGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnBug = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newBug = {
      id: Date.now(),
      x: Math.random() * (width - 40),
      y: Math.random() * (height - 40)
    };
    setBugs(prev => [...prev.slice(-4), newBug]);
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(spawnBug, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSquash = (id: number) => {
    setBugs(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl p-6 overflow-hidden relative border-blue-500/30">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">Bug Squasher</h3>
          <p className="text-xs text-gray-400">Can you debug as fast as Eshgin?</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">{score}</p>
          <p className="text-xs uppercase tracking-widest text-gray-500">Score</p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-64 bg-black/40 rounded-xl border border-gray-800 cursor-crosshair overflow-hidden"
      >
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <button 
              onClick={() => setIsPlaying(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-transform active:scale-95"
            >
              Start Debugging
            </button>
          </div>
        ) : (
          bugs.map(bug => (
            <div
              key={bug.id}
              onClick={() => handleSquash(bug.id)}
              className="absolute text-3xl animate-pulse transition-all duration-300 transform hover:scale-125 select-none"
              style={{ left: bug.x, top: bug.y }}
            >
              🐛
            </div>
          ))
        )}
      </div>
      
      {score > 0 && score % 10 === 0 && (
        <div className="mt-4 text-center text-emerald-400 font-medium animate-bounce">
          System optimized! Keep going!
        </div>
      )}
    </div>
  );
};

export default BugGame;
