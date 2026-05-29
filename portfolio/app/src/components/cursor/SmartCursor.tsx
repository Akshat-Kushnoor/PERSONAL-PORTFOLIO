"use client";

import gsap from "gsap";
import { animate } from "motion";
import React, { useEffect, useRef, useState } from "react";
import { cursorStore } from "./cursor-store";
import { useCursor } from "./useCursor";

interface SmartCursorProps {
  hoverScale?: number;
  scrollMorphIntensity?: number;
  enableScrollMorph?: boolean;
}

const SmartCursor: React.FC<SmartCursorProps> = ({
  hoverScale: defaultHoverScale = 2,
  scrollMorphIntensity = 1.5,
  enableScrollMorph = true,
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize mouse & scroll listeners
  useCursor();
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted || !cursorRef.current || !innerRef.current || !textRef.current) return;

    // Use quickTo for high performance 60fps tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3.out" });

    // Hide cursor initially until we get real mouse coordinates
    gsap.set(cursorRef.current, { opacity: 0 });

    let lastVisualState = "";

    const unsubscribe = cursorStore.subscribe((state) => {
      const { x, y, isHovering, isClicked, isHidden, hoverText, clickText, hoverScale, scrollVelocity } = state;

      // Show cursor as soon as we detect mouse movement
      if (cursorRef.current && (x !== 0 || y !== 0) && cursorRef.current.style.opacity === "0") {
        gsap.set(cursorRef.current, { opacity: 1 });
      }

      // Smooth Position tracking
      xTo(x);
      yTo(y);

      // Serialize visual state to prevent redundant animate() calls
      const currentVisualState = JSON.stringify({ 
        isHovering, 
        isClicked, 
        isHidden,
        hoverText, 
        clickText, 
        vel: scrollVelocity > 2 ? Math.round(scrollVelocity / 5) : 0 
      });

      if (currentVisualState !== lastVisualState) {
        // Morphing Logic
        const scale = isClicked ? 0.8 : (isHovering ? (hoverScale || defaultHoverScale) : 1);
        const opacity = isHidden ? 0 : (isHovering ? 1 : 0.9);
        
        let width = 20;
        let height = 20;
        let borderRadius = "100%";

        if (enableScrollMorph && scrollVelocity > 2) {
          const stretch = Math.min(scrollVelocity * scrollMorphIntensity, 20);
          height = 10 + stretch;
          width = 10 - Math.min(stretch * 0.2, 10);
          borderRadius = "40px";
        }

        // Using white as base for mix-blend-mode: difference
        // White cursor on black background = White
        // White cursor on white background = Black (Inverted)
        animate(innerRef.current!, {
          width: `${ width }px`,
          height: `${height}px`,
          scale: scale,
          opacity: opacity,
          borderRadius: borderRadius,
        } as any, {
          duration: 0.15,
          ease: "easeOut",
        });

        // Text Logic
        const displayTarget = isClicked ? (clickText || hoverText) : hoverText;
        if (displayTarget) {
          textRef.current!.innerText = displayTarget;
          animate(textRef.current!, { opacity: 1, scale: 1 }, { duration: 0.2 });
        } else {
          animate(textRef.current!, { opacity: 0, scale: 0.5 }, { duration: 0.2 });
        }

        lastVisualState = currentVisualState;
      }
    });

    return () => unsubscribe();
  }, [mounted, defaultHoverScale, enableScrollMorph, scrollMorphIntensity]);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      className="smart-cursor-container fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ mixBlendMode: "difference" }}
    >
      <div
        ref={innerRef}
        className="relative flex items-center justify-center overflow-hidden bg-white"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "100%",
        }}
      >
        <span
          ref={textRef}
          className="text-[10px] font-bold uppercase tracking-widest opacity-0 whitespace-nowrap px-4 text-black"
        />
      </div>
    </div>
  );
};

export default SmartCursor;
