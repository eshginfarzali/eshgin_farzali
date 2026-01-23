import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";

const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if hovering over text/interactive elements
      const target = e.target as HTMLElement;
      const isText = target.closest(
        "a, button, .interactive-card, [role='button'], h1, h2, h3, p, span",
      );
      setIsHovering(!!isText);

      // Create trail effect on move - daha çox fiqur
      if (Math.random() > 0.85) {
        createTrailParticle(mouseX, mouseY);
      }

      // Create shape particles
      if (Math.random() > 0.92) {
        createShapeParticle(mouseX, mouseY);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);

      // Pulse animation on click
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          scale: 0.5,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(dotRef.current, {
              scale: 1,
              duration: 0.2,
              ease: "elastic.out(1, 0.3)",
            });
          },
        });
      }

      // Ring expansion effect
      if (glassRef.current) {
        gsap.to(glassRef.current, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(glassRef.current, { scale: 1, opacity: 1 });
          },
        });
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    // Smooth cursor following animation
    const moveCursor = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: mouseX - 6,
          y: mouseY - 6,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      if (glassRef.current) {
        gsap.to(glassRef.current, {
          x: mouseX - 15,
          y: mouseY - 15,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const ticker = gsap.ticker.add(moveCursor);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const createTrailParticle = (x: number, y: number) => {
    const particle = document.createElement("div");
    particle.className = "fixed pointer-events-none z-[9997] rounded-full";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.left = `${x - 2}px`;
    particle.style.top = `${y - 2}px`;
    particle.style.background = "rgba(59, 130, 246, 0.6)";
    particle.style.boxShadow = "0 0 8px rgba(59, 130, 246, 0.8)";

    document.body.appendChild(particle);

    gsap.to(particle, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  };

  const createShapeParticle = (x: number, y: number) => {
    const shapes = ["▲", "●", "■", "◆", "★", "⬟", "◉"];
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

    const particle = document.createElement("div");
    particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    particle.className = "fixed pointer-events-none z-[9997] font-bold";
    particle.style.left = `${x - 10}px`;
    particle.style.top = `${y - 10}px`;
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.fontSize = `${12 + Math.random() * 8}px`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 50;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotation: Math.random() * 360,
      scale: 0,
      opacity: 0,
      duration: 0.8 + Math.random() * 0.4,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  };

  return (
    <>
      {/* Magnifying Glass Effect */}
      <div
        ref={glassRef}
        className="fixed pointer-events-none z-[9998] will-change-transform"
        style={{
          top: 0,
          left: 0,
          width: isHovering ? "40px" : "20px",
          height: isHovering ? "40px" : "20px",
          borderRadius: "50%",
          border: `2px solid ${isHovering ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.3)"}`,
          background: isHovering
            ? "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15), transparent)"
            : "transparent",
          backdropFilter: isHovering ? "blur(3px)" : "none",
          WebkitBackdropFilter: isHovering ? "blur(3px)" : "none",
          boxShadow: isHovering
            ? "0 0 15px rgba(59, 130, 246, 0.4), inset 0 0 8px rgba(59, 130, 246, 0.2)"
            : "0 0 5px rgba(59, 130, 246, 0.2)",
          transition:
            "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Core Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          top: 0,
          left: 0,
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0.8))",
          boxShadow: isHovering
            ? "0 0 12px rgba(59, 130, 246, 0.8), 0 0 25px rgba(59, 130, 246, 0.4)"
            : "0 0 6px rgba(59, 130, 246, 0.5)",
          transition:
            "width 0.2s ease-out, height 0.2s ease-out, box-shadow 0.2s ease-out",
        }}
      />
    </>
  );
};

export default CursorFollower;
