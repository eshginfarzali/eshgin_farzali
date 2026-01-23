import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const FloatingKeys: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<HTMLDivElement[]>([]);

  const keySymbols = ["🔑", "⚡", "💎", "🎯", "🚀", "⭐", "💫", "🔮"];

  useEffect(() => {
    if (!containerRef.current) return;

    // Create floating keys
    keySymbols.forEach((symbol, i) => {
      const key = document.createElement("div");
      key.textContent = symbol;
      key.className = "floating-key absolute text-4xl pointer-events-none";
      key.style.left = `${Math.random() * 100}%`;
      key.style.top = `${Math.random() * 100}%`;
      key.style.opacity = "0";

      containerRef.current?.appendChild(key);
      keysRef.current.push(key);

      // Animate key
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(key, {
        opacity: 0.6,
        duration: 1,
        delay: i * 0.3,
        ease: "power2.inOut",
      })
        .to(
          key,
          {
            y: -50,
            rotation: 360,
            scale: 1.2,
            duration: 3,
            ease: "sine.inOut",
          },
          "-=1",
        )
        .to(
          key,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.5",
        )
        .set(key, {
          y: 0,
          rotation: 0,
          scale: 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        });
    });

    return () => {
      keysRef.current.forEach((key) => key.remove());
      keysRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.3 }}
    />
  );
};

export default FloatingKeys;
