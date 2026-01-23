import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import AnimatedCounter from "./components/AnimatedCounter";
import AnimatedSection from "./components/AnimatedSection";
import AnimatedText from "./components/AnimatedText";
import BugGame from "./components/BugGame";
import Card3D from "./components/Card3D";
import CursorFollower from "./components/CursorFollower";
import FloatingKeys from "./components/FloatingKeys";
import FloatingMath from "./components/FloatingMath";
import GlitchText from "./components/GlitchText";
import InteractiveParticles from "./components/InteractiveParticles";
import MagneticButton from "./components/MagneticButton";
import MobileMockup from "./components/MobileMockup";
import SkillBar from "./components/SkillBar";
import TypingGame from "./components/TypingGame";
import { EXPERIENCES, PROJECTS, SKILLS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("hero");
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero entrance animation - daha sürətli və smooth
    if (heroRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Subtitle ilk görünür
      tl.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
      )
        // Title dərhal arxasından
        .fromTo(
          ".hero-title .text-white",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          ".hero-title span[style*='gradient']",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        // Description
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3",
        )
        // Stats
        .fromTo(
          ".hero-stats > div",
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          "-=0.3",
        )
        // Buttons
        .fromTo(
          ".hero-button",
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        );
    }

    // Parallax scrolling effect
    gsap.to(".parallax-layer", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 3D geometric shapes scroll animations
    gsap.to(".parallax-shape-1", {
      rotationZ: 360,
      y: 200,
      x: -100,
      scale: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".parallax-shape-2", {
      y: -150,
      x: 100,
      rotationZ: -180,
      scale: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".parallax-shape-3", {
      y: 100,
      x: -50,
      scale: 2,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".parallax-shape-4", {
      rotationZ: -360,
      y: 150,
      x: 80,
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
      },
    });

    gsap.to(".parallax-shape-5", {
      y: -200,
      x: -120,
      scale: 1.8,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2.5,
      },
    });

    // Blobs 3D movement on scroll
    gsap.to(".parallax-blob-1", {
      y: 100,
      x: -50,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".parallax-blob-2", {
      y: -80,
      x: 60,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".parallax-blob-3", {
      y: 120,
      x: -70,
      scale: 1.4,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // Project cards falling animation
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.from(card, {
        y: -100,
        opacity: 0,
        rotation: -5,
        scale: 0.9,
        duration: 0.8,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: i * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (height > 0) {
        const percentage = (winScroll / height) * 100;
        setScrolled(percentage);
      } else {
        setScrolled(0);
      }

      // Detect active section for mobile tab highlighting
      const sections = ["work", "skills", "lab"];
      let current = "hero";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          current = section;
        }
      }
      setActiveTab(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.02;

  const cpuLoadValue = Math.min(100, Math.max(0, Math.round(scrolled || 0)));
  const fuzzyValue = Math.round(Math.min(100, Math.abs(parallaxX) * 20));

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-400 font-['Space_Grotesk']">
      <CursorFollower />
      <FloatingKeys />
      <FloatingMath />
      <InteractiveParticles />

      {/* Surreal Logic Sidebar - Hidden on Mobile */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 text-[9px] font-mono text-blue-500 uppercase tracking-[0.2em] bg-black/60 backdrop-blur-2xl p-6 border border-white/5 rounded-[2rem]">
        <div className="space-y-2">
          <div className="flex justify-between gap-4">
            <span>MEM_USAGE</span>
            <span className="text-white font-bold">{cpuLoadValue}%</span>
          </div>
          <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 ease-out"
              style={{ width: `${cpuLoadValue}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between gap-4">
            <span>THREAD_CONC</span>
            <span className="text-white font-bold">{fuzzyValue}%</span>
          </div>
          <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-400 transition-all duration-500 ease-out"
              style={{ width: `${fuzzyValue}%` }}
            ></div>
          </div>
        </div>
        <div className="pt-4 mt-2 border-t border-white/5 space-y-2 text-gray-500">
          <div className="flex justify-between">
            <span>X_COORD</span>
            <span>{Math.round(mousePos.x)}</span>
          </div>
          <div className="flex justify-between">
            <span>Y_COORD</span>
            <span>{Math.round(mousePos.y)}</span>
          </div>
          <div className="flex justify-between text-blue-400 font-bold">
            <span>STATUS</span>
            <span>STABLE</span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav
        className="fixed top-0 left-0 right-0 z-[60] py-8 px-8 transition-all duration-500 hidden md:block backdrop-blur-xl border-b border-white/5"
        style={{
          background:
            "linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 30, 46, 0.05) 100%)",
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="group cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 rotate-45 group-hover:rotate-0">
              <span className="text-white font-black -rotate-45 group-hover:rotate-0 transition-all">
                EF
              </span>
            </div>
            <span className="text-sm font-black tracking-[0.4em] text-white/50 group-hover:text-blue-400 transition-colors uppercase hidden sm:inline">
              Architect
            </span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            <a
              href="#work"
              className="hover:text-white transition-colors relative group"
            >
              Work
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#skills"
              className="hover:text-white transition-colors relative group"
            >
              Stack
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#lab"
              className="hover:text-white transition-colors relative group"
            >
              Lab
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] h-16 md:hidden">
        <div className="w-full h-full bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-2 shadow-2xl shadow-blue-500/10">
          <a
            href="#"
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${activeTab === "hero" ? "text-blue-500" : "text-gray-500"}`}
          >
            <i className="fa-solid fa-house text-lg"></i>
            <span className="text-[8px] font-bold uppercase tracking-widest">
              Home
            </span>
          </a>
          <a
            href="#work"
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${activeTab === "work" ? "text-blue-500" : "text-gray-500"}`}
          >
            <i className="fa-solid fa-briefcase text-lg"></i>
            <span className="text-[8px] font-bold uppercase tracking-widest">
              Work
            </span>
          </a>
          <a
            href="#skills"
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${activeTab === "skills" ? "text-blue-500" : "text-gray-500"}`}
          >
            <i className="fa-solid fa-layer-group text-lg"></i>
            <span className="text-[8px] font-bold uppercase tracking-widest">
              Stack
            </span>
          </a>
          <a
            href="#lab"
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${activeTab === "lab" ? "text-blue-500" : "text-gray-500"}`}
          >
            <i className="fa-solid fa-flask text-lg"></i>
            <span className="text-[8px] font-bold uppercase tracking-widest">
              Lab
            </span>
          </a>
        </div>
      </nav>

      <main className="container mx-auto px-6 md:px-8 pt-32 md:pt-48 pb-32">
        {/* Surreal Hero Section */}
        <section
          ref={heroRef}
          id="hero"
          className="min-h-[70vh] flex flex-col xl:flex-row items-center justify-between gap-16 md:gap-24 mb-32 md:mb-48 relative overflow-hidden"
        >
          {/* Parallax Background Elements */}
          <div className="parallax-layer absolute inset-0 pointer-events-none opacity-30">
            <div className="parallax-blob-1 absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
            <div
              className="parallax-blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="parallax-blob-3 absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            {/* Floating geometric shapes with scroll animations */}
            <div
              className="parallax-shape-1 absolute top-1/3 right-1/3 w-20 h-20 border-2 border-blue-500/30 rotate-45 animate-spin"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="parallax-shape-2 absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-bounce"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="parallax-shape-3 absolute top-2/3 right-1/4 w-12 h-12 bg-cyan-500/20 blur-sm animate-pulse"></div>
            <div
              className="parallax-shape-4 absolute top-1/4 right-1/2 w-24 h-24 border-2 border-pink-500/20"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>
            <div className="parallax-shape-5 absolute bottom-1/2 right-1/5 w-20 h-20 border-2 border-blue-500/20 rounded-full"></div>
          </div>

          <div className="flex-1 space-y-8 md:space-y-12 relative z-10">
            <div className="space-y-4">
              <div className="hero-subtitle inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                Senior Mobile Engineer @ Veyseloglu
              </div>
              <div className="hero-title relative z-20">
                <GlitchText
                  text="ESHGIN"
                  className="text-5xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white block relative z-30 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                />
                {/* Animated glow behind title */}
                <div
                  className="absolute inset-0 blur-2xl opacity-30 animate-pulse pointer-events-none -z-10"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
                  }}
                />
                <span
                  className="text-5xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] block relative z-30"
                  style={{
                    background:
                      "linear-gradient(to right, #93c5fd, #c4b5fd, #e9d5ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 0 60px rgba(139, 92, 246, 0.9)",
                    filter:
                      "drop-shadow(0 4px 8px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(147,197,253,0.5))",
                  }}
                >
                  farzaliyev
                </span>
              </div>
            </div>
            <p className="hero-description max-w-xl text-gray-300 text-base md:text-lg leading-relaxed font-normal relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Designing high-entropy digital systems. Specialized in{" "}
              <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Native-Bridge Architectures
              </span>{" "}
              and{" "}
              <span className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Surrealist User Interfaces
              </span>
              . I build apps that don't just work—they think.
            </p>
            <div className="hero-stats flex flex-wrap gap-6 mb-8 relative z-10">
              <div className="flex flex-col bg-blue-500/10 px-6 py-3 rounded-xl border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <span className="text-3xl font-black text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                  <AnimatedCounter end={7} suffix="+" />
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Years Exp
                </span>
              </div>
              <div className="flex flex-col bg-purple-500/10 px-6 py-3 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:bg-purple-500/20 hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                <span className="text-3xl font-black text-purple-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                  <AnimatedCounter end={50} suffix="+" />
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Projects
                </span>
              </div>
              <div className="flex flex-col bg-pink-500/10 px-6 py-3 rounded-xl border border-pink-500/20 backdrop-blur-sm hover:bg-pink-500/20 hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer hover:border-pink-400/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                <span className="text-3xl font-black text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]">
                  <AnimatedCounter end={100} suffix="K+" />
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Users
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 relative z-10">
              <MagneticButton
                href="mailto:eshqinferzeliyev@gmail.com?subject=Let's%20Connect&body=Hi%20Eshgin,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you."
                className="hero-button flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(59,130,246,0.4)] hover:shadow-[0_25px_50px_rgba(59,130,246,0.6)] text-center relative z-10"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  ⚡ Initialize Connect
                </span>
              </MagneticButton>
              <MagneticButton
                href="./eshgin_farzaliyev_resume.pdf"
                className="hero-button flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] text-center backdrop-blur-sm relative z-10"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  📥 Download Runtime
                </span>
              </MagneticButton>
            </div>
          </div>
          <div
            className="flex-1 w-full max-w-lg relative group"
            style={{ perspective: "1200px" }}
          >
            {/* Multiple glow layers for depth */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/25 transition-all duration-1000 animate-pulse"></div>
            <div
              className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-1000 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Rotating ring around mockup */}
            <div
              className="absolute inset-0 border-2 border-blue-500/10 rounded-full animate-spin"
              style={{ animationDuration: "30s" }}
            ></div>
            <div
              className="absolute inset-8 border-2 border-purple-500/10 rounded-full animate-spin"
              style={{
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            ></div>

            <div className="relative hover:scale-105 transition-transform duration-700">
              <MobileMockup />
            </div>
          </div>
        </section>

        {/* Binary Output / Work */}
        <AnimatedSection id="work" className="mb-32 md:mb-48">
          <div className="flex flex-col mb-16 md:mb-20 animate-item">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 mb-4 uppercase">
              Selected Builds
            </h2>
            <AnimatedText
              text="BINARY OUTPUT"
              as="h3"
              className="text-4xl md:text-7xl font-black tracking-tighter uppercase"
              splitType="words"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project, index) => (
              <Card3D
                key={project.id}
                className="project-card animate-item group relative bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-700 overflow-hidden"
                glowColor={index % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
                intensity={18}
              >
                <div className="aspect-[16/10] mb-6 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-black relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {project.description}
                  </p>
                  <div className="flex gap-6 pt-2">
                    {project.iosUrl && (
                      <a
                        href={project.iosUrl}
                        className="text-2xl hover:text-white text-gray-600 transition-all hover:scale-110"
                      >
                        <i className="fa-brands fa-apple"></i>
                      </a>
                    )}
                    {project.androidUrl && (
                      <a
                        href={project.androidUrl}
                        className="text-2xl hover:text-green-500 text-gray-600 transition-all hover:scale-110"
                      >
                        <i className="fa-brands fa-android"></i>
                      </a>
                    )}
                    {project.webUrl && (
                      <a
                        href={project.webUrl}
                        className="text-2xl hover:text-blue-500 text-gray-600 transition-all hover:scale-110"
                      >
                        <i className="fa-solid fa-globe"></i>
                      </a>
                    )}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </AnimatedSection>

        {/* Stack Architecture */}
        <AnimatedSection
          id="skills"
          className="grid grid-cols-1 xl:grid-cols-12 gap-16 md:gap-20 mb-32 md:mb-48"
        >
          <div className="xl:col-span-8 space-y-16 md:space-y-20 animate-item">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 mb-6 uppercase">
                Runtime History
              </h2>
              <div className="space-y-10 md:space-y-12 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-8 md:pl-12 group timeline-item"
                  >
                    <div
                      className={`absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full border-2 border-black ${exp.isCurrent ? "bg-blue-500 animate-pulse" : "bg-gray-700"}`}
                    ></div>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase">
                          {exp.company}
                        </h4>
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        {exp.role}
                      </p>
                      <ul className="text-sm text-gray-500 space-y-3 font-light leading-relaxed">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-blue-500/50 mt-1.5 text-[8px] italic">
                              0x{i + 1}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 h-fit xl:sticky xl:top-32 animate-item">
            <div className="bg-[#0a0a0a] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-white/5 space-y-8 md:space-y-10">
              <h2 className="text-xs font-black tracking-[0.4em] text-white italic border-b border-white/5 pb-6 uppercase">
                STACK_MANIFEST
              </h2>
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {SKILLS.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={`fa-solid ${skill.icon} text-blue-500 text-base`}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Debugger Lab */}
        <AnimatedSection id="lab" className="mb-32 md:mb-48">
          <div className="text-center mb-16 md:mb-20 space-y-6 animate-item">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 uppercase">
              Interactive Unit
            </h2>
            <AnimatedText
              text="DEBUGGER STRESS_TEST"
              as="h3"
              className="text-4xl md:text-7xl font-black tracking-tighter uppercase"
              splitType="words"
            />
            <p className="text-gray-500 max-w-lg mx-auto font-light px-4">
              Simulating high-concurrency event loops. Can you maintain system
              stability under pressure?
            </p>
          </div>
          <div className="px-4 space-y-8">
            <Card3D className="animate-item" glowColor="#3b82f6" intensity={12}>
              <BugGame />
            </Card3D>
            <Card3D className="animate-item" glowColor="#8b5cf6" intensity={12}>
              <TypingGame />
            </Card3D>
          </div>
        </AnimatedSection>
      </main>

      {/* Surreal Footer */}
      <footer className="border-t border-white/5 pt-16 md:pt-20 pb-32 md:pb-20 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16 items-start mb-16 md:mb-20">
            <div className="lg:col-span-2 space-y-8">
              <div className="text-3xl md:text-4xl font-black tracking-tighter text-blue-500 uppercase">
                ESHGIN.LAB
              </div>
              <p className="text-gray-500 text-sm max-w-sm font-light leading-relaxed">
                Transforming enterprise chaos into native performance. Built at
                the intersection of surrealist aesthetics and non-linear logic.
              </p>
              <div className="flex gap-8 text-2xl text-gray-600">
                <a
                  href="https://github.com/eshginfarzali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all transform hover:scale-125"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://linkedin.com/in/eshginfarzali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all transform hover:scale-125"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="mailto:eshqinferzeliyev@gmail.com"
                  className="hover:text-white transition-all transform hover:scale-125"
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
                Navigation
              </h4>
              <ul className="space-y-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
                <li>
                  <a
                    href="#work"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Archive
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Manifest
                  </a>
                </li>
                <li>
                  <a
                    href="#lab"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Lab_Core
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
                System Info
              </h4>
              <div className="text-[9px] font-mono text-gray-600 space-y-2 uppercase">
                <p>Location: Baku, AZ</p>
                <p>Uptime: {Math.floor(Date.now() / 1000000000)} units</p>
                <p>Kernel: v4.0.2-Stable</p>
                <p className="text-blue-500/50">
                  © {new Date().getFullYear()} Eshgin F.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center text-[15vw] font-black text-white/[0.02] select-none tracking-tighter leading-none h-20 md:h-40 overflow-hidden uppercase">
            TERMINAL_EXIT
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
