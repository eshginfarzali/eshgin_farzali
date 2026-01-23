import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";

const BugGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [combo, setCombo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bugsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const spawnBug = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newBug = {
      id: Date.now(),
      x: Math.random() * (width - 40),
      y: Math.random() * (height - 40),
    };
    setBugs((prev) => [...prev.slice(-4), newBug]);
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(spawnBug, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    // Animate new bugs appearing
    bugs.forEach((bug) => {
      const bugEl = bugsRef.current[bug.id];
      if (bugEl) {
        gsap.fromTo(
          bugEl,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
        );

        // Add floating animation
        gsap.to(bugEl, {
          y: "+=15",
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  }, [bugs]);

  const handleSquash = (id: number) => {
    const bugEl = bugsRef.current[id];

    if (bugEl) {
      // Squash animation
      gsap.to(bugEl, {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          setBugs((prev) => prev.filter((b) => b.id !== id));
        },
      });

      // Create explosion effect
      const particles = 8;
      for (let i = 0; i < particles; i++) {
        const angle = (Math.PI * 2 * i) / particles;
        const particle = document.createElement("div");
        particle.className = "absolute w-2 h-2 bg-green-400 rounded-full";
        particle.style.left = `${bugEl.offsetLeft + 15}px`;
        particle.style.top = `${bugEl.offsetTop + 15}px`;
        containerRef.current?.appendChild(particle);

        gsap.to(particle, {
          x: Math.cos(angle) * 50,
          y: Math.sin(angle) * 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        });
      }
    }

    setScore((s) => s + 1);
    setCombo((c) => c + 1);

    // Reset combo after 2 seconds of inactivity
    setTimeout(() => setCombo(0), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl p-6 overflow-hidden relative border-blue-500/30">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">Bug Squasher</h3>
          <p className="text-xs text-gray-400">
            Can you debug as fast as Eshgin?
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">{score}</p>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Score
          </p>
          {combo > 2 && (
            <p className="text-sm text-yellow-400 font-bold animate-pulse">
              {combo}x COMBO!
            </p>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-64 bg-black/40 rounded-xl border border-gray-800 cursor-crosshair overflow-hidden"
      >
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <button
              onClick={() => {
                setIsPlaying(true);
                setScore(0);
                setCombo(0);
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-transform active:scale-95"
            >
              Start Debugging
            </button>
          </div>
        ) : (
          bugs.map((bug) => (
            <div
              key={bug.id}
              ref={(el) => (bugsRef.current[bug.id] = el)}
              onClick={() => handleSquash(bug.id)}
              className="absolute text-3xl transition-all duration-300 transform hover:scale-125 select-none cursor-pointer"
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
