import { ReactNode, useRef, useEffect, useState } from 'react';
import { useMousePosition } from '../contexts/MousePositionContext';

interface TileProps {
  children: ReactNode;
  className?: string;
  span?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  glass?: boolean;
}

export function Tile({ children, className = '', span = 'medium', glass = false }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const { mousePos } = useMousePosition();
  const [effectIntensity, setEffectIntensity] = useState(0);
  const [gradientOrigin, setGradientOrigin] = useState({ x: 50, y: 50 });
  
  const spanClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1',
    large: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2',
    wide: 'col-span-2 row-span-1 sm:col-span-2 sm:row-span-1',
    tall: 'col-span-1 row-span-2 sm:col-span-1 sm:row-span-2',
  };

  useEffect(() => {
    if (!glass || !tileRef.current || !mousePos) {
      setEffectIntensity(0);
      return;
    }

    const rect = tileRef.current.getBoundingClientRect();
    const tileCenterX = rect.left + rect.width / 2;
    const tileCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - tileCenterX, 2) + 
      Math.pow(mousePos.y - tileCenterY, 2)
    );
    
    const maxRadius = 220;
    const intensity = Math.max(0, 1 - distance / maxRadius);
    
    setEffectIntensity(intensity);
    
    const relX = ((mousePos.x - rect.left) / rect.width) * 100;
    const relY = ((mousePos.y - rect.top) / rect.height) * 100;
    setGradientOrigin({ x: relX, y: relY });
  }, [mousePos, glass]);

  if (glass) {
    return (
      <div
        ref={tileRef}
        className={`relative rounded-lg p-0 flex flex-col justify-between overflow-hidden ${spanClasses[span]} ${className}`}
        style={{
          background: effectIntensity > 0
            ? `rgba(6, 6, 6, ${0.95 - effectIntensity * 0.1})`
            : '#080808',
          backdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 15}px)` : 'none',
          WebkitBackdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 15}px)` : 'none',
          border: effectIntensity > 0
            ? `1px solid rgba(255, 255, 255, ${effectIntensity * 0.08})`
            : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Layer 1: Patchy purple elements - concentrated in spots */}
        <div
          style={{
            position: 'absolute',
            inset: '-30%',
            opacity: 0.08,
            background: `
              radial-gradient(ellipse 40% 60% at 20% 80%, rgba(147, 51, 234, 0.6) 0%, transparent 70%),
              radial-gradient(ellipse 50% 30% at 85% 20%, transparent 0%, rgba(147, 51, 234, 0.4) 30%, transparent 80%),
              radial-gradient(ellipse 25% 45% at 60% 70%, rgba(147, 51, 234, 0.5) 0%, transparent 60%)
            `,
            animation: effectIntensity > 0 ? 'flowPurpleFast 12s linear infinite' : 'flowPurpleSlow 35s linear infinite',
            filter: 'blur(45px)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2: Scattered blue rogue elements */}
        <div
          style={{
            position: 'absolute',
            inset: '-25%',
            opacity: 0.06,
            background: `
              radial-gradient(ellipse 35% 50% at 90% 60%, rgba(79, 70, 229, 0.7) 0%, transparent 65%),
              radial-gradient(ellipse 40% 25% at 15% 35%, transparent 0%, rgba(79, 70, 229, 0.5) 25%, transparent 75%),
              radial-gradient(ellipse 30% 55% at 70% 90%, rgba(79, 70, 229, 0.6) 0%, transparent 70%)
            `,
            animation: effectIntensity > 0 ? 'flowBlueFast 15s linear infinite reverse' : 'flowBlueSlow 42s linear infinite reverse',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 3: Sparse cyan elements with dark gaps */}
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            opacity: 0.05,
            background: `
              radial-gradient(ellipse 45% 35% at 40% 25%, rgba(6, 182, 212, 0.5) 0%, transparent 55%),
              radial-gradient(ellipse 25% 40% at 75% 45%, transparent 0%, rgba(6, 182, 212, 0.4) 20%, transparent 80%)
            `,
            animation: effectIntensity > 0 ? 'flowCyanPulse 8s ease-in-out infinite' : 'flowCyanSlow 48s ease-in-out infinite',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        {/* Hover disturbance effect - concentrated rogue elements */}
        {effectIntensity > 0 && (
          <div
            style={{
              position: 'absolute',
              inset: '-40%',
              opacity: effectIntensity * 0.18,
              background: `
                radial-gradient(ellipse 60% 40% at ${gradientOrigin.x}% ${gradientOrigin.y}%, rgba(147, 51, 234, 0.8) 0%, transparent 80%),
                radial-gradient(ellipse 35% 70% at ${100 - gradientOrigin.x}% ${gradientOrigin.y}%, rgba(79, 70, 229, 0.7) 0%, transparent 75%),
                radial-gradient(ellipse 45% 35% at ${gradientOrigin.x}% ${100 - gradientOrigin.y}%, rgba(6, 182, 212, 0.6) 0%, transparent 70%)
              `,
              filter: 'blur(30px)',
              pointerEvents: 'none',
              animation: 'disturbancePulse 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col justify-between">
          {children}
        </div>

        <style>{`
          @keyframes flowPurpleSlow {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, -5px) rotate(90deg); }
            50% { transform: translate(-5px, 10px) rotate(180deg); }
            75% { transform: translate(5px, -10px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          @keyframes flowPurpleFast {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(15px, -8px) rotate(90deg); }
            50% { transform: translate(-8px, 15px) rotate(180deg); }
            75% { transform: translate(8px, -15px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          @keyframes flowBlueSlow {
            0% { transform: translate(0, 0) rotate(360deg); }
            25% { transform: translate(-8px, 12px) rotate(270deg); }
            50% { transform: translate(12px, -8px) rotate(180deg); }
            75% { transform: translate(-12px, 8px) rotate(90deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes flowBlueFast {
            0% { transform: translate(0, 0) rotate(360deg); }
            25% { transform: translate(-12px, 18px) rotate(270deg); }
            50% { transform: translate(18px, -12px) rotate(180deg); }
            75% { transform: translate(-18px, 12px) rotate(90deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes flowCyanSlow {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.05; }
            50% { transform: translate(-6px, 6px) rotate(180deg) scale(1.08); opacity: 0.08; }
          }
          @keyframes flowCyanPulse {
            0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.1; }
            50% { transform: translate(-8px, 8px) rotate(180deg) scale(1.12); opacity: 0.15; }
          }
          @keyframes disturbancePulse {
            0%, 100% { transform: scale(1) rotate(0deg) opacity: 0.18; }
            33% { transform: scale(1.3) rotate(5deg) opacity: 0.25; }
            66% { transform: scale(0.9) rotate(-5deg) opacity: 0.2; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#080808] rounded-lg p-0 flex flex-col justify-between overflow-hidden ${spanClasses[span]} ${className}`}
    >
      {children}
    </div>
  );
}
