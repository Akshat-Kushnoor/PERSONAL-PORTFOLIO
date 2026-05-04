import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Icons (same imports as before)
import {
  SiBootstrap, SiCss, SiDjango, SiDocker, SiExpress, SiFirebase,
  SiFlask, SiGit, SiGithub, SiGraphql, SiHtml5, SiJavascript,
  SiKubernetes, SiLinux, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPostman, SiPython, SiReact,
  SiRedux, SiTailwindcss, SiTypescript,
} from 'react-icons/si';
import {
  FaCode, FaDatabase, FaJava, FaServer, FaTools,
} from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import { VscVscode } from 'react-icons/vsc';
import { GiCircuitry } from 'react-icons/gi';

// ─────────────────────────────────────────────────────────────────────────────
// Particle System for Dynamic Background
// ─────────────────────────────────────────────────────────────────────────────
const ParticleField = ({ color, density = 30 }) => {
  const particles = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 3}px ${color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic 3D Skill Orb with Mouse Tracking
// ─────────────────────────────────────────────────────────────────────────────
const SkillOrb = ({ skill, index, total, hoveredSkill, setHoveredSkill }) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 170;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const circumference = 2 * Math.PI * 25;

  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: `calc(50% + ${x}px - 28px)`,
        top: `calc(50% + ${y}px - 28px)`,
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0, rotateY: 180 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: index * 0.08,
      }}
      onMouseEnter={() => setHoveredSkill(index)}
      onMouseLeave={() => {
        setHoveredSkill(null);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: `${skill.color}15`,
          border: `2px solid ${skill.color}40`,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.4,
          z: 50,
          boxShadow: `
            0 0 40px ${skill.color}60,
            0 0 80px ${skill.color}30,
            0 20px 40px rgba(0,0,0,0.3)
          `,
        }}
        animate={
          hoveredSkill === index
            ? {
                y: [0, -8, 0],
                rotateZ: [0, 5, -5, 0],
                transition: { duration: 2, repeat: Infinity },
              }
            : { y: 0, rotateZ: 0 }
        }
      >
        {/* Glow layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${skill.color}40, transparent)`,
          }}
          animate={{
            opacity: hoveredSkill === index ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <span
          className="text-2xl relative z-10"
          style={{
            color: skill.color,
            filter: `drop-shadow(0 0 8px ${skill.color}80)`,
            transform: 'translateZ(20px)',
          }}
        >
          {skill.icon}
        </span>

        {/* Animated Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'rotate(-90deg) translateZ(10px)' }}
          viewBox="0 0 56 56"
        >
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skill.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={skill.color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke={`${skill.color}20`}
            strokeWidth="2"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke={`url(#gradient-${index})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference * (1 - skill.level / 100),
            }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </svg>

        {/* Rotating border accent */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${skill.color} 45deg, transparent 90deg)`,
            opacity: 0.3,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {hoveredSkill === index && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.7, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.7, rotateX: -20 }}
            className="absolute left-1/2 z-50 pointer-events-none"
            style={{
              top: '120%',
              transform: 'translateX(-50%)',
              perspective: 800,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div
              className="relative px-4 py-3 rounded-xl text-center backdrop-blur-xl"
              style={{
                backgroundColor: '#0a0a0aee',
                border: `1px solid ${skill.color}60`,
                boxShadow: `
                  0 12px 48px ${skill.color}25,
                  inset 0 1px 0 ${skill.color}20
                `,
              }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <div
                  className="h-full w-1/2"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color}20, transparent)`,
                  }}
                />
              </motion.div>

              <p className="text-white text-sm font-semibold relative z-10">
                {skill.name}
              </p>
              <div className="flex items-center gap-2 mt-1.5 relative z-10">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs font-mono" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Enhanced Skill Card with Glass Morphism & Advanced Animations
// ─────────────────────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gradientX = useTransform(mouseX, [-200, 200], [0, 100]);
  const gradientY = useTransform(mouseY, [-200, 200], [0, 100]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: 30, rotateY: 10 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-sm"
        animate={{
          y: hovered ? -4 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        style={{
          backgroundColor: hovered ? `${skill.color}18` : `${skill.color}08`,
          border: `1px solid ${hovered ? `${skill.color}50` : `${skill.color}18`}`,
          boxShadow: hovered
            ? `0 12px 48px ${skill.color}20, inset 0 1px 0 ${skill.color}30`
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Dynamic gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, ${skill.color}15, transparent 70%)`
            ),
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${skill.color}05 2px,
              ${skill.color}05 4px
            )`,
          }}
          animate={{ y: hovered ? [0, 8] : 0 }}
          transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
        />

        {/* Icon with 3D effect */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{
            backgroundColor: `${skill.color}20`,
            border: `1px solid ${skill.color}40`,
            transformStyle: 'preserve-3d',
          }}
          animate={
            hovered
              ? {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.6 }}
        >
          {/* Glossy overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${skill.color}30 0%, transparent 60%)`,
            }}
          />

          <span
            className="text-xl relative z-10"
            style={{
              color: skill.color,
              filter: `drop-shadow(0 2px 4px ${skill.color}60)`,
            }}
          >
            {skill.icon}
          </span>

          {/* Reflection effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            animate={{ opacity: hovered ? [0.3, 0.6, 0.3] : 0.2 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 relative z-10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-white text-base font-medium tracking-wide">
              {skill.name}
            </span>
            <motion.span
              className="text-sm font-mono tabular-nums"
              style={{ color: skill.color }}
              animate={{
                opacity: hovered ? 1 : 0.7,
                scale: hovered ? 1.1 : 1,
              }}
            >
              {skill.level}%
            </motion.span>
          </div>

          {/* Progress Track */}
          <div
            className="relative h-2 rounded-full overflow-hidden"
            style={{
              backgroundColor: `${skill.color}15`,
              boxShadow: `inset 0 1px 3px ${skill.color}20`,
            }}
          >
            {/* Fill with gradient */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
                boxShadow: `
                  0 0 16px ${skill.color}60,
                  inset 0 1px 0 ${skill.color}40
                `,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{
                duration: 1.5,
                delay: index * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-y-0 w-20"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${skill.color}60, 
                  transparent
                )`,
                filter: 'blur(8px)',
              }}
              animate={{
                left: ['-10%', '110%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />

            {/* Pulsing glow */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/4"
              style={{
                background: `linear-gradient(90deg, transparent, ${skill.color}40)`,
              }}
              animate={{
                opacity: hovered ? [0.5, 1, 0.5] : 0,
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Animated Background Grid
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedGrid = ({ color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
              animate={{
                strokeOpacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SKILLS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const skillsData = [
    {
      category: 'Languages',
      icon: <FaCode />,
      color: '#2496ED',
      skills: [
        { name: 'JavaScript', icon: <SiJavascript />, level: 95, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, level: 90, color: '#3178C6' },
        { name: 'Python', icon: <SiPython />, level: 85, color: '#3776AB' },
        { name: 'Java', icon: <FaJava />, level: 80, color: '#ED8B00' },
      ],
    },
    {
      category: 'Frontend',
      icon: <FaCode />,
      color: '#61DAFB',
      skills: [
        { name: 'React.js', icon: <SiReact />, level: 93, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 90, color: '#aaaaaa' },
        { name: 'Tailwind', icon: <SiTailwindcss />, level: 92, color: '#06B6D4' },
        { name: 'HTML5', icon: <SiHtml5 />, level: 95, color: '#E34F26' },
        { name: 'CSS3', icon: <SiCss />, level: 95, color: '#1572B6' },
        { name: 'Bootstrap', icon: <SiBootstrap />, level: 88, color: '#7952B3' },
        { name: 'Redux', icon: <SiRedux />, level: 87, color: '#764ABC' },
      ],
    },
    {
      category: 'Backend',
      icon: <FaServer />,
      color: '#68A063',
      skills: [
        { name: 'Node.js', icon: <SiNodedotjs />, level: 90, color: '#339933' },
        { name: 'Express.js', icon: <SiExpress />, level: 88, color: '#aaaaaa' },
        { name: 'Django', icon: <SiDjango />, level: 82, color: '#44B78B' },
        { name: 'Flask', icon: <SiFlask />, level: 80, color: '#aaaaaa' },
      ],
    },
    {
      category: 'Database',
      icon: <FaDatabase />,
      color: '#47A248',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 88, color: '#47A248' },
        { name: 'MySQL', icon: <SiMysql />, level: 85, color: '#4479A1' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 83, color: '#4169E1' },
        { name: 'Firebase', icon: <SiFirebase />, level: 86, color: '#FFCA28' },
      ],
    },
    {
      category: 'DevOps',
      icon: <FaTools />,
      color: '#F7DF1E',
      skills: [
        { name: 'Git', icon: <SiGit />, level: 92, color: '#F05032' },
        { name: 'GitHub', icon: <SiGithub />, level: 90, color: '#aaaaaa' },
        { name: 'Docker', icon: <SiDocker />, level: 85, color: '#2496ED' },
        { name: 'Kubernetes', icon: <SiKubernetes />, level: 78, color: '#326CE5' },
        { name: 'Linux', icon: <SiLinux />, level: 87, color: '#FCC624' },
        { name: 'VS Code', icon: <VscVscode />, level: 95, color: '#007ACC' },
        { name: 'Postman', icon: <SiPostman />, level: 90, color: '#FF6C37' },
      ],
    },
    {
      category: 'APIs & Auth',
      icon: <TbApi />,
      color: '#E535AB',
      skills: [
        { name: 'REST APIs', icon: <TbApi />, level: 92, color: '#FF6B6B' },
        { name: 'GraphQL', icon: <SiGraphql />, level: 85, color: '#E10098' },
        { name: 'JWT Auth', icon: <MdSecurity />, level: 88, color: '#00B9F1' },
        { name: 'CI/CD', icon: <GiCircuitry />, level: 82, color: '#FC6D26' },
      ],
    },
  ];

  const activeData = skillsData[activeCategory];

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Particle Field */}
      <ParticleField color={activeData.color} density={40} />

      {/* Animated Grid */}
      <AnimatedGrid color={activeData.color} />

      {/* Dynamic Gradient Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeData.color}, transparent 70%)`,
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 30 },
          y: { type: 'spring', stiffness: 50, damping: 30 },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeData.color}, transparent 70%)`,
        }}
        animate={{
          x: -mousePosition.x * 60,
          y: -mousePosition.y * 60,
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 30 },
          y: { type: 'spring', stiffness: 50, damping: 30 },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Enhanced Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-8 relative overflow-hidden"
            style={{
              borderColor: `${activeData.color}30`,
              backgroundColor: `${activeData.color}08`,
            }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${activeData.color}40, transparent, ${activeData.color}40)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            <motion.span
              className="w-2.5 h-2.5 rounded-full relative z-10"
              style={{ backgroundColor: activeData.color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/60 text-sm font-light tracking-widest relative z-10">
              TECHNICAL PROFICIENCY
            </span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-extralight text-white tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Skills &{' '}
            <motion.span
              className="font-normal inline-block"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeData.color}, ${activeData.color}80)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Expertise
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-white/40 text-lg font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A curated collection of technologies I work with daily, constantly evolving
          </motion.p>
        </motion.div>

        {/* ── Enhanced Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {skillsData.map((cat, index) => {
            const isActive = activeCategory === index;
            return (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setHoveredSkill(null);
                }}
                className="relative px-6 py-3.5 rounded-2xl text-sm font-medium flex items-center gap-3 overflow-hidden group"
                style={{
                  backgroundColor: isActive ? `${cat.color}18` : 'transparent',
                  border: `1px solid ${
                    isActive ? `${cat.color}50` : 'rgba(255,255,255,0.08)'
                  }`,
                  color: isActive ? cat.color : 'rgba(255,255,255,0.5)',
                  boxShadow: isActive
                    ? `0 8px 32px ${cat.color}20, inset 0 1px 0 ${cat.color}20`
                    : 'none',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: `${cat.color}12`,
                  borderColor: `${cat.color}40`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}10, transparent)`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="text-lg relative z-10"
                  animate={isActive ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {cat.icon}
                </motion.span>
                <span className="tracking-wide relative z-10">{cat.category}</span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: cat.color }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Orbital Visualization */}
          <div className="relative h-[500px] hidden lg:flex items-center justify-center">
            {/* Concentric rings with pulse */}
            {[360, 440, 520].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `1px solid ${i === 0 ? `${activeData.color}08` : 'rgba(255,255,255,0.02)'}`,
                }}
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Rotating accent ring */}
            <motion.div
              className="absolute w-[360px] h-[360px] rounded-full"
              style={{
                border: `1.5px solid ${activeData.color}15`,
                background: `conic-gradient(from 0deg, ${activeData.color}10, transparent, ${activeData.color}10)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* Central Hub with enhanced effects */}
            <motion.div
              key={`hub-${activeCategory}`}
              className="absolute w-28 h-28 rounded-3xl flex items-center justify-center z-20"
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              style={{
                backgroundColor: `${activeData.color}12`,
                border: `2px solid ${activeData.color}40`,
                boxShadow: `
                  0 0 80px ${activeData.color}20,
                  inset 0 0 40px ${activeData.color}08,
                  0 20px 40px rgba(0,0,0,0.3)
                `,
                perspective: 1000,
              }}
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${activeData.color}30, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Rotating border accent */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `conic-gradient(from 0deg, ${activeData.color}60, transparent, ${activeData.color}60)`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              <motion.span
                className="text-5xl relative z-10"
                style={{
                  color: activeData.color,
                  filter: `drop-shadow(0 0 20px ${activeData.color}80)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                {activeData.icon}
              </motion.span>
            </motion.div>

            {/* Skill Orbs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`orbs-${activeCategory}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                {activeData.skills.map((skill, index) => (
                  <SkillOrb
                    key={`${activeCategory}-${index}`}
                    skill={skill}
                    index={index}
                    total={activeData.skills.length}
                    hoveredSkill={hoveredSkill}
                    setHoveredSkill={setHoveredSkill}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Connection lines between orbs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {activeData.skills.map((_, index) => {
                  const total = activeData.skills.length;
                  const angle1 = (index / total) * Math.PI * 2 - Math.PI / 2;
                  const angle2 = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;
                  const radius = 170;

                  const x1 = 250 + Math.cos(angle1) * radius;
                  const y1 = 250 + Math.sin(angle1) * radius;
                  const x2 = 250 + Math.cos(angle2) * radius;
                  const y2 = 250 + Math.sin(angle2) * radius;

                  return (
                    <motion.line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={activeData.color}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                  );
                })}
              </motion.g>
            </svg>
          </div>

          {/* Skill Cards List */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`list-${activeCategory}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Info Card */}
                <motion.div
                  className="flex items-center gap-5 mb-10 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden"
                  style={{
                    backgroundColor: `${activeData.color}08`,
                    border: `1px solid ${activeData.color}20`,
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        ${activeData.color}05 0,
                        ${activeData.color}05 10px,
                        transparent 10px,
                        transparent 20px
                      )`,
                    }}
                    animate={{ x: [0, 20] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />

                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundColor: `${activeData.color}20`,
                      border: `1px solid ${activeData.color}40`,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl relative z-10" style={{ color: activeData.color }}>
                      {activeData.icon}
                    </span>
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-medium text-white mb-1">
                      {activeData.category}
                    </h3>
                    <div className="flex items-center gap-4 text-white/40 text-sm">
                      <span>{activeData.skills.length} technologies</span>
                      <span>•</span>
                      <motion.span
                        style={{ color: activeData.color }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Currently learning
                      </motion.span>
                    </div>
                  </div>
                </motion.div>

                {/* Skill Cards */}
                <div className="space-y-3.5">
                  {activeData.skills.map((skill, index) => (
                    <SkillCard
                      key={`${activeCategory}-${skill.name}`}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Enhanced Statistics Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { label: 'Technologies', value: '30+', color: '#61DAFB', icon: <FaCode /> },
            { label: 'Years Experience', value: '5+', color: '#F7DF1E', icon: <FaServer /> },
            { label: 'Projects Built', value: '50+', color: '#47A248', icon: <FaDatabase /> },
            { label: 'Always Learning', value: '∞', color: '#E535AB', icon: <FaTools /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="relative p-7 rounded-2xl text-center overflow-hidden backdrop-blur-sm group"
              style={{
                backgroundColor: `${stat.color}06`,
                border: `1px solid ${stat.color}15`,
              }}
              whileHover={{
                y: -8,
                backgroundColor: `${stat.color}12`,
                borderColor: `${stat.color}40`,
                boxShadow: `0 20px 60px ${stat.color}20`,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${stat.color}15, transparent 70%)`,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Icon */}
              <motion.div
                className="text-4xl mb-3 relative z-10"
                style={{ color: stat.color, filter: `drop-shadow(0 0 10px ${stat.color}60)` }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>

              {/* Value with counter animation */}
              <motion.p
                className="text-4xl md:text-5xl font-light mb-2 relative z-10"
                style={{ color: stat.color }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: i * 0.1,
                }}
              >
                {stat.value}
              </motion.p>

              {/* Label */}
              <p className="text-white/40 text-sm tracking-wide relative z-10">
                {stat.label}
              </p>

           
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${stat.color}, transparent)`,
                }}
              />

             
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `2px solid ${stat.color}` }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: [0, 0.3, 0], scale: [0.8, 1.05, 1.1] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;