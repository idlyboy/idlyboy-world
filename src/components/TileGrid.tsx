import { ReactNode } from 'react';

interface TileGridProps {
  children: ReactNode;
}

export function TileGrid({ children }: TileGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4 p-4 sm:p-6 lg:p-8 h-full">
      {children}
    </div>
  );
}
