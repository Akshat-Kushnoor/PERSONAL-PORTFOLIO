"use client";

import { useEffect, useRef } from "react";
import { cursorStore } from "./cursor-store";

export const useCursor = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => cursorStore.setState({ isClicked: true });
    const onMouseUp = () => cursorStore.setState({ isClicked: false });

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest("[data-cursor-hover], button, a, [data-cursor-text], [data-cursor-hide]");
      if (hoverable) {
        const text = hoverable.getAttribute("data-cursor-text") || 
                     (hoverable.hasAttribute("data-cursor-hover") ? "Open" : null);
        const clickText = hoverable.getAttribute("data-cursor-click");
        const scale = parseFloat(hoverable.getAttribute("data-cursor-scale") || "2");
        const isHidden = hoverable.hasAttribute("data-cursor-hide");

        cursorStore.setState({
          isHovering: true,
          hoverText: text,
          clickText: clickText,
          hoverScale: scale,
          isHidden: isHidden,
        });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest("[data-cursor-hover], button, a, [data-cursor-text], [data-cursor-hide]");
      if (hoverable) {
        cursorStore.setState({
          isHovering: false,
          hoverText: null,
          clickText: null,
          hoverScale: 1,
          isHidden: false,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    // Scroll Velocity
    let lastScrollY = window.scrollY;
    const ticker = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      cursorStore.setState({
        x: mousePos.current.x,
        y: mousePos.current.y,
        scrollVelocity: velocity,
      });

      requestRef.current = requestAnimationFrame(ticker);
    };

    requestRef.current = requestAnimationFrame(ticker);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return null; // The hook now only manages listeners and store
};
