import React, { ReactNode } from 'react';

interface TileGridProps {
  children: ReactNode;
  className?: string;
}

export function TileGrid({ children, className = '' }: TileGridProps) {
  // Original layout: 2 cols on small, 3 cols on sm+, 4 cols on lg+
  // Restored to original working state
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4 p-4 sm:p-6 lg:p-8 h-full ${className}`}>
      {children}
    </div>
  );
}
