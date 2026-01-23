import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = "",
  glowColor = "#3b82f6",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !glowRef.current) return;

    const card = cardRef.current;
    const glow = glowRef.current;
    const shine = shineRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Daha güclü 3D rotation
      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
        force3D: true,
      });

      // Update glow position - daha dinamik
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}70, transparent 50%)`;

      // Update shine position
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 40%)`;
      }
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        z: 50,
        duration: 0.4,
        ease: "back.out(1.4)",
      });

      gsap.to(glow, {
        opacity: 1,
        duration: 0.3,
      });

      if (shine) {
        gsap.to(shine, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });

      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glowColor]);

  return (
    <div
      ref={cardRef}
      className={`interactive-card relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
      }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity"
        style={{
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity"
        style={{
          mixBlendMode: "overlay",
          zIndex: 2,
        }}
      />
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </div>
  );
};

export default InteractiveCard;
