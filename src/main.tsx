
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Prevent browser navigation gestures and scrolling
function preventBrowserGestures() {
  // Prevent swipe back/forward navigation
  let touchStartX = 0;
  let touchStartY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    // Don't prevent if inside a modal
    const target = e.target as HTMLElement;
    if (target.closest('[data-modal-scrollable]')) {
      return;
    }

    if (e.touches.length > 1) {
      // Multi-touch gesture - prevent default
      e.preventDefault();
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Prevent horizontal swipe navigation (browser back/forward)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      e.preventDefault();
    }
  };

  // Prevent pull-to-refresh and overscroll
  const handleTouchMoveGlobal = (e: TouchEvent) => {
    // Don't prevent if inside a modal
    const target = e.target as HTMLElement;
    if (target.closest('[data-modal-scrollable]')) {
      return;
    }
    // Prevent default scroll behavior
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  // Prevent wheel scrolling on body
  const handleWheel = (e: WheelEvent) => {
    // Only prevent if not interacting with InfiniteCanvas or modal
    const target = e.target as HTMLElement;
    if (!target.closest('[data-infinite-canvas]') && !target.closest('[data-modal-scrollable]')) {
      e.preventDefault();
    }
  };

  // Prevent context menu on long press (can trigger unwanted behaviors)
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  document.addEventListener('touchstart', handleTouchStart, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
  document.addEventListener('wheel', handleWheel, { passive: false });
  document.addEventListener('contextmenu', handleContextMenu);

  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchmove', handleTouchMoveGlobal);
    document.removeEventListener('wheel', handleWheel);
    document.removeEventListener('contextmenu', handleContextMenu);
  };
}

// Component to initialize gesture prevention
function AppWrapper() {
  useEffect(() => {
    const cleanup = preventBrowserGestures();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<AppWrapper />);
  