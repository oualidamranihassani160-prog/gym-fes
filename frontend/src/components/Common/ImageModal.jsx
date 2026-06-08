import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, src, alt, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="relative max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-2 top-2 p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60">
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center justify-center">
          <img src={src} alt={alt} className="max-w-full max-h-[80vh] rounded-lg shadow-lg object-contain" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
