import { ReactNode, useRef, useLayoutEffect, useCallback, useEffect } from 'react';

interface InfiniteCanvasProps {
  children: ReactNode;
  centerOnMount?: boolean;
  infiniteScroll?: boolean;
  gridWidth?: number;
  gridHeight?: number;
}

// Global flag to track if we're currently dragging (used by tiles to ignore clicks)
let isDragging = false;
export const getIsDragging = () => isDragging;

export function InfiniteCanvas({ 
  children, 
  centerOnMount = false,
  infiniteScroll = false,
  gridWidth = 0,
  gridHeight = 0,
}: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Position stored in ref - never triggers re-renders
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastDragPosRef = useRef({ x: 0, y: 0 });
  const lastDragTimeRef = useRef(0);
  const pointerStartPosRef = useRef({ x: 0, y: 0 });
  
  // Settings
  const SCROLL_SPEED = 0.6;
  const DRAG_FRICTION = 0.94;
  const MIN_VELOCITY = 0.1;
  const DRAG_THRESHOLD = 8; // pixels moved before considered a drag

  // Wrap position for infinite scroll
  const wrapPosition = useCallback(() => {
    if (!infiniteScroll || !gridWidth || !gridHeight) return;
    
    while (posRef.current.x > -gridWidth) {
      posRef.current.x -= gridWidth;
    }
    while (posRef.current.x < -gridWidth * 2) {
      posRef.current.x += gridWidth;
    }
    while (posRef.current.y > -gridHeight) {
      posRef.current.y -= gridHeight;
    }
    while (posRef.current.y < -gridHeight * 2) {
      posRef.current.y += gridHeight;
    }
  }, [infiniteScroll, gridWidth, gridHeight]);

  // Direct DOM update - no React involved
  const updateTransform = useCallback(() => {
    if (contentRef.current) {
      wrapPosition();
      const x = Math.round(posRef.current.x * 100) / 100;
      const y = Math.round(posRef.current.y * 100) / 100;
      contentRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, [wrapPosition]);

  // Momentum animation after drag release
  useEffect(() => {
    let rafId: number;
    
    const animateMomentum = () => {
      if (isDraggingRef.current) {
        rafId = requestAnimationFrame(animateMomentum);
        return;
      }
      
      const vel = velRef.current;
      if (Math.abs(vel.x) > MIN_VELOCITY || Math.abs(vel.y) > MIN_VELOCITY) {
        posRef.current.x += vel.x;
        posRef.current.y += vel.y;
        vel.x *= DRAG_FRICTION;
        vel.y *= DRAG_FRICTION;
        updateTransform();
        rafId = requestAnimationFrame(animateMomentum);
      } else {
        vel.x = 0;
        vel.y = 0;
      }
    };
    
    rafId = requestAnimationFrame(animateMomentum);
    return () => {
      cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateTransform]);

  // Center on mount
  useLayoutEffect(() => {
    if (!centerOnMount || !containerRef.current || !contentRef.current) return;
    
    const container = containerRef.current;
    const content = contentRef.current;
    
    requestAnimationFrame(() => {
      let newX = 0, newY = 0;
      
      if (infiniteScroll && gridWidth && gridHeight) {
        const centerTile = content.querySelector('[data-center-tile]') as HTMLElement;
        
        if (centerTile) {
          const contentRect = content.getBoundingClientRect();
          const tileRect = centerTile.getBoundingClientRect();
          const tileCenterX = (tileRect.left - contentRect.left) + tileRect.width / 2;
          const tileCenterY = (tileRect.top - contentRect.top) + tileRect.height / 2;
          newX = container.clientWidth / 2 - tileCenterX;
          newY = container.clientHeight / 2 - tileCenterY;
        } else {
          newX = container.clientWidth / 2 - gridWidth * 1.5;
          newY = container.clientHeight / 2 - gridHeight * 1.5;
        }
      } else {
        const centerTile = content.querySelector('[data-center-tile]') as HTMLElement;
        
        if (centerTile) {
          const contentRect = content.getBoundingClientRect();
          const tileRect = centerTile.getBoundingClientRect();
          const tileCenterX = (tileRect.left - contentRect.left) + tileRect.width / 2;
          const tileCenterY = (tileRect.top - contentRect.top) + tileRect.height / 2;
          newX = container.clientWidth / 2 - tileCenterX;
          newY = container.clientHeight / 2 - tileCenterY;
        } else {
          newX = (container.clientWidth - content.scrollWidth) / 2;
          newY = (container.clientHeight - content.scrollHeight) / 2;
        }
      }
      
      posRef.current = { x: newX, y: newY };
      updateTransform();
      content.style.opacity = '1';
    });
  }, [centerOnMount, updateTransform, infiniteScroll, gridWidth, gridHeight]);

  // Wheel handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isScrollingRef.current && contentRef.current) {
      isScrollingRef.current = true;
      contentRef.current.style.pointerEvents = 'none';
    }
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.pointerEvents = 'auto';
      }
      isScrollingRef.current = false;
    }, 100);
    
    velRef.current = { x: 0, y: 0 };
    posRef.current.x -= e.deltaX * SCROLL_SPEED;
    posRef.current.y -= e.deltaY * SCROLL_SPEED;
    updateTransform();
  }, [updateTransform]);

  // Mouse/Touch handlers - simple approach without pointer capture
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      isDragging = false; // Reset - not yet confirmed as drag
      velRef.current = { x: 0, y: 0 };
      dragStartRef.current = { x: clientX - posRef.current.x, y: clientY - posRef.current.y };
      lastDragPosRef.current = { x: clientX, y: clientY };
      pointerStartPosRef.current = { x: clientX, y: clientY };
      lastDragTimeRef.current = performance.now();
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      
      const now = performance.now();
      const dt = now - lastDragTimeRef.current;
      
      // Check if we've moved beyond threshold
      const dx = clientX - pointerStartPosRef.current.x;
      const dy = clientY - pointerStartPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > DRAG_THRESHOLD) {
        isDragging = true; // Global flag - tiles will check this
      }
      
      posRef.current.x = clientX - dragStartRef.current.x;
      posRef.current.y = clientY - dragStartRef.current.y;
      updateTransform();
      
      if (dt > 0) {
        velRef.current = {
          x: (clientX - lastDragPosRef.current.x) / dt * 16,
          y: (clientY - lastDragPosRef.current.y) / dt * 16,
        };
        lastDragPosRef.current = { x: clientX, y: clientY };
        lastDragTimeRef.current = now;
      }
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
      // Keep isDragging true briefly so click handlers can check it
      setTimeout(() => {
        isDragging = false;
      }, 50);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      handleStart(e.clientX, e.clientY);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
    
    const onMouseUp = () => {
      handleEnd();
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const onTouchEnd = () => {
      handleEnd();
    };

    container.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [updateTransform]);

  // Arrow key navigation - smooth continuous movement
  useEffect(() => {
    const keysPressed = new Set<string>();
    const keyVelocity = { x: 0, y: 0 };
    const KEY_ACCELERATION = 0.5;
    const KEY_MAX_SPEED = 8;
    const KEY_FRICTION = 0.92;
    let animationId: number | null = null;

    const animate = () => {
      // Apply acceleration based on keys pressed
      if (keysPressed.has('ArrowUp')) keyVelocity.y += KEY_ACCELERATION;
      if (keysPressed.has('ArrowDown')) keyVelocity.y -= KEY_ACCELERATION;
      if (keysPressed.has('ArrowLeft')) keyVelocity.x += KEY_ACCELERATION;
      if (keysPressed.has('ArrowRight')) keyVelocity.x -= KEY_ACCELERATION;

      // Clamp velocity
      keyVelocity.x = Math.max(-KEY_MAX_SPEED, Math.min(KEY_MAX_SPEED, keyVelocity.x));
      keyVelocity.y = Math.max(-KEY_MAX_SPEED, Math.min(KEY_MAX_SPEED, keyVelocity.y));

      // Apply velocity
      if (Math.abs(keyVelocity.x) > 0.1 || Math.abs(keyVelocity.y) > 0.1) {
        posRef.current.x += keyVelocity.x;
        posRef.current.y += keyVelocity.y;
        updateTransform();
      }

      // Apply friction when no keys pressed
      if (!keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowRight')) {
        keyVelocity.x *= KEY_FRICTION;
      }
      if (!keysPressed.has('ArrowUp') && !keysPressed.has('ArrowDown')) {
        keyVelocity.y *= KEY_FRICTION;
      }

      // Continue animation if there's movement or keys pressed
      if (keysPressed.size > 0 || Math.abs(keyVelocity.x) > 0.1 || Math.abs(keyVelocity.y) > 0.1) {
        animationId = requestAnimationFrame(animate);
      } else {
        animationId = null;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      e.preventDefault();
      keysPressed.add(e.key);
      
      // Start animation if not already running
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [updateTransform]);

  return (
    <div
      ref={containerRef}
      data-infinite-canvas
      className="w-full h-full overflow-hidden bg-black cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      style={{ 
        touchAction: 'none',
        overscrollBehavior: 'none',
        contain: 'strict',
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: 'fit-content',
          height: 'fit-content',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          opacity: centerOnMount ? 0 : 1,
          contain: 'layout style paint',
        }}
      >
        {children}
      </div>
    </div>
  );
}
