import React, { useState, useEffect, useMemo, useCallback } from "react";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      { text: "Hello", lang: "English" },
      { text: "Bonjour", lang: "Français" },
      { text: "こんにちは", lang: "日本語" },
      { text: "Hallo", lang: "Deutsch" },
      { text: "안녕하세요", lang: "한국어" },
      { text: "नमस्ते", lang: "हिंदी" },
      { text: "مرحبا", lang: "العربية" },
      { text: "Olá", lang: "Português" },
      { text: "Ciao", lang: "Italiano" },
      { text: "Hola", lang: "Español" },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [phase, setPhase] = useState("visible");
  const [showFinal, setShowFinal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const cycleDuration = 400;
    let timeout;

    const animate = () => {
      setPhase("visible");

      timeout = setTimeout(() => {
        setPhase("exiting");

        timeout = setTimeout(() => {
          setCurrentIndex((prev) => {
            if (prev >= greetings.length - 1) {
              setIsAnimating(false);
              setTimeout(() => setShowFinal(true), 100);
              return prev;
            }
            return prev + 1;
          });
        }, 150);
      }, cycleDuration - 150);
    };

    animate();
    const interval = setInterval(animate, cycleDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAnimating, greetings.length]);

  useEffect(() => {
    if (showFinal) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onFinish?.(), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showFinal, onFinish]);

  const getTextClasses = useCallback(() => {
    const base = "transition-all duration-150 ease-out";
    if (phase === "exiting") {
      return `${base} opacity-0 -translate-y-6 scale-[0.98]`;
    }
    return `${base} opacity-100 translate-y-0 scale-100`;
  }, [phase]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
      style={{ backgroundColor: "#000508" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full"
          style={{
            left: "15%",
            top: "25%",
            background:
              "radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 60%)",
            filter: "blur(40px)",
            animation: "drift 15s ease-in-out infinite",
          }}
        />
        
        <div
          className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] rounded-full"
          style={{
            right: "15%",
            bottom: "25%",
            background:
              "radial-gradient(circle, rgba(14,116,144,0.1) 0%, transparent 60%)",
            filter: "blur(40px)",
            animation: "drift 18s ease-in-out infinite reverse",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, #000508 80%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        {!showFinal ? (
          <div className="flex flex-col items-center w-full">
            <div className={getTextClasses()}>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold 
                  text-cyan-50 tracking-[-0.02em] text-center"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textShadow: "0 0 60px rgba(6,182,212,0.4)",
                }}
              >
                {greetings[currentIndex].text}
              </h1>
            </div>

            <div
              className={`mt-4 sm:mt-6 transition-all duration-200 ease-out ${
                phase === "exiting"
                  ? "opacity-0 translate-y-1"
                  : "opacity-40 translate-y-0"
              }`}
            >
              <span
                className="text-[10px] sm:text-xs md:text-sm text-cyan-200/80 tracking-[0.25em] uppercase"
                style={{ fontFamily: "monospace" }}
              >
                {greetings[currentIndex].lang}
              </span>
            </div>

            <div className="mt-10 sm:mt-16 w-32 sm:w-48 h-px bg-cyan-950/50 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 ease-out rounded-full"
                style={{
                  width: `${((currentIndex + 1) / greetings.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className="mb-6 sm:mb-10 relative"
              style={{
                animation: "scaleUp 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
              }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#000508] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 opacity-40 blur-xl -z-10" />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-cyan-50 
                tracking-[-0.02em] opacity-0 text-center"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                animation: "fadeUp 0.6s ease-out 0.15s forwards",
              }}
            >
              Welcome
            </h1>

            <p
              className="mt-3 sm:mt-5 text-cyan-400/60 text-xs sm:text-sm md:text-base tracking-[0.15em] uppercase 
                font-light opacity-0"
              style={{
                fontFamily: "monospace",
                animation: "fadeUp 0.6s ease-out 0.3s forwards",
              }}
            >
              Portfolio
            </p>

            <div
              className="mt-8 sm:mt-14 flex items-center gap-2 opacity-0"
              style={{ animation: "fadeUp 0.6s ease-out 0.45s forwards" }}
            >
              <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-cyan-800/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <div className="w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-cyan-800/50" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12">
        <div className="absolute top-0 left-0 w-4 sm:w-6 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-4 sm:h-6 bg-gradient-to-b from-cyan-500/30 to-transparent" />
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12">
        <div className="absolute top-0 right-0 w-4 sm:w-6 h-px bg-gradient-to-l from-cyan-500/30 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-4 sm:h-6 bg-gradient-to-b from-cyan-500/30 to-transparent" />
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12">
        <div className="absolute bottom-0 left-0 w-4 sm:w-6 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-4 sm:h-6 bg-gradient-to-t from-cyan-500/30 to-transparent" />
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12">
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 h-px bg-gradient-to-l from-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-4 sm:h-6 bg-gradient-to-t from-cyan-500/30 to-transparent" />
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;