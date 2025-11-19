
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import IntroAnimation from "../components/IntroAnimation.jsx";
import ParticlesBG from "../components/ParticlesBG.jsx";
import SplineScene from "../components/SplineScene";

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

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "3D Experience Creator",
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  
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
    className="relative w-screen h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-9"
  >
    <div className="absolute inset-0 z-0 pointer-events-none">
      <IntroAnimation />
      <ParticlesBG />
    </div>

    <div className="col-span-1 lg:col-span-4 relative w-full h-full flex items-center justify-center z-20 px-8">
      <div className="m-10 items-right space-y-4">
        <h3
          className="text-2xl text-cyan-200 font-bold"
          style={{ fontFamily: "Macondo" }}
        >
          Hi, i'm
        </h3>

        <h1
          className="text-4xl text-white font-bold mt-4"
          style={{ fontFamily: "Orbitron" }}
        >
          Akshat Kushnoor
        </h1>

        <motion.h3
          className="text-2xl text-cyan-200 font-bold flex m-4"
          variants={typewriter}
          initial="hidden"
          animate="visible"
        >
          {displayedText.split("").map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}

          <motion.span
            className="ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            |
          </motion.span>
        </motion.h3>

        <p className="text-lg text-white/40 mt-10">I’m someone with big dreams and a passion for creating meaningful things. I love collaborating, learning from others, and pushing myself to grow. Excited to work together this year.</p>
      </div>
    </div>

    
    <div className="hidden lg:flex col-span-1 lg:col-span-5 items-center justify-right relative overflow-hidden z-10">
      <SplineScene />
    </div>

    
    <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-blue-400 opacity-60 blur-xl animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-purple-500 opacity-60 blur-2xl animate-pulse"></div>
  </section>
  );

};

export default Home;
