import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const GlitchText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    // Initial appear animation - ensure visible
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
    );

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        gsap.to(element, {
          x: Math.random() * 3 - 1.5,
          duration: 0.04,
          repeat: 2,
          yoyo: true,
          ease: "none",
          onComplete: () => {
            gsap.set(element, { x: 0 });
          },
        });
      }
    }, 80);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      ref={textRef}
      className={`relative ${className}`}
      style={{ opacity: 1 }}
    >
      {text}
      <span
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          textShadow: "2px 0 #ff00de, -2px 0 #00fff9",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default GlitchText;
