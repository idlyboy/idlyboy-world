"use client";

import React, { useEffect, useRef } from "react";

type GridShape = {
  x: number;
  y: number;
  type: 'circle' | 'square' | 'triangle' | 'cross';
  color: [number, number, number];
  size: number;
  isLit: boolean;
  litUntil: number;
  pulsePhase: number;
  pulseSpeed: number;
  fadeDelay: number;
  fadeOpacity: number;
};

type AsciiPoint = {
  baseX: number;
  baseY: number;
  jitterRadius: number;
  phase: number;
  speed: number;
  char: string;
  isBinary: boolean;
  baseAlpha: number;
  flickerUntil: number;
  fadeDelay: number;
  fadeOpacity: number;
};

const AsciiBrain: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverStateRef = useRef<{ left: number; right: number }>({ left: 0, right: 0 });
  const animationStateRef = useRef({
    brainStartTime: 0,
    outlineStartTime: 0,
    outlineProgress: 0,
    animationStarted: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Brain geometry
    let cxLeft = 0;
    let cxRight = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;

    const gridShapes: GridShape[] = [];
    const asciiPoints: AsciiPoint[] = [];

    const NUM_ASCII = 80;

    const shapeColors: [number, number, number][] = [
      [255, 229, 164], // #FFE5A4
      [255, 74, 74],   // #FF4A4A
      [73, 4, 11],     // #49040B
      [0, 81, 64],     // #005140
      [35, 169, 141],  // #23A98D
      [152, 34, 66],   // #982242
    ];

    const shapeTypes: ('circle' | 'square' | 'triangle' | 'cross')[] = ['circle', 'square', 'triangle', 'cross'];

    const asciiCharsPool = ["0", "1", "0", "1", "@", "#", "+", "-", "=", ":", ";"];

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const pointInBrainShape = (
      x: number,
      y: number,
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      isLeft: boolean
    ) => {
      const dx = x - cx;
      const dy = y - cy;
      
      const inMainEllipse = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
      if (!inMainEllipse) return false;
      
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const normalizedDist = dist / Math.sqrt(rx * rx + ry * ry);
      
      const foldFactor = 0.85 + 0.15 * Math.sin(angle * 5 + normalizedDist * 3);
      
      if (normalizedDist >= foldFactor * 0.9) return false;
      
      const centerX = width / 2;
      if (isLeft && x > centerX - 10) return false;
      if (!isLeft && x < centerX + 10) return false;
      
      return true;
    };

    const createGridShapes = () => {
      gridShapes.length = 0;
      
      const gridSize = 8;
      const shapeSize = 3;
      
      const leftBound = cxLeft - rx * 1.0;
      const rightBound = width / 2 - 10;
      const topBound = cy - ry * 1.0;
      const bottomBound = cy + ry * 1.0;
      
      let shapeIndex = 0;
      for (let y = topBound; y < bottomBound; y += gridSize) {
        for (let x = leftBound; x < rightBound; x += gridSize) {
          if (!pointInBrainShape(x, y, cxLeft, cy, rx, ry, true)) continue;
          
          if (Math.random() < 0.25) continue;
          
          const type = shapeTypes[shapeIndex % shapeTypes.length];
          const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
          
          gridShapes.push({
            x,
            y,
            type,
            color,
            size: shapeSize,
            isLit: false,
            litUntil: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: randomBetween(0.5, 1.0),
            fadeDelay: Math.random() * 1200,
            fadeOpacity: 0,
          });
          
          shapeIndex++;
        }
      }
    };

    const createAsciiPoints = () => {
      asciiPoints.length = 0;
      let attempts = 0;

      // Use a minimum distance to ensure uniform distribution and avoid clumps
      // Estimate area approx PI * rx * ry
      // Average area per point = (PI * rx * ry) / NUM_ASCII
      // Ideal spacing approx sqrt(Area / NUM_ASCII)
      // We'll use a slightly smaller factor to ensure we can fit them all
      const area = Math.PI * rx * ry;
      const idealSpacing = Math.sqrt(area / NUM_ASCII);
      const minDistance = idealSpacing * 0.75; 

      while (asciiPoints.length < NUM_ASCII && attempts < NUM_ASCII * 100) {
        attempts++;
        const x = randomBetween(cxRight - rx * 1.1, cxRight + rx * 1.1);
        const y = randomBetween(cy - ry * 1.1, cy + ry * 1.1);
        
        if (!pointInBrainShape(x, y, cxRight, cy, rx, ry, false)) continue;

        // Check distance against existing points
        let tooClose = false;
        for (const p of asciiPoints) {
          const dx = x - p.baseX;
          const dy = y - p.baseY;
          if (dx * dx + dy * dy < minDistance * minDistance) {
            tooClose = true;
            break;
          }
        }
        
        // If we've tried too many times, relax the distance constraint
        if (tooClose && attempts < NUM_ASCII * 50) continue;

        const isBinary = Math.random() < 0.8;
        const char = isBinary
          ? Math.random() < 0.5
            ? "0"
            : "1"
          : asciiCharsPool[Math.floor(Math.random() * asciiCharsPool.length)];

        asciiPoints.push({
          baseX: x,
          baseY: y,
          jitterRadius: randomBetween(0.3, 1.5),
          phase: Math.random() * Math.PI * 2,
          speed: randomBetween(0.4, 1.2),
          char,
          isBinary,
          baseAlpha: randomBetween(0.4, 0.85),
          flickerUntil: 0,
          fadeDelay: Math.random() * 1200,
          fadeOpacity: 0,
        });
      }
    };

    const initGeometry = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;

      width = w;
      height = h;

      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const brainWidth = Math.min(width * 0.95, height * 1.3);
      rx = brainWidth * 0.22;
      ry = brainWidth * 0.35;

      const gap = 32;
      const centerX = width / 2;
      cy = height / 2 + height * 0.01;
      cxLeft = centerX - gap / 2;
      cxRight = centerX + gap / 2;

      createGridShapes();
      createAsciiPoints();
    };

    const drawShape = (
      x: number,
      y: number,
      size: number,
      type: string,
      r: number,
      g: number,
      b: number,
      isLit: boolean,
      alpha: number
    ) => {
      ctx.save();
      
      if (isLit) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha.toFixed(3)})`);
        gradient.addColorStop(0.5, `rgba(${r},${g},${b},${(alpha * 0.3).toFixed(3)})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        if (type === 'circle') {
          ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        } else if (type === 'square') {
          ctx.rect(x - size * 2, y - size * 2, size * 4, size * 4);
        } else if (type === 'triangle') {
          ctx.moveTo(x, y - size * 2);
          ctx.lineTo(x + size * 1.73, y + size);
          ctx.lineTo(x - size * 1.73, y + size);
          ctx.closePath();
        } else if (type === 'cross') {
          const w = size * 0.6;
          ctx.rect(x - w, y - size * 1.5, w * 2, size * 3);
          ctx.rect(x - size * 1.5, y - w, size * 3, w * 2);
        }
        ctx.fill();
        
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 1.2).toFixed(3)})`;
      } else {
        ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`;
        ctx.lineWidth = 1;
      }
      
      ctx.beginPath();
      if (type === 'circle') {
        ctx.arc(x, y, size, 0, Math.PI * 2);
      } else if (type === 'square') {
        ctx.rect(x - size, y - size, size * 2, size * 2);
      } else if (type === 'triangle') {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.closePath();
      } else if (type === 'cross') {
        const w = size * 0.3;
        ctx.rect(x - w, y - size, w * 2, size * 2);
        ctx.rect(x - size, y - w, size * 2, w * 2);
      }
      
      if (isLit) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawGridShapes = (time: number) => {
      const t = time / 1000;
      ctx.save();

      const brainElapsed = animationStateRef.current.brainStartTime > 0 ? time - animationStateRef.current.brainStartTime : 0;

      for (const shape of gridShapes) {
        if (brainElapsed > shape.fadeDelay) {
          const fadeProgress = (brainElapsed - shape.fadeDelay) / 600;
          shape.fadeOpacity = Math.min(1, fadeProgress);
        }

        if (shape.fadeOpacity === 0) continue;

        if (shape.fadeOpacity === 1 && !shape.isLit && Math.random() < 0.003) {
          shape.isLit = true;
          shape.litUntil = time + randomBetween(1200, 2000);
        }
        
        if (shape.isLit && time > shape.litUntil) {
          shape.isLit = false;
        }
        
        const [r, g, b] = shape.color;
        
        if (shape.isLit) {
          const pulse = 0.5 + 0.5 * Math.sin(t * shape.pulseSpeed * 3 + shape.pulsePhase);
          const alpha = (0.6 + pulse * 0.4) * shape.fadeOpacity;
          drawShape(shape.x, shape.y, shape.size, shape.type, r, g, b, true, alpha);
        } else {
          ctx.globalAlpha = shape.fadeOpacity * 0.4;
          drawShape(shape.x, shape.y, shape.size, shape.type, r, g, b, false, 0);
          ctx.globalAlpha = 1;
        }
      }

      ctx.restore();
    };

    const drawAscii = (time: number) => {
      const t = time / 1000;
      ctx.save();
      ctx.font = "11px Menlo, Monaco, Consolas, 'Fira Code', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const brainElapsed = animationStateRef.current.brainStartTime > 0 ? time - animationStateRef.current.brainStartTime : 0;

      for (const p of asciiPoints) {
        if (brainElapsed > p.fadeDelay) {
          const fadeProgress = (brainElapsed - p.fadeDelay) / 600;
          p.fadeOpacity = Math.min(1, fadeProgress);
        }

        if (p.fadeOpacity === 0) continue;

        const jitterAngle = p.phase + t * p.speed * 1.2;
        const jitterX = Math.cos(jitterAngle) * p.jitterRadius;
        const jitterY = Math.sin(jitterAngle * 1.1) * p.jitterRadius;

        let alpha = p.baseAlpha * p.fadeOpacity;

        if (p.fadeOpacity === 1 && p.isBinary && Math.random() < 0.008) {
          p.char = p.char === "0" ? "1" : "0";
          p.flickerUntil = time + 220 + Math.random() * 200;
        }

        if (time < p.flickerUntil) {
          alpha = Math.min(0.95, (p.baseAlpha + 0.2) * p.fadeOpacity);
          if (theme === 'dark') {
            ctx.fillStyle = `rgba(160,160,160,${alpha.toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(60,60,60,${alpha.toFixed(3)})`;
          }
        } else {
          if (theme === 'dark') {
            ctx.fillStyle = `rgba(160,160,160,${alpha.toFixed(3)})`;
          } else {
            ctx.fillStyle = `rgba(100,100,100,${alpha.toFixed(3)})`;
          }
        }

        const x = p.baseX + jitterX;
        const y = p.baseY + jitterY;

        ctx.fillText(p.char, x, y);
      }

      ctx.restore();
    };

    const drawBrainOutlines = () => {
      if (animationStateRef.current.outlineProgress === 0) return;

      ctx.save();
      
      const outlineColor = theme === 'dark' ? 'rgba(120,120,120,0.5)' : 'rgba(150,150,150,0.6)';
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const numPoints = 120;
      
      const leftScale = 1 + hoverStateRef.current.left * 0.08;
      const rightScale = 1 + hoverStateRef.current.right * 0.08;
      
      const leftPathLength = numPoints / 2;
      const rightPathLength = numPoints / 2;
      const totalPathLength = leftPathLength + rightPathLength;
      
      const pointsToDraw = animationStateRef.current.outlineProgress * totalPathLength;
      
      ctx.save();
      ctx.translate(cxLeft, cy);
      ctx.scale(leftScale, leftScale);
      ctx.translate(-cxLeft, -cy);
      
      ctx.beginPath();
      let firstPoint = true;
      const leftPointsToDraw = Math.min(leftPathLength, pointsToDraw);
      for (let i = 0; i <= leftPointsToDraw; i++) {
        const angle = Math.PI / 2.15 + (i / (numPoints / 2)) * Math.PI;
        
        const baseR = rx * (0.98 + 0.08 * Math.sin(angle * 7) + 0.04 * Math.cos(angle * 13));
        const baseRy = ry * (0.98 + 0.06 * Math.cos(angle * 5) + 0.05 * Math.sin(angle * 11));
        
        const ridgeDepth = 0.03 + 0.02 * Math.sin(angle * 19);
        const ridgeFactor = 1 - ridgeDepth * Math.cos(angle * 23);
        
        const x = cxLeft + Math.cos(angle) * baseR * ridgeFactor - 6;
        const y = cy + Math.sin(angle) * baseRy * ridgeFactor - 8;
        
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.translate(cxRight, cy);
      ctx.scale(rightScale, rightScale);
      ctx.translate(-cxRight, -cy);
      
      if (pointsToDraw > leftPathLength) {
        ctx.beginPath();
        firstPoint = true;
        const rightPointsToDraw = Math.min(rightPathLength, pointsToDraw - leftPathLength);
        for (let i = 0; i <= rightPointsToDraw; i++) {
          const angle = -Math.PI / 2 + (i / (numPoints / 2)) * Math.PI;
          
          const baseR = rx * (0.98 + 0.07 * Math.sin(angle * 6) + 0.05 * Math.cos(angle * 14));
          const baseRy = ry * (0.98 + 0.05 * Math.cos(angle * 8) + 0.06 * Math.sin(angle * 12));
          
          const ridgeDepth = 0.025 + 0.025 * Math.sin(angle * 17);
          const ridgeFactor = 1 - ridgeDepth * Math.cos(angle * 21);
          
          const x = cxRight + Math.cos(angle) * baseR * ridgeFactor + 6;
          const y = cy + Math.sin(angle) * baseRy * ridgeFactor;
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();
      
      ctx.restore();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      if (!animationStateRef.current.animationStarted) {
        animationStateRef.current.animationStarted = true;
        animationStateRef.current.brainStartTime = time;
      }

      const BRAIN_FADE_DURATION = 1800;
      const OUTLINE_START_DELAY = 1400;
      const OUTLINE_DRAW_DURATION = 1500;

      if (animationStateRef.current.brainStartTime > 0) {
        const brainElapsed = time - animationStateRef.current.brainStartTime;
        
        if (brainElapsed >= OUTLINE_START_DELAY) {
          if (animationStateRef.current.outlineStartTime === 0) {
            animationStateRef.current.outlineStartTime = time;
          }
          const outlineElapsed = time - animationStateRef.current.outlineStartTime;
          animationStateRef.current.outlineProgress = Math.min(1, outlineElapsed / OUTLINE_DRAW_DURATION);
        }
      }
      
      drawBrainOutlines();
      
      const leftScale = 1 + hoverStateRef.current.left * 0.08;
      ctx.save();
      ctx.translate(cxLeft, cy);
      ctx.scale(leftScale, leftScale);
      ctx.translate(-cxLeft, -cy);
      drawGridShapes(time);
      ctx.restore();
      
      const rightScale = 1 + hoverStateRef.current.right * 0.08;
      ctx.save();
      ctx.translate(cxRight, cy);
      ctx.scale(rightScale, rightScale);
      ctx.translate(-cxRight, -cy);
      drawAscii(time);
      ctx.restore();
      
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const leftDx = mouseX - cxLeft;
      const leftDy = mouseY - cy;
      const leftDist = Math.sqrt(leftDx * leftDx / (rx * rx) + leftDy * leftDy / (ry * ry));
      const isOverLeft = leftDist <= 1.1 && mouseX < width / 2;
      
      const rightDx = mouseX - cxRight;
      const rightDy = mouseY - cy;
      const rightDist = Math.sqrt(rightDx * rightDx / (rx * rx) + rightDy * rightDy / (ry * ry));
      const isOverRight = rightDist <= 1.1 && mouseX >= width / 2;
      
      const transitionSpeed = 0.15;
      if (isOverLeft) {
        hoverStateRef.current.left = Math.min(1, hoverStateRef.current.left + transitionSpeed);
      } else {
        hoverStateRef.current.left = Math.max(0, hoverStateRef.current.left - transitionSpeed);
      }
      
      if (isOverRight) {
        hoverStateRef.current.right = Math.min(1, hoverStateRef.current.right + transitionSpeed);
      } else {
        hoverStateRef.current.right = Math.max(0, hoverStateRef.current.right - transitionSpeed);
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      initGeometry(rect.width, rect.height);
    } else {
      initGeometry(600, 400);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === parent) {
          const { width: w, height: h } = entry.contentRect;
          initGeometry(w, h);
        }
      }
    });
    if (parent) {
      resizeObserver.observe(parent);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        filter: "drop-shadow(0 0 24px rgba(255,255,255,0.08))",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default AsciiBrain;