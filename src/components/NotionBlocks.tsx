import { useState, ReactNode } from 'react';
import { ChevronRight, Info, AlertTriangle, Lightbulb, Quote as QuoteIcon, CheckCircle } from 'lucide-react';

// ============================================
// HEADING BLOCKS
// ============================================

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 style={{
      color: 'white',
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      marginTop: '2rem',
      marginBottom: '0.75rem',
    }}>
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginTop: '1.75rem',
      marginBottom: '0.5rem',
    }}>
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
    }}>
      {children}
    </h3>
  );
}

// ============================================
// TEXT BLOCKS
// ============================================

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p style={{
      color: '#d1d5db',
      fontSize: '1.0625rem',
      lineHeight: 1.8,
      marginBottom: '1rem',
    }}>
      {children}
    </p>
  );
}

export function Bold({ children }: { children: ReactNode }) {
  return <strong style={{ color: 'white', fontWeight: 600 }}>{children}</strong>;
}

export function Italic({ children }: { children: ReactNode }) {
  return <em style={{ fontStyle: 'italic' }}>{children}</em>;
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#f472b6',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.9em',
      fontFamily: 'monospace',
    }}>
      {children}
    </code>
  );
}

export function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#60a5fa',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      }}
    >
      {children}
    </a>
  );
}

// ============================================
// CALLOUT BLOCKS
// ============================================

type CalloutType = 'info' | 'warning' | 'tip' | 'success' | 'quote';

const calloutStyles: Record<CalloutType, { bg: string; border: string; icon: ReactNode }> = {
  info: {
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    icon: <Info style={{ width: '20px', height: '20px', color: '#60a5fa' }} />,
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    icon: <AlertTriangle style={{ width: '20px', height: '20px', color: '#fbbf24' }} />,
  },
  tip: {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    icon: <Lightbulb style={{ width: '20px', height: '20px', color: '#4ade80' }} />,
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    icon: <CheckCircle style={{ width: '20px', height: '20px', color: '#4ade80' }} />,
  },
  quote: {
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.3)',
    icon: <QuoteIcon style={{ width: '20px', height: '20px', color: '#a78bfa' }} />,
  },
};

export function Callout({ 
  type = 'info', 
  emoji,
  children 
}: { 
  type?: CalloutType;
  emoji?: string;
  children: ReactNode;
}) {
  const style = calloutStyles[type];
  
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '16px',
      backgroundColor: style.bg,
      borderLeft: `3px solid ${style.border}`,
      borderRadius: '4px',
      marginBottom: '1rem',
    }}>
      <div style={{ flexShrink: 0 }}>
        {emoji ? <span style={{ fontSize: '1.25rem' }}>{emoji}</span> : style.icon}
      </div>
      <div style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

// ============================================
// QUOTE / BLOCKQUOTE
// ============================================

export function Quote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <blockquote style={{
      borderLeft: '3px solid rgba(255, 255, 255, 0.3)',
      paddingLeft: '20px',
      marginLeft: 0,
      marginBottom: '1rem',
      fontStyle: 'italic',
      color: '#9ca3af',
      fontSize: '1.125rem',
      lineHeight: 1.7,
    }}>
      {children}
      {author && (
        <footer style={{ 
          marginTop: '8px', 
          fontSize: '0.875rem', 
          color: '#6b7280',
          fontStyle: 'normal',
        }}>
          — {author}
        </footer>
      )}
    </blockquote>
  );
}

// ============================================
// TOGGLE BLOCK
// ============================================

export function Toggle({ title, children }: { title: ReactNode; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '8px 0',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          fontSize: '1.0625rem',
          fontWeight: 500,
          textAlign: 'left',
        }}
      >
        <ChevronRight 
          style={{ 
            width: '18px', 
            height: '18px',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            color: '#9ca3af',
          }} 
        />
        {title}
      </button>
      {isOpen && (
        <div style={{
          paddingLeft: '26px',
          paddingTop: '4px',
          color: '#d1d5db',
          fontSize: '1rem',
          lineHeight: 1.7,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================
// LIST BLOCKS
// ============================================

export function BulletList({ children }: { children: ReactNode }) {
  return (
    <ul style={{
      listStyleType: 'disc',
      paddingLeft: '24px',
      marginBottom: '1rem',
      color: '#d1d5db',
      fontSize: '1.0625rem',
      lineHeight: 1.8,
    }}>
      {children}
    </ul>
  );
}

export function NumberedList({ children }: { children: ReactNode }) {
  return (
    <ol style={{
      listStyleType: 'decimal',
      paddingLeft: '24px',
      marginBottom: '1rem',
      color: '#d1d5db',
      fontSize: '1.0625rem',
      lineHeight: 1.8,
    }}>
      {children}
    </ol>
  );
}

export function ListItem({ children }: { children: ReactNode }) {
  return (
    <li style={{ marginBottom: '0.5rem' }}>
      {children}
    </li>
  );
}

// ============================================
// IMAGE BLOCK
// ============================================

export function Image({ 
  src, 
  alt, 
  caption 
}: { 
  src: string; 
  alt: string; 
  caption?: string;
}) {
  return (
    <figure style={{ marginBottom: '1.5rem' }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          borderRadius: '8px',
          backgroundColor: '#2a2a2a',
        }}
        loading="lazy"
      />
      {caption && (
        <figcaption style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
          marginTop: '8px',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ============================================
// CODE BLOCK
// ============================================

export function CodeBlock({ 
  children, 
  language 
}: { 
  children: string; 
  language?: string;
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {language && (
        <div style={{
          backgroundColor: '#1e1e1e',
          color: '#6b7280',
          fontSize: '0.75rem',
          padding: '8px 16px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid #333',
        }}>
          {language}
        </div>
      )}
      <pre style={{
        backgroundColor: '#1e1e1e',
        padding: '16px',
        borderRadius: language ? '0 0 8px 8px' : '8px',
        overflow: 'auto',
        margin: 0,
      }}>
        <code style={{
          color: '#d1d5db',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          lineHeight: 1.6,
        }}>
          {children}
        </code>
      </pre>
    </div>
  );
}

// ============================================
// DIVIDER
// ============================================

export function Divider() {
  return (
    <hr style={{
      border: 'none',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '2rem 0',
    }} />
  );
}

// ============================================
// TABLE OF CONTENTS (optional)
// ============================================

export function TableOfContents({ items }: { items: { text: string; id: string }[] }) {
  return (
    <nav style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '2rem',
    }}>
      <h4 style={{ 
        color: 'white', 
        fontSize: '0.875rem', 
        fontWeight: 600,
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Contents
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <a 
              href={`#${item.id}`}
              style={{
                color: '#9ca3af',
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ============================================
// EMBED (for videos, tweets, etc.)
// ============================================

export function Embed({ 
  src, 
  title,
  aspectRatio = '16/9'
}: { 
  src: string; 
  title: string;
  aspectRatio?: string;
}) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio,
      marginBottom: '1.5rem',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#1e1e1e',
    }}>
      <iframe
        src={src}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

