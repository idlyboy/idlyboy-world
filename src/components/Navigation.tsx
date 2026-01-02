import { useRef, useEffect, useState } from 'react';
import { useMousePosition } from '../contexts/MousePositionContext';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const menuItems = ['Home', 'Work', 'Design', 'Writing', 'Life'];
  const navRef = useRef<HTMLElement>(null);
  const { mousePos } = useMousePosition();
  const [effectIntensity, setEffectIntensity] = useState(0);
  const [gradientOrigin, setGradientOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!navRef.current || !mousePos) {
      setEffectIntensity(0);
      return;
    }

    const rect = navRef.current.getBoundingClientRect();
    const navCenterX = rect.left + rect.width / 2;
    const navCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - navCenterX, 2) +
      Math.pow(mousePos.y - navCenterY, 2)
    );

    const maxRadius = 400;
    const intensity = Math.max(0, 1 - distance / maxRadius);

    setEffectIntensity(intensity);

    const relX = ((mousePos.x - rect.left) / rect.width) * 100;
    const relY = ((mousePos.y - rect.top) / rect.height) * 100;
    setGradientOrigin({ x: relX, y: relY });
  }, [mousePos]);

  const colorOpacity = effectIntensity * 0.45;

  return (
    <nav
      ref={navRef}
      className="w-full md:w-[280px] md:h-screen flex flex-col px-8 py-6 overflow-hidden border-b md:border-b-0 md:border-r border-gray-800 relative"
      style={{
        background: effectIntensity > 0
          ? `rgba(6, 6, 6, ${0.95 - effectIntensity * 0.1})`
          : 'black',
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

      {/* Hover disturbance effect */}
      {effectIntensity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: '-25%',
            opacity: effectIntensity * 0.25,
            background: `
              radial-gradient(
                ellipse 150% 150% at ${gradientOrigin.x}% ${gradientOrigin.y}%,
                rgba(147, 51, 234, 0.6) 0%,
                rgba(79, 70, 229, 0.4) 25%,
                rgba(6, 182, 212, 0.3) 50%,
                transparent 75%
              )
            `,
            filter: 'blur(25px)',
            pointerEvents: 'none',
            animation: 'disturbance 2s ease-in-out infinite',
          }}
        />
      )}

      <div className="mb-8 md:mb-16 relative z-10">
        <h1 className="tracking-tight text-white">idlyboy</h1>
      </div>

      <ul className="flex md:flex-col flex-1 md:space-y-6 space-x-6 md:space-x-0 overflow-x-auto md:overflow-x-visible relative z-10">
        {menuItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => onSectionChange(item)}
              className={`text-left transition-colors whitespace-nowrap ${
                activeSection === item
                  ? 'text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-1 text-gray-500 hidden md:block relative z-10">
        <button className="block hover:text-white transition-colors">
          Contact
        </button>
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
    </nav>
  );
}