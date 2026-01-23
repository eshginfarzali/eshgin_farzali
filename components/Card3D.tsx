import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  glowColor = "#3b82f6",
  intensity = 15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !innerRef.current) return;

    const card = cardRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    const shine = shineRef.current;

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      gsap.to(inner, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Update glow position
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}60, transparent 50%)`;
      }

      // Update shine position
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 40%)`;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;

      gsap.to(card, {
        scale: 1.03,
        z: 50,
        duration: 0.4,
        ease: "back.out(1.3)",
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          duration: 0.3,
        });
      }

      if (shine) {
        gsap.to(shine, {
          opacity: 1,
          duration: 0.3,
        });
      }

      // Add floating animation
      gsap.to(inner, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;

      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(card, {
        scale: 1,
        z: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3,
        });
      }

      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.3,
        });
      }

      // Stop floating animation
      gsap.killTweensOf(inner);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf([card, inner, glow, shine]);
    };
  }, [glowColor, intensity]);

  return (
    <div
      ref={cardRef}
      className={`card-3d relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        ref={innerRef}
        className="card-3d-inner relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity"
          style={{
            mixBlendMode: "screen",
            zIndex: 1,
            transform: "translateZ(1px)",
          }}
        />

        {/* Shine Effect */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity"
          style={{
            mixBlendMode: "overlay",
            zIndex: 2,
            transform: "translateZ(2px)",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </div>

        {/* 3D Border */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"
          style={{ transform: "translateZ(10px)" }}
        />
      </div>
    </div>
  );
};

export default Card3D;
