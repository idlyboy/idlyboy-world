import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape, true); // Use capture phase
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, true);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-pdf-modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-in fade-in"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      onClick={onClose}
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

      <div
        className="relative max-w-6xl w-full mx-4 my-10 bg-white/10 rounded-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20"
        style={{ 
          maxHeight: 'calc(100vh - 80px)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* PDF Content */}
        <div className="flex flex-col h-full">
          <div
            className="flex-1 overflow-auto py-8"
            style={{ height: '100%', maxHeight: 'calc(100vh - 80px)' }}
          >
            <iframe
              src={pdfUrl}
              className="w-full"
              style={{ height: '100%', minHeight: '700px' }}
              title={title || 'PDF Document'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

