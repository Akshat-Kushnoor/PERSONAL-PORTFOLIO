import React, { useState, useEffect, useMemo } from "react";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Hello",
      "Halo",
      "Ciao",
      "Hallo",
      "こんにちは",
      "안녕하세요",
      "你好",
      "नमस्ते",
      "مرحبا",
      "হ্যালো",
      "Olá",
      "Здравствуйте",
      "Bonjour"
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("fadeIn"); // fadeIn → hold → fadeOut → next
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let timer;

    if (exit) return; // Stop animation if done

    switch (phase) {
      case "fadeIn":
        timer = setTimeout(() => setPhase("hold"), 200);
        break;

      case "hold":
        timer = setTimeout(() => setPhase("fadeOut"), 200);
        break;

      case "fadeOut":
        timer = setTimeout(() => {
          if (index < greetings.length - 1) {
            setIndex(index + 1);
            setPhase("fadeIn");
          } else {
            setExit(true);

            setTimeout(() => {
              if (onFinish) onFinish();
            }, 200);
          }
        }, 200);
        break;
    }

    return () => clearTimeout(timer);
  }, [phase, index, exit, greetings.length, onFinish]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-opacity duration-700"
      style={{
        backgroundColor: "black",
        opacity: exit ? 0 : 1,
        zIndex: 99999
      }}
    >
      <div
        style={{
          color: "cyan",
          fontSize: "4rem",
          fontWeight: "bold",
          transition: "opacity 0.7s ease",
          opacity:
            phase === "fadeIn"
              ? 1
              : phase === "hold"
              ? 1
              : 0 // fadeOut
        }}
      >
        {greetings[index]}
      </div>
    </div>
  );
};

export default IntroAnimation;
