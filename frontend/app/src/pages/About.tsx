"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { PairButton, PairButtonGroup } from "../components/buttons";
import profilePic from "../data/assets/profile.png";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  tags: string[];
  accentColor: string;
}

interface AboutProps {
  aboutParagraph: string;
  cards: CardProps[];
  imageSrc: any;
  imageAlt: string;
  sectionId?: string;
}

const AboutClient = ({
  aboutParagraph,
  cards,
  imageSrc,
  imageAlt,
  sectionId = "about",
}: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.from(".about-title-word", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Image reveal animation
      gsap.from(".about-image-wrapper", {
        scale: 0.8,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 75%",
        },
      });

      // Paragraph split animation
      gsap.from(".about-paragraph", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-paragraph",
          start: "top 85%",
        },
      });

      // Cards stagger with rotation
      gsap.fromTo(
        ".expertise-card",
        {
          y: 80,
          opacity: 0,
          rotateX: -15,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expertise-grid",
            start: "top 85%",
          },
        }
      );

      // Floating animation for image
      gsap.to(".about-image-wrapper", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Decorative lines animation
      gsap.from(".deco-line", {
        scaleX: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 overflow-hidden">
          <div className="flex items-center gap-6 mb-8">
            <div className="deco-line h-px w-20 bg-white origin-left" />
            <span className="text-sm tracking-[0.3em] uppercase text-white/60">
              Introduction
            </span>
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            <div className="overflow-hidden">
              <span className="about-title-word inline-block">About</span>
            </div>
            <div className="overflow-hidden">
              <span className="about-title-word inline-block">Me</span>
            </div>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-32">
          {/* Left - Image Section */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative about-image-wrapper">
              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-white" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-r-2 border-t-2 border-white" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-2 border-b-2 border-white" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-white" />

              {/* Image container */}
              <div
                ref={imageContainerRef}
                className="relative w-80 h-96 md:w-96 md:h-[500px] overflow-hidden group"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-black px-6 py-4 font-bold text-sm tracking-wider rotate-3 shadow-2xl">
                <div>AVAILABLE</div>
                <div className="text-xs font-normal mt-1">FOR PROJECTS</div>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2 space-y-8">
            <div className="deco-line h-px w-full bg-gradient-to-r from-white to-transparent origin-left" />

            <p className="about-paragraph text-lg md:text-xl leading-relaxed text-white/80 font-light">
              {aboutParagraph}
            </p>

            <div className="flex gap-4 pt-4">
              <div className="border-l-2 border-white pl-4">
                <div className="text-4xl font-bold">5+</div>
                <div className="text-sm text-white/60 mt-1">Years Experience</div>
              </div>
              <div className="border-l-2 border-white pl-4">
                <div className="text-4xl font-bold">50+</div>
                <div className="text-sm text-white/60 mt-1">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-20">
          <div className="flex items-center gap-6 mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-white/60">
              Core Expertise
            </span>
            <div className="deco-line h-px flex-1 bg-white/20 origin-left" />
          </div>

          <div className="expertise-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="expertise-card group relative bg-white/[0.02] border border-white p-8 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                {/* Accent color stripe */}
                <div
                  className="absolute top-0 left-0 w-1 h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: card.accentColor }}
                />

                <div className="relative z-10">
                  {/* Number */}
                  <div className="text-6xl font-bold text-white/10 group-hover:text-black/10 transition-colors duration-500 mb-4">
                    {card.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 mb-6 text-white group-hover:text-black transition-colors duration-500">
                    {card.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70 group-hover:text-black/70 transition-colors duration-500">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 rounded-full border border-white/20 text-white/60 group-hover:border-black/20 group-hover:text-black/60 transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                    <span>Explore</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Let&apos;s Create Together
            </h3>
            <p className="text-white/60">
              Ready to transform your vision into reality?
            </p>
          </div>

          <PairButtonGroup gap={4}>
            <PairButton variant="white">Start a Project</PairButton>
            <PairButton variant="black">Download CV</PairButton>
          </PairButtonGroup>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-px h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-px h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default function About() {
  const config = {
    theme: "same4",
    motion: {
      // "motion one" vibe: quick, smooth, slightly springy
      base: { duration: 0.7, easing: [0.22, 1, 0.36, 1] },
      stagger: 0.08,
      hover: { duration: 0.25, easing: [0.2, 0.8, 0.2, 1] },
    },

    eyebrow: "About",
    headline: "I build intelligent products that feel inevitable.",
    aboutParagraph:
      "A visionary technologist at the intersection of artificial intelligence and human‑centered design. I architect digital ecosystems that don't just function—they evolve. From AI‑driven automation to scalable cloud infrastructure and immersive UX, I turn complex challenges into elegant, measurable outcomes.",

    highlights: [
      "LLM apps + RAG pipelines",
      "Next.js / React / Node",
      "Design systems & accessibility",
      "Performance, security, scale",
    ],

    cards: [
      {
        number: "01",
        accentColor: "#ffffff",
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ),
        title: "AI Strategy & Implementation",
        description:
          "Custom LLM solutions, RAG, agents, and ML pipelines—designed for reliability, observability, and real-world ROI.",
        tags: ["LLM", "RAG", "Agents", "ML Pipelines"],
      },
      {
        number: "02",
        accentColor: "#ffffff",
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        ),
        title: "Full‑Stack Engineering",
        description:
          "Production-grade Next.js/React apps with modern backend architecture—MVP velocity with enterprise discipline.",
        tags: ["Next.js", "React", "Node.js", "TypeScript"],
      },
      {
        number: "03",
        accentColor: "#ffffff",
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        ),
        title: "UX/UI Design Systems",
        description:
          "Crisp interfaces backed by research, accessibility, and conversion-focused interaction—beauty that performs.",
        tags: ["Figma", "A11y", "Tokens", "Components"],
      },
      {
        number: "04",
        accentColor: "#ffffff",
        icon: (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
        title: "Performance & Optimization",
        description:
          "SSR/edge performance, caching strategy, bundle hygiene, and security hardening—fast, stable, scalable systems.",
        tags: ["Edge", "Caching", "Security", "CI/CD"],
      },
    ],

    ctas: [
      { label: "Let's build", href: "/contact", variant: "primary" },
      { label: "View work", href: "/projects", variant: "ghost" },
    ],

    imageSrc: profilePic,
    imageAlt: "Professional Developer Portrait",
  };

  return <AboutClient {...config} />;
}