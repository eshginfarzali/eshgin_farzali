import React, { useEffect, useState } from "react";
import BugGame from "./components/BugGame";
import CursorFollower from "./components/CursorFollower";
import FloatingMath from "./components/FloatingMath";
import MobileMockup from "./components/MobileMockup";
import { EXPERIENCES, PROJECTS, SKILLS } from "./constants";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("hero");

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
      <FloatingMath />

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
          id="hero"
          className="min-h-[70vh] flex flex-col xl:flex-row items-center justify-between gap-16 md:gap-24 mb-32 md:mb-48"
        >
          <div className="flex-1 space-y-8 md:space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Senior Mobile Engineer @ Veyseloglu
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white">
                ESHGIN <br />
                <span
                  className="font-black"
                  style={{
                    background:
                      "linear-gradient(to right, #3b82f6, #818cf8, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  farzaliyev
                </span>
              </h1>
            </div>
            <p className="max-w-xl text-gray-500 text-base md:text-lg leading-relaxed font-light">
              Designing high-entropy digital systems. Specialized in{" "}
              <span className="text-white font-medium">
                Native-Bridge Architectures
              </span>{" "}
              and Surrealist User Interfaces. I build apps that don't just
              work—they think.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <a
                href="mailto:eshqinferzeliyev@gmail.com?subject=Let's%20Connect&body=Hi%20Eshgin,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you."
                className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_20px_40px_rgba(59,130,246,0.2)] text-center inline-flex items-center justify-center"
              >
                Initialize Connect
              </a>
              <a
                href="./eshgin_farzaliyev_resume.pdf"
                download
                className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all text-center inline-flex items-center justify-center"
              >
                Download Runtime
              </a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg relative group">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000"></div>
            <MobileMockup />
          </div>
        </section>

        {/* Binary Output / Work */}
        <section id="work" className="mb-32 md:mb-48">
          <div className="flex flex-col mb-16 md:mb-20">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 mb-4 uppercase">
              Selected Builds
            </h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">
              BINARY <span className="text-white/10">OUTPUT</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-700 interactive-card overflow-hidden"
              >
                <div className="aspect-[16/10] mb-6 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-black">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />
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
              </div>
            ))}
          </div>
        </section>

        {/* Stack Architecture */}
        <section
          id="skills"
          className="grid grid-cols-1 xl:grid-cols-12 gap-16 md:gap-20 mb-32 md:mb-48"
        >
          <div className="xl:col-span-8 space-y-16 md:space-y-20">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 mb-6 uppercase">
                Runtime History
              </h2>
              <div className="space-y-10 md:space-y-12 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12 group">
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

          <div className="xl:col-span-4 h-fit xl:sticky xl:top-32">
            <div className="bg-[#0a0a0a] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-white/5 space-y-8 md:space-y-10">
              <h2 className="text-xs font-black tracking-[0.4em] text-white italic border-b border-white/5 pb-6 uppercase">
                STACK_MANIFEST
              </h2>
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-3 group">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="flex items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
                        <i
                          className={`fa-solid ${skill.icon} text-blue-500 text-base`}
                        ></i>
                        {skill.name}
                      </span>
                      <span className="text-blue-500">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-[1.5s] ease-out group-hover:bg-cyan-400"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugger Lab */}
        <section id="lab" className="mb-32 md:mb-48">
          <div className="text-center mb-16 md:mb-20 space-y-6">
            <h2 className="text-[10px] font-black tracking-[0.6em] text-blue-500 uppercase">
              Interactive Unit
            </h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">
              DEBUGGER <span className="text-white/10">STRESS_TEST</span>
            </h3>
            <p className="text-gray-500 max-w-lg mx-auto font-light px-4">
              Simulating high-concurrency event loops. Can you maintain system
              stability under pressure?
            </p>
          </div>
          <div className="px-4">
            <BugGame />
          </div>
        </section>
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
