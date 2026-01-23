import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovered(
        el?.closest("a, button, [data-cursor]") ? true : false
      );
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.8;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.8;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(
            ${pos.current.x}px,
            ${pos.current.y}px,
            0
          )
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovered ? 48 : 32,
        height: hovered ? 48 : 32,
        borderRadius: "50%",
        backgroundColor: "white",
        pointerEvents: "none",
        mixBlendMode: "difference",
        transform: "translate(-100px, -100px)",
        transition: "width 0.2s ease, height 0.2s ease",
        zIndex: 999999,
      }}
    />
  );
}
