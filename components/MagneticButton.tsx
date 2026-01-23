import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MagneticButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, href, onClick, className = "" }) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const magnetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const bounds = button.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 150) {
        const pullStrength = (150 - distance) / 150;
        magnetRef.current.x = deltaX * pullStrength * 0.3;
        magnetRef.current.y = deltaY * pullStrength * 0.3;

        gsap.to(button, {
          x: magnetRef.current.x,
          y: magnetRef.current.y,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeaveScale = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", () => {
      handleMouseLeave();
      handleMouseLeaveScale();
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (href) {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        className={`inline-block ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={buttonRef as any} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default MagneticButton;
