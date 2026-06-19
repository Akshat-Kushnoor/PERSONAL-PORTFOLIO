# Premium Button System Documentation

A production-grade reusable button system for a premium black-and-white SaaS portfolio website.

## Component Architecture

The button system is organized into a modular structure under `portfolio/app/src/components/ui/buttons/`:

- `PairButton.tsx`: Buttons designed for paired use (e.g., Primary & Secondary CTA).
- `SoloButton.tsx`: Text-transforming buttons with character-level animation.
- `LogoButton.tsx`: Buttons with expanding icon panels.
- `button.types.ts`: Shared TypeScript interfaces.
- `button.utils.ts`: Internal utilities for class merging and theme management.
- `index.ts`: Public API entry point.

## Technology Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Motion One**: Used for all interaction-based animations (hover, transitions).
- **GSAP**: Reserved for scroll-triggered animations only (not used in these components to maintain lightweight interactions).

## Implementation Details

### 1. Theme Strategy
The system uses a strict pure black (#000000) and pure white (#FFFFFF) palette. 
- `variant="black"`: Black background, white text, white border.
- `variant="white"`: White background, black text, black border.

No hardcoded hex values are used within animations; instead, we rely on CSS classes and Motion One's color interpolation where necessary.

### 2. Motion One Animations
Animations are designed to feel "deliberate, premium, and smooth."
- **PairButton**: Features a `CENTER -> OUTWARD` horizontal expansion.
- **SoloButton**: Implements a staggered vertical character slide (letter-box effect).
- **LogoButton**: Expands a panel to reveal an icon with fading and scaling effects.

### 3. Performance & SSR
- **Fully SSR Compatible**: Components use `"use client"` where necessary for interactions but are structured to avoid layout shifts and hydration mismatches.
- **Memoization**: Shared styles and variant logic are decoupled from render cycles.
- **Tree-shakeable**: Exported as individual components.

## Accessibility

- **ARIA Support**: All buttons support `aria-label` and other standard HTML attributes.
- **Screen Readers**: `SoloButton` uses a `sr-only` span to ensure screen readers read the full text correctly, avoiding the fragmented characters used for animation.
- **Keyboard Navigation**: Standard focus rings and keyboard interaction support.

## Usage Examples

### PairButton
```tsx
import { PairButton, PairButtonGroup } from "@/components/ui/buttons";

<PairButtonGroup gap={4}>
  <PairButton variant="black">Start Project</PairButton>
  <PairButton variant="white">View Work</PairButton>
</PairButtonGroup>
```

### SoloButton
```tsx
import { SoloButton } from "@/components/ui/buttons";

<SoloButton 
  initialText="Explore" 
  hoverText="Projects" 
  variant="white" 
/>
```

### LogoButton
```tsx
import { LogoButton } from "@/components/ui/buttons";
import { ArrowRight } from "lucide-react";

<LogoButton 
  label="Contact Us" 
  icon={ArrowRight} 
  variant="black" 
  direction="left" 
/>
```

## Responsive Behavior

- **PairButtonGroup**: Supports `direction="row"` (default) which can be toggled to `"column"` for mobile layouts.
- **LogoButton**: On mobile (devices without hover support), the icon panel is always expanded to ensure visual consistency and affordance.
- **SoloButton**: Automatically adapts its width based on the longest text provided (`initialText` or `hoverText`).

## Extension Guide

To add a new button type:
1. Define the props in `button.types.ts` extending `BaseButtonProps`.
2. Create a new component file.
3. Use `cn()` and `getSizeClasses()` from `button.utils.ts` for consistency.
4. Export from `index.ts`.
