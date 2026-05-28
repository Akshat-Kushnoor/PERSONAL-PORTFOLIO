"use client";

// Simple reactive store for cursor state
// Avoids React re-renders for high-frequency updates like mouse movement

export interface CursorStoreState {
  x: number;
  y: number;
  hoverText: string | null;
  clickText: string | null;
  hoverScale: number;
  isHovering: boolean;
  isClicked: boolean;
  isHidden: boolean;
  scrollVelocity: number;
}

class CursorStore {
  private state: CursorStoreState = {
    x: 0,
    y: 0,
    hoverText: null,
    clickText: null,
    hoverScale: 1,
    isHovering: false,
    isClicked: false,
    isHidden: false,
    scrollVelocity: 0,
  };

  private listeners: Set<(state: CursorStoreState) => void> = new Set();

  getState() {
    return this.state;
  }

  setState(newState: Partial<CursorStoreState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: (state: CursorStoreState) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const cursorStore = new CursorStore();
