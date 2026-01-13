import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import IntroAnimation from "../components/IntroAnimation.jsx";
import ParticlesBG from "../components/ParticlesBG.jsx";
import SplineScene from "../components/SplineScene";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: (
      <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63.3 12 .3z" />
    )
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 24h5V7H0v17zm7.5-17h4.8v2.3h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-8.5c0-2.03-.04-4.65-2.83-4.65-2.84 0-3.27 2.21-3.27 4.5V24h-5V7z" />
    )
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    icon: (
      <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.96 4.96 0 002.16-2.72c-.95.56-2 .96-3.12 1.18a4.93 4.93 0 00-8.39 4.49C7.69 8.1 4.07 6.13 1.64 3.16c-.4.69-.63 1.49-.63 2.35 0 1.62.83 3.05 2.08 3.88-.77-.02-1.5-.24-2.14-.59v.06c0 2.26 1.6 4.14 3.72 4.57-.39.11-.8.17-1.22.17-.3 0-.59-.03-.87-.08.59 1.84 2.3 3.18 4.33 3.22A9.9 9.9 0 010 19.54a14 14 0 007.55 2.21c9.06 0 14-7.5 14-14v-.64c.96-.7 1.79-1.56 2.45-2.55z" />
    )
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
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
        i++;
        setTimeout(type, 80);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    };

    type();
  }, [index]);

  return (
    <section
      id="home"
      className="relative w-screen h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-black"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <IntroAnimation />
        <ParticlesBG />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

      <motion.div
        className="absolute top-8 left-8 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-white font-bold text-sm" style={{ fontFamily: "Orbitron" }}>A</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 z-30 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.a
          href="#contact"
          className="px-6 py-2.5 rounded-full border border-white/20 text-white/80 text-sm hover:bg-white hover:text-black transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in touch
        </motion.a>
      </motion.div>

      <motion.div 
        className="relative w-full h-full flex items-center z-20 px-8 lg:px-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-lg space-y-8">
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-white/60">Available for work</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-bold text-cyan-400" style={{ fontFamily: "Orbitron" }}
             >
            Akshat
            <br />
            <span className="text-white text-shadow-2xl text-shadow-cyan-400">Kushnoor</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 h-8"
          >
            <div className="w-12 h-[1px] bg-white/30" />
            <span className="text-lg text-white/60 font-light" style={{ fontFamily: "Orbitron" }}>
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p 
            variants={fadeInUp}
            className="text-white/50 text-lg leading-relaxed max-w-md"
          >
            I craft digital experiences that blend creativity with clean code. 
            Focused on building products that users love.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex items-center gap-4 pt-4"
          >
            <motion.a
              href="#projects"
              className="group px-8 py-4 rounded-full bg-cyan-400 text-black font-medium flex items-center gap-3 hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"  // resume linking pending ...
              className="px-8 py-4 rounded-full border border-white/20 text-white/80 font-medium hover:border-cyan-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Resume
            </motion.a>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex items-center gap-6 pt-8"
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="hidden lg:flex items-center justify-center relative z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50 z-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full h-full"
        >
          <SplineScene />
        </motion.div>
      </div>

      <motion.div 
        className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
      />

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a 
          href="#about" 
          className="flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Home;