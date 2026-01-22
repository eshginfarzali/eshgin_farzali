import React, { useEffect, useRef, useState } from "react";

const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX - 6}px, ${clientY - 6}px, 0)`;
      }

      if (glassRef.current) {
        glassRef.current.style.transform = `translate3d(${clientX - 15}px, ${clientY - 15}px, 0)`;
      }

      // Check if hovering over text/interactive elements
      const target = e.target as HTMLElement;
      const isText = target.closest(
        "a, button, .interactive-card, [role='button'], h1, h2, h3, p, span",
      );
      setIsHovering(!!isText);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Magnifying Glass Effect */}
      <div
        ref={glassRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
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
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Core Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: isHovering ? "6px" : "4px",
          height: isHovering ? "6px" : "4px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0.8))",
          boxShadow: isHovering
            ? "0 0 12px rgba(59, 130, 246, 0.8), 0 0 25px rgba(59, 130, 246, 0.4)"
            : "0 0 6px rgba(59, 130, 246, 0.5)",
          transition: "all 0.2s ease-out",
        }}
      />
    </>
  );
};

export default CursorFollower;
