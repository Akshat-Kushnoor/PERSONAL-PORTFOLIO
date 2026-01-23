import React, { useState, useEffect, useMemo, useCallback } from "react";
import Logo from "./Logo";

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
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Random glitch trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

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
        setTimeout(() => onFinish?.(), 1000);
      }, 2200);
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

  // Generate pixel grid background
  const PixelGrid = () => (
    <div className="absolute inset-0 opacity-[0.03]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );

  // Scanlines overlay matching the logo
  const Scanlines = () => (
    <div
      className="absolute inset-0 pointer-events-none z-50"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.15) 1px,
          transparent 1px,
          transparent 2px
        )`,
      }}
    />
  );

  // Floating pixel particles
  const FloatingPixels = () => {
    const pixels = useMemo(() => 
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })), []
    );

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pixels.map((pixel) => (
          <div
            key={pixel.id}
            className="absolute rounded-sm"
            style={{
              left: `${pixel.left}%`,
              top: `${pixel.top}%`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              backgroundColor: "#00ffff",
              boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
              opacity: 0.3,
              animation: `floatPixel ${pixel.duration}s ease-in-out infinite`,
              animationDelay: `${pixel.delay}s`,
            }}
          />
        ))}
      </div>
    );
  };

  // Progress bar with pixel blocks
  const PixelProgressBar = ({ progress }) => {
    const totalBlocks = 10;
    const filledBlocks = Math.ceil((progress / 100) * totalBlocks);

    return (
      <div className="flex gap-1 mt-10 sm:mt-16">
        {Array.from({ length: totalBlocks }, (_, i) => (
          <div
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200"
            style={{
              backgroundColor: i < filledBlocks ? "#00ffff" : "#0a1a1a",
              boxShadow: i < filledBlocks 
                ? "0 0 10px #00ffff, 0 0 20px #00ffff, inset 0 0 5px rgba(255,255,255,0.3)" 
                : "inset 0 0 5px rgba(0,255,255,0.1)",
              border: "1px solid rgba(0,255,255,0.3)",
              transform: i < filledBlocks ? "scale(1.1)" : "scale(1)",
            }}
          />
        ))}
      </div>
    );
  };

  // Corner decorations
  const CornerDecor = ({ position }) => {
    const posStyles = {
      topLeft: { top: 20, left: 20, rotate: "0deg" },
      topRight: { top: 20, right: 20, rotate: "90deg" },
      bottomLeft: { bottom: 20, left: 20, rotate: "-90deg" },
      bottomRight: { bottom: 20, right: 20, rotate: "180deg" },
    };

    return (
      <div
        className="absolute w-8 h-8 sm:w-12 sm:h-12 opacity-40"
        style={{
          ...posStyles[position],
          transform: `rotate(${posStyles[position].rotate})`,
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{
            background: "linear-gradient(90deg, #00ffff, transparent)",
            boxShadow: "0 0 10px #00ffff",
          }}
        />
        <div
          className="absolute top-0 left-0 h-full w-[2px]"
          style={{
            background: "linear-gradient(180deg, #00ffff, transparent)",
            boxShadow: "0 0 10px #00ffff",
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}
      style={{ backgroundColor: "#080808" }}
    >
      {/* Scanlines - matches logo */}
      <Scanlines />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pixel grid */}
        <PixelGrid />

        {/* Mouse-following glow */}
        <div
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full transition-all duration-700 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(0,255,255,0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Static glow orbs */}
        <div
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full"
          style={{
            left: "10%",
            top: "20%",
            background: "radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full"
          style={{
            right: "10%",
            bottom: "20%",
            background: "radial-gradient(circle, rgba(0,143,143,0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
            animation: "pulse 5s ease-in-out infinite reverse",
          }}
        />

        {/* Floating pixels */}
        <FloatingPixels />

        {/* Center vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, #080808 75%)",
          }}
        />
      </div>

      {/* Corner decorations */}
      <CornerDecor position="topLeft" />
      <CornerDecor position="topRight" />
      <CornerDecor position="bottomLeft" />
      <CornerDecor position="bottomRight" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        {!showFinal ? (
          <div className="flex flex-col items-center w-full">
            {/* Greeting text with glitch effect */}
            <div className={getTextClasses()}>
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold 
                  tracking-[-0.02em] text-center relative
                  ${glitchActive ? "animate-glitch" : ""}`}
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "#00ffff",
                  textShadow: `
                    0 0 10px #00ffff,
                    0 0 20px #00ffff,
                    0 0 40px #00ffff,
                    0 0 80px rgba(0,255,255,0.5)
                  `,
                }}
              >
                {/* Glitch layers */}
                <span
                  className="absolute inset-0 opacity-0"
                  style={{
                    color: "#ff00ff",
                    animation: glitchActive ? "glitchLayer1 0.15s steps(2) infinite" : "none",
                  }}
                >
                  {greetings[currentIndex].text}
                </span>
                <span
                  className="absolute inset-0 opacity-0"
                  style={{
                    color: "#00ff00",
                    animation: glitchActive ? "glitchLayer2 0.15s steps(2) infinite" : "none",
                  }}
                >
                  {greetings[currentIndex].text}
                </span>
                {greetings[currentIndex].text}
              </h1>
            </div>

            {/* Language label */}
            <div
              className={`mt-4 sm:mt-6 transition-all duration-200 ease-out ${
                phase === "exiting"
                  ? "opacity-0 translate-y-1"
                  : "opacity-60 translate-y-0"
              }`}
            >
              <span
                className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] uppercase px-4 py-1 border"
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: "#00ffff",
                  borderColor: "rgba(0,255,255,0.3)",
                  textShadow: "0 0 10px #00ffff",
                  boxShadow: "0 0 10px rgba(0,255,255,0.1), inset 0 0 10px rgba(0,255,255,0.05)",
                }}
              >
                [{greetings[currentIndex].lang}]
              </span>
            </div>

            {/* Pixel progress bar */}
            <PixelProgressBar
              progress={((currentIndex + 1) / greetings.length) * 100}
            />

            {/* Loading text */}
            <div
              className="mt-6 text-xs tracking-[0.2em] uppercase opacity-40"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#00ffff",
              }}
            >
              <span className="animate-pulse">INITIALIZING</span>
              <span className="inline-block w-8 text-left">
                {Array.from({ length: (currentIndex % 3) + 1 }, () => ".").join("")}
              </span>
            </div>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center"
            style={{
              animation: "logoReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Optional: System ready text above logo */}
            <div
              className="mb-8 text-xs tracking-[0.3em] uppercase opacity-0"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                color: "#00ffff",
                textShadow: "0 0 10px #00ffff",
                animation: "fadeIn 0.5s ease-out 0.3s forwards",
              }}
            >
              SYSTEM READY
            </div>
            <Logo />
          </div>
        )}
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30">
        <div
          className="w-16 sm:w-24 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, #00ffff)",
            boxShadow: "0 0 10px #00ffff",
          }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{
            backgroundColor: "#00ffff",
            boxShadow: "0 0 10px #00ffff",
          }}
        />
        <div
          className="w-16 sm:w-24 h-[1px]"
          style={{
            background: "linear-gradient(90deg, #00ffff, transparent)",
            boxShadow: "0 0 10px #00ffff",
          }}
        />
      </div>

      {/* Version/Tech text */}
      <div
        className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase opacity-20"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          color: "#00ffff",
        }}
      >
        v2.0.24
      </div>

      <style>{`
        @keyframes floatPixel {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.2;
          }
          25% { 
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 0.3;
          }
          75% { 
            opacity: 0.4;
          }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1); 
          }
        }

        @keyframes glitchLayer1 {
          0% { 
            opacity: 0.8; 
            transform: translate(-3px, -2px); 
          }
          50% { 
            opacity: 0; 
            transform: translate(3px, 2px); 
          }
          100% { 
            opacity: 0.8; 
            transform: translate(-2px, 3px); 
          }
        }

        @keyframes glitchLayer2 {
          0% { 
            opacity: 0.8; 
            transform: translate(3px, 2px); 
          }
          50% { 
            opacity: 0; 
            transform: translate(-3px, -2px); 
          }
          100% { 
            opacity: 0.8; 
            transform: translate(2px, -3px); 
          }
        }

        .animate-glitch {
          animation: mainGlitch 0.15s steps(2) infinite;
        }

        @keyframes mainGlitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes logoReveal {
          0% { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px);
            filter: blur(10px);
          }
          100% { 
            opacity: 1; 
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 0.6; transform: translateY(0); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;