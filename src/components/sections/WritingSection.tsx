import { useRef, useState, useEffect, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useMousePosition } from '../../contexts/MousePositionContext';
import { WhatHappensWhenYouHitSwapContent } from '../../content/articles/what-happens-when-you-hit-swap';
import { HyperliquidJourneyContent } from '../../content/articles/hyperliquid-journey-product-evolution';
import { GetRealAboutPeaqOnboardingContent } from '../../content/articles/get-real-about-peaq-onboarding';
import { GrowingMatchaDexVolumeShareContent } from '../../content/articles/growing-matcha-dex-volume-share';

// Article images
import dexSwapBanner from '../../assets/dex swap ui banner.png';
import hyperliquidBanner from '../../assets/hyperliquid_banner.webp';
import peaqBanner from '../../assets/peaq_banner.webp';
import matchaBanner from '../../assets/matcha_banner.webp';

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

// Placeholder content for articles
const PLACEHOLDER_CONTENT = `
This is the beginning of the article. Here we introduce the main concepts and set the stage for what's to come. The journey of building products in emerging technology spaces is both challenging and rewarding, offering unique opportunities to shape how people interact with new paradigms.

## The Challenge

Every product builder faces unique challenges when working in emerging technology spaces. The landscape shifts constantly, user expectations evolve, and the tools we use are often still being developed alongside our products.

Understanding these challenges is the first step toward building products that truly resonate with users and stand the test of time. Whether you're building in web3, AI, or any other cutting-edge domain, the fundamental principles remain the same.

The complexity of modern technology stacks means that product builders must wear many hats. You need to understand not just the technical implementation, but also the user psychology, market dynamics, and regulatory landscape. This multidisciplinary approach is what separates good products from great ones.

## Key Insights

Throughout my journey, I've gathered several insights that have proven invaluable:

**1. Start with the problem, not the technology.** It's easy to get caught up in the excitement of new tools and frameworks. But the most successful products are those that solve real problems for real people. The technology should be a means to an end, not the end itself.

When you lead with technology, you risk building solutions in search of problems. Instead, spend time deeply understanding your users' pain points. Conduct interviews, observe behavior, and immerse yourself in their world. Only then should you consider which technologies can best address those needs.

**2. Iterate quickly, but thoughtfully.** Speed matters, but not at the expense of learning. Each iteration should teach you something new about your users and your product. Set clear hypotheses before each experiment and measure the results rigorously.

The lean startup methodology has popularized rapid iteration, but it's often misunderstood. It's not about shipping fast and breaking things—it's about learning fast. Every release should be designed to validate or invalidate specific assumptions about your product and market.

**3. Build for the long term.** Short-term hacks might get you to launch faster, but they'll slow you down in the long run. Invest in solid foundations. Technical debt accumulates interest, and eventually, it will demand to be paid.

This doesn't mean over-engineering from day one. It means making conscious decisions about where to cut corners and where to invest. Document your trade-offs, and schedule time to address them before they become critical blockers.

## The User Experience Imperative

No matter how innovative your technology, users will judge your product by how it feels to use. The best products are those that make complex technology invisible, presenting users with simple, intuitive interfaces that just work.

Consider the most successful consumer products of the past decade. They didn't win by being the most technically sophisticated—they won by being the most user-friendly. This is especially true in emerging technology spaces, where users may be encountering entirely new concepts and paradigms.

**Reduce cognitive load.** Every decision you ask users to make is a potential point of friction. Default to sensible options, hide advanced features until needed, and guide users through complex processes with clear, step-by-step flows.

**Build trust through transparency.** In spaces like web3 and AI, users are often wary of new products. Be clear about what your product does, how it uses their data, and what risks are involved. Trust is hard to earn and easy to lose.

**Design for accessibility.** Your product should be usable by everyone, regardless of their technical expertise, physical abilities, or device constraints. This isn't just ethically right—it also expands your potential market significantly.

## Building Teams and Culture

Products are built by people, and the culture of your team will inevitably reflect in what you create. Building a strong product team requires intention and ongoing investment.

**Hire for curiosity.** In rapidly evolving spaces, specific technical skills become outdated quickly. What matters more is the ability and desire to learn. Look for people who are genuinely curious about the problems you're solving and the technologies you're using.

**Foster psychological safety.** Innovation requires experimentation, and experimentation means failure. Create an environment where team members feel safe taking risks, sharing half-formed ideas, and admitting when they don't know something.

**Communicate relentlessly.** As teams grow, alignment becomes harder. Over-communicate your vision, strategy, and priorities. Create rituals and artifacts that keep everyone on the same page, even as the organization scales.

## Looking Forward

The future is bright for those willing to put in the work. The tools are getting better, the community is growing, and the opportunities are endless. We're at the beginning of several major technological transitions, and the products built in the next decade will shape how billions of people live and work.

But with great opportunity comes great responsibility. As product builders, we have the power to create tools that enhance human potential or exploit human weakness. Choose wisely. Build products that make the world better, not just more profitable.

**Stay curious.** The moment you think you've figured it all out is the moment you start falling behind. Keep learning, keep questioning, and keep pushing the boundaries of what's possible.

**Stay humble.** No matter how successful your product becomes, remember that you're standing on the shoulders of giants. The open-source community, the research community, and countless others have contributed to making your work possible.

**Keep building.** The world needs more builders—people who see problems and create solutions, who imagine better futures and work to make them real. Don't wait for permission or perfect conditions. Start now, start small, and keep iterating.

The best time to start building was yesterday. The second best time is today.
`;

// Placeholder data with standard images
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
  {
    id: '4',
    slug: 'the-art-of-user-onboarding',
    title: 'The Art of User Onboarding',
    description: 'Data-driven strategies for improving activation rates and creating memorable first experiences for new users.',
    tags: ['UX', 'Growth'],
    date: 'Nov 15, 2024',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/article3/400/300',
    content: PLACEHOLDER_CONTENT,
  },
  {
    id: '5',
    slug: 'tokenomics-for-product-managers',
    title: 'Tokenomics for Product Managers',
    description: 'A practical guide to understanding token economics and designing sustainable incentive mechanisms.',
    tags: ['Web3', 'Economics'],
    date: 'Oct 30, 2024',
    readTime: '10 min read',
    image: 'https://picsum.photos/seed/article4/400/300',
    content: PLACEHOLDER_CONTENT,
  },
  {
    id: '6',
    slug: 'from-zero-to-one-mvp-strategies',
    title: 'From Zero to One: MVP Strategies',
    description: 'How to identify core assumptions, build the smallest possible product, and iterate based on real user feedback.',
    tags: ['Startup', 'Product'],
    date: 'Oct 15, 2024',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/article5/400/300',
    content: PLACEHOLDER_CONTENT,
  },
  {
    id: '7',
    slug: 'the-future-of-decentralized-science',
    title: 'The Future of Decentralized Science',
    description: 'Exploring how blockchain technology is transforming research funding, data integrity, and scientific collaboration.',
    tags: ['DeSci', 'Web3'],
    date: 'Sep 25, 2024',
    readTime: '12 min read',
    image: 'https://picsum.photos/seed/article6/400/300',
    content: PLACEHOLDER_CONTENT,
  },
];

// All articles including featured
const ALL_ARTICLES = [FEATURED_ARTICLE, ...ARTICLES];

// Article Detail View Component
function ArticleDetail({ article, onBack }: { article: WritingPiece; onBack: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
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
        {/* Back button */}
        <button
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
      <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
        {/* Image container - always maintains size */}
        <div 
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', paddingRight: '16px' }}>
          {/* Title */}
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>
            {article.title}
          </h2>
          
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {article.tags.map((tag, index) => (
              <span
                key={index}
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
            <p style={{ 
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280', fontSize: '0.875rem' }}>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
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
