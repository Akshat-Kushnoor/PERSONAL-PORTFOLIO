# Smart Cursor Documentation

The `SmartCursor` is a high-performance, reactive custom cursor component built with GSAP and Motion. It supports magnetic-like tracking, scroll-based morphing, and declarative interactions via data attributes.

## Usage

To use the Smart Cursor, simply include the `<SmartCursor />` component at the root of your application (e.g., in `layout.tsx` or `page.tsx`).

```tsx
import SmartCursor from "./src/components/cursor/SmartCursor";

export default function Page() {
  return (
    <>
      <SmartCursor />
      {/* Your content */}
    </>
  );
}
```

## Declarative Interactions

You can control the cursor's behavior by adding specific data attributes to any HTML element (buttons, links, divs, etc.).

### 1. Displaying Text on Hover
To display a label inside the cursor when hovering over an element, use `data-cursor-text`.

```html
<button data-cursor-text="View Project">
  Hover over me
</button>
```

### 2. Displaying Text on Click
To change the text when the user clicks/holds the mouse down, use `data-cursor-click`.

```html
<button data-cursor-text="Hold me" data-cursor-click="Boom!">
  Click and hold
</button>
```

### 3. Hiding the Cursor
To make the custom cursor disappear completely when hovering over a specific element, use the `data-cursor-hide` attribute.

```html
<button data-cursor-hide>
  The custom cursor will vanish here
</button>
```

### 4. Customizing Hover Scale
By default, the cursor scales up on hover. You can customize this scale factor using `data-cursor-scale`.

```html
<a href="#" data-cursor-text="Visit" data-cursor-scale="3">
  Large Hover Scale
</a>
```

## Programmatic Control

If you need to control the cursor state via JavaScript, you can import and use the `cursorStore`.

```tsx
import { cursorStore } from "./src/components/cursor/cursor-store";

// To hide the cursor
cursorStore.setState({ isHidden: true });

// To show text
cursorStore.setState({ hoverText: "Custom Text", isHovering: true });

// To reset
cursorStore.setState({ isHidden: false, hoverText: null, isHovering: false });
```

## Summary of Attributes

| Attribute | Description | Value |
|-----------|-------------|-------|
| `data-cursor-text` | Text to display inside the cursor on hover. | `string` |
| `data-cursor-click` | Text to display inside the cursor while clicking. | `string` |
| `data-cursor-hide` | Hides the custom cursor completely on hover. | (None) |
| `data-cursor-scale` | Custom scale multiplier for the hover state. | `number` (default: 2) |
| `data-cursor-hover` | Generic hover state (displays "Open" by default if no text provided). | (None) |
