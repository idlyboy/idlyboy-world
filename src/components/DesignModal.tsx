import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { getHighResUrl } from '../imagekit-urls';

interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  project?: string;
  category?: string;
  industry?: string;
}

export function DesignModal({ 
  isOpen, 
  onClose, 
  image, 
  title, 
  subtitle,
  description,
  project,
  category,
  industry
}: DesignModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile-only styles */}
      <style>{`
        @media (max-width: 767px) {
          .design-modal-overlay {
            padding: 16px !important;
          }
          .design-modal-container {
            width: 100% !important;
            height: 80vh !important;
            max-height: 80vh !important;
            display: flex !important;
            flex-direction: column !important;
          }
          /* Mobile header with title + close button in same row */
          .design-modal-header {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            padding: 20px 16px !important;
            gap: 12px !important;
            flex-shrink: 0 !important;
          }
          .design-modal-header-title {
            flex: 1 !important;
            min-width: 0 !important;
          }
          .design-modal-header-title h2 {
            font-size: 1.125rem !important;
            line-height: 1.3 !important;
            word-wrap: break-word !important;
          }
          .design-modal-header-title h3 {
            font-size: 0.875rem !important;
            margin-top: 4px !important;
          }
          .design-modal-close-btn {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            flex-shrink: 0 !important;
          }
          .design-modal-close-btn > div {
            width: 32px !important;
            height: 32px !important;
          }
          .design-modal-close-btn svg {
            width: 16px !important;
            height: 16px !important;
          }
          /* Scrollable content area */
          .design-modal-content {
            padding: 16px !important;
            padding-bottom: 24px !important;
            gap: 16px !important;
            flex: 1 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          /* Hide the title section inside content on mobile (shown in header) */
          .design-modal-content .design-modal-title-section {
            display: none !important;
          }
          .design-modal-content h4 {
            font-size: 1rem !important;
          }
          .design-modal-content p {
            font-size: 0.875rem !important;
          }
        }
        /* Desktop: hide the mobile header */
        @media (min-width: 768px) {
          .design-modal-header {
            display: none !important;
          }
        }
        /* Mobile: hide the desktop close button */
        @media (max-width: 767px) {
          .design-modal-desktop-close {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="design-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {/* Modal Container - 50% width on desktop, near full width on mobile */}
        <div
          ref={modalRef}
          className="design-modal-container relative bg-black rounded-lg"
          data-modal-scrollable
          style={{
            width: '50%',
            height: '90vh',
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header - Title + Close button in same row */}
          <div className="design-modal-header">
            <div className="design-modal-header-title">
              {title && <h2 className="text-xl text-white font-medium">{title}</h2>}
              {subtitle && <h3 className="text-base text-gray-400">{subtitle}</h3>}
            </div>
            <button
              onClick={onClose}
              className="design-modal-close-btn flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
                <X className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </div>
            </button>
          </div>

          {/* Close button - top right (desktop only, mobile uses header) */}
          <button
            onClick={onClose}
            className="design-modal-desktop-close"
            style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 100 }}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              border: '1px solid #4b5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <X style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
            </div>
          </button>

          {/* Content */}
          <div className="design-modal-content flex flex-col gap-6 p-8">
            {/* Title and Subtitle - shown on desktop only */}
            {(title || subtitle) && (
              <div className="design-modal-title-section flex flex-col gap-2">
                {title && <h2 className="text-2xl text-white font-medium">{title}</h2>}
                {subtitle && <h3 className="text-lg text-gray-400">{subtitle}</h3>}
              </div>
            )}

            {/* Image */}
            {image && (
              <div className="w-full flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={getHighResUrl(image || '')}
                  alt={title || 'Design'}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-white font-medium">Description</h4>
                <p className="text-gray-400">{description}</p>
              </div>
            )}

            {/* Line break */}
            {(project || category || industry) && <hr className="border-gray-700" />}

            {/* Metadata Grid */}
            {(project || category || industry) && (
              <div className="grid grid-cols-2 gap-4">
                {project && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Project</span>
                    <span className="text-white">{project}</span>
                  </div>
                )}
                {category && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="text-white">{category}</span>
                  </div>
                )}
                {industry && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Industry</span>
                    <span className="text-white">{industry}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
