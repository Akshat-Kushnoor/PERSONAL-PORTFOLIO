import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const ease = 0.5;

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    const tick = () => {
      setPos((prev) => {
        const dx = mouse.current.x - prev.x;
        const dy = mouse.current.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const outer = 48; 
  const offset = outer / 2;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        transform: `translate(${pos.x - offset}px, ${pos.y - offset}px)`,
        willChange: "transform, opacity",
      }}
    >


      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full shadow-md opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, rgb(13, 66, 181) 0%, rgb(70, 149, 180)60%)",
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
