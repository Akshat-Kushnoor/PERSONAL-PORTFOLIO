# React Hooks — When to Use Them, Why They Exist, and Production Use Cases

Hooks solve **specific React problems**:

* preserving state,
* handling side effects,
* optimizing rendering,
* managing references,
* sharing logic,
* controlling performance,
* coordinating UI behavior.

The biggest mistake developers make is:

> “Using hooks because they exist” instead of “using hooks to solve rendering/lifecycle problems.”

---

# 1. `useState`

## Why it exists

`useState` stores **reactive component state**.

Whenever the state changes:

* React re-renders the component,
* UI updates automatically.

Use it when:

* UI depends on changing data.

---

## Example Scenario

### Counter

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Production-Level Usage

### Good use cases

* Form fields
* Modal open/close
* Dropdown state
* API loading state
* Tabs
* Theme toggles
* Search input
* Stepper wizard

### Bad use cases

* Values that don’t affect UI
* Animation frame counters
* Timers
* Mutable references

Those should usually use `useRef`.

---

# 2. `useEffect`

## Why it exists

`useEffect` handles **side effects**.

A side effect means:

* anything outside React rendering.

Examples:

* API calls
* subscriptions
* timers
* DOM listeners
* animations
* localStorage
* websockets

---

## Example Scenario

### Fetching API data

```jsx
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();

      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Production-Level Usage

### Must use for:

* API requests
* Event listeners
* Cleanup logic
* Socket connections
* Scroll listeners
* Keyboard events
* Animation triggers
* Syncing external systems

### Important Rule

Avoid putting:

* derived values,
* calculations,
* filtered arrays

inside `useEffect`.

Most of those should be:

* computed directly,
* or with `useMemo`.

---

# 3. `useRef`

## Why it exists

`useRef` stores a value that:

* persists across renders,
* BUT changing it does NOT re-render the component.

It’s basically:

> a mutable container.

---

## Example Scenario

### Accessing DOM

```jsx
import { useRef } from "react";

export default function InputFocus() {
  const inputRef = useRef();

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />

      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
```

---

## Another Important Scenario

### Preventing re-renders

```jsx
const timerRef = useRef(null);

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log("running");
  }, 1000);

  return () => clearInterval(timerRef.current);
}, []);
```

---

## Production-Level Usage

### Must use for:

* DOM references
* Animation values
* Timers
* Previous values
* Scroll position
* Mutable caches
* Video/audio control
* requestAnimationFrame IDs

### VERY important in animations

Because animation values change many times per second.

Using `useState` for that:

* causes excessive renders,
* destroys performance.

Use `useRef` instead.

---

# 4. `useMemo`

## Why it exists

`useMemo` memoizes expensive calculations.

It prevents recalculating values on every render.

---

## Example Scenario

### Expensive filtering

```jsx
import { useMemo, useState } from "react";

export default function Products({ products }) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredProducts.map(product => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
```

---

## Production-Level Usage

### Must use for:

* Heavy filtering
* Sorting
* Large data transforms
* Chart calculations
* Expensive derived state
* Stable object references

---

## Common Mistake

BAD:

```jsx
const value = useMemo(() => count + 1, [count]);
```

This optimization is pointless.

Only memoize:

* expensive work,
* or reference-sensitive values.

---

# 5. `useCallback`

## Why it exists

`useCallback` memoizes functions.

Useful when:

* passing callbacks to child components,
* preventing unnecessary renders.

---

## Example Scenario

```jsx
import { useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");

  return <button onClick={onClick}>Click</button>;
});

export default function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

---

## Production-Level Usage

### Must use for:

* Memoized children
* Event-heavy apps
* Large lists
* Canvas apps
* Complex dashboards

### Don't overuse it

`useCallback` itself has overhead.

Use only when:

* render optimization matters.

---

# 6. `useContext`

## Why it exists

Avoids prop drilling.

Lets components share global-like state.

---

## Example Scenario

### Theme Context

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Navbar />
    </ThemeContext.Provider>
  );
}

function Navbar() {
  const theme = useContext(ThemeContext);

  return <div>{theme}</div>;
}
```

---

## Production-Level Usage

### Must use for:

* Auth
* Themes
* User settings
* Localization
* App config
* Feature flags

### Avoid for:

* frequently changing massive state.

That causes unnecessary re-renders.

Use:

* Zustand,
* Redux,
* Jotai,
* Recoil

for complex state systems.

---

# 7. `useReducer`

## Why it exists

Better for complex state logic.

Especially:

* multiple related state changes,
* predictable transitions.

---

## Example Scenario

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0
  });

  return (
    <div>
      <h1>{state.count}</h1>

      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
    </div>
  );
}
```

---

## Production-Level Usage

### Must use for:

* Complex forms
* State machines
* Multi-step flows
* Undo/redo
* Cart systems
* Game logic

---

# 8. `useLayoutEffect`

## Why it exists

Runs BEFORE browser paint.

Useful when:

* measuring DOM,
* synchronizing layout,
* avoiding flicker.

---

## Example Scenario

```jsx
import { useLayoutEffect, useRef } from "react";

export default function Box() {
  const ref = useRef();

  useLayoutEffect(() => {
    const height = ref.current.getBoundingClientRect().height;

    console.log(height);
  }, []);

  return <div ref={ref}>Hello</div>;
}
```

---

## Production-Level Usage

### Must use for:

* Measuring DOM
* Animations
* FLIP animations
* Position calculations
* Scroll synchronization

### Warning

Too much use blocks painting and hurts performance.

---

# 9. `useImperativeHandle`

## Why it exists

Lets parent components expose controlled imperative APIs.

Used with `forwardRef`.

---

## Example Scenario

```jsx
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});
```

---

## Production-Level Usage

### Must use for:

* Custom inputs
* Animation libraries
* Media controls
* Modals
* Complex reusable UI systems

---

# 10. `useTransition`

## Why it exists

Helps keep UI responsive during expensive updates.

Introduced for concurrent rendering.

---

## Example Scenario

```jsx
import { useTransition, useState } from "react";

export default function Search({ data }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;

    setQuery(value);

    startTransition(() => {
      // expensive filtering
    });
  }

  return (
    <>
      <input onChange={handleChange} />

      {isPending && <p>Loading...</p>}
    </>
  );
}
```

---

## Production-Level Usage

### Must use for:

* Large search lists
* Heavy dashboards
* Charts
* Data grids
* AI streaming UIs

---

# 11. `useDeferredValue`

## Why it exists

Defers expensive updates.

Useful for search/filter lag reduction.

---

## Example Scenario

```jsx
const deferredSearch = useDeferredValue(search);
```

---

## Production-Level Usage

### Must use for:

* Live search
* Huge tables
* Large rendering trees

---

# 12. `custom hooks`

## Why they exist

To reuse logic cleanly.

---

## Example Scenario

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
```

---

## Production-Level Usage

### Must use for:

* Shared API logic
* Authentication
* Animations
* Scroll tracking
* Form systems
* Media queries

---

# HOW PROFESSIONAL DEVELOPERS DECIDE WHICH HOOK TO USE

| Problem                           | Hook              |
| --------------------------------- | ----------------- |
| UI must update                    | `useState`        |
| Need side effect                  | `useEffect`       |
| Need mutable value without render | `useRef`          |
| Expensive calculation             | `useMemo`         |
| Stable function                   | `useCallback`     |
| Global shared state               | `useContext`      |
| Complex state transitions         | `useReducer`      |
| DOM measurement before paint      | `useLayoutEffect` |
| Reusable logic                    | Custom hooks      |
| Concurrent optimization           | `useTransition`   |

---

# MASTER GUIDE — HOOKS FOR ANIMATIONS & TRANSITIONS

This is where many React developers struggle.

---

# RULE #1 — NEVER animate with `useState` every frame

BAD:

```jsx
setX(prev => prev + 1);
```

inside animation loops.

Why?

* Causes React renders every frame.
* 60 FPS becomes impossible.

---

# RULE #2 — Use `useRef` for animation values

GOOD:

```jsx
const xRef = useRef(0);
```

Animation updates:

* mutable,
* no render,
* extremely fast.

---

# RULE #3 — Use `requestAnimationFrame`

```jsx
useEffect(() => {
  let frame;

  function animate() {
    frame = requestAnimationFrame(animate);

    // animation logic
  }

  animate();

  return () => cancelAnimationFrame(frame);
}, []);
```

---

# RULE #4 — Use `useLayoutEffect` for measurements

Animations often need:

* element width,
* height,
* positions.

Use:

```jsx
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
}, []);
```

before paint.

---

# RULE #5 — Prefer CSS transforms

BEST:

```css
transform: translateX(100px);
```

BAD:

```css
left: 100px;
```

Transforms:

* use GPU,
* smoother animations,
* fewer layout recalculations.

---

# RULE #6 — Use animation libraries in production

Professional apps use:

* Framer Motion
* GSAP
* React Spring

because:

* physics,
* sequencing,
* layout animations,
* gestures,
* orchestration

are hard manually.

---

# Example — Smooth React Animation

```jsx
import { useEffect, useRef } from "react";

export default function Ball() {
  const ballRef = useRef();

  useEffect(() => {
    let x = 0;
    let frame;

    function animate() {
      x += 2;

      ballRef.current.style.transform =
        `translateX(${x}px)`;

      frame = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ballRef}
      style={{
        width: 50,
        height: 50,
        background: "red",
        borderRadius: "50%"
      }}
    />
  );
}
```

---

# PRODUCTION ANIMATION ARCHITECTURE

### Small UI interactions

Use:

* CSS transitions
* minimal React state

Examples:

* hover
* button press
* fade
* dropdown

---

### Medium animations

Use:

* Framer Motion

Examples:

* modals
* page transitions
* draggable cards
* shared layouts

---

### Heavy animations

Use:

* GSAP
* Canvas/WebGL

Examples:

* hero animations
* particle systems
* games
* 3D scenes

---

# FINAL PROFESSIONAL RULES

## Use `useState`

when UI changes.

---

## Use `useRef`

when values change frequently without needing re-render.

---

## Use `useMemo`

only for expensive calculations.

---

## Use `useCallback`

only when reference stability matters.

---

## Use `useEffect`

only for side effects.

---

## Use `useLayoutEffect`

for DOM measurement/animation synchronization.

---

# MOST IMPORTANT PERFORMANCE INSIGHT

React rendering is expensive compared to:

* mutating refs,
* CSS transforms,
* browser-native animations.

High-performance animation systems:

* minimize renders,
* use refs,
* use transforms,
* batch updates,
* avoid state churn.
