import { useState } from 'react';
import { Car, Check, Copy, ExternalLink, Footprints, MapPin, Mountain } from 'lucide-react';
import {
  DESTINATIONS,
  Destination,
  VILLAGE_ADDRESS,
  VILLAGE_COORDS,
} from '../data/tourismData';

interface InteractiveVillageMapProps {
  onSelectDestinationDetail: (destination: Destination) => void;
}

export function InteractiveVillageMap({
  onSelectDestinationDetail,
}: InteractiveVillageMapProps) {
  const [activeDestId, setActiveDestId] = useState<string>(DESTINATIONS[0].id);
  const [addressCopied, setAddressCopied] = useState(false);

  const selectedDestination =
    DESTINATIONS.find((d) => d.id === activeDestId) || DESTINATIONS[0];

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${VILLAGE_COORDS.lat},${VILLAGE_COORDS.lng}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${VILLAGE_ADDRESS} (${VILLAGE_COORDS.lat}, ${VILLAGE_COORDS.lng})`
      );
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2500);
    } catch {
      setAddressCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive Topographic Village Map */}
      <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl border border-[#dce5dc] p-4 sm:p-6 flex flex-col justify-between shadow-[0_4px_16px_-2px_rgba(35,83,62,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#161d18]">
              Denah Interaktif Kawasan Desa
            </h3>
            <p className="text-sm text-[#414943]">
              Ketuk titik lokasi di peta untuk melihat jarak jalan & ketinggian
            </p>
          </div>
          <span className="text-xs font-semibold text-[#23533e] tabular-nums">
            Skala Kawasan ± 2,5 km²
          </span>
        </div>

        {/* SVG Topographic Map */}
        <div className="relative w-full aspect-16/11 sm:aspect-16/10 rounded-2xl overflow-hidden bg-[#edf6ed] border border-[#dce5dc]">
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full select-none"
            aria-label="Peta interaktif lokasi destinasi Desa Wisata Lereng Asri"
          >
            {/* Soft meadow background */}
            <rect width="800" height="500" fill="#edf6ed" />

            {/* Topographic contour hills */}
            <path
              d="M -40 120 Q 180 60, 420 110 T 840 90 L 840 0 L -40 0 Z"
              fill="#e2eae1"
            />
            <path
              d="M -40 240 Q 220 170, 480 220 T 840 190 L 840 500 L -40 500 Z"
              fill="#e8f0e7"
              opacity="0.65"
            />
            <path
              d="M 480 500 Q 540 310, 720 260 L 840 280 L 840 500 Z"
              fill="#dce5dc"
              opacity="0.8"
            />

            {/* Mountain stream / river */}
            <path
              d="M 710 40 C 660 110, 650 160, 610 210 C 560 270, 480 310, 390 380 C 330 430, 290 470, 250 510"
              fill="none"
              stroke="#9fd2b6"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 710 40 C 660 110, 650 160, 610 210 C 560 270, 480 310, 390 380 C 330 430, 290 470, 250 510"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="10 12"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Main Village Paved Road from Gate */}
            <path
              d="M 70 430 C 120 380, 150 320, 195 290 C 260 245, 310 175, 368 125"
              fill="none"
              stroke="#c0c9c2"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 70 430 C 120 380, 150 320, 195 290"
              fill="none"
              stroke="#414943"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.5"
            />

            {/* Walking Trails */}
            <path
              d="M 195 290 C 290 325, 330 350, 384 368 C 455 360, 510 345, 560 330"
              fill="none"
              stroke="#97472e"
              strokeWidth="3.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <path
              d="M 368 125 C 470 120, 550 140, 622 150"
              fill="none"
              stroke="#97472e"
              strokeWidth="3.5"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />

            {/* Decorative Pine Trees clusters */}
            <g fill="#23533e" opacity="0.25">
              <polygon points="620,390 634,355 648,390" />
              <polygon points="645,405 660,365 675,405" />
              <polygon points="520,420 532,390 544,420" />
              <polygon points="720,210 734,175 748,210" />
              <polygon points="110,120 124,85 138,120" />
              <polygon points="135,135 148,105 161,135" />
            </g>

            {/* Compass Rose (Top Left) */}
            <g transform="translate(52, 52)">
              <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#c0c9c2" strokeWidth="1.5" />
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#063c28"
              >
                U
              </text>
              <polygon points="0,-4 -4,8 0,5 4,8" fill="#97472e" />
            </g>

            {/* Gerbang Utama & Parkir */}
            <g transform="translate(88, 422)">
              <rect
                x="-64"
                y="-18"
                width="128"
                height="36"
                rx="18"
                fill="#161d18"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#ffffff"
              >
                Gerbang & Parkir
              </text>
            </g>
          </svg>

          {/* Interactive HTML Marker Pins overlaid cleanly for crisp touch targets */}
          {DESTINATIONS.map((dest, index) => {
            const isSelected = dest.id === selectedDestination.id;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => setActiveDestId(dest.id)}
                style={{
                  left: `${dest.mapPosition.x}%`,
                  top: `${dest.mapPosition.y}%`,
                }}
                aria-label={`Pilih lokasi ${dest.name}`}
                aria-pressed={isSelected}
                className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-[#063c28] ${
                  isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                }`}
              >
                <span
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md border whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#063c28] text-white border-[#ffffff]'
                      : 'bg-[#ffffff] text-[#161d18] border-[#c0c9c2]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isSelected ? 'bg-[#ecaf42] text-[#281900]' : 'bg-[#edf6ed] text-[#063c28]'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{dest.name.split(' ')[0]} {dest.name.split(' ')[1]}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Pin Quick Info */}
        <div className="mt-4 p-4 rounded-2xl bg-[#f3fcf2] border border-[#dce5dc] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#23533e]">
              Titik Terpilih di Peta
            </p>
            <h4 className="text-lg font-bold text-[#161d18]">{selectedDestination.name}</h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#414943]">
              <span className="inline-flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-[#23533e]" />
                {selectedDestination.walkTimeFromGate}
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Mountain className="w-4 h-4 text-[#23533e]" />
                {selectedDestination.elevation}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectDestinationDetail(selectedDestination)}
            className="min-h-[48px] px-5 py-2.5 rounded-full border-2 border-[#063c28] text-[#063c28] hover:bg-[#edf6ed] font-semibold text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            Info Titik Ini
          </button>
        </div>

        {/* Mobile numbered legend buttons for easy tap without squinting */}
        <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
          {DESTINATIONS.map((dest, idx) => (
            <button
              key={dest.id}
              type="button"
              onClick={() => setActiveDestId(dest.id)}
              className={`min-h-[40px] px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                dest.id === selectedDestination.id
                  ? 'bg-[#063c28] text-white border-[#063c28]'
                  : 'bg-[#ffffff] text-[#161d18] border-[#dce5dc]'
              }`}
            >
              {idx + 1}. {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Address & Route Guidance Card */}
      <div className="lg:col-span-5 bg-[#ffffff] rounded-3xl border border-[#dce5dc] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_16px_-2px_rgba(35,83,62,0.05)]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-[#97472e]">Panduan Menuju Lokasi</p>
            <h3 className="mt-1 text-2xl font-bold text-[#161d18]">
              Alamat & Rute Kendaraan
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#edf6ed] flex items-center justify-center shrink-0 text-[#063c28]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#161d18]">Alamat Lengkap</p>
                <p className="text-[15px] text-[#414943] leading-relaxed mt-0.5">
                  {VILLAGE_ADDRESS}
                </p>
                <p className="text-xs font-medium text-[#717973] mt-1 tabular-nums">
                  Koordinat: {VILLAGE_COORDS.label}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 border-t border-[#e8f0e7]">
              <div className="w-10 h-10 rounded-full bg-[#edf6ed] flex items-center justify-center shrink-0 text-[#063c28]">
                <Car className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-[#161d18]">Akses Jalan & Parkir</p>
                <p className="text-[15px] text-[#414943] leading-relaxed">
                  ± 45 menit dari Alun-Alun Kota · ± 60 menit dari Stasiun / Terminal Utama.
                </p>
                <p className="text-[15px] text-[#414943] leading-relaxed">
                  Jalan beraspal mulus dua arah, aman untuk mobil keluarga, minibus Elf/HiAce, dan bus medium. Area parkir luas tersedia di Gerbang Utama.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors"
          >
            <span>Buka Rute di Google Maps</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>

          <button
            type="button"
            onClick={handleCopyAddress}
            className="w-full min-h-[48px] px-6 py-3 rounded-full border-2 border-[#063c28] text-[#063c28] hover:bg-[#edf6ed] font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {addressCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Alamat Berhasil Disalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
