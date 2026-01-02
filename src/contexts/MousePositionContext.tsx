import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MousePositionContextType {
  mousePos: MousePosition | null;
}

const MousePositionContext = createContext<MousePositionContextType>({ mousePos: null });

export function useMousePosition() {
  return useContext(MousePositionContext);
}

interface MousePositionProviderProps {
  children: ReactNode;
}

export function MousePositionProvider({ children }: MousePositionProviderProps) {
  const [mousePos, setMousePos] = useState<MousePosition | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <MousePositionContext.Provider value={{ mousePos }}>
      <div 
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </MousePositionContext.Provider>
  );
}

