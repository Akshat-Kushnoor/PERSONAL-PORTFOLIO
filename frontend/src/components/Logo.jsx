import React from "react";

const Logo = () => {
  const letterA = [
    { x: 2, y: 3, d: 0.2 },
    { x: 1, y: 3, d: 0.25 },
    { x: 3, y: 3, d: 0.25 },
    { x: 1, y: 2, d: 0.3 },
    { x: 3, y: 2, d: 0.3 },
    { x: 2, y: 1, d: 0.35 },
    { x: 1, y: 4, d: 0.3 },
    { x: 3, y: 4, d: 0.3 },
    { x: 1, y: 5, d: 0.4 },
    { x: 3, y: 5, d: 0.4 },
  ];

  const letterK = [
    { x: 2, y: 3, d: 0.5 },
    { x: 1, y: 3, d: 0.55 },
    { x: 1, y: 2, d: 0.6 },
    { x: 1, y: 4, d: 0.6 },
    { x: 3, y: 2, d: 0.65 },
    { x: 3, y: 4, d: 0.65 },
    { x: 1, y: 1, d: 0.7 },
    { x: 1, y: 5, d: 0.7 },
    { x: 3, y: 5, d: 0.75 },
  ];

  const styles = `
  :root {
    --bg: #080808;
    --cyan: #00ffff;
    --dim: #008f8f;
    --white: #ffffff;

    --pixel: clamp(16px, 3vw, 28px);
    --gap: clamp(2px, 0.5vw, 4px);

    --ring-size: clamp(220px, 40vw, 340px);
    --logo-size: clamp(200px, 45vw, 320px);
  }

  * { box-sizing: border-box; }

  body { margin: 0; }

  .ak-wrapper {
    min-height: 100svh;
    background: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: clamp(40px, 8vw, 120px); /* ✅ CRITICAL */
    position: relative;
  }


  /* Scanlines */
  .ak-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0.15),
      rgba(0,0,0,0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  .logo-shell {
    width: var(--logo-size);
    height: var(--logo-size);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: calc(var(--pixel) * 1.2);
    background: radial-gradient(circle, rgba(0,255,255,0.08), #000 70%);
    border: 2px solid rgba(0,255,255,0.3);
    box-shadow:
      0 0 30px rgba(0,255,255,0.25),
      inset 0 0 40px rgba(0,255,255,0.08);

    animation: signalLock 1.4s cubic-bezier(.2,.8,.2,1) forwards;
    position: relative;
  }

  /* New Entrance Animation */
  @keyframes signalLock {
    0% {
      opacity: 0;
      filter: blur(30px) brightness(0);
      transform: translateY(30px);
    }
    40% {
      opacity: 1;
      filter: blur(8px) brightness(2);
    }
    70% {
      filter: blur(2px) brightness(1.2);
    }
    100% {
      opacity: 1;
      filter: none;
      transform: none;
    }
  }

  .logo-shell::before {
    content: "";
    width: var(--ring-size);
    height: var(--ring-size);
    border-radius: 50%;
    border: 1px dashed rgba(0,255,255,0.3);
    position: absolute;
    animation: spin 20s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .char {
    display: grid;
    grid-template-columns: repeat(3, var(--pixel));
    grid-template-rows: repeat(5, var(--pixel));
    gap: var(--gap);
  }

  .pixel {
    background: var(--cyan);
    border-radius: 2px;
    opacity: 0;
    animation:
      pixelDrop 0.5s ease-out forwards,
      pulse 2.5s ease-in-out infinite;
    box-shadow:
      0 0 10px var(--cyan),
      0 0 20px var(--cyan);
  }

  @keyframes pixelDrop {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.4);
      filter: blur(8px);
    }
    100% {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  @keyframes pulse {
    50% {
      background: var(--dim);
      box-shadow:
        0 0 5px var(--dim),
        0 0 10px var(--dim);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
  }
  `;

  const renderPixel = (p, i) => (
    <div
      key={i}
      className="pixel"
      style={{
        gridColumn: p.x,
        gridRow: p.y,
        animationDelay: `${p.d}s, ${p.d + 1.5}s`,
      }}
    />
  );

  return (
    <div className="ak-wrapper">
      <style>{styles}</style>

      <div className="logo-shell">
        <div className="char">{letterA.map(renderPixel)}</div>
        <div className="char">{letterK.map(renderPixel)}</div>
      </div>
    </div>
  );
};

export default Logo;
