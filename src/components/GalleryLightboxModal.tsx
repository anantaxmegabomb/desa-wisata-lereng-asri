import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from '../data/tourismData';
import { ResilientImage } from './ResilientImage';

interface GalleryLightboxModalProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function GalleryLightboxModal({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: GalleryLightboxModalProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChangeIndex((activeIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onChangeIndex((activeIndex - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, items.length, onClose, onChangeIndex]);

  if (activeIndex === null || !items[activeIndex]) return null;

  const currentItem = items[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161d18]/90 backdrop-blur-xs p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto galeri: ${currentItem.title}`}
    >
      <div
        className="w-full max-w-3xl bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl border border-[#dce5dc]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-4/3 sm:aspect-16/10 bg-[#161d18]">
          <ResilientImage
            src={currentItem.image}
            alt={currentItem.imageAlt}
            className="w-full h-full object-cover"
            fallbackTitle={currentItem.title}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup galeri foto"
            className="absolute top-4 right-4 min-w-[48px] min-h-[48px] rounded-full bg-[#ffffff]/95 text-[#161d18] flex items-center justify-center shadow-md hover:bg-[#ffffff] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onChangeIndex((activeIndex - 1 + items.length) % items.length)}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full bg-[#ffffff]/90 text-[#161d18] flex items-center justify-center shadow-md hover:bg-[#ffffff] cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => onChangeIndex((activeIndex + 1) % items.length)}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] rounded-full bg-[#ffffff]/90 text-[#161d18] flex items-center justify-center shadow-md hover:bg-[#ffffff] cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#23533e]">
              {currentItem.location} · Foto {activeIndex + 1} dari {items.length}
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-[#161d18] mt-0.5">
              {currentItem.title}
            </h3>
            <p className="text-sm sm:text-base text-[#414943] mt-1">{currentItem.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
