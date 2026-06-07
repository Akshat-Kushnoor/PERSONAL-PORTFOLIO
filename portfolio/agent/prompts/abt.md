You are a senior Next.js developer building a dual‑tone (black/white) portfolio & SaaS website.  
Generate an **About Page** component with the following specifications.

---

## 🧱 Layout & Responsive Behavior
- Desktop: 2‑column CSS Grid.  
  - **Left column (Grid 2):** Paragraph about the person/company + a series of professional "highlight cards".  
  - **Right column (Grid 1):** An image with a live, fluctuating water‑wave border (single‑line, animated SVG filter).  
- Mobile: Both columns stack vertically in natural order (text first, then image).

---

## 🌊 Grid 1 – Water‑Wave Image Border
- **Visual effect:** The border looks like a single continuous line undulating like water waves.  
- **Technique:** Use an **SVG filter** (`<feTurbulence>` + `<feDisplacementMap>`) applied to a wrapper `div` that has a solid border.  
- **Animation:** Animate the `baseFrequency` attribute of the `<feTurbulence>` filter with **Motion One** to make the waves fluctuate organically.  
- **Implementation:**  
  - The filter is defined in a hidden `<svg>` inside the same component.  
  - The image is absolutely positioned inside the wrapper, clipped to the wrapper’s border‑box, so the border sits on top.  
  - The border should remain crisp and single‑line, e.g. `border: 2px solid black`.  
- **Customization points:** Wave amplitude (`scale` attribute), speed (`baseFrequency` animation range), border color/thickness.

---

## 📄 Grid 2 – Left Content (Improvise for Professional Presence)
- **Staggered entrance:** Paragraph and cards fade‑up with a staggered delay using **GSAP ScrollTrigger** (only on the client).  
- **Typography:** Clean, high‑contrast black on white (or white on black depending on theme). Use a geometric sans‑serif.  
- **Cards:** Each card represents a key highlight (e.g., years of experience, projects completed, tech stack).  
  - Design: subtle backdrop blur (optional), thin border, minimal shadow, hover state with slight scale or border‑color shift (powered by Motion One’s `whileHover`).  
  - Icons: simple line‑icons or SVG placeholders.  
- **Structure:**  
  - A heading (e.g., "About Me" / "Our Story")  
  - A short, punchy paragraph  
  - 3‑4 cards displayed in a responsive flex/grid that wraps neatly.

---

## ⚙️ Technical Rules (Strict)
1. **Animation stack:**  
   - In‑page transitions/hovers → **Motion One** (import from `motion`).  
   - Scroll‑triggered reveals → **GSAP + ScrollTrigger** (register plugin, use `useGSAP` hook in `'use client'`).  
2. **Rendering optimization:**  
   - Static content (text, card data) is fetched in a **Server Component** and passed as props to a **Client Component**.  
   - All animations live in the Client Component (`"use client"`).  
   - Server Component remains `async` (if fetching data) or simple functional, no client hooks.  
3. **Performance:**  
   - Animations use only `transform` and `opacity` where possible.  
   - GSAP’s `ScrollTrigger` uses `scrub: false` and is properly killed on unmount via `useGSAP` cleanup.  
   - Motion One hover animations use `whileHover` which performs GPU‑accelerated transforms.  
   - Image is lazy‑loaded (`loading="lazy"`) and served with `next/image` (if possible) or `<img>` with explicit dimensions to prevent layout shift.  
4. **Dual‑tone theme:** All colors must be shades of black and white. No grays other than `#f5f5f5` for subtle card backgrounds if absolutely necessary.  
5. **Code style:** TypeScript, functional components, clean separation of concerns, all strings customizable through a central config object or props.

---

## 🎛️ Customizable Parameters (Provide these as props or a config)
- `aboutParagraph: string`
- `cards: Array<{ icon: React.ReactNode; title: string; description: string }>`  
- `imageSrc: string`  
- `imageAlt: string`  
- `waveAmplitude: number` (default 10)  
- `waveSpeedRange: [number, number]` (e.g., `[0.01, 0.03]` for `baseFrequency` animation)  
- `borderColor: string` (default `'#000'`)  
- `borderWidth: string` (default `'2px'`)  
- `gridGap: string`  
- `sectionId: string` (for ScrollTrigger anchors)

---

## rules for codebase & build
-> use prebuilt buttons only use @button-doecs for referance .
=> the buld must limited to @page folder with only about.tsx file only .