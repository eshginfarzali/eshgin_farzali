import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  element: HTMLDivElement;
}

const InteractiveParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;
    const colors = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#10b981"];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";

      const radius = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.width = `${radius * 2}px`;
      particle.style.height = `${radius * 2}px`;
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${radius * 4}px ${color}`;

      container.appendChild(particle);

      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
        color,
        element: particle,
      });

      // Initial animation
      gsap.from(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: i * 0.01,
        ease: "back.out(1.7)",
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      particlesRef.current.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }

        // Mouse interaction - repel particles
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx -= (dx / distance) * force * 0.2;
          particle.vy -= (dy / distance) * force * 0.2;

          // Add glow effect when mouse is near
          gsap.to(particle.element, {
            scale: 1 + force * 0.5,
            opacity: 0.3 + force * 0.7,
            duration: 0.1,
          });
        } else {
          gsap.to(particle.element, {
            scale: 1,
            opacity: 0.6,
            duration: 0.3,
          });
        }

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;

        // Draw connections between close particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i >= j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            // This would require canvas for lines, simplified for DOM approach
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current.forEach((p) => p.element.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.4 }}
    />
  );
};

export default InteractiveParticles;
