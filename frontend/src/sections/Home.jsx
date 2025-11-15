import profilePic from "../assets/profile.png";
import ParticlesBG from "../components/ParticlesBG.jsx";
import SplineScene from "../components/SplineScene";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Typewriter animation variants
const typewriter = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Home = () => {
  // 🔥 ADD YOUR JOB ROLES HERE
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "3D Experience Creator",
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  // ✅ FIXED TYPEWRITER (spaces included properly)
  useEffect(() => {
    let i = 0;
    const current = roles[index];

    const type = () => {
      if (i < current.length) {
        setDisplayedText(current.slice(0, i + 1));

        // longer delay for spaces
        const delay = current[i] === " " ? 150 : 70;

        i++;
        setTimeout(type, delay);
      } else {
        // pause after finishing word
        setTimeout(() => {
          setDisplayedText("");
          setIndex((prev) => (prev + 1) % roles.length);
        }, 1500);
      }
    };

    type();
  }, [index]);

  return (
    <section
      id="home"
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <ParticlesBG />
      </div>

      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-blue-400 opacity-60 blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-60 blur-2xl animate-pulse"></div>

      <div className="relative z-20 w-full lg:w-1/2 px-8 text-left">
        <div className="m-20 items-center justify-center space-y-4">
          <img
            src={profilePic}
            alt="Profile Pic"
            className="rounded-full w-50 h-70"
          ></img>

          <h1 className="text-4xl font-bold">Akshat Kushnoor</h1>

          {/* 🔥 FIXED TYPEWRITER EFFECT */}
          <motion.h3
            className="text-2xl font-bold flex"
            variants={typewriter}
            initial="hidden"
            animate="visible"
          >
            {displayedText.split("").map((char, i) => (
              <motion.span key={i} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            {/* Blinking cursor */}
            <motion.span
              className="ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              |
            </motion.span>
          </motion.h3>

          <p className="text-lg">Your description goes here...</p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 h-full items-center justify-center relative z-10">
        <SplineScene />
      </div>
    </section>
  );
};

export default Home;
