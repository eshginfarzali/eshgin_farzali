import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";

const codeSnippets = [
  'const hello = () => "world";',
  "function debugIt() { return true; }",
  "let x = 42; x *= 2;",
  "async await Promise.resolve();",
  "const [state, setState] = useState();",
  'import React from "react";',
  "export default Component;",
  "type Props = { id: number }",
];

const TypingGame: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying && !currentSnippet) {
      loadNewSnippet();
    }
  }, [isPlaying, currentSnippet]);

  const loadNewSnippet = () => {
    const snippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setCurrentSnippet(snippet);

    // Animate snippet appearance
    if (containerRef.current) {
      const chars = containerRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: "back.out(1.2)",
        },
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value === currentSnippet) {
      // Correct completion
      const newScore = score + currentSnippet.length;
      setScore(newScore);
      setStreak(streak + 1);

      // Calculate WPM
      const wordsTyped = currentSnippet.split(" ").length;
      const elapsedMinutes = (30 - timeLeft) / 60;
      if (elapsedMinutes > 0) {
        setWpm(Math.round(wordsTyped / elapsedMinutes));
      }

      // Success animation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          backgroundColor: "#10b98144",
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }

      // Create success particles
      createSuccessParticles();

      // Load new snippet
      setUserInput("");
      setCurrentSnippet("");
      setTimeout(loadNewSnippet, 300);
    }
  };

  const createSuccessParticles = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.textContent = "✓";
      particle.className = "fixed text-green-400 font-bold pointer-events-none";
      particle.style.left = `${rect.left + rect.width / 2}px`;
      particle.style.top = `${rect.top}px`;
      particle.style.fontSize = "20px";

      document.body.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: -100 - Math.random() * 50,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setWpm(0);
    setTimeLeft(30);
    setStreak(0);
    setUserInput("");
    setCurrentSnippet("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const getCharColor = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentSnippet[index]
        ? "text-green-400"
        : "text-red-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-2xl p-6 overflow-hidden relative border-blue-500/30">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">Code Speed Test</h3>
          <p className="text-xs text-gray-400">Type as fast as you can!</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <p className="text-2xl font-bold text-blue-400">{score}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Score
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">{wpm}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              WPM
            </p>
          </div>
          {isPlaying && (
            <div>
              <p className="text-2xl font-bold text-yellow-400">{timeLeft}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Time
              </p>
            </div>
          )}
        </div>
      </div>

      {!isPlaying ? (
        <div className="relative h-48 bg-black/40 rounded-xl border border-gray-800 flex items-center justify-center">
          <button
            onClick={startGame}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-transform active:scale-95"
          >
            Start Typing
          </button>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            className="relative bg-black/40 rounded-xl border border-gray-800 p-4 mb-4 font-mono text-lg transition-colors"
          >
            {currentSnippet.split("").map((char, i) => (
              <span
                key={i}
                className={`char ${getCharColor(i)} transition-colors`}
              >
                {char}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Type here..."
            autoFocus
            disabled={!isPlaying}
          />

          {streak > 2 && (
            <div className="mt-3 text-center text-yellow-400 font-bold animate-pulse">
              🔥 {streak}x Streak!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TypingGame;
