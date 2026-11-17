import { useEffect } from 'react';
import { Clock, MapPin, MessageCircle, Ticket, X, Check } from 'lucide-react';
import { Destination, buildWhatsAppUrl } from '../data/tourismData';
import { ResilientImage } from './ResilientImage';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookDestination: (destinationName: string) => void;
}

export function DestinationDetailModal({
  destination,
  onClose,
  onBookDestination,
}: DestinationDetailModalProps) {
  useEffect(() => {
    if (!destination) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [destination, onClose]);

  if (!destination) return null;

  const directWaUrl = buildWhatsAppUrl(
    `Halo Pengelola Desa Wisata Lereng Asri, saya ingin bertanya tentang kunjungan ke ${destination.name}. Apakah buka pada hari kunjungan kami?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#161d18]/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dest-modal-title"
    >
      <div
        className="w-full max-w-xl bg-[#ffffff] rounded-t-3xl sm:rounded-3xl border border-[#e2eae1] shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#c0c9c2]" />
        </div>

        <div className="relative aspect-16/10 w-full overflow-hidden sm:rounded-t-3xl">
          <ResilientImage
            src={destination.image}
            alt={destination.imageAlt}
            className="w-full h-full object-cover"
            fallbackTitle={destination.name}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian destinasi"
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-full bg-[#ffffff]/95 text-[#161d18] flex items-center justify-center shadow-md hover:bg-[#ffffff] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#063c28]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <p className="text-sm font-medium text-[#414943]">{destination.meta}</p>
            <h3
              id="dest-modal-title"
              className="mt-1 text-2xl sm:text-[26px] font-bold text-[#161d18] leading-tight"
            >
              {destination.name}
            </h3>
          </div>

          <p className="text-base text-[#161d18] leading-relaxed">{destination.fullDesc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#edf6ed] border border-[#dce5dc]">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#23533e] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#414943]">Jam Buka</p>
                <p className="text-sm font-semibold text-[#161d18] tabular-nums">
                  {destination.openHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ticket className="w-5 h-5 text-[#23533e] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#414943]">Tiket Masuk</p>
                <p className="text-sm font-semibold text-[#161d18] tabular-nums">
                  {destination.ticketPrice}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="w-5 h-5 text-[#23533e] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#414943]">Akses & Jarak Jalan</p>
                <p className="text-sm text-[#161d18]">
                  {destination.walkTimeFromGate} ({destination.elevation}) · {destination.accessNote}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#161d18] mb-2.5">
              Fasilitas & Keunggulan Utama
            </h4>
            <ul className="space-y-2">
              {destination.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#161d18]">
                  <Check className="w-5 h-5 text-[#23533e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onBookDestination(destination.name)}
              className="flex-1 min-h-[52px] px-6 py-3 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Rencanakan Kunjungan</span>
            </button>
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] px-6 py-3 rounded-full border-2 border-[#063c28] text-[#063c28] hover:bg-[#edf6ed] font-semibold text-base flex items-center justify-center transition-colors whitespace-nowrap"
            >
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
