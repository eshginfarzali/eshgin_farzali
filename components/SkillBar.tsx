import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  level: number;
  icon: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, icon }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current || !barRef.current) return;

    gsap.fromTo(
      fillRef.current,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [level]);

  return (
    <div ref={barRef} className="space-y-3 group skill-bar">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-2">
          <i className={icon}></i>
          {name}
        </span>
        <span className="text-blue-400 tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;
