"use client";

import { animate } from "motion";
import React, { useRef } from "react";
import { PairButtonGroupProps, PairButtonProps } from "./button.types";
import { cn, getSizeClasses } from "./button.utils";


export const PairButton: React.FC<PairButtonProps> = ({
  variant = "black",
  size = "md",
  className,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const isBlack = variant === "black";

  // Base colors
  const borderColor = isBlack ? "border-white" : "border-black";
  const initialBgColor = isBlack ? "bg-black" : "bg-white";
  const initialTextColor = isBlack ? "text-white" : "text-black";
  const fillColor = isBlack ? "bg-white" : "bg-black";

  const handleMouseEnter = () => {
    if (fillRef.current) {
      animate(
        fillRef.current,
        { scaleX: 1, opacity: 1 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      );
    }
    if (buttonRef.current) {
      animate(
        buttonRef.current,
        { borderColor: isBlack ? "#000000" : "#ffffff" },
        { duration: 0.3 }
      );
    }
    if (textRef.current) {
      animate(
        textRef.current,
        { color: isBlack ? "#000000" : "#ffffff" },
        { duration: 0.3 }
      );
    }
  };

  const handleMouseLeave = () => {
    if (fillRef.current) {
      animate(
        fillRef.current,
        { scaleX: 0, opacity: 0 },
        { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      );
    }
    if (buttonRef.current) {
      animate(
        buttonRef.current,
        { borderColor: isBlack ? "#ffffff" : "#000000" },
        { duration: 0.3 }
      );
    }
    if (textRef.current) {
      animate(
        textRef.current,
        { color: isBlack ? "#ffffff" : "#000000" },
        { duration: 0.3 }
      );
    }
  };

  return (
    <button
      ref={buttonRef}
      data-cursor-hide="true"
      className={cn(
        "relative overflow-hidden border transition-colors group",
        borderColor,
        initialBgColor,
        getSizeClasses(size),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Center Fill Layer */}
      <div
        ref={fillRef}
        className={cn(
          "absolute inset-0 pointer-events-none origin-center",
          fillColor
        )}
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />
      
      {/* Content */}
      <span
        ref={textRef}
        className={cn("relative z-10 font-medium uppercase tracking-tight", initialTextColor)}
      >
        {children}
      </span>
    </button>
  );
};

/**
 * Grouping component for PairButtons to manage layout and spacing.
 */
export const PairButtonGroup: React.FC<PairButtonGroupProps> = ({
  children,
  gap = 4,
  direction = "row",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        `gap-${gap}`,
        className
      )}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {children}
    </div>
  );
};
