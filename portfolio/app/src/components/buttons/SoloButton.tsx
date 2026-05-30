"use client";

import React, { useRef, useEffect } from "react";
import { animate, stagger } from "motion";
import { SoloButtonProps } from "./button.types";
import { cn, getSizeClasses, getVariantClasses } from "./button.utils";

/**
 * SoloButton component featuring a staggered vertical character slide animation.
 * Supports dynamic text lengths and handles transitions between different text states.
 */
export const SoloButton: React.FC<SoloButtonProps> = ({
  variant = "white",
  size = "md",
  initialText,
  hoverText,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  const initialChars = initialText.split("");
  const hoverChars = hoverText.split("");
  const maxLength = Math.max(initialChars.length, hoverChars.length);

  const handleMouseEnter = () => {
    cellsRef.current.forEach((cell, i) => {
      if (!cell) return;
      const initialChar = cell.querySelector(".initial-char");
      const hoverChar = cell.querySelector(".hover-char");
      
      const direction = i % 2 === 0 ? 1 : -1; // Rhythm: alternate top/bottom

      if (initialChar) {
        animate(
          initialChar,
          { y: direction * -100 + "%", opacity: 0 },
          { duration: 0.4, delay: i * 0.03, easing: [0.22, 1, 0.36, 1] }
        );
      }
      if (hoverChar) {
        animate(
          hoverChar,
          { y: "0%", opacity: 1 },
          { duration: 0.4, delay: i * 0.03, easing: [0.22, 1, 0.36, 1] }
        );
      }
    });
  };

  const handleMouseLeave = () => {
    cellsRef.current.forEach((cell, i) => {
      if (!cell) return;
      const initialChar = cell.querySelector(".initial-char");
      const hoverChar = cell.querySelector(".hover-char");
      
      const direction = i % 2 === 0 ? 1 : -1;

      if (initialChar) {
        animate(
          initialChar,
          { y: "0%", opacity: 1 },
          { duration: 0.4, delay: i * 0.03, easing: [0.22, 1, 0.36, 1] }
        );
      }
      if (hoverChar) {
        animate(
          hoverChar,
          { y: direction * 100 + "%", opacity: 0 },
          { duration: 0.4, delay: i * 0.03, easing: [0.22, 1, 0.36, 1] }
        );
      }
    });
  };

  return (
    <button
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden border font-medium uppercase tracking-tight",
        getVariantClasses(variant),
        getSizeClasses(size),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={initialText}
      {...props}
    >
      <div className="flex">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { cellsRef.current[i] = el; }}
            className="relative flex flex-col items-center overflow-hidden h-[1.2em]"
            style={{ minWidth: "0.6em" }} // Ensuring some space for empty chars
          >
            {/* Initial Char */}
            <span className="initial-char inline-block">
              {initialChars[i] || "\u00A0"}
            </span>
            
            {/* Hover Char (Hidden initially) */}
            <span 
              className="hover-char absolute inset-0 inline-block opacity-0"
              style={{ transform: `translateY(${(i % 2 === 0 ? 1 : -1) * 100}%)`, color: "inherit" }}
            >
              {hoverChars[i] || "\u00A0"}
            </span>
          </div>
        ))}
      </div>
      
      {/* Screen reader only text */}
      <span className="sr-only">{initialText}</span>
    </button>
  );
};
