import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
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
      {/* Close button - positioned at top right of screen */}
      <button
        onClick={onClose}
        className="fixed z-50 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
        style={{ top: '2.5rem', right: '2.5rem' }}
      >
        <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
          <X className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </div>
      </button>

      {/* Modal Container - 50% width, scrollable */}
      <div
        ref={modalRef}
        className="relative bg-black rounded-lg"
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
        {/* Content */}
        <div className="flex flex-col gap-6 p-8">
          {/* Title and Subtitle */}
          {(title || subtitle) && (
            <div className="flex flex-col gap-2">
              {title && <h2 className="text-2xl text-white font-medium">{title}</h2>}
              {subtitle && <h3 className="text-lg text-gray-400">{subtitle}</h3>}
            </div>
          )}

          {/* Image */}
          {image && (
            <div className="w-full flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={image}
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
  );
}
