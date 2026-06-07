# MASTER PROMPT — Next.js Reusable Button System (PairButton, SoloButton, LogoButton)

You are a Senior Frontend Architect, Senior UI Engineer, Motion Designer, Accessibility Expert, and Next.js Performance Specialist.

Your task is to build a production-grade reusable Button System for a premium black-and-white SaaS portfolio website.

---

# Global Requirements

## Technology Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* Motion One for hover, entry, and in-page animations
* GSAP only for scroll-triggered animations
* Fully SSR compatible
* CSR only where interaction is required
* Tree-shakeable architecture
* Reusable and scalable component design
* Zero unnecessary re-renders
* Proper memoization where required

---

# Design Philosophy

The entire design system follows:

* Pure Black (#000000)
* Pure White (#FFFFFF)
* Optional grayscale accents
* No gradients
* No colored shadows
* No neon effects
* Luxury SaaS aesthetic
* Apple × Linear × Vercel inspired minimalism

All buttons must support:

```tsx
variant="black"
variant="white"
```

where

black:

* black background
* white text
* white border

white:

* white background
* black text
* black border

No color values should be hardcoded inside animations.

Use design tokens.

---

# Component Architecture

Create:

components/ui/buttons/

```
PairButton.tsx
SoloButton.tsx
LogoButton.tsx

button.types.ts

button.utils.ts

index.ts
```

---

# Shared Props

Create a common interface:

```tsx
interface BaseButtonProps {
    variant?: "black" | "white";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}
```

All button types extend this.

---

# ============================================

# BUTTON TYPE 1

# PairButton

# ============================================

Concept:

A button designed to always appear with another button.

Examples:

```tsx
<PairButtonGroup>
    <PairButton>
        Start Project
    </PairButton>

    <PairButton>
        View Work
    </PairButton>
</PairButtonGroup>
```

---

# Visual Design

Original inspiration uses:

Left → Right fill animation

Replace it with:

CENTER → OUTWARD animation

Important:

Hover should originate exactly from the center.

Animation expands simultaneously toward:

* left edge
* right edge

creating a cinematic unfolding effect.

Not radial.

Not circular.

Not scale from left.

Instead:

```text
CENTER
←──────→
```

expansion.

---

# Hover Behavior

Initial State:

* transparent background
* visible border

Hover:

* center fill expands horizontally
* text color inverts
* border remains visible
* animation duration 450ms–550ms

Motion should feel:

* deliberate
* premium
* smooth

Never playful.

---

# Pair Layout Behavior

Build:

```tsx
<PairButtonGroup>
```

Features:

* responsive
* horizontal desktop
* stacked mobile

Gap configurable.

Props:

```tsx
gap?: number
direction?: "row" | "column"
```

---

# Accessibility

Support:

```tsx
aria-label
```

Keyboard navigation.

Visible focus ring.

---

# Motion One Usage

Use Motion One only for:

* hover fill
* text transitions
* micro interactions

Avoid GSAP.

---

# Public API

```tsx
<PairButton
    variant="black"
    size="lg"
>
    Start Project
</PairButton>
```

---

# ============================================

# BUTTON TYPE 2

# SoloButton

# ============================================

Concept:

Animated text transformation button.

Inspired by the supplied letter-box animation.

---

# Major Improvement

The original implementation assumes:

HELLO → WORLD

same character count.

This component must support:

ANY text length.

Examples:

```tsx
Explore → Projects

Book Call → Let's Talk

Launch → Start Building

Contact Us → Schedule Meeting
```

Character counts may differ.

---

# Required Architecture

Props:

```tsx
initialText
hoverText
```

Example:

```tsx
<SoloButton
    initialText="Explore"
    hoverText="Projects"
/>
```

---

# Animation Logic

Each character becomes an animated cell.

Generate cells dynamically.

Handle:

* shorter hover text
* longer hover text
* equal text

without visual glitches.

---

# Hover Animation

Initial text visible.

Hover:

Characters slide vertically.

Some from:

```text
bottom → center
```

Some from:

```text
top → center
```

to create rhythm.

Animation stagger:

20–40ms

Motion should feel:

* sophisticated
* editorial
* modern

not playful.

---

# Responsive Requirements

Button width automatically adapts.

No fixed width.

Text never clips.

---

# Motion One Usage

Use Motion One for:

* staggered character animation
* hover transitions

No GSAP.

---

# Accessibility

Screen readers should read:

only one text value.

Do not read both states.

---

# Public API

```tsx
<SoloButton
    variant="white"
    initialText="Explore"
    hoverText="Projects"
/>
```

---
# BUTTON TYPE 3

# LogoButton

Concept:

A premium CTA button featuring a hidden icon panel that expands on hover.

Inspired by the supplied expanding-panel interaction.

---

# Visual Structure

Initial State

Only text is visible.

The icon panel exists but remains collapsed.

The icon itself is completely hidden.

```text
[ Contact Us ]
```

---

# Hover State

A panel expands smoothly from the chosen direction.

Default:

```tsx
direction="left"
```

Panel expansion reveals the icon.

```text
[ → Contact Us ]
```

The icon fades and scales into view after expansion begins.

---

# Component API

```tsx
interface LogoButtonProps {
    label: string;
    icon: LucideIcon;
    variant?: "black" | "white";
    direction?: "left" | "right";
    expandMode?: "full" | "partial";
}
```

---

# Icon Requirements

Must support:

* Lucide React
* Heroicons
* React Icons

Never use hardcoded SVGs.

Icons must use:

```tsx
currentColor
```

for theme inheritance.

---

# Animation Sequence

Initial

* panel width = collapsed
* icon opacity = 0
* icon scale = 0.8

Hover

1. panel expands
2. text shifts slightly
3. icon fades in
4. icon scales to 1
5. final state settles

Animation duration:

450–600ms

Use premium easing.

No bounce.

No elastic effects.

No overshoot.

---

# Mobile Behavior

Always show:

Icon + Label

No hover dependency.

---

# Motion One Usage

Use Motion One for:

* panel expansion
* icon reveal
* text translation

No GSAP.

---

# SSR Requirements

Fully SSR safe.

No hydration mismatch.

No client-only rendering hacks.

No layout shift.

---

# Accessibility

Support:

* aria-label
* keyboard navigation
* focus-visible states
* disabled state

Screen readers should correctly read button label.

# Motion One Usage

Use Motion One.

No GSAP.

---

# SSR Optimization

All components must:

* work with SSR
* hydrate cleanly
* avoid window access during render
* avoid hydration mismatch
* avoid layout shift

---

# Performance Requirements

Implement:

```tsx
React.memo
```

where beneficial.

Use:

```tsx
useCallback
useMemo
```

only when necessary.

No premature optimization.

---

# Deliverables

Generate:

1. Complete component architecture
2. TypeScript types
3. Tailwind implementation
4. Motion One implementation
5. Accessibility implementation
6. Responsive behavior
7. Usage examples
8. Folder structure
9. Documentation comments
10. Performance explanation
11. SSR/CSR strategy explanation
12. Theme customization guide
13. Extension guide for future button types

The final output should be production-ready and suitable for a premium dual-tone SaaS portfolio design system.
