import { ReactNode, useRef, useLayoutEffect, useCallback, useEffect } from 'react';

interface InfiniteCanvasProps {
  children: ReactNode;
  centerOnMount?: boolean;
  infiniteScroll?: boolean;
  gridWidth?: number;
  gridHeight?: number;
}

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
  
  // Settings
  const SCROLL_SPEED = 0.6;
  const DRAG_FRICTION = 0.94;
  const MIN_VELOCITY = 0.1;

  // Wrap position for infinite scroll
  const wrapPosition = useCallback(() => {
    if (!infiniteScroll || !gridWidth || !gridHeight) return;
    
    // Keep position within the center grid section
    // Position is negative (content moves opposite to scroll direction)
    // Center grid spans from -gridWidth to -2*gridWidth (x) and -gridHeight to -2*gridHeight (y)
    
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
    
    // Small delay to ensure content is rendered
    requestAnimationFrame(() => {
      let newX = 0, newY = 0;
      
      if (infiniteScroll && gridWidth && gridHeight) {
        // For infinite scroll, center on the middle grid's center tile
        // The middle grid starts at (gridWidth, gridHeight) in the 3x3 arrangement
        const centerTile = content.querySelector('[data-center-tile]') as HTMLElement;
        
        if (centerTile) {
          const contentRect = content.getBoundingClientRect();
          const tileRect = centerTile.getBoundingClientRect();
          const tileCenterX = (tileRect.left - contentRect.left) + tileRect.width / 2;
          const tileCenterY = (tileRect.top - contentRect.top) + tileRect.height / 2;
          newX = container.clientWidth / 2 - tileCenterX;
          newY = container.clientHeight / 2 - tileCenterY;
        } else {
          // Center on the middle grid
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
      
      // Make visible after positioning
      content.style.opacity = '1';
    });
  }, [centerOnMount, updateTransform, infiniteScroll, gridWidth, gridHeight]);

  // Wheel handler - INSTANT response, no animation loop delay
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Disable pointer events during scroll for performance
    if (!isScrollingRef.current && contentRef.current) {
      isScrollingRef.current = true;
      contentRef.current.style.pointerEvents = 'none';
    }
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Re-enable pointer events after scroll stops
    scrollTimeoutRef.current = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.pointerEvents = 'auto';
      }
      isScrollingRef.current = false;
    }, 100);
    
    // Kill any momentum
    velRef.current = { x: 0, y: 0 };
    
    // Instant position update
    posRef.current.x -= e.deltaX * SCROLL_SPEED;
    posRef.current.y -= e.deltaY * SCROLL_SPEED;
    
    // Immediate DOM update
    updateTransform();
  }, [updateTransform]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-clickable]') || target.closest('button') || target.closest('a')) {
      return;
    }
    
    isDraggingRef.current = true;
    velRef.current = { x: 0, y: 0 };
    dragStartRef.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    lastDragPosRef.current = { x: e.clientX, y: e.clientY };
    lastDragTimeRef.current = performance.now();
    
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    
    const now = performance.now();
    const dt = now - lastDragTimeRef.current;
    
    // Instant position update
    posRef.current.x = e.clientX - dragStartRef.current.x;
    posRef.current.y = e.clientY - dragStartRef.current.y;
    updateTransform();
    
    // Track velocity for momentum
    if (dt > 0) {
      velRef.current = {
        x: (e.clientX - lastDragPosRef.current.x) / dt * 16,
        y: (e.clientY - lastDragPosRef.current.y) / dt * 16,
      };
      lastDragPosRef.current = { x: e.clientX, y: e.clientY };
      lastDragTimeRef.current = now;
    }
  }, [updateTransform]);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      data-infinite-canvas
      className="w-full h-full overflow-hidden bg-black cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}
