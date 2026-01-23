import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitType?: "chars" | "words" | "lines";
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  as: Tag = "p",
  splitType = "chars",
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const content = text;

    // Split text into spans
    if (splitType === "chars") {
      element.innerHTML = content
        .split("")
        .map(
          (char) =>
            `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
        )
        .join("");
    } else if (splitType === "words") {
      element.innerHTML = content
        .split(" ")
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");
    }

    const spans = element.querySelectorAll(".char, .word");

    gsap.fromTo(
      spans,
      {
        opacity: 0,
        y: 30,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay,
        stagger: 0.015,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, delay, splitType]);

  return <Tag ref={textRef as any} className={className} />;
};

export default AnimatedText;
