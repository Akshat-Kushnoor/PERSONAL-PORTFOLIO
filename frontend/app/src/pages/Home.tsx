"use client";

import { motion } from "framer-motion";
import SplineScene from "../components/bg/SplineScene";
import { SoloButton, PairButton, PairButtonGroup } from "../components/buttons";
import rolesData from "../data/roles.json";
import { Hero } from "../components/ui/hero";

const RolesMarquee = () => {
// ... rest of the file stays same but I need to replace the export default function Home() section
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 group cursor-default relative">
      <div className="flex animate-marquee gap-4 items-center pr-4">
        {[...rolesData, ...rolesData, ...rolesData].map((role, i) => (
          <div 
            key={i} 
            className="flex items-center gap-6 px-10 py-5 border border-white/5 rounded-xl transition-all duration-700 hover:border-white/20 hover:bg-white/[0.03] group/item"
          >
            <div 
              className="w-5 h-5 text-white/20 group-hover/item:text-white/60 transition-colors duration-500"
              dangerouslySetInnerHTML={{ __html: role.svg }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover/item:text-white transition-colors duration-500">
                {role.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderBeam = ({ duration = 8, delay = 0, size = 0.08, count = 1 }) => {
  const dashArray = `${size} ${ (1 / count) - size } `.repeat(count).trim();
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <svg className="w-full h-full overflow-visible">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="16"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray={dashArray}
          animate={{
            strokeDashoffset: [1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
          className="opacity-[0.4]"
          style={{ filter: "blur(0.8px)" }}
        />
      </svg>
    </div>
  );
};

const DotLoader = () => {
//
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div data-cursor-text="Hire Me" 
      className="relative w-40 h-24">
        {/* Loader 1 - Base (Black) */}
        <motion.div 
          className="absolute top-1/2 left-1/2 bg-white/5 border border-white/10 rounded-[5px]"
          animate={{
            width: [160, 80, 40, 160],
            height: [100, 120, 80, 100],
            marginTop: [-50, -60, -40, -50],
            marginLeft: [-80, -40, -20, -80],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.55, 0.3, 0.24, 0.99]
          }}
          style={{ zIndex: 10 }}
        />
        {/* Loader 2 - Middle (Gray) */}
        <motion.div 
          className="absolute top-1/2 left-1/2 bg-white/20 rounded-[3px]"
          animate={{
            width: [150, 70, 32, 150],
            height: [90, 96, 60, 90],
            marginTop: [-45, -48, -30, -45],
            marginLeft: [-75, -35, -16, -75],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.55, 0.3, 0.24, 0.99]
          }}
          style={{ zIndex: 11 }}
        />
        {/* Loader 3 - Top (White) */}
        <motion.div 
          className="absolute top-1/2 left-1/2 bg-white"
          animate={{
            width: [40, 8, 16, 40],
            height: [20, 8, 4, 20],
            marginTop: [50, 49, -37, 50],
            marginLeft: [-20, -5, -8, -20],
            borderRadius: ["0 0 5px 5px", "8px", "10px", "0 0 5px 5px"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.55, 0.3, 0.24, 0.99]
          }}
          style={{ zIndex: 12 }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <section className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans">
      {/* 5x5 Grid Layout */}
      <div className="grid grid-cols-5 grid-rows-5 gap-2 h-screen w-full p-2 lg:p-4">
        
        {/* div1: Name Display (3 cols x 4 rows) */}
        <div className="col-span-5 lg:col-span-3 row-span-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden group">
          <BorderBeam duration={8} count={2} />
          <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />
          
          <Hero
            title={
              <div className="flex flex-col items-center justify-center select-none text-center w-full px-4 overflow-visible">
                <span
                  className="text-[clamp(2.5rem,11vw,9vw)] font-bold leading-[0.9] tracking-tighter whitespace-nowrap"
                  style={{ fontFamily: "var(--font-macondo)" }}
                >
                  AKSHAT
                </span>
                <span
                  className="text-[clamp(2rem,8.5vw,7.2vw)] font-bold leading-[0.9] tracking-tight text-white/40 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  KUSHNOOR
                </span>
              </div>
            }
            subtitle="I build intelligent products that feel inevitable."
            titleClassName="w-full"
            subtitleClassName="mt-4 max-w-[500px]"
          >
            <PairButtonGroup className="mt-12" gap={4}>
              <PairButton variant="white">View Work</PairButton>
              <PairButton variant="black">Get In Touch</PairButton>
            </PairButtonGroup>
          </Hero>

          <div className="absolute bottom-8 left-8 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Based in India</span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Available 2026</span>
          </div>
        </div>

        {/* div3: Spline Scene (2 cols x 4 rows) */}
        <div className="hidden lg:block col-span-2 row-span-4 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
          <BorderBeam duration={10} delay={1} count={2} />
          <div data-cursor-text="ask queries" className="absolute inset-0 z-0">
            
            <SplineScene />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
          
          <div className="absolute top-8 right-8">
            <SoloButton 
              initialText="Status" 
              hoverText="Online" 
              variant="white"
              size="sm"
            />
          </div>
        </div>

        {/* div2: Roles & Animation (Full width row 5) */}
        <div className="col-span-5 row-span-1 grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Roles (75%) */}
          <div className="col-span-3 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center overflow-hidden relative">
            <BorderBeam duration={12} delay={2} count={2} />
            <RolesMarquee />
          </div>
          
          {/* Animation (25%) */}
          <div className="col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden group">
            <BorderBeam duration={15} delay={3} count={1} />
            <DotLoader />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Tailwind Marquee Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}