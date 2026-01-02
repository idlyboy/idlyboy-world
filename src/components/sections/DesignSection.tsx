/// <reference path="../../vite-env.d.ts" />
import React, { useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { InfiniteCanvas } from '../InfiniteCanvas';
import { DesignTile } from '../DesignTile';
import { DesignModal } from '../DesignModal';

// Import all night_ design images (use direct file paths to avoid TS path issues)
import nightLiFiPerpsOrderbook from "../../assets/night_LI.FI Perps - Orderbook.png";
import nightKlerosScoutLandingPageBuilders from "../../assets/night_Kleros Scout Landing Page - Builders.png";
import nightRabbyPayWithLinks from "../../assets/night_Rabby - Pay with links.png";
import nightButterWalletPayWithLink from "../../assets/night_Butter Wallet - Pay with Link.png";
import nightCausalityNetworkRecord from "../../assets/night_Causality Network - Record.png";
import nightDEXSwap from "../../assets/night_DEX swap.png";
import nightGrantLinkBiconomyEcosystemGrants from "../../assets/night_GrantLink - Biconomy Ecosystem Grants Rd 2.png";
import nightGrantLinkBiconomyHome from "../../assets/night_GrantLink - Biconomy Home.png";
import nightKlerosScoutUsers from "../../assets/night_Kleros Scout - Users.png";
import nightKlerosScoutTokensApp from "../../assets/night_Kleros Scout Tokens App.png";
import nightLiFiPerpsChart from "../../assets/night_LI.FI Perps - Chart.png";
import nightLegalFlowCasesDashboard from "../../assets/night_LegalFlow - Cases Dashboard.png";
import nightLegalFlowPromptBuilder from "../../assets/night_LegalFlow - Prompt Builder.png";
import nightBookwormFeed from "../../assets/night_Bookworm - Feed.png";
import nightPratilipiHomepage from "../../assets/night_Pratilipi - Homepage.png";
import nightPratilipiLanguageSelection from "../../assets/night_Pratilipi - Language Selection.png";
import nightPratilipiNewHomepage from "../../assets/night_Pratilipi - New Homepage.png";
import nightBookwormDiscoverBooks from "../../assets/night_Bookworm - Discover Books.png";
import nightPratilipiOnboarding from "../../assets/night_Pratilipi - Onboarding.png";
import nightRentomojoCategories from "../../assets/night_Rentomojo - Categories.png";
import nightRentomojoProfile from "../../assets/night_Rentomojo - Profile.png";
import nightRwaziElaChat from "../../assets/night_Rwazi - Ela Chat.png";
import nightRwaziElaIntro from "../../assets/night_Rwazi - Ela Intro.png";
import nightRwaziHome from "../../assets/night_Rwazi Home.png";
import nightTringNotificationWidget from "../../assets/night_Tring - Notification Widget.png";
import nightTringOnboarding from "../../assets/night_Tring - Onboarding.png";
import nightTringPermission from "../../assets/night_Tring - Permission.png";
import nightBookwormClubs from "../../assets/night_Bookworm - Clubs.png";

interface DesignItem {
  id: string | number;
  image?: string;
  component?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  project?: string;
  category?: string;
  industry?: string;
  metadata?: string;
}

const KNOWN_DESIGNS: DesignItem[] = [
  // Position 1
  {
    id: 'bookworm-discover-books',
    image: nightBookwormDiscoverBooks,
    title: 'Bookworm - Discover Books',
    metadata: '2024'
  },
  // Position 2
  {
    id: 'rwazi-ela-intro',
    image: nightRwaziElaIntro,
    title: 'Rwazi - Ela Intro',
    metadata: '2024'
  },
  // Position 3
  {
    id: 'pratilipi-onboarding',
    image: nightPratilipiOnboarding,
    title: 'Pratilipi - Onboarding',
    metadata: '2024'
  },
  // Position 4
  {
    id: 'tring-onboarding',
    image: nightTringOnboarding,
    title: 'Tring - Onboarding',
    metadata: '2024'
  },
  // Position 5
  {
    id: 'rentomojo-categories',
    image: nightRentomojoCategories,
    title: 'Rentomojo - Categories',
    metadata: '2024'
  },
  // Position 6
  {
    id: 'bookworm-clubs',
    image: nightBookwormClubs,
    title: 'Bookworm - Clubs',
    metadata: '2024'
  },
  // Position 7
  {
    id: 'pratilipi-language-selection',
    image: nightPratilipiLanguageSelection,
    title: 'Pratilipi - Language Selection',
    metadata: '2024'
  },
  // Position 8
  {
    id: 'kleros-scout-users',
    image: nightKlerosScoutUsers,
    title: 'Kleros Scout - Users',
    metadata: '2024'
  },
  // Position 9
  {
    id: 'butter-wallet-pay-with-link',
    image: nightButterWalletPayWithLink,
    title: 'Butter Wallet - Pay with Link',
    metadata: '2024'
  },
  // Position 10
  {
    id: 'dex-swap',
    image: nightDEXSwap,
    title: 'DEX Swap',
    metadata: '2024'
  },
  // Position 11
  {
    id: 'lifi-perps-orderbook',
    image: nightLiFiPerpsOrderbook,
    title: 'LI.FI Perps - Orderbook',
    metadata: '2024'
  },
  // Position 12
  {
    id: 'rentomojo-profile',
    image: nightRentomojoProfile,
    title: 'Rentomojo - Profile',
    metadata: '2024'
  },
  // Position 13
  {
    id: 'grantlink-biconomy-ecosystem-grants',
    image: nightGrantLinkBiconomyEcosystemGrants,
    title: 'GrantLink - Biconomy Ecosystem Grants',
    metadata: '2024'
  },
  // Position 14
  {
    id: 'causality-network-record',
    image: nightCausalityNetworkRecord,
    title: 'Causality Network - Record',
    metadata: '2024'
  },
  // Position 15
  {
    id: 'grantlink-biconomy-home',
    image: nightGrantLinkBiconomyHome,
    title: 'GrantLink - Biconomy Home',
    metadata: '2024'
  },
  // Position 16
  {
    id: 'kleros-scout-tokens-app',
    image: nightKlerosScoutTokensApp,
    title: 'Kleros Scout Tokens App',
    metadata: '2024'
  },
  // Position 17
  {
    id: 'pratilipi-homepage',
    image: nightPratilipiHomepage,
    title: 'Pratilipi - Homepage',
    metadata: '2024'
  },
  // Position 18
  {
    id: 'kleros-scout-landing-page-builders',
    image: nightKlerosScoutLandingPageBuilders,
    title: 'Kleros Scout Landing Page - Builders',
    metadata: '2024'
  },
  // Position 19
  {
    id: 'rwazi-ela-chat',
    image: nightRwaziElaChat,
    title: 'Rwazi - Ela Chat',
    metadata: '2024'
  },
  // Position 20
  {
    id: 'rabby-pay-with-links',
    image: nightRabbyPayWithLinks,
    title: 'Rabby - Pay with Links',
    metadata: '2024'
  },
  // Position 21
  {
    id: 'legalflow-prompt-builder',
    image: nightLegalFlowPromptBuilder,
    title: 'LegalFlow - Prompt Builder',
    metadata: '2024'
  },
  // Position 22
  {
    id: 'lifi-perps-chart',
    image: nightLiFiPerpsChart,
    title: 'LI.FI Perps - Chart',
    metadata: '2024'
  },
  // Position 23
  {
    id: 'bookworm-feed',
    image: nightBookwormFeed,
    title: 'Bookworm - Feed',
    metadata: '2024'
  },
  // Position 24
  {
    id: 'legalflow-cases-dashboard',
    image: nightLegalFlowCasesDashboard,
    title: 'LegalFlow - Cases Dashboard',
    metadata: '2024'
  },
  // Position 25
  {
    id: 'tring-notification-widget',
    image: nightTringNotificationWidget,
    title: 'Tring - Notification Widget',
    metadata: '2024'
  },
  // Position 26
  {
    id: 'tring-permission',
    image: nightTringPermission,
    title: 'Tring - Permission',
    metadata: '2024'
  },
  // Position 27
  {
    id: 'rwazi-home',
    image: nightRwaziHome,
    title: 'Rwazi Home',
    metadata: '2024'
  },
  // Position 28
  {
    id: 'pratilipi-new-homepage',
    image: nightPratilipiNewHomepage,
    title: 'Pratilipi - New Homepage',
    metadata: '2024'
  },
];

// Project metadata for high-quality descriptions
const PROJECT_METADATA: Record<string, { industry: string; category: string; projectDescription: string }> = {
  'Bookworm': {
    industry: 'EdTech',
    category: 'Mobile App Design',
    projectDescription: 'A social reading platform that connects book lovers through shared reading experiences and community discussions.'
  },
  'Pratilipi': {
    industry: 'Content & Media',
    category: 'Mobile App Design',
    projectDescription: "India's largest storytelling platform democratising literature in regional languages for millions of users."
  },
  'Rentomojo': {
    industry: 'Consumer Tech',
    category: 'Mobile App Design',
    projectDescription: 'A furniture and appliance rental platform making quality living accessible through flexible subscriptions.'
  },
  'Rwazi': {
    industry: 'AI Consumer',
    category: 'Mobile App Design',
    projectDescription: 'An AI-powered lifestyle assistant helping users make smarter daily decisions through personalized insights.'
  },
  'Tring': {
    industry: 'Productivity',
    category: 'Mobile App Design',
    projectDescription: 'A smart notification management tool that helps users stay focused by intelligently filtering distractions.'
  },
  'Kleros Scout': {
    industry: 'Web3 / DeFi',
    category: 'Web App Design',
    projectDescription: 'A decentralized contract insights platform powered by community curation and crypto-economic incentives.'
  },
  'Rabby': {
    industry: 'Web3 Payments',
    category: 'Browser Extension Design',
    projectDescription: 'A crypto wallet enabling seamless payment links for easy peer-to-peer transactions across chains.'
  },
  'Butter Wallet': {
    industry: 'Web3 Payments',
    category: 'Mobile App Design',
    projectDescription: 'A mobile-first crypto wallet focused on simple, shareable payment experiences.'
  },
  'LI.FI Perps': {
    industry: 'Web3 / DeFi',
    category: 'Trading Interface Design',
    projectDescription: 'A cross-chain perpetuals trading platform offering advanced charting and order management.'
  },
  'DEX': {
    industry: 'Web3 / DeFi',
    category: 'Trading Interface Design',
    projectDescription: 'A decentralized exchange interface designed for intuitive token swapping.'
  },
  'GrantLink': {
    industry: 'Web3 / Grants',
    category: 'Web App Design',
    projectDescription: 'A grants discovery and management platform connecting builders with ecosystem funding opportunities.'
  },
  'Causality Network': {
    industry: 'Web3 / DeSci',
    category: 'Web App Design',
    projectDescription: 'A decentralized science platform using on-chain attestations to authenticate research data.'
  },
  'LegalFlow': {
    industry: 'Legal AI',
    category: 'SaaS Dashboard Design',
    projectDescription: 'An AI-powered legal tool for document extraction and real estate due diligence workflows.'
  },
};

// Feature-specific descriptions
const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'Feed': 'A personalized content feed surfacing relevant stories and updates based on user interests.',
  'Clubs': 'A community feature enabling book clubs with shared reading schedules and discussions.',
  'Discover Books': 'An exploration interface helping users find their next great read through curated recommendations.',
  'Homepage': 'The main landing experience designed to engage users and showcase key content.',
  'New Homepage': 'A redesigned home experience with improved content discovery and navigation.',
  'Language Selection': 'An onboarding flow enabling users to choose their preferred reading language.',
  'Onboarding': 'A first-time user experience designed to maximize activation and early engagement.',
  'Categories': 'A category browsing interface for easy product discovery.',
  'Profile': 'A user profile section showcasing activity, preferences, and account settings.',
  'Ela Chat': 'An AI chat interface providing conversational assistance and recommendations.',
  'Ela Intro': 'An introduction to the AI assistant explaining its capabilities and value.',
  'Home': 'The main dashboard providing quick access to key features and personalized content.',
  'Notification Widget': 'A compact notification display for quick triage and management.',
  'Permission': 'A permission request flow designed for high opt-in rates.',
  'Users': 'A user-facing interface for discovering and consuming curated insights.',
  'Landing Page - Builders': 'A landing page targeting developers and builders to contribute data.',
  'Tokens App': 'A token registry interface for browsing verified token information.',
  'Chart': 'An advanced trading chart with technical indicators and analysis tools.',
  'Orderbook': 'A real-time orderbook display for transparent market depth.',
  'Cases Dashboard': 'A case management dashboard for tracking legal matters and documents.',
  'Prompt Builder': 'A prompt engineering interface for creating consistent legal queries.',
  'Pay with Links': 'A payment link creation flow for easy crypto transfers.',
  'Pay with Link': 'A streamlined interface for creating and sharing payment requests.',
  'Record': 'A data recording interface for capturing and attesting research information.',
  'Biconomy Ecosystem Grants Rd 2': 'A grants application interface for Biconomy ecosystem funding.',
  'Biconomy Home': 'A grants discovery dashboard showcasing available funding opportunities.',
};

// Helper function to generate metadata from design title
function generateMetadataFromDesign(title: string) {
  // Parse the title to extract project and feature
  const parts = title.split(' - ');
  const projectName = parts[0]?.trim() || title;
  const featureName = parts.slice(1).join(' - ').trim();
  
  // Find matching project metadata
  let projectMeta = PROJECT_METADATA[projectName];
  
  // Check for partial matches (e.g., "Kleros Scout" in "Kleros Scout Landing Page")
  if (!projectMeta) {
    for (const [key, meta] of Object.entries(PROJECT_METADATA)) {
      if (projectName.includes(key) || key.includes(projectName)) {
        projectMeta = meta;
        break;
      }
    }
  }
  
  // Default metadata if not found
  const industry = projectMeta?.industry || 'Technology';
  const category = projectMeta?.category || 'UI/UX Design';
  const projectDescription = projectMeta?.projectDescription || `A digital product focused on ${projectName.toLowerCase()}.`;
  
  // Get feature-specific description
  const featureDesc = featureName ? FEATURE_DESCRIPTIONS[featureName] : null;
  
  // Generate full description
  let description: string;
  if (featureDesc) {
    description = `${featureDesc}\n\n${projectDescription}`;
  } else if (featureName) {
    description = `A ${featureName.toLowerCase()} interface design.\n\n${projectDescription}`;
  } else {
    description = projectDescription;
  }
  
  // Generate subtitle
  const subtitle = featureName || 'Product Design';
  
  return {
    subtitle,
    description,
    project: projectName,
    category,
    industry,
  };
}


export function DesignSection() {
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset animation when route changes to /design
  useEffect(() => {
    if (location.pathname === '/design') {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Fixed grid: 6 columns, enough rows for all designs
  const COLS = 6;
  const ROWS = Math.ceil((KNOWN_DESIGNS.length + 1) / COLS); // +1 for center tile extra column
  
  // Tile dimensions
  const TILE_WIDTH = 314;
  const TILE_HEIGHT = 224;
  const GAP = 16;
  
  // Single grid section dimensions (period for wrapping)
  // Must include the gap after each section for seamless tiling
  const singleGridWidth = COLS * (TILE_WIDTH + GAP);
  const singleGridHeight = ROWS * (TILE_HEIGHT + GAP);

  // Generate random delays for animation (stable across renders)
  const tileDelays = useMemo(() => {
    return KNOWN_DESIGNS.map(() => 200 + Math.random() * 600);
  }, []);

  // Build tiles for a single grid section
  const buildTiles = useCallback((offsetRow: number, offsetCol: number, keyPrefix: string) => {
    const tiles: React.ReactNode[] = [];
    let designIndex = 0;
    
    // Center tile is at row 2, col 2 (0-indexed) within each grid section
    const centerRowInSection = Math.floor(ROWS / 2);
    const centerColInSection = 2;
    
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const gridRow = offsetRow * ROWS + row + 1;
        const gridCol = offsetCol * COLS + col + 1;
        
        // Center tile
        if (row === centerRowInSection && col === centerColInSection) {
          // Mark the CENTER grid's center tile (grid position 1,1 in the 3x3) for initial centering
          const isCenterGrid = offsetRow === 1 && offsetCol === 1;
          tiles.push(
            <motion.div
              key={`${keyPrefix}center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isAnimating ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{
                gridRow,
                gridColumn: `${gridCol} / span 2`,
                contain: 'layout style paint',
              }}
              data-center-tile={isCenterGrid ? "true" : undefined}
            >
              <DesignTile isCenter />
            </motion.div>
          );
          continue;
        }
        
        // Skip column occupied by center tile span
        if (row === centerRowInSection && col === centerColInSection + 1) {
          continue;
        }
        
        // Regular design tile
        const design = KNOWN_DESIGNS[designIndex % KNOWN_DESIGNS.length];
        if (design) {
          const delay = tileDelays[designIndex % KNOWN_DESIGNS.length];
          tiles.push(
            <motion.div
              key={`${keyPrefix}tile-${row}-${col}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isAnimating ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: delay / 1000 }}
              style={{ 
                gridRow,
                gridColumn: gridCol,
                contain: 'layout style paint',
              }}
            >
              <DesignTile
                image={design.image}
                title={design.title}
                onClick={() => {
                  const metadata = generateMetadataFromDesign(design.title || '');
                  setSelectedDesign({
                    ...design,
                    subtitle: design.subtitle || metadata.subtitle,
                    description: design.description || metadata.description,
                    project: design.project || metadata.project,
                    category: design.category || metadata.category,
                    industry: design.industry || metadata.industry,
                  });
                }}
              />
            </motion.div>
          );
          designIndex++;
        }
      }
    }
    return tiles;
  }, [ROWS, isAnimating, tileDelays, setSelectedDesign]);

  // Build the complete 3x3 infinite grid as a single CSS grid
  const allTiles = useMemo(() => {
    const tiles: React.ReactNode[] = [];
    
    for (let gridRow = 0; gridRow < 3; gridRow++) {
      for (let gridCol = 0; gridCol < 3; gridCol++) {
        tiles.push(...buildTiles(gridRow, gridCol, `${gridRow}-${gridCol}-`));
      }
    }
    
    return tiles;
  }, [buildTiles]);

  // Total grid dimensions (3x3)
  const totalCols = COLS * 3;
  const totalRows = ROWS * 3;

  return (
    <div className="w-full h-full bg-black">
      <InfiniteCanvas 
        centerOnMount 
        infiniteScroll
        gridWidth={singleGridWidth}
        gridHeight={singleGridHeight}
        children={
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${totalCols}, ${TILE_WIDTH}px)`,
              gridTemplateRows: `repeat(${totalRows}, ${TILE_HEIGHT}px)`,
              gap: `${GAP}px`,
              contain: 'layout style',
            }}
          >
            {allTiles}
          </div>
        }
      />

      {/* Modal */}
      <DesignModal
        isOpen={selectedDesign !== null}
        onClose={() => setSelectedDesign(null)}
        image={selectedDesign?.image}
        title={selectedDesign?.title}
        subtitle={selectedDesign?.subtitle}
        description={selectedDesign?.description}
        project={selectedDesign?.project}
        category={selectedDesign?.category}
        industry={selectedDesign?.industry}
      />
    </div>
  );
}
