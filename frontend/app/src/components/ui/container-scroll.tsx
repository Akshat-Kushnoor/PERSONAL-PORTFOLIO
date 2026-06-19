"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContainerScrollProps {
  title?: ReactNode;
  children: ReactNode;
  perspective?: number;
  rotateStrength?: number;
  scaleStrength?: number;
  className?: string;
}

export const ContainerScroll = ({
  title,
  children,
  perspective = 1000,
  rotateStrength = 20,
  scaleStrength = 0.8,
  className = "",
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;

    if (!container || !card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "top 20%",
        scrub: 1,
      },
    });

    tl.fromTo(
      card,
      {
        rotateX: rotateStrength,
        scale: scaleStrength,
        opacity: 0,
        y: 150,
      },
      {
        rotateX: 0,
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    );

    return () => {
      if (ScrollTrigger.getById("scroll-trigger")) {
        ScrollTrigger.getById("scroll-trigger")?.kill();
      }
    };
  }, [rotateStrength, scaleStrength]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center py-20 px-4 ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {title && (
        <div className="mb-10 text-center w-full max-w-7xl mx-auto">
          {title}
        </div>
      )}
      <div
        ref={cardRef}
        className="w-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};
