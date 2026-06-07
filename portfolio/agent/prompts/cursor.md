# MASTER PROMPT — Advanced Dual Tone Smart Cursor Component (Next.js + Motion One + GSAP)

Build a production-grade, reusable, SSR-safe custom cursor component for a modern dual-tone (black & white) SaaS portfolio website using Next.js App Router.

The component must completely hide the default OS cursor and replace it with a highly interactive smart cursor system.

---

# Tech Stack Rules

Mandatory stack:

* Next.js App Router
* TypeScript
* TailwindCSS
* Motion One → for in-page animations and micro interactions
* GSAP → for scroll-based animations and transitions
* Fully SSR + CSR optimized
* Tree-shakable architecture
* No unnecessary re-renders
* No layout thrashing
* RequestAnimationFrame optimized mouse tracking
* Lazy load GSAP plugins if needed

---

# Cursor Core Behaviour

Create a floating cursor component that follows the mouse smoothly.

Default state:

* Perfect circular cursor
* Smooth interpolation movement
* Magnetic softness
* Mix-blend-mode based contrast detection
* Adaptive inversion system

The cursor must:

* Automatically detect background brightness
* Turn WHITE on dark backgrounds
* Turn BLACK on light backgrounds
* Transition smoothly between states
* Detection must work dynamically while moving across sections

Transition speed:

* 150ms ease
* buttery smooth

---

# Cursor States

## 1. Idle State

Shape:

* Circle

Behavior:

* Small floating circle
* Smooth scale animation
* Slight lag effect
* Soft opacity pulse

---

## 2. Hover State

When hovering elements:

* buttons
* links
* cards
* images
* CTA sections

Cursor expands.

Props supported:

```tsx
hoverText?: string
hoverScale?: number
hoverVariant?: "invert" | "solid" | "ghost"
```

Behavior:

* Display hoverText inside cursor
* Text color auto adapts
* Cursor background auto adapts
* Cursor scales smoothly
* Add slight magnetic attraction

Example:
White background:

* Cursor becomes black
* Hover text becomes white

Black background:

* Cursor becomes white
* Hover text becomes black

---

## 3. Click State

On mouse down:

* Cursor rapidly expands
* Background flashes/inverts briefly
* Show click text

Props:

```tsx
clickText?: string
clickFlash?: boolean
```

Behavior:

* White flash pulse effect
* 150ms easing
* Ripple animation
* Text morph transition
* Return smoothly to previous state

Example:
If background is black:

* Flash becomes white
* Text becomes black

If background is white:

* Flash becomes black
* Text becomes white

---

# Scroll State (NEW)

When user scrolls:

* Cursor morphs from circle → cylindrical pill shape

Requirements:

* Width stretches horizontally
* Height slightly compresses
* Looks like a modern kinetic cylindrical object
* Motion blur illusion
* Velocity-based scaling

Behavior:

* Fast scroll = longer cylinder
* Slow scroll = smaller cylinder
* Stop scrolling = smoothly return to circle

Animation:

* GSAP scroll velocity detection
* Spring easing
* No jitter

Props:

```tsx
enableScrollMorph?: boolean
scrollMorphIntensity?: number
```

Cylinder style:

* Rounded full edges
* Liquid-like morph
* Smooth kinetic motion

---

# Smart Contrast Detection System

Implement automatic foreground/background detection.

Requirements:

* Detect nearest parent background color
* Support:

  * solid colors
  * gradients
  * images
  * videos
* Use luminance calculation
* Fallback to mix-blend-mode:difference

Need utility:

```ts
getContrastColor()
```

Must avoid:

* flickering
* hydration mismatch
* expensive DOM reads

---

# Animation System

Use Motion One for:

* scale transitions
* opacity
* text fade
* hover interpolation
* click pulse
* idle breathing

Use GSAP for:

* scroll velocity
* cylindrical morphing
* advanced smoothing
* kinetic interpolation

Animations must:

* run at 60fps
* use transform only
* avoid top/left animations
* use will-change properly

---

# SSR + CSR Optimization Rules

Must be fully compatible with:

* Next.js App Router
* React Server Components

Requirements:

* No hydration mismatch
* No window access during SSR
* Use dynamic imports where needed
* Use "use client" only where necessary
* Mouse tracking initialized only after mount

Performance:

* requestAnimationFrame loop
* passive listeners
* cleanup all listeners
* memoized handlers
* minimal React state usage

---

# Component API

Build this API:

```tsx
<SmartCursor
  hoverText="Open"
  clickText="Clicked"
  hoverScale={2}
  scrollMorphIntensity={1.5}
  enableScrollMorph={true}
/>
```

Also create:

```tsx
data-cursor-hover
data-cursor-text="View"
data-cursor-click="Opening"
```

Cursor automatically detects these attributes.

---

# Architecture

Create:

```bash
/components/cursor/
  SmartCursor.tsx
  cursor-store.ts
  cursor-utils.ts
  useCursor.ts
  useContrastDetection.ts
```

---

# Styling Direction

Design language:

* Minimal
* Premium SaaS
* Apple-like smoothness
* High-end monochrome aesthetic
* Black/white only
* No random colors
* Subtle glow allowed

Cursor should feel:

* cinematic
* tactile
* liquid
* intelligent

---

# Accessibility

Requirements:

* Disable on touch devices
* Respect prefers-reduced-motion
* Keyboard accessibility fallback
* Do not block pointer events

---

# Deliverables

Generate:

1. Full component code
2. Hooks
3. Utility functions
4. Tailwind styles
5. Motion One animations
6. GSAP scroll morph logic
7. Example usage page
8. Optimized architecture
9. SSR-safe implementation
10. Reusable prop system

Code quality:

* senior-level architecture
* production-ready
* scalable
* modular
* heavily optimized
* clean TypeScript typings

Avoid:

* Framer Motion
* unnecessary dependencies
* heavy state management
* unoptimized listeners
* DOM-intensive calculations
