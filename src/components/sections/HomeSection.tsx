import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Tile } from '../Tile';
import { TileGrid } from '../TileGrid';
import AsciiBrain from '../AsciiBrain';
import { SubdividedTile } from '../SubdividedTile';
import tradingImage from '../../assets/1fb9888ffac30fdf23539e25315c628ebc8f6884.png';
import motorcycleGif from '../../assets/0a5e61f5489fc00d8b6a31c13fed4c58f3ff1d79.png';
import catImage from '../../assets/940befdff2c2866d4bc99734c581dcb048fdf34f.png';
import calendarIcon from '../../assets/ad9e72c4f8cacd3702a57f7914f071255ab7a2ed.png';
import emailIcon from '../../assets/9593450cb8b78e77237863ee5a02267d42340789.png';
import linkedinIcon from '../../assets/f1ba35bb4fd41e1b9a71c24479b836c57e7d1586.png';
import telegramIcon from '../../assets/6b224fb116e0caa3076a021ae6c5e57427d9b894.png';
import amplitudeLogo from '../../assets/372acaaf8adf70ed5b3d005b609ac106043f4128.png';
import figmaLogo from '../../assets/2bb6cb2d4dff2cca9e7b0eb0110f8acac9ebf519.png';
import chatgptLogo from '../../assets/68f23de2bd5734f8e24655571d20f47cdfbb9d60.png';
import jiraLogo from '../../assets/0b7e55b840e033a7ac832270c171ae6cdbbc406d.png';
import etherscanLogo from '../../assets/c0767c776d80904df3ca4f053cde3e4a321a50cf.png';
import adobeLogo from '../../assets/d6961e7af8c29d7b9b852f65aa2d369f2e816e39.png';
import defillamaLogo from '../../assets/20e638b6781b1accf1eb0f1c8a7447e887529c00.png';
import duneLogo from '../../assets/bc1efdeea92fdb2470b2dea1a8dbe2bf6d59cc0c.png';
import potpieLogo from '../../assets/67912ee6fd693dc6c36117524ea8e2931e8e2c2d.png';

export function HomeSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toolLogos = [
    amplitudeLogo, 
    figmaLogo, 
    chatgptLogo, 
    jiraLogo, 
    etherscanLogo,
    adobeLogo,
    defillamaLogo,
    duneLogo,
    potpieLogo
  ];

  const toolNames = [
    'Amplitude',
    'Figma',
    'ChatGPT',
    'Jira',
    'Etherscan',
    'Adobe Express',
    'DefiLlama',
    'Dune Analytics',
    'Potpie'
  ];

  const xTranslation = useMotionValue(0);
  
  // Calculate total width of one set of logos
  // Logo width 64px (w-16) + Gap 24px (gap-6) = 88px
  const totalWidth = toolLogos.length * 88;

  useAnimationFrame((time, delta) => {
    if (!isPaused) {
      // Move totalWidth in 20 seconds
      const speed = totalWidth / 20;
      const move = (speed * delta) / 1000;
      let newX = xTranslation.get() - move;
      
      if (newX <= -totalWidth) {
        newX += totalWidth;
      }
      xTranslation.set(newX);
    }
  });

  return (
    <TileGrid>
      <Tile span="wide" glass>
        <div className="px-12 py-6 flex flex-col gap-3 justify-center h-full">
          <h2 className="text-white">Hi, I'm Akhil —</h2>
          <p className="text-gray-400">A product architect with a designer's eye and systems thinker's brain.</p>
        </div>
      </Tile>
      <Tile span="medium" glass>
        <AsciiBrain theme="dark" />
      </Tile>
      <SubdividedTile span="medium" glass>
        {[
          <div key="1" className="h-full flex items-center justify-center">
            <img src={telegramIcon} alt="Telegram" className="w-9 h-9 brightness-0 invert" />
          </div>,
          <div key="2" className="h-full flex items-center justify-center">
            <img src={linkedinIcon} alt="LinkedIn" className="w-10 h-10" />
          </div>,
          <div key="3" className="h-full flex items-center justify-center">
            <img src={emailIcon} alt="Email" className="w-10 h-10" />
          </div>,
          <div key="4" className="h-full flex items-center justify-center">
            <img src={calendarIcon} alt="Calendar" className="w-10 h-10" />
          </div>
        ]}
      </SubdividedTile>
      <Tile span="medium" glass>
        <img src={tradingImage} alt="Trading interface" className="w-full h-full object-cover object-center" />
      </Tile>
      <Tile span="wide" glass>
        <div className="px-12 py-6 flex flex-col gap-3 justify-center h-full">
          <p className="text-gray-400">A <span className="underline">PM-Designer by craft</span>, I've helped grow Pratilipi (Tencent-funded) to 30mn MAU, productised contract insights at Kleros and built the 0-1 product of a DeSci startup.</p>
          <p className="text-gray-400 italic">I'm currently available for full-time roles!</p>
        </div>
      </Tile>
      <Tile span="medium" glass className="!overflow-visible">
        <div className="flex flex-col items-center h-full gap-4 pt-10">
          <h3 className="text-white text-center">Tool Stack</h3>
          <div 
            ref={containerRef}
            className="relative w-full overflow-hidden pt-8 pb-12"
          >
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
            
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex gap-6 items-center"
              style={{ x: xTranslation }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                setIsPaused(false);
                setHoveredIndex(null);
              }}
            >
              {[...toolLogos, ...toolLogos].map((logo, index) => {
                const toolIndex = index % toolLogos.length;
                const isHovered = hoveredIndex === index;
                
                return (
                  <div
                    key={index}
                    className="relative flex-shrink-0"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={logo}
                      alt={toolNames[toolIndex]}
                      className="w-16 h-16 object-contain"
                    />
                    {isHovered && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50">
                        {toolNames[toolIndex]}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Tile>
      <Tile span="medium" glass>
      </Tile>
      <Tile span="medium" glass>
        <img src={motorcycleGif} alt="Motorcycle" className="w-full h-full object-cover" />
      </Tile>
      <Tile span="wide" glass>
        <div className="px-12 py-6 flex flex-col justify-center h-full">
          <p className="text-gray-400">I spend my days & nights building, evenings scoring goals, and in between — I ride my motorcycle and pet stray cats.</p>
          <p className="text-gray-400 mt-4">From being stateless in the Turkish border to living in network states, I have wicked stories from my travel to 20 countries 🎢</p>
        </div>
      </Tile>
    </TileGrid>
  );
}