import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "motion/react";

import { Tile } from "../Tile";
import { TileGrid } from "../TileGrid";
import { SubdividedTile } from "../SubdividedTile";
import { ExternalLink, Globe, X, ArrowUpRight } from "lucide-react";
import { PdfModal } from "../PdfModal";
import { DesignModal } from "../DesignModal";

// Work Design Tile Component with hover effects
function WorkDesignTile({
  image,
  alt,
  company,
  onModalOpen
}: {
  image: string;
  alt: string;
  company: string;
  onModalOpen: (metadata: any) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getMetadata = () => {
    const metadataMap: Record<string, any> = {
      // Causality
      'Causality Workex UI': {
        image,
        title: 'Causality Network v1 App',
        subtitle: 'On-chain data integrity verification',
        description: 'A comprehensive platform for researchers to attest to their data integrity using blockchain technology. Built with React and integrated with Base network for seamless on-chain attestations.',
        project: 'Causality Network',
        category: 'Product Design',
        industry: 'DeSci'
      },
      'Balaji x Causality': {
        image,
        title: "Balaji's Network School x CN",
        subtitle: 'EEG data collection and analysis',
        description: 'Collaborative neuroscience experiments conducted with Network State participants. Collected EEG data from diverse demographics to validate the platform\'s data integrity mechanisms.',
        project: 'Causality Network',
        category: 'Research Integration',
        industry: 'Neuroscience'
      },

      // Kleros
      'Kleros Token Curated Registry': {
        image,
        title: 'Kleros Scout - Tokens',
        subtitle: 'Community curated token lists',
        description: 'A decentralized platform for token curation where community members stake tokens to curate high-quality token lists. Built on Ethereum with Schelling point coordination mechanisms.',
        project: 'Kleros Scout',
        category: 'dApp Design',
        industry: 'DeFi'
      },

      // Pratilipi
      'Pratilipi Login Screen': {
        image,
        title: 'Sign Up Screen - Pratilipi',
        subtitle: 'Streamlined authentication flow',
        description: 'Designed the complete user journey from signup to first read, optimizing for vernacular language users across India. Achieved 35% improvement in app launch to first read conversion.',
        project: 'Pratilipi',
        category: 'Mobile UX',
        industry: 'Content Platform'
      },
      'Pratilipi Language Selection': {
        image,
        title: 'Vernacular Language Support',
        subtitle: 'Localized user experience',
        description: 'Implemented comprehensive language selection interface supporting 12+ Indian vernacular languages. Designed to reduce cognitive load and improve accessibility for non-English speaking users.',
        project: 'Pratilipi',
        category: 'Localization UX',
        industry: 'Content Platform'
      },

      // Tring
      'Tring - Permission website square': {
        image,
        title: 'Notification Permissions',
        subtitle: 'User consent and control',
        description: 'Designed the permission request flow for AI-powered notifications, balancing user privacy with app functionality. Created clear, non-intrusive permission prompts.',
        project: 'Tring',
        category: 'Permissions UX',
        industry: 'Productivity'
      },
      'Tring Notifications Widget': {
        image,
        title: 'Tring Notifications Widget',
        subtitle: 'Smart Notification Management',
        description: 'An intelligent widget that groups and prioritizes notifications based on user context and importance. Reduces visual clutter and helps users stay focused on what matters.',
        project: 'Tring',
        category: 'Widget Design',
        industry: 'Productivity'
      },
      'Tring Onboarding': {
        image,
        title: 'AI Assistant Setup',
        subtitle: 'Smart notification intelligence',
        description: 'Built the onboarding experience for users to train the AI assistant on their notification preferences. Implemented progressive disclosure and contextual guidance.',
        project: 'Tring',
        category: 'Onboarding Flow',
        industry: 'AI/ML'
      },
      'Tring UX Case Study': {
        image,
        title: 'Notification Intelligence',
        subtitle: 'AI-powered productivity enhancement',
        description: 'Comprehensive UX case study for an AI assistant that learns user behavior to optimize notification delivery and timing. Reduced notification fatigue while maintaining engagement.',
        project: 'Tring',
        category: 'UX Research',
        industry: 'Productivity'
      },

      // Side Projects
      'Rabby x Pay with Links': {
        image,
        title: 'Rabby x Pay with Links',
        subtitle: 'Wallet-Integrated Payment Links',
        description: 'Seamless payment link generation directly within the Rabby wallet interface. Enables users to request crypto payments easily via shareable links.',
        project: 'Peanut Protocol',
        category: 'Wallet Integration',
        industry: 'Web3 Payments'
      },
      'Rwazi - Ela Intro': {
        image,
        title: 'AI Lifestyle Assistant',
        subtitle: 'Personalized habit tracking',
        description: 'Redesigned the onboarding and home experience for an AI-powered lifestyle assistant. Focused on habit formation, personalized recommendations, and seamless AI chat integration.',
        project: 'Rwazi',
        category: 'AI Product Design',
        industry: 'Consumer Tech'
      },
      'LegalFlow - Cases Dashboard': {
        image,
        title: 'Legal Document Management',
        subtitle: 'AI-powered case organization',
        description: 'Built an intelligent dashboard for legal professionals to manage cases, documents, and due diligence workflows. Integrated AI for document extraction and automated categorization.',
        project: 'LegalFlow',
        category: 'Legal Tech',
        industry: 'Professional Services'
      },
      'LegalFlow - Prompt Builder': {
        image,
        title: 'AI Prompt Engineering',
        subtitle: 'Deterministic legal workflows',
        description: 'Designed a prompt builder interface for lawyers to create deterministic AI interactions. Enabled complex legal research workflows with predictable, auditable AI responses.',
        project: 'LegalFlow',
        category: 'AI Interface Design',
        industry: 'Legal Tech'
      }
    };
    return metadataMap[alt] || { image, title: alt, description: alt };
  };

  return (
    <div
      className="w-full h-full bg-[#080808] overflow-hidden cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onModalOpen(getMetadata())}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      {/* Hover overlay with title */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 ease-out z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
      />

      {/* Title text */}
      <div
        className="absolute transition-opacity duration-500 ease-out z-10"
        style={{
          left: '8px',
          right: '8px',
          bottom: '8px',
          padding: '12px 16px',
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
      >
        <h3 className="text-white text-sm font-medium leading-tight">
          {getMetadata().title}
        </h3>
      </div>
    </div>
  );
}
import { getImageKitUrl, getImageKitRawUrl } from "../../imagekit-urls";

// Work tab tile backgrounds - medium size (1200px)
const pratilipiImg = getImageKitUrl("e2f264f6b30b71e8e14fca1ef3158cfc8c2426f9.png", "medium");
const causalityImg = getImageKitUrl("d1bd499ef33469cafbd36bce53b70f842ff21394.png", "medium");
const klerosImg = getImageKitUrl("4adf5b708eba98dfc09a1a706e57febd861083fc.png", "medium");
const sideProjectsImg = getImageKitUrl("7a7730582151772e984109aab889ff7f446cd66b.png", "medium");
const tringImg = getImageKitUrl("8ca4b23ff1b62ab8ad88c6732101f2d4996988d9.png", "medium");

// Work detail view images - medium size (1200px)
const causalityBalaji1 = getImageKitUrl("c853ee53c2b660a7b602ed02ff8c8db42d96b37f.png", "medium");
const causalityBalaji2 = getImageKitUrl("a75c7af7f7ba5692a75e77222ac72ec31d30386d.png", "medium");
const causalityNeuromarketing = getImageKitUrl("0297020406e76a9925410ff783ce9aebd882a31e.png", "medium");
const amplitudeCaseStudyImg = getImageKitUrl("cd60624f3996afc92460d14d7457ae655c409d6f.png", "medium");
const pratilipiLanguageScreen = getImageKitUrl("6e1d5cb6998308302bbf94f6d4779152cd11e550.png", "medium");
const pratilipiLoginScreen = getImageKitUrl("e3d4d917233b2a400c5f09159992f2ab28a6b380.png", "medium");
const klerosMetaMask = getImageKitUrl("44cfe9985642247e29a06f6db31933ad95088f56.png", "medium");
const klerosScout = getImageKitUrl("d485154df3065e4398ba92f69db0eda409c47ac1.png", "medium");
const klerosTokens = getImageKitUrl("679dcc21ea1ec324dc2f38b434f58229fd9b6096.png", "medium");
const klerosTokenList = getImageKitUrl("6ef5d1608b5121a806fd9e5a0a0aeb23da2636ac.png", "medium");
const tringNotificationImg = getImageKitUrl("e58087eed387584ba2529fe3efbe4e4da1e45500.png", "medium");
const tringOnboardingImg = getImageKitUrl("a1555cb8bf389a1162466d2a1688db35576f4976.png", "medium");
const causalityWorkexUi = getImageKitUrl("night_causality workex ui.png", "medium");
const balajiXCausality = getImageKitUrl("balaji x causality.png", "medium");
const neurolensWebsiteTile = getImageKitUrl("neurolens website tile.png", "medium");
const tringPermissionWebsiteSquare = getImageKitUrl("night_Tring - Permission website square.png", "medium");
const tringCaseStudyImg = getImageKitUrl("111.png", "medium");
const rabbyPayWithLinksTile = getImageKitUrl("night_Rabby - Pay with linkswebsite tile.png", "medium");
const rwaziElaIntroTile = getImageKitUrl("night_Rwazi - Ela Introwebsite tile.png", "medium");
const legalFlowCasesDashboardTile = getImageKitUrl("night_LegalFlow - Cases Dashboardwebsite tile.png", "medium");
const legalFlowPromptBuilderTile = getImageKitUrl("night_LegalFlow - Prompt Builderwebsite tile.png", "medium");

// Small logos - thumbnail size (400px)
const maxPlanckLogo = getImageKitUrl("max planck.png", "thumbnail");
const imperialCollegeLogo = getImageKitUrl("imperial college.png", "thumbnail");
const kingsCollegeLogo = getImageKitUrl("kings college.png", "thumbnail");
const opencellLogo = getImageKitUrl("opencell.png", "thumbnail");
const bristolLogo = getImageKitUrl("bristol.png", "thumbnail");
const wisconsinLogo = getImageKitUrl("wisconsin.png", "thumbnail");

// PDF stays as raw
const neurolensReport = getImageKitRawUrl("Final NeuroLens Case Study Report (1) (1)_compressed.pdf");

interface WorkTileProps {
  company: string;
  role: string;
  tags: string[];
  dateRange: string;
  url: string;
  image: string;
  span?: "small" | "medium" | "large" | "wide" | "tall";
  imagePosition?: string;
  slug?: string;
  onClick?: () => void;
  className?: string;
}

function WorkTile({ company, role, tags, dateRange, url, image, span = 'medium', imagePosition = 'center', onClick, className = '' }: WorkTileProps) {
  // Determine if this is a bottom row tile (Tring or Side Projects) - for mobile only
  const isBottomRowTile = company === 'Tring' || company === 'Side Projects/Consulting';

  return (
    <Tile span={span} className={`group cursor-pointer hover:bg-[#2a2a2a] transition-colors relative work-tile ${className}`}>
      <div className="absolute inset-0" onClick={onClick}>
        <img
          src={image}
          alt={company}
          className="w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>

      {/* Text content - anchored to bottom */}
      <div className={`work-tile-content relative mt-auto px-6 pb-6 pt-20 flex flex-col gap-3 pointer-events-none ${isBottomRowTile ? 'work-tile-bottom-row' : ''}`}
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 8, 8, 0.6) 40%, rgba(8, 8, 8, 0.6) 60%, rgba(8, 8, 8, 0.9) 100%)'
        }}>
        {/* Company name (bottom-most in visual hierarchy, top-most in code) */}
        <h3 className="text-white work-tile-company">{company}</h3>

        {/* Role */}
        <p className="text-gray-400 text-sm work-tile-role">{role}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 work-tile-tags">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-700/80 text-gray-300 text-xs rounded backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date and link (at the very bottom) */}
        <div className="flex items-center justify-between text-sm min-h-[20px] pointer-events-auto work-tile-footer">
          <span className="text-gray-500">{dateRange}</span>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-1"
              onClick={(e: any) => e.stopPropagation()}
            >
              <span className="text-xs">{url}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </Tile>
  );
}





function WorkDetail({ work, onClose }: { work: WorkTileProps, onClose: () => void }) {
  // Mobile scroll restriction logic removed per user request

  // Triple the tags to ensure smooth infinite scrolling even with few tags
  const scrolledTags = [...work.tags, ...work.tags, ...work.tags];

  // PDF Modal state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Design Modal state
  const [selectedDesignItem, setSelectedDesignItem] = useState<{
    image: string;
    title: string;
    subtitle?: string;
    description?: string;
    project?: string;
    category?: string;
    industry?: string;
  } | null>(null);

  // Pilot Partners logos state and animation (for Causality Network)
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pratilipi data point state
  const [pratilipiDataPoint, setPratilipiDataPoint] = useState(0);

  // Switch Pratilipi data points every 7 seconds
  useEffect(() => {
    if (work.company === 'Pratilipi') {
      const interval = setInterval(() => {
        setPratilipiDataPoint((prev: number) => (prev === 0 ? 1 : 0));
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [work.company]);


  const partnerLogos = [
    maxPlanckLogo,
    imperialCollegeLogo,
    kingsCollegeLogo,
    opencellLogo,
    bristolLogo,
    wisconsinLogo
  ];

  const partnerNames = [
    'Max Planck Institute for Human Cognitive & Brain Science',
    'Imperial College London',
    "King's College London",
    'openCELL bio',
    'University of Bristol',
    'University of Wisconsin-Madison'
  ];

  const xTranslation = useMotionValue(0);

  // Calculate total width of one set of logos
  // Logo width 64px (w-16) + Gap 24px (gap-6) = 88px
  const totalWidth = partnerLogos.length * 88;

  useAnimationFrame((time, delta) => {
    if (!isPaused && work.company === 'Causality Network') {
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

  const NavTile = () => (
    <div className="work-detail-nav-tile col-span-1 row-span-1 grid grid-cols-2 grid-rows-2 gap-4 h-full">
      <div
        className="bg-[#080808] rounded-lg overflow-hidden h-full w-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
        onClick={() => work.url && window.open(work.url.startsWith('http') ? work.url : `https://${work.url}`, '_blank')}
      >
        <Globe className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>

      <div
        className="bg-[#080808] rounded-lg overflow-hidden h-full w-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
        onClick={onClose}
      >
        <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
          <X className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </div>
      </div>

      <div className="col-span-2 bg-[#080808] rounded-lg overflow-hidden flex items-center relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-3 px-4 w-max"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {scrolledTags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-gray-800/50 text-gray-300 text-sm rounded-lg whitespace-nowrap border border-white/5"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile-only styles */}
      <style>{`
      @media (max-width: 767px) {
        /* Make the container scrollable */
        .work-detail-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          grid-auto-rows: min-content !important;
          align-items: stretch !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          height: 100% !important;
          max-height: calc(100vh - 60px) !important;
          -webkit-overflow-scrolling: touch !important;
          padding-bottom: 1rem !important;
          /* Hide scrollbar */
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* IE/Edge */
        }
        .work-detail-grid::-webkit-scrollbar {
          display: none !important; /* Chrome/Safari/Opera */
        }
        
        /* Two-tile rows: height = width of one tile (square tiles) */
        .work-detail-tile-1,
        .work-detail-tile-3,
        .work-detail-tile-5,
        .work-detail-tile-6,
        .work-detail-tile-7,
        .work-detail-tile-8 {
          aspect-ratio: 1 !important;
          width: 100% !important;
        }
        
        /* Override any Tailwind span classes on mobile */
        .work-detail-grid > * {
          max-width: 100% !important;
        }
        
        /* Force equal column spans for two-tile rows */
        .work-detail-tile-1,
        .work-detail-tile-3,
        .work-detail-tile-5,
        .work-detail-tile-6,
        .work-detail-tile-7,
        .work-detail-tile-8 {
          grid-column: span 1 !important;
        }
        
        /* Row 1: Image (left) + NavTile (right) */
        .work-detail-tile-1 { 
          grid-column: 1 / span 1 !important; 
          grid-row: 1 !important; 
        }
        .work-detail-tile-3 { 
          grid-column: 2 / span 1 !important; 
          grid-row: 1 !important; 
        }
        /* NavTile wrapper */
        .work-detail-tile-3 {
          aspect-ratio: 1 !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        /* NavTile internal spacing */
        .work-detail-tile-3 .work-detail-nav-tile {
          height: 100% !important;
          gap: 8px !important;
          padding: 0 !important;
          flex: 1 !important;
        }
        
        /* Row 2: Company name + role (full width) */
        .work-detail-tile-2 { 
          grid-column: 1 / -1 !important; 
          grid-row: 2 !important; 
        }
        
        /* Row 3: Pilot Partners/Growth Impact (left) + Mockup (right) */
        .work-detail-tile-5 { 
          grid-column: 1 / span 1 !important; 
          grid-row: 3 !important; 
        }
        .work-detail-tile-6 { 
          grid-column: 2 / span 1 !important; 
          grid-row: 3 !important; 
        }
        
        /* Row 4: "As Product Lead..." (full width) */
        .work-detail-tile-4 { 
          grid-column: 1 / -1 !important; 
          grid-row: 4 !important; 
        }
        
        /* Row 5: Image tiles */
        .work-detail-tile-7 { 
          grid-column: 1 / span 1 !important; 
          grid-row: 5 !important; 
        }
        .work-detail-tile-8 { 
          grid-column: 2 / span 1 !important; 
          grid-row: 5 !important; 
        }
        
        /* Row 6: "Our GTM experiments..." (full width) */
        .work-detail-tile-9 { 
          grid-column: 1 / -1 !important; 
          grid-row: 6 !important; 
        }
        
        /* Text tiles - ensure all text is visible */
        .work-detail-text-tile {
          min-height: auto !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }
        .work-detail-text-tile > div {
          height: auto !important;
          min-height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }
        .work-detail-text-tile .work-detail-content {
          padding: 12px 16px !important;
          gap: 6px !important;
          min-height: fit-content !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
        }
        .work-detail-text-tile .work-detail-content > div {
          width: 100% !important;
          flex-shrink: 0 !important;
        }
        .work-detail-text-tile h2 {
          font-size: 18px !important;
          line-height: 1.3 !important;
        }
        .work-detail-text-tile h3 {
          font-size: 14px !important;
        }
        .work-detail-text-tile p {
          font-size: 13px !important;
          line-height: 1.4 !important;
          overflow: visible !important;
          text-overflow: clip !important;
          white-space: normal !important;
        }
        
        /* Company name tile - special styling */
        .work-detail-company-tile h2 {
          font-size: 20px !important;
          font-weight: 500 !important;
        }
        
        /* Pilot Partners tile - vertical centering */
        .work-detail-tile-5 .pilot-partners-content {
          justify-content: center !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        .work-detail-tile-5 .pilot-partners-content > div:last-child {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        
        /* Pratilipi growth tiles - smaller text */
        .pratilipi-growth-tile h3 {
          font-size: 0.7rem !important;
        }
        .pratilipi-growth-tile h2 {
          font-size: 2.5rem !important;
        }
        .pratilipi-growth-tile p {
          font-size: 0.65rem !important;
        }
        
        /* Kleros growth tile - smaller text */
        .kleros-growth-tile h3 {
          font-size: 0.8rem !important;
        }
        .kleros-growth-tile h2 {
          font-size: 2.5rem !important;
        }
        .kleros-growth-tile p {
          font-size: 0.7rem !important;
        }
      }
    `}</style>
      <TileGrid className="work-detail-grid">
        <Tile span="medium" glass className="work-detail-tile-1">
          <img
            src={work.image}
            alt={work.company}
            className="w-full h-full object-cover"
            style={{ objectPosition: work.imagePosition }}
          />
        </Tile>
        <Tile span="wide" glass className="work-detail-tile-2 work-detail-text-tile work-detail-company-tile">
          <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl text-white font-medium">{work.company}</h2>
              <h3 className="text-base text-gray-500">{work.role}</h3>
            </div>
            {work.company === 'Causality Network' && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  CN used on-chain attestations and hardware signatures to authenticate scientific datasets. We set out to solve the replication crisis and unlock the creator economy in science. (raised $175k from Graph Paper Capital)
                </p>
              </div>
            )}
            {work.company === 'Pratilipi' && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  Pratilipi is India's largest storytelling platform, built to democratise literature in vernacular languages for internet users in India.
                </p>
                <p className="text-base text-gray-400">
                  I led onboarding and retention through our growth from 8-30Mn MAU.
                </p>
              </div>
            )}
            {work.company === 'Kleros' && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  Kleros is a subjective oracle powered by schelling-point game theory, with dispute resolution at the heart of the protocol.
                </p>
                <p className="text-base text-gray-400">
                  Use-cases include community curated lists, prediction markets resolution, etc.
                </p>
              </div>
            )}
            {work.company === 'Tring' && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  Tring is an AI powered notifications assistant aimed at getting back user focus by optimising push notifications.
                </p>
                <p className="text-base text-gray-400">
                  By owning the primary touchpoint of app communication, our goal was to improve CTRs for marketers while improving digital well-being.
                </p>
              </div>
            )}
            {work.company === 'Side Projects/Consulting' && (
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  I've worked with 2 VC-backed startups (Peanut and Rwazi) and built a legal AI tool as a side project.
                </p>
                <p className="text-base text-gray-400">
                  My consulting work spans Product, Design and Growth across web3 payments, web2 consumer and legal AI SaaS
                </p>
              </div>
            )}
          </div>
        </Tile>
        <div className="work-detail-tile-3 col-span-1 row-span-1">
          <NavTile />
        </div>
        {['Kleros', 'Pratilipi'].includes(work.company) ? (
          <Tile span="medium" glass className="work-detail-tile-6">
            {work.company === 'Pratilipi' && (
              <WorkDesignTile
                image={pratilipiLoginScreen}
                alt="Pratilipi Login Screen"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
            {work.company === 'Kleros' && (
              <a
                href="https://klerosscout.eth.limo/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group overflow-hidden"
              >
                <div className="absolute inset-0">
                  <img
                    src={klerosScout}
                    alt="Kleros Scout - Contract Insights"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white font-medium leading-tight">Kleros Scout - Contract Insights</p>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            )}
          </Tile>
        ) : (
          <Tile span="medium" glass className={`work-detail-tile-5 ${work.company === 'Causality Network' ? "!overflow-visible" : ""}`}>
            {work.company === 'Causality Network' && (
              <div className="pilot-partners-content flex flex-col items-center h-full gap-4 pt-10">
                <h3 className="text-white text-center">Pilot Partners</h3>
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
                    style={{
                      x: xTranslation,
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => {
                      setIsPaused(false);
                      setHoveredIndex(null);
                    }}
                  >
                    {[...partnerLogos, ...partnerLogos].map((logo, index) => {
                      const partnerIndex = index % partnerLogos.length;
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
                            alt={partnerNames[partnerIndex]}
                            className="h-16 w-auto object-contain"
                          />
                          {isHovered && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-50">
                              {partnerNames[partnerIndex]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            )}
            {work.company === 'Tring' && (
              <WorkDesignTile
                image={tringNotificationImg}
                alt="Tring Notifications Widget"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
            {work.company === 'Side Projects/Consulting' && (
              <WorkDesignTile
                image={rabbyPayWithLinksTile}
                alt="Rabby x Pay with Links"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
          </Tile>
        )}

        <Tile span="wide" glass className="work-detail-tile-4 work-detail-text-tile">
          {work.company === 'Causality Network' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  As Product Lead, I designed and engineered the MVP, where data-integrity attestations are made on Base via EAS, for neuroscientific datasets produced by EEG devices.
                </p>
                <p className="text-base text-gray-400">
                  We made attestations for Imperial College London's lab data and EEG data of people at network states.
                </p>
              </div>
            </div>
          )}
          {work.company === 'Pratilipi' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <div className="flex flex-col gap-3">
                <p className="text-base text-gray-400">
                  As a PM owning the new user journey, my goal was to improve M1 retention &amp; maximise MAU contribution.
                </p>
                <p className="text-base text-gray-400">
                  From optimising onboarding funnels, crafting the push notification journey to increasing TAM of high-retention cohorts -- we grew the metric with a data-driven, experiment-led mindset.
                </p>
              </div>
            </div>
          )}
          {work.company === 'Kleros' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                As Product Lead - Curate, I designed and launched Kleros Scout to productise submission and consumption of contract &amp; wallet insights.
              </p>
              <p className="text-base text-gray-400">
                I secured a key partnership with Metamask, making us one of the first snaps to be onboarded. Other consumers of insights included Etherscan, wallets and DEXs.
              </p>
            </div>
          )}
          {work.company === 'Tring' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                As Founding PM-designer, I led user research which drove our MVP feature set and designed the end-to-end UX.
              </p>
              <p className="text-base text-gray-400">
                Our beta had ~3k users whose behaviour I analysed via SQL on Metabase.
              </p>
            </div>
          )}
          {work.company === 'Side Projects/Consulting' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                Designed mockups for Peanut's payment links on Rabby and Butter Wallet and explored strategies for Peanut App's launch at Devconnect '25.
              </p>
              <p className="text-base text-gray-400">
                Revamped Rwazi's lifestlye AI consumer app with focus on onboarding, home and AI chat interfaces.
              </p>
            </div>
          )}
        </Tile>

        {['Kleros', 'Pratilipi'].includes(work.company) ? (
          <Tile span="medium" glass className="work-detail-tile-5">
            {work.company === 'Kleros' && (
              <div className="kleros-growth-tile flex flex-col items-center justify-between h-full px-6 pt-8">
                <h3 className="text-white text-center">Growth Impact</h3>
                <h2 className="text-white font-medium" style={{ fontSize: '3.2rem' }}>2x</h2>
                <p className="text-base text-gray-400 text-center mb-8">Weekly submissions and data consumed</p>
              </div>
            )}
            {work.company === 'Pratilipi' && (
              <div className="pratilipi-growth-tile relative flex flex-col items-center justify-between h-full px-6 pt-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pratilipiDataPoint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-between px-6 pt-8"
                    style={{
                      willChange: 'opacity',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {pratilipiDataPoint === 0 ? (
                      <>
                        <h3 className="text-white text-center">Onboarding Growth</h3>
                        <h2 className="text-white font-medium" style={{ fontSize: '3.2rem' }}>25%</h2>
                        <p className="text-base text-gray-400 text-center mb-8">App Launch → First Read went from 28% to 35%</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-white text-center">Retention Growth</h3>
                        <h2 className="text-white font-medium" style={{ fontSize: '3.2rem' }}>20%</h2>
                        <p className="text-base text-gray-400 text-center mb-8">
                          d1 retention: 27% → 32%<br />
                          d7 retention: 12% → 14.5%
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </Tile>
        ) : (
          <Tile span="medium" glass className="work-detail-tile-6">
            {work.company === 'Causality Network' && (
              <WorkDesignTile
                image={causalityWorkexUi}
                alt="Causality Workex UI"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
            {work.company === 'Tring' && (
              <WorkDesignTile
                image={tringPermissionWebsiteSquare}
                alt="Tring - Permission website square"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
            {work.company === 'Side Projects/Consulting' && (
              <WorkDesignTile
                image={rwaziElaIntroTile}
                alt="Rwazi - Ela Intro"
                company={work.company}
                onModalOpen={setSelectedDesignItem}
              />
            )}
          </Tile>
        )}
        <Tile span="medium" glass className="work-detail-tile-7">
          {work.company === 'Causality Network' && (
            <WorkDesignTile
              image={balajiXCausality}
              alt="Balaji x Causality"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
          {work.company === 'Pratilipi' && (
            <WorkDesignTile
              image={pratilipiLanguageScreen}
              alt="Pratilipi Language Selection"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
          {/* Kleros: mockup image tile (Token Curated Registry) after swaps */}
          {work.company === 'Kleros' && (
            <WorkDesignTile
              image={klerosTokenList}
              alt="Kleros Token Curated Registry"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
          {work.company === 'Tring' && (
            <WorkDesignTile
              image={tringOnboardingImg}
              alt="Tring Onboarding"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
          {work.company === 'Side Projects/Consulting' && (
            <WorkDesignTile
              image={legalFlowCasesDashboardTile}
              alt="LegalFlow - Cases Dashboard"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
        </Tile>
        <Tile span="wide" glass className="work-detail-tile-9 work-detail-text-tile">
          {work.company === 'Causality Network' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-2 justify-center h-full">
              <p className="text-base text-gray-400">
                Our GTM experiments spanned commercial & academia.
              </p>
              <p className="text-base text-gray-400">
                → Pilot partnerships with Imperial College, Max Planck Institute, etc. to authenticate lab data
              </p>
              <p className="text-base text-gray-400">
                → Neuroscience experiments at Balaji's Network School
              </p>
              <p className="text-base text-gray-400">
                → Pilot with ad agency for consumer-brand insights
              </p>
            </div>
          )}
          {work.company === 'Pratilipi' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                I designed all my experiments/features and the new user journey we built has stood tall through high acquisition phases (60-100K users daily @$0.2-0.3 CPI) and otherwise.
              </p>
              <p className="text-base text-gray-400">
                I also ran social consumer experiments (feed, stories, etc.) and co-led monetisation pilots with the co-founder.
              </p>
            </div>
          )}
          {work.company === 'Kleros' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                Apart from productising contract security insights with a team of devs and BD, I reworked incentives mechanisms and contributed to tokenomics of new courts.
              </p>
              <p className="text-base text-gray-400">
                I also led the Kleros Incubator during my tenure.
              </p>
            </div>
          )}
          {work.company === 'Tring' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                For user research, I spent hours at IT park smoking zones, as our ICPs hung out there. I did about 100 IRL interviews, 300 phone interviews apart from a 1000 person survey.
              </p>
              <p className="text-base text-gray-400">
                After systematically breaking down responses, we built the MVP and released the beta to a subset of interested users.
              </p>
            </div>
          )}
          {work.company === 'Side Projects/Consulting' && (
            <div className="work-detail-content px-12 py-6 flex flex-col gap-3 justify-center h-full">
              <p className="text-base text-gray-400">
                Vibecoded a legal AI tool for document extraction and real estate due diligence; explored deterministic prompt interfaces for lawyers.
              </p>
              <p className="text-base text-gray-400">
                Deeply used AI tools for coding, design, media to 10x output and extend skillset.
              </p>
            </div>
          )}
        </Tile>
        <Tile span="medium" glass className="work-detail-tile-8">
          {work.company === 'Causality Network' && (
            <div
              className="w-full h-full relative group overflow-hidden cursor-pointer"
              onClick={() => setIsPdfModalOpen(true)}
            >
              <div className="absolute inset-0">
                <img
                  src={neurolensWebsiteTile}
                  alt="Neurolens Website Tile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium leading-tight">
                    Consumer Insights Report
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {work.company === 'Kleros' && (
            <a
              href="https://snaps.metamask.io/snap/npm/kleros/scout-snap/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative group overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src={klerosMetaMask}
                  alt="Kleros Scout x MetaMask Snap"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium leading-tight">Kleros Scout x MetaMask Snap</p>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </a>
          )}
          {work.company === 'Pratilipi' && (
            <a
              href="https://amplitude.com/case-studies/pratilipi"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative group overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src={amplitudeCaseStudyImg}
                  alt="Amplitude Case Study"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium leading-tight">Amplitude's case study on our work</p>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </a>
          )}
          {work.company === 'Tring' && (
            <a
              href="https://www.behance.net/gallery/90523289/Tring-The-Best-Notifications-Productivity-Assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative group overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src={tringCaseStudyImg}
                  alt="Tring UX Case Study"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium leading-tight">Tring UX Case Study</p>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </a>
          )}
          {work.company === 'Side Projects/Consulting' && (
            <WorkDesignTile
              image={legalFlowPromptBuilderTile}
              alt="LegalFlow - Prompt Builder"
              company={work.company}
              onModalOpen={setSelectedDesignItem}
            />
          )}
        </Tile>
      </TileGrid>
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={neurolensReport}
        title="NeuroLens Case Study Report"
      />
      {selectedDesignItem && (
        <DesignModal
          isOpen={!!selectedDesignItem}
          onClose={() => setSelectedDesignItem(null)}
          image={selectedDesignItem.image}
          title={selectedDesignItem.title}
          subtitle={selectedDesignItem.subtitle}
          description={selectedDesignItem.description}
          project={selectedDesignItem.project}
          category={selectedDesignItem.category}
          industry={selectedDesignItem.industry}
        />
      )}
    </>
  );
}

export function WorkSection() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const [selectedWork, setSelectedWork] = useState<WorkTileProps | null>(null);

  const workItems: WorkTileProps[] = useMemo(
    () => [
      {
        company: "Causality Network",
        role: "Founding PM-Designer",
        tags: ["Web3", "DeSci", "Data Integrity", "dePIN", "SaaS", "0→1"],
        dateRange: "Aug '24 → Feb '26",
        url: "causality.network",
        image: causalityImg,
        span: "wide",
        imagePosition: "right center",
        slug: "causalitynetwork",
      },
      {
        company: "Kleros",
        role: "Product Lead - Curate",
        tags: ["Web3", "Subjective Oracles", "Wallets", "LegalTech", "1→10"],
        dateRange: "Sep '22 → Aug '24",
        url: "kleros.io",
        image: klerosImg,
        span: "large",
        imagePosition: "center 80%",
        slug: "kleros",
      },
      {
        company: "Pratilipi",
        role: "PM-Designer",
        tags: ["Consumer", "Content", "Vernacular", "10→100"],
        dateRange: "Mar '20 → Apr '22",
        url: "techcrunch.com",
        image: pratilipiImg,
        span: "large",
        slug: "pratilipi",
      },
      {
        company: "Tring",
        role: "Founding PM-Designer",
        tags: ["Consumer", "Productivity", "0→1"],
        dateRange: "Feb '19 → Feb '20",
        url: "",
        image: tringImg,
        span: "medium",
        slug: "tring",
      },
      {
        company: "Side Projects/Consulting",
        role: "Product Designer",
        tags: ["Consumer", "SaaS", "Web3", "AI"],
        dateRange: "Feb '19 → Present",
        url: "",
        image: sideProjectsImg,
        span: "medium",
        slug: "sideprojects",
      },
    ],
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Don't navigate if PDF or Design modal is open - check if modal element exists
        const pdfModal = document.querySelector('[data-pdf-modal]');
        const designModal = document.querySelector('[data-design-modal]');
        if (pdfModal || designModal) {
          return; // Let the modal handle the Escape key
        }
        setSelectedWork(null);
        if (slug) navigate("/work");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, slug]);

  useEffect(() => {
    if (!slug) {
      setSelectedWork(null);
      return;
    }
    const next = workItems.find((item) => item.slug === slug.toLowerCase()) ?? null;
    setSelectedWork(next);
  }, [slug, workItems]);

  if (selectedWork) {
    return (
      <WorkDetail
        work={selectedWork}
        onClose={() => {
          setSelectedWork(null);
          navigate("/work");
        }}
      />
    );
  }

  return (
    <>
      <style>{`
        /* Mobile-only work tab layout */
        @media (max-width: 767px) {
          /* Break height into 4 equal rows */
          .work-tile-grid {
            grid-template-rows: repeat(4, 1fr) !important;
            grid-auto-rows: 0 !important;
          }
          
          /* First 3 rows: full width */
          .work-tile-causality { 
            grid-column: 1 / -1 !important; 
            grid-row: 1 !important;
          }
          .work-tile-kleros { 
            grid-column: 1 / -1 !important; 
            grid-row: 2 !important;
          }
          .work-tile-pratilipi { 
            grid-column: 1 / -1 !important; 
            grid-row: 3 !important;
          }
          
          /* Bottom row: Tring and Side Projects side by side */
          .work-tile-tring { 
            grid-column: 1 !important; 
            grid-row: 4 !important;
          }
          .work-tile-side-projects { 
            grid-column: 2 !important; 
            grid-row: 4 !important;
          }
          
          /* Darker gradient overlay for better text readability */
          .work-tile-content {
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.95) 100%) !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-bottom: 12px !important;
            padding-top: 0 !important;
            gap: 8px !important;
          }
          
          /* Ensure all text appears on full-width tiles */
          .work-tile-causality .work-tile-content,
          .work-tile-kleros .work-tile-content,
          .work-tile-pratilipi .work-tile-content {
            min-height: auto;
            justify-content: flex-end;
          }
          
          /* Bottom row tiles: only show company and tags */
          .work-tile-bottom-row .work-tile-role,
          .work-tile-bottom-row .work-tile-footer {
            display: none !important;
          }
          
          /* Reduce text sizes slightly for better fit */
          .work-tile-company {
            font-size: 16px;
            line-height: 1.3;
          }
          .work-tile-role {
            font-size: 13px;
            line-height: 1.4;
          }
          .work-tile-tags span {
            font-size: 10px;
            padding: 3px 6px;
          }
          .work-tile-footer {
            font-size: 12px;
          }
        }
      `}</style>
      <TileGrid className="work-tile-grid">
        {workItems.map((item, index) => {
          let className = '';
          if (item.company === 'Causality Network') className = 'work-tile-causality';
          else if (item.company === 'Kleros') className = 'work-tile-kleros';
          else if (item.company === 'Pratilipi') className = 'work-tile-pratilipi';
          else if (item.company === 'Tring') className = 'work-tile-tring';
          else if (item.company === 'Side Projects/Consulting') className = 'work-tile-side-projects';

          return (
            <WorkTile
              key={index}
              {...item}
              className={className}
              onClick={() => {
                if (item.slug) {
                  navigate(`/work/${item.slug}`);
                } else {
                  setSelectedWork(item);
                }
              }}
            />
          );
        })}
      </TileGrid>
    </>
  );
}
