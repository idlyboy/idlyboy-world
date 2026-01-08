import { useRef, useState, useEffect, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowUp } from 'lucide-react';
import { useMousePosition } from '../../contexts/MousePositionContext';
import { WhatHappensWhenYouHitSwapContent } from '../../content/articles/what-happens-when-you-hit-swap';
import { HyperliquidJourneyContent } from '../../content/articles/hyperliquid-journey-product-evolution';
import { GetRealAboutPeaqOnboardingContent } from '../../content/articles/get-real-about-peaq-onboarding';
import { GrowingMatchaDexVolumeShareContent } from '../../content/articles/growing-matcha-dex-volume-share';

// Article banners from Cloudinary - medium size (1200px)
import { getCloudinaryUrl } from '../../cloudinary-urls';
const dexSwapBanner = getCloudinaryUrl('dex swap ui banner.png', 'medium');
const hyperliquidBanner = getCloudinaryUrl('hyperliquid_banner.webp', 'medium');
const peaqBanner = getCloudinaryUrl('peaq_banner.webp', 'medium');
const matchaBanner = getCloudinaryUrl('matcha_banner.webp', 'medium');

// Types for writing pieces
interface WritingPiece {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  content?: string | ReactNode; // Support both string and React components
}

// Article data
const FEATURED_ARTICLE: WritingPiece = {
  id: 'featured',
  slug: 'what-happens-when-you-hit-swap',
  title: "What Happens When You Hit 'Swap'?",
  subtitle: 'A deep dive into DeFi market structure',
  description: 'Exploring the cogs that power swaps under-the-hood - AMMs, orderbooks, RFQ systems, intents, solvers, and aggregators.',
  tags: ['DeFi', 'AMMs', 'Intents', 'Market Structure'],
  date: 'Dec 5, 2025',
  readTime: '15 min read',
  image: dexSwapBanner,
  content: <WhatHappensWhenYouHitSwapContent />,
};

const ARTICLES: WritingPiece[] = [
  {
    id: '1',
    slug: 'growing-matcha-dex-volume-share',
    title: "Growing Matcha's DEX Volume Share",
    description: "A case study on growing Matcha's volume share with Dune insights, growth levers, and UX optimizations.",
    tags: ['DeFi', 'Product', 'UX'],
    date: 'Nov 20, 2025',
    readTime: '12 min read',
    image: matchaBanner,
    content: <GrowingMatchaDexVolumeShareContent />,
  },
  {
    id: '2',
    slug: 'hyperliquid-journey-product-evolution',
    title: "Hyperliquid's Journey & Product Evolution",
    description: "How Hyperliquid built the best perp DEX and is positioning itself as the AWS of liquidity infrastructure.",
    tags: ['DeFi', 'Product'],
    date: 'Nov 18, 2025',
    readTime: '5 min read',
    image: hyperliquidBanner,
    content: <HyperliquidJourneyContent />,
  },
  {
    id: '3',
    slug: 'get-real-about-peaq-onboarding',
    title: "'Get Real' about peaq's onboarding",
    description: "A UX teardown of peaq's discovery and onboarding experience for the dePIN protocol.",
    tags: ['UX', 'Web3', 'dePIN'],
    date: 'Nov 6, 2025',
    readTime: '8 min read',
    image: peaqBanner,
    content: <GetRealAboutPeaqOnboardingContent />,
  },
];

// All articles including featured
const ALL_ARTICLES = [FEATURED_ARTICLE, ...ARTICLES];

// Article Detail View Component
function ArticleDetail({ article, onBack }: { article: WritingPiece; onBack: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showCtas, setShowCtas] = useState(true);
  const lastScrollY = useRef(0);

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Handle scroll to show/hide CTAs
  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      
      // Show CTAs when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY.current) {
        setShowCtas(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowCtas(false);
      }
      
      // Always show at top
      if (currentScrollY < 50) {
        setShowCtas(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .article-reader-container {
            width: 90% !important;
          }
          .article-hero-image {
            height: auto !important;
            aspect-ratio: 16 / 9;
          }
          .article-hero-image img {
            object-fit: contain !important;
          }
          .article-title {
            font-size: 1.5rem !important;
          }
          .article-description {
            font-size: 1rem !important;
          }
          .article-content {
            font-size: 0.9375rem !important;
          }
          .article-reader-container {
            padding-top: 24px !important;
          }
          .article-ctas {
            display: flex !important;
          }
          .desktop-back-button {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .article-ctas {
            display: none !important;
          }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          padding: 'clamp(16px, 2vw, 32px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Main tile container */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#080808',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Back button - Desktop only */}
          <button
            className="desktop-back-button"
            onClick={onBack}
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#9ca3af',
              fontSize: '0.875rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Back
          </button>

          {/* Top fade gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to bottom, #080808 0%, #08080880 50%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Bottom fade gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to top, #080808 0%, #08080880 50%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Mobile CTAs - Bottom fixed */}
          <div
            className="article-ctas"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              zIndex: 20,
              display: 'none',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: showCtas ? 1 : 0,
              transform: showCtas ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: showCtas ? 'auto' : 'none',
            }}
          >
            {/* Back button */}
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: '#d1d5db',
                fontSize: '0.875rem',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
              }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              Back
            </button>

            {/* Go to Top button */}
            <button
              onClick={scrollToTop}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: '#d1d5db',
                fontSize: '0.875rem',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
              }}
            >
              Go to Top
              <ArrowUp style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          {/* Scrollable content area */}
          <div
            ref={contentRef}
            data-modal-scrollable
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >
            {/* Reader container - 60% width centered (20% blank on each side) */}
            <div
              className="article-reader-container"
              style={{
                width: '60%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingTop: '80px',
                paddingBottom: '80px',
              }}
            >
              {/* Hero Image - 35% of viewport height */}
              <div
                className="article-hero-image"
                style={{
                  width: '100%',
                  height: '35vh',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#2a2a2a',
                  marginBottom: '32px',
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>

              {/* Title */}
              <h1
                className="article-title"
                style={{
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: '20px',
                }}
              >
                {article.title}
              </h1>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: 'rgba(75, 85, 99, 0.8)',
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              {article.description && (
                <p
                  className="article-description"
                  style={{
                    color: '#9ca3af',
                    fontSize: '1.125rem',
                    lineHeight: 1.7,
                    margin: 0,
                    marginBottom: '20px',
                  }}
                >
                  {article.description}
                </p>
              )}

              {/* Date + Read time */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '48px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>

              {/* Article Content */}
              <div
                className="article-content"
                style={{
                  color: '#d1d5db',
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                }}
              >
                {/* Check if content is a React component or string */}
                {typeof article.content === 'string' ? (
                  // Render string content with basic markdown parsing
                  article.content.split('\n\n').map((paragraph, index) => {
                    // Handle headers
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2
                          key={index}
                          style={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginTop: '48px',
                            marginBottom: '24px',
                          }}
                        >
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    // Handle bold text and regular paragraphs
                    if (paragraph.trim()) {
                      return (
                        <p
                          key={index}
                          style={{
                            marginBottom: '24px',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong style="color: white;">$1</strong>'),
                          }}
                        />
                      );
                    }
                    return null;
                  })
                ) : (
                  // Render React component content directly
                  article.content
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Featured Article Tile
function FeaturedTile({ article, onClick }: { article: WritingPiece; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const { mousePos } = useMousePosition();
  const [effectIntensity, setEffectIntensity] = useState(0);
  const [gradientOrigin, setGradientOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!tileRef.current || !mousePos) {
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
    const maxRadius = 300;
    const intensity = Math.max(0, 1 - distance / maxRadius);
    setEffectIntensity(intensity);
    const relX = ((mousePos.x - rect.left) / rect.width) * 100;
    const relY = ((mousePos.y - rect.top) / rect.height) * 100;
    setGradientOrigin({ x: relX, y: relY });
  }, [mousePos]);

  const colorOpacity = effectIntensity * 0.45;
  
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .featured-tile-layout {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .featured-tile-image {
            width: 100% !important;
            height: 140px !important;
          }
          .featured-tile-content {
            padding-right: 0 !important;
            gap: 8px !important;
          }
          .featured-tile-title {
            font-size: 1.125rem !important;
          }
          .featured-tile-tag {
            padding: 2px 8px !important;
            font-size: 0.75rem !important;
          }
          .featured-tile-description {
            font-size: 0.875rem !important;
          }
          .featured-tile-meta {
            font-size: 0.75rem !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <div
        ref={tileRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: effectIntensity > 0 
            ? `rgba(6, 6, 6, ${0.92 - effectIntensity * 0.05})` 
            : '#080808',
          backdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 12}px)` : 'none',
          WebkitBackdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 12}px)` : 'none',
          border: effectIntensity > 0 
            ? `1px solid rgba(255, 255, 255, ${effectIntensity * 0.06})` 
            : '1px solid transparent',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '16px',
          textDecoration: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'border 0.3s ease',
        }}
      >
        {/* Glass gradient effect */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: colorOpacity,
            background: `
              radial-gradient(
                ellipse 80% 80% at ${gradientOrigin.x}% ${gradientOrigin.y}%,
                rgba(147, 51, 234, 0.9) 0%,
                rgba(79, 70, 229, 0.7) 15%,
                rgba(6, 182, 212, 0.5) 30%,
                transparent 50%
              )
            `,
            filter: 'blur(20px)',
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease',
          }}
        />
        <div className="featured-tile-layout" style={{ display: 'flex', height: '100%', gap: '24px' }}>
          {/* Image container */}
          <div 
            className="featured-tile-image"
            style={{
              width: '45%',
              height: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#2a2a2a',
              flexShrink: 0,
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              onLoad={() => setImageLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease, transform 0.4s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>
          
          {/* Content */}
          <div className="featured-tile-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', paddingRight: '16px' }}>
            {/* Title */}
            <h2 className="featured-tile-title" style={{ color: 'white', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>
              {article.title}
            </h2>
            
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="featured-tile-tag"
                  style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(75, 85, 99, 0.8)',
                    color: '#d1d5db',
                    fontSize: '0.875rem',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Description */}
            {article.description && (
              <p className="featured-tile-description" style={{ 
                color: '#9ca3af', 
                fontSize: '0.875rem', 
                lineHeight: 1.6, 
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {article.description}
              </p>
            )}
            
            {/* Date + Read time */}
            <div className="featured-tile-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280', fontSize: '0.875rem' }}>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Article Card
function ArticleCard({ article, onClick }: { article: WritingPiece; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const { mousePos } = useMousePosition();
  const [effectIntensity, setEffectIntensity] = useState(0);
  const [gradientOrigin, setGradientOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!tileRef.current || !mousePos) {
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
    const maxRadius = 180;
    const intensity = Math.max(0, 1 - distance / maxRadius);
    setEffectIntensity(intensity);
    const relX = ((mousePos.x - rect.left) / rect.width) * 100;
    const relY = ((mousePos.y - rect.top) / rect.height) * 100;
    setGradientOrigin({ x: relX, y: relY });
  }, [mousePos]);

  const colorOpacity = effectIntensity * 0.45;
  
  return (
    <div
      ref={tileRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: effectIntensity > 0 
          ? `rgba(6, 6, 6, ${0.92 - effectIntensity * 0.05})` 
          : '#080808',
        backdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 12}px)` : 'none',
        WebkitBackdropFilter: effectIntensity > 0 ? `blur(${effectIntensity * 12}px)` : 'none',
        border: effectIntensity > 0 
          ? `1px solid rgba(255, 255, 255, ${effectIntensity * 0.06})` 
          : '1px solid transparent',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '16px',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'border 0.3s ease',
      }}
    >
      {/* Glass gradient effect */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: colorOpacity,
          background: `
            radial-gradient(
              ellipse 80% 80% at ${gradientOrigin.x}% ${gradientOrigin.y}%,
              rgba(147, 51, 234, 0.9) 0%,
              rgba(79, 70, 229, 0.7) 15%,
              rgba(6, 182, 212, 0.5) 30%,
              transparent 50%
            )
          `,
          filter: 'blur(20px)',
          pointerEvents: 'none',
          transition: 'opacity 0.15s ease',
        }}
      />
      {/* Image container - fixed height, always visible */}
      <div 
        style={{
          width: '100%',
          height: '140px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#2a2a2a',
          flexShrink: 0,
        }}
      >
        <img
          src={article.image}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease, transform 0.4s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>
      
      {/* Spacer */}
      <div style={{ height: '16px', flexShrink: 0 }} />
      
      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {/* Title */}
        <h3 style={{ 
          color: 'white', 
          fontSize: '1rem', 
          fontWeight: 500, 
          lineHeight: 1.4, 
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.title}
        </h3>
        
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {article.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: '2px 8px',
                backgroundColor: 'rgba(75, 85, 99, 0.8)',
                color: '#d1d5db',
                fontSize: '0.75rem',
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Description */}
        {article.description && (
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '0.75rem', 
            lineHeight: 1.5, 
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {article.description}
          </p>
        )}
        
        {/* Date + Read time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.75rem', marginTop: '4px' }}>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

// Writing List View
function WritingListView({ onArticleClick }: { onArticleClick: (slug: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 3;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'black', overflow: 'hidden' }}>
      {/* Top Half - Featured Article */}
      <div 
        style={{ 
          width: '100%',
          height: '50%',
          padding: 'clamp(16px, 2vw, 32px)',
          paddingBottom: '8px',
          boxSizing: 'border-box',
        }}
      >
        <motion.div 
          style={{ width: '100%', height: '100%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeaturedTile 
            article={FEATURED_ARTICLE} 
            onClick={() => onArticleClick(FEATURED_ARTICLE.slug)}
          />
        </motion.div>
      </div>
      
      {/* Bottom Half - Article Cards */}
      <div 
        style={{ 
          width: '100%',
          height: '50%',
          padding: 'clamp(16px, 2vw, 32px)',
          paddingTop: '8px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Section Header */}
        <motion.div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '16px',
            flexShrink: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 500, margin: 0 }}>More Articles</h3>
          
          {/* Scroll Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `1px solid ${canScrollLeft ? '#4b5563' : '#1f2937'}`,
                backgroundColor: 'transparent',
                color: canScrollLeft ? '#9ca3af' : '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              }}
            >
              <ChevronLeft style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `1px solid ${canScrollRight ? '#4b5563' : '#1f2937'}`,
                backgroundColor: 'transparent',
                color: canScrollRight ? '#9ca3af' : '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
              }}
            >
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </motion.div>
        
        {/* Scrollable Cards Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          style={{ 
            flex: 1,
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            minHeight: 0,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              style={{ 
                flexShrink: 0,
                height: '100%',
                width: 'calc((100% - 32px) / 3)',
                minWidth: '240px',
              }}
            >
              <ArticleCard 
                article={article} 
                onClick={() => onArticleClick(article.slug)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WritingSection() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find article by slug
  const selectedArticle = slug ? ALL_ARTICLES.find(a => a.slug === slug) : null;

  const handleArticleClick = (articleSlug: string) => {
    navigate(`/writing/${articleSlug}`);
  };

  const handleBack = () => {
    navigate('/writing');
  };

  // Show article detail if slug is provided and article exists
  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
  }

  // Otherwise show list view
  return <WritingListView onArticleClick={handleArticleClick} />;
}
