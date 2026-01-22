import React, { useEffect, useState } from "react";

const MobileMockup: React.FC = () => {
  const [appState, setAppState] = useState<"booting" | "locked" | "ready">(
    "booting",
  );
  const [activeScreen, setActiveScreen] = useState(0);
  const [unlockProgress, setUnlockProgress] = useState(0);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("09:41");
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [signalStrength, setSignalStrength] = useState<number>(4);
  const [wifiConnected, setWifiConnected] = useState<boolean>(true);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 1000);

    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, prev - Math.random() * 0.5));
    }, 5000);

    // Simulate signal strength fluctuation
    const signalInterval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 4) + 2);
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(batteryInterval);
      clearInterval(signalInterval);
    };
  }, []);

  const screens = [
    {
      title: "Binary Core",
      color: "from-blue-900 to-black",
      icon: "fa-microchip",
      content: "Logic layer initialized.",
    },
    {
      title: "Native Bridge",
      color: "from-indigo-900 to-black",
      icon: "fa-bridge",
      content: "Platform communication active.",
    },
    {
      title: "UI Engine",
      color: "from-cyan-900 to-black",
      icon: "fa-wand-magic-sparkles",
      content: "Rendering 120 FPS fluid motion.",
    },
  ];

  const platformModals = [
    {
      id: "ios",
      title: "iOS Native",
      icon: "fa-apple",
      prefix: "fa-brands",
      description:
        "Swift & Objective-C expertise. Native iOS frameworks and integration.",
    },
    {
      id: "android",
      title: "Android Native",
      icon: "fa-android",
      prefix: "fa-brands",
      description:
        "Kotlin & Java proficiency. Material Design & Android ecosystem.",
    },
    {
      id: "react",
      title: "React Native",
      icon: "fa-code",
      prefix: "fa-solid",
      description:
        "Cross-platform development. JavaScript bridge architecture.",
    },
    {
      id: "bridge",
      title: "Native Bridge",
      icon: "fa-plug",
      prefix: "fa-solid",
      description:
        "Platform communication layer. C++ interoperability & JNI/JSI.",
    },
  ];

  useEffect(() => {
    if (appState === "booting") {
      const timer = setTimeout(() => setAppState("locked"), 2500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleUnlock = () => {
    setUnlockProgress(100);
    setTimeout(() => setAppState("ready"), 600);
  };

  return (
    <div
      className="relative w-[280px] h-[580px] mx-auto rounded-[3.5rem] overflow-hidden transition-all duration-700"
      style={{
        background:
          "linear-gradient(135deg, #333333 0%, #1a1a1a 50%, #0a0a0a 100%)",
        border: "10px solid #FF6B35",
        boxShadow:
          "inset 0 0 20px rgba(0,0,0,0.9), 0 0 60px rgba(59,130,246,0.25), 0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Notch / Dynamic Island - iPhone 17 Pro Max Style */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 z-[100]"
        style={{
          width: "140px",
          height: "28px",
          background: "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)",
          borderRadius: "12px",
          border: "1px solid #333333",
          boxShadow:
            "inset 0 1px 3px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {/* Left Status Icons */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  height: `${6 + i * 2}px`,
                  backgroundColor:
                    i < signalStrength ? "#ffffff" : "rgba(255,255,255,0.2)",
                  borderRadius: "1px",
                }}
              ></div>
            ))}
          </div>
          <i
            className={`fa-solid fa-wifi text-[10px] ${wifiConnected ? "text-white/60" : "text-white/20"}`}
          ></i>
        </div>

        {/* Time */}
        <div className="text-[11px] font-semibold text-white">
          {currentTime}
        </div>

        {/* Right Status Icons */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <div
              style={{
                width: "14px",
                height: "8px",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: "2px",
                overflow: "hidden",
                paddingRight: "2px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${batteryLevel}%`,
                  background:
                    batteryLevel > 20
                      ? "#4ade80"
                      : batteryLevel > 10
                        ? "#fbbf24"
                        : "#ef4444",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.6)" }}>
              {Math.round(batteryLevel)}%
            </span>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="w-full h-full relative font-mono overflow-hidden">
        {/* BOOTING SCREEN */}
        {appState === "booting" && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-8 space-y-4">
            <div className="text-blue-500 text-4xl animate-pulse">
              <i className="fa-solid fa-code"></i>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-[loading_2.5s_ease-in-out]"></div>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
              Compiling Native Modules...
              <br />
              Optimizing Bundle...
            </div>
          </div>
        )}

        {/* LOCKED SCREEN */}
        {appState === "locked" && (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-between p-10 pt-20">
            <div className="text-center space-y-2">
              <div className="text-4xl font-light">09:41</div>
              <div className="text-[10px] text-blue-400 uppercase tracking-[0.3em]">
                Secure Auth Required
              </div>
            </div>

            <button
              onMouseDown={handleUnlock}
              onTouchStart={handleUnlock}
              className="relative w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group active:scale-95 transition-transform"
            >
              <div
                className={`absolute inset-0 rounded-full border-2 border-blue-500 transition-all duration-500 ${unlockProgress === 100 ? "scale-150 opacity-0" : "scale-100 opacity-20"}`}
              ></div>
              <i
                className={`fa-solid fa-fingerprint text-4xl transition-colors ${unlockProgress === 100 ? "text-blue-400" : "text-gray-600 group-hover:text-blue-400"}`}
              ></i>
              <div className="absolute -bottom-12 text-[8px] text-gray-500 whitespace-nowrap uppercase tracking-widest">
                Hold to Initialize Introduction
              </div>
            </button>

            <div className="text-[8px] text-gray-600 text-center leading-relaxed">
              E_OS v4.0.2
              <br />
              SECURE KERNEL LOADED
            </div>
          </div>
        )}

        {/* READY SCREEN */}
        {appState === "ready" && (
          <div
            className={`w-full h-full transition-all duration-1000 bg-gradient-to-br ${screens[activeScreen].color} flex flex-col p-5`}
          >
            <div className="mt-8 space-y-4 flex-1">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center animate-bounce">
                <i
                  className={`fa-solid ${screens[activeScreen].icon} text-xl text-white`}
                ></i>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tighter">
                  {screens[activeScreen].title}
                </h3>
                <div className="h-0.5 w-10 bg-white/30 rounded-full"></div>
                <p className="text-white/60 text-[10px] leading-relaxed">
                  {screens[activeScreen].content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {platformModals.map((modal) => (
                  <button
                    key={modal.id}
                    onClick={() => setSelectedModal(modal.id)}
                    className="h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-lg border border-blue-400/30 backdrop-blur-sm animate-pulse hover:from-blue-500/30 hover:to-cyan-500/20 hover:border-blue-400/50 transition-all flex flex-col items-center justify-center p-1 cursor-pointer"
                  >
                    <i
                      className={`${modal.prefix} ${modal.icon} text-xs text-blue-300`}
                    ></i>
                    <span className="text-[8px] text-blue-200 font-bold text-center leading-tight mt-0.5">
                      {modal.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Modal */}
              {selectedModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
                  <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-2xl p-6 max-w-sm mx-4 space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <i
                          className={`${platformModals.find((m) => m.id === selectedModal)?.prefix} ${platformModals.find((m) => m.id === selectedModal)?.icon} text-xl text-blue-300`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">
                          {
                            platformModals.find((m) => m.id === selectedModal)
                              ?.title
                          }
                        </h3>
                        <div className="h-0.5 w-8 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      {
                        platformModals.find((m) => m.id === selectedModal)
                          ?.description
                      }
                    </p>
                    <button
                      onClick={() => setSelectedModal(null)}
                      className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm uppercase tracking-widest transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tab Bar */}
            <div className="mt-auto mb-3 bg-black/40 backdrop-blur-xl p-3 rounded-2xl flex justify-around border border-white/10">
              {screens.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreen(idx)}
                  className={`text-base transition-all ${activeScreen === idx ? "text-blue-400 scale-110" : "text-gray-600"}`}
                >
                  <i className={`fa-solid ${s.icon}`}></i>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Glass Reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 z-50"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default MobileMockup;
