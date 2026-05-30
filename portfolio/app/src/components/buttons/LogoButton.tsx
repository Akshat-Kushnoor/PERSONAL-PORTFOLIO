"use client";

import React, { useRef, useEffect } from "react";
import { animate } from "motion";
import { LogoButtonProps } from "./button.types";
import { cn, getSizeClasses, getVariantClasses } from "./button.utils";

/**
 * LogoButton component with a hidden icon panel that expands on hover.
 * Automatically handles mobile states by keeping the panel expanded.
 */
export const LogoButton: React.FC<LogoButtonProps> = ({
  variant = "black",
  size = "md",
  label,
  icon: Icon,
  direction = "left",
  expandMode = "full",
  className,
  ...props
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const isLeft = direction === "left";

  const handleMouseEnter = () => {
    // Only animate on non-mobile (assuming hover exists)
    if (window.matchMedia("(hover: hover)").matches) {
      if (panelRef.current) {
        animate(
          panelRef.current,
          { width: "auto", opacity: 1 },
          { duration: 0.5, easing: [0.22, 1, 0.36, 1] }
        );
      }
      if (iconRef.current) {
        animate(
          iconRef.current,
          { opacity: 1, scale: 1 },
          { duration: 0.4, delay: 0.1, easing: [0.22, 1, 0.36, 1] }
        );
      }
      if (textRef.current) {
        animate(
          textRef.current,
          { x: isLeft ? 4 : -4 },
          { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
        );
      }
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      if (panelRef.current) {
        animate(
          panelRef.current,
          { width: "0px", opacity: 0 },
          { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
        );
      }
      if (iconRef.current) {
        animate(
          iconRef.current,
          { opacity: 0, scale: 0.8 },
          { duration: 0.3 }
        );
      }
      if (textRef.current) {
        animate(
          textRef.current,
          { x: 0 },
          { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
        );
      }
    }
  };

  return (
    <button
      className={cn(
        "group relative flex items-center overflow-hidden border font-medium uppercase tracking-tight transition-colors",
        getVariantClasses(variant),
        getSizeClasses(size),
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className={cn("flex items-center", isLeft ? "flex-row" : "flex-row-reverse")}>
        {/* Icon Panel */}
        <div
          ref={panelRef}
          className={cn(
            "flex items-center justify-center overflow-hidden transition-all duration-500",
            // Mobile: Always visible, Desktop: Hidden initially
            "w-auto opacity-100 lg:w-0 lg:opacity-0"
          )}
        >
          <div
            ref={iconRef}
            className="flex items-center justify-center transition-all lg:opacity-0 lg:scale-90"
          >
            <Icon size={size === "lg" ? 20 : size === "sm" ? 14 : 16} className="mx-2" />
          </div>
        </div>

        {/* Text Label */}
        <span
          ref={textRef}
          className="relative block"
        >
          {label}
        </span>
      </div>
    </button>
  );
};
