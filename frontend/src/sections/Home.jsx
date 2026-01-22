import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import IntroAnimation from "../components/IntroAnimation.jsx";
import ParticlesBG from "../components/ParticlesBG.jsx";
import SplineScene from "../components/SplineScene";

const Home = () => {
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Prompt Engineer",
    "AI Full Stack Developer",
    "AI/ML Enthusiast"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/yourusername",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "https://dribbble.com/yourusername",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.428 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
        </svg>
      ),
    },
  ];

  const marqueeText = "CREATIVE DEVELOPER • UI/UX DESIGNER • 3D ARTIST • PROBLEM SOLVER • ";

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-screen min-h-screen overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <IntroAnimation />
        <ParticlesBG />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Large Background Text - Desktop Only */}
      <motion.div 
        className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 z-[2] pointer-events-none select-none"
        style={{ x: smoothMouseX, y: smoothMouseY }}
      >
        <h1 
          className="text-[20vw] font-bold leading-none tracking-tighter"
          style={{ 
            fontFamily: "Macondo",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            WebkitTextFillColor: "transparent",
          }}
        >
          AKSHAT
        </h1>
      </motion.div>

      {/* Vertical Line Accent - Desktop Only */}
      <motion.div 
        className="hidden lg:block absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent z-[5]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Section Number - Desktop Only */}
      <motion.div 
        className="hidden lg:flex absolute left-[5%] top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Introduction
        </span>
        <div className="w-[1px] h-8 bg-white/10" />
        <span className="text-5xl font-light text-white/10" style={{ fontFamily: "Orbitron" }}>01</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center">
        
        {/* Left Content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:pl-[15%] lg:pr-12 py-24 lg:py-0">
          <div className="max-w-2xl w-full">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-white/50 tracking-widest uppercase">Open to opportunities</span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/40 text-sm md:text-base mb-4 tracking-wide"
            >
              Hello, I'm
            </motion.p>

            {/* Name with Creative Typography */}
            <div className="relative mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <span 
                  className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9]"
                  style={{ fontFamily: "Macondo" }}
                >
                  Akshat
                </span>
                <div className="flex items-end gap-4 mt-2">
                  <span 
                    className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
                    style={{ 
                      fontFamily: "Orbitron",
                      background: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Kushnoor
                  </span>
                  <motion.span 
                    className="hidden md:inline-block text-cyan-400 text-4xl lg:text-5xl mb-2"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    💀
                  </motion.span>
                </div>
              </motion.h1>

              {/* Decorative Line */}
              <motion.div 
                className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 hidden md:block"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
              </motion.div>
            </div>

            {/* Role Switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-[1px] bg-white/20" />
              <div className="h-7 overflow-hidden">
                <motion.div
                  animate={{ y: -roleIndex * 28 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {roles.map((role, i) => (
                    <p 
                      key={i}
                      className="text-sm md:text-base text-white/50 h-7 flex items-center tracking-wide"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      {role}
                    </p>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-10"
            >
              I craft digital experiences where aesthetics meet functionality. 
              Specializing in creating products that leave lasting impressions 
              through thoughtful design and clean code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.a
                href="#projects"
                className="group relative px-7 py-3.5 bg-cyan-400 text-black text-sm font-medium rounded-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="group px-7 py-3.5 border border-white/10 text-white/60 text-sm font-medium rounded-full hover:border-cyan-400/50 hover:text-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-6"
            >
              <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Follow</span>
              <div className="flex items-center gap-1">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-all duration-300"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right - Spline Scene (Desktop Only) */}
        <motion.div
          className="hidden lg:flex flex-1 items-center justify-center relative h-screen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          
          <SplineScene />

          {/* Floating Info Cards - Desktop Only */}
          <motion.div 
            className="absolute top-[20%] right-[10%] z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ x: useTransform(smoothMouseX, v => v * -2), y: useTransform(smoothMouseY, v => v * -2) }}
          >
            <div className="px-4 py-3 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-lg">
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Experience</p>
              <p className="text-lg text-white font-light">3+ Years</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-[25%] right-[15%] z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            style={{ x: useTransform(smoothMouseX, v => v * -3), y: useTransform(smoothMouseY, v => v * -3) }}
          >
            <div className="px-4 py-3 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-lg">
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Projects</p>
              <p className="text-lg text-white font-light">50+</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Text - Desktop Only */}
      <div className="hidden lg:block absolute bottom-20 left-0 right-0 z-10 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="text-[10px] text-white/[0.07] tracking-[0.5em] uppercase mx-4"
              style={{ fontFamily: "Orbitron" }}
            >
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-3 text-white/20 hover:text-white/50 transition-colors group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <motion.div
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2 group-hover:border-cyan-400/50 transition-colors"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-1 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Corner Accent - Desktop Only */}
      <motion.div 
        className="hidden lg:block absolute top-8 right-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/30 tracking-widest uppercase">Based in</span>
          <span className="text-sm text-white/60">India</span>
        </div>
      </motion.div>

      {/* Ambient Glows */}
      <motion.div 
        className="hidden lg:block absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="hidden lg:block absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[120px] pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
};

export default Home;