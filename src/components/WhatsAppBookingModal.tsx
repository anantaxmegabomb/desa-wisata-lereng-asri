import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, Minus, Plus, X } from 'lucide-react';
import {
  PACKAGE_ADDONS,
  TOUR_PACKAGES,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
  formatRupiah,
} from '../data/tourismData';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  initialPackageId?: string;
  initialNote?: string;
  onClose: () => void;
}

export function WhatsAppBookingModal({
  isOpen,
  initialPackageId,
  initialNote,
  onClose,
}: WhatsAppBookingModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || TOUR_PACKAGES[1].id
  );
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [visitDate, setVisitDate] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState<string>(initialNote || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPackageId) {
      setSelectedPackageId(initialPackageId);
      const found = TOUR_PACKAGES.find((p) => p.id === initialPackageId);
      if (found) {
        setPeopleCount((prev) => Math.max(prev, found.minPeople));
      }
    }
  }, [initialPackageId]);

  useEffect(() => {
    if (initialNote !== undefined) {
      setCustomNote(initialNote);
    }
  }, [initialNote]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePackage =
    TOUR_PACKAGES.find((pkg) => pkg.id === selectedPackageId) || TOUR_PACKAGES[0];

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    const pkg = TOUR_PACKAGES.find((p) => p.id === pkgId);
    if (pkg && peopleCount < pkg.minPeople) {
      setPeopleCount(pkg.minPeople);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const baseCost = activePackage.pricePerPerson * peopleCount;
  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = PACKAGE_ADDONS.find((a) => a.id === id);
    if (!addon) return sum;
    return sum + (addon.perPerson ? addon.price * peopleCount : addon.price);
  }, 0);
  const totalEstimate = baseCost + addonsCost;

  const addonNames = selectedAddons
    .map((id) => PACKAGE_ADDONS.find((a) => a.id === id)?.label)
    .filter(Boolean);

  const formattedMessage = [
    `Halo Pengelola Desa Wisata Lereng Asri,`,
    ``,
    `Saya ingin memesan / menanyakan ketersediaan paket wisata:`,
    `• Nama Pemesan: ${guestName.trim() || '(Belum diisi)'}`,
    `• Pilihan Paket: ${activePackage.name} (${formatRupiah(activePackage.pricePerPerson)} ${activePackage.priceUnit})`,
    `• Jumlah Peserta: ${peopleCount} orang`,
    `• Rencana Tanggal: ${visitDate || 'Belum ditentukan (mohon saran jadwal)'}`,
    addonNames.length > 0 ? `• Tambahan: ${addonNames.join(', ')}` : null,
    customNote.trim() ? `• Catatan Khusus: ${customNote.trim()}` : null,
    `• Perkiraan Total: ${formatRupiah(totalEstimate)}`,
    ``,
    `Mohon informasi ketersediaan dan langkah selanjutnya. Terima kasih!`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const whatsappUrl = buildWhatsAppUrl(formattedMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#161d18]/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-booking-title"
    >
      <div
        className="w-full max-w-xl bg-[#ffffff] rounded-t-3xl sm:rounded-3xl border border-[#e2eae1] shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#c0c9c2]" />
        </div>

        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-[#e2eae1]">
          <div>
            <h3 id="wa-booking-title" className="text-xl sm:text-2xl font-bold text-[#161d18]">
              Pesan Wisata via WhatsApp
            </h3>
            <p className="text-sm text-[#414943] mt-1">
              Layanan ramah Pokdarwis · {WHATSAPP_DISPLAY}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir pemesanan"
            className="min-w-[44px] min-h-[44px] rounded-full bg-[#edf6ed] text-[#161d18] flex items-center justify-center hover:bg-[#dce5dc] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Package selector */}
          <div>
            <label className="block text-sm font-bold text-[#161d18] mb-2.5">
              1. Pilih Paket Wisata
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOUR_PACKAGES.map((pkg) => {
                const isSelected = pkg.id === activePackage.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`min-h-[56px] p-3.5 rounded-2xl text-left border-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#063c28] bg-[#edf6ed]'
                        : 'border-[#e2eae1] bg-[#ffffff] hover:border-[#93c5aa]'
                    }`}
                  >
                    <p className="font-bold text-[15px] text-[#161d18] leading-snug">
                      {pkg.name}
                    </p>
                    <p className="text-sm font-semibold text-[#23533e] mt-0.5 tabular-nums">
                      {formatRupiah(pkg.pricePerPerson)} / org
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* People count & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#161d18] mb-2">
                2. Jumlah Peserta
              </label>
              <div className="flex items-center justify-between border border-[#c0c9c2] rounded-2xl p-1.5 bg-[#f3fcf2]">
                <button
                  type="button"
                  onClick={() => setPeopleCount((c) => Math.max(1, c - 1))}
                  aria-label="Kurangi jumlah peserta"
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-[#ffffff] border border-[#dce5dc] flex items-center justify-center text-[#161d18] hover:bg-[#e8f0e7] cursor-pointer"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-bold text-[#161d18] tabular-nums px-3">
                  {peopleCount} Orang
                </span>
                <button
                  type="button"
                  onClick={() => setPeopleCount((c) => c + 1)}
                  aria-label="Tambah jumlah peserta"
                  className="min-w-[44px] min-h-[44px] rounded-xl bg-[#ffffff] border border-[#dce5dc] flex items-center justify-center text-[#161d18] hover:bg-[#e8f0e7] cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              {peopleCount < activePackage.minPeople && (
                <p className="text-xs text-[#97472e] font-medium mt-1.5">
                  Minimal rekomendasi paket ini {activePackage.minPeople} orang (tetap bisa tanya admin).
                </p>
              )}
            </div>

            <div>
              <label htmlFor="visit-date" className="block text-sm font-bold text-[#161d18] mb-2">
                3. Rencana Tanggal
              </label>
              <input
                id="visit-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full min-h-[52px] px-4 rounded-2xl border border-[#c0c9c2] bg-[#ffffff] text-[15px] text-[#161d18] focus:outline-2 focus:outline-[#063c28]"
              />
            </div>
          </div>

          {/* Guest name */}
          <div>
            <label htmlFor="guest-name" className="block text-sm font-bold text-[#161d18] mb-2">
              4. Nama Pemesan / Perwakilan Keluarga
            </label>
            <input
              id="guest-name"
              type="text"
              placeholder="Contoh: Ibu Sari / Keluarga Besar Budi"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full min-h-[52px] px-4 rounded-2xl border border-[#c0c9c2] bg-[#ffffff] text-[15px] text-[#161d18] placeholder:text-[#717973] focus:outline-2 focus:outline-[#063c28]"
            />
          </div>

          {/* Optional add-ons */}
          <div>
            <p className="text-sm font-bold text-[#161d18] mb-2.5">
              5. Tambahan Opsional (Boleh Dikosongkan)
            </p>
            <div className="space-y-2.5">
              {PACKAGE_ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    aria-pressed={checked}
                    className={`w-full min-h-[52px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      checked
                        ? 'border-[#063c28] bg-[#edf6ed]'
                        : 'border-[#e2eae1] bg-[#ffffff] hover:bg-[#f3fcf2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                          checked
                            ? 'bg-[#063c28] border-[#063c28] text-white'
                            : 'border-[#717973] bg-white'
                        }`}
                      >
                        {checked && <Check className="w-4 h-4" strokeWidth={3} />}
                      </span>
                      <span className="text-[15px] font-medium text-[#161d18]">
                        {addon.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#23533e] whitespace-nowrap tabular-nums">
                      +{formatRupiah(addon.price)}
                      {addon.perPerson ? '/org' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="booking-note" className="block text-sm font-bold text-[#161d18] mb-2">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="booking-note"
              rows={2}
              placeholder="Misal: membawa lansia, butuh menu tidak pedas, atau ingin tanya penginapan."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[#c0c9c2] bg-[#ffffff] text-[15px] text-[#161d18] placeholder:text-[#717973] focus:outline-2 focus:outline-[#063c28]"
            />
          </div>

          {/* Summary box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#edf6ed] border border-[#c0c9c2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#414943]">Perkiraan Total Biaya</p>
              <p className="text-2xl font-extrabold text-[#063c28] tabular-nums">
                {formatRupiah(totalEstimate)}
              </p>
              <p className="text-xs text-[#414943] mt-0.5">
                Belum termasuk biaya antar-jemput jika diperlukan. Bayar DP setelah tanggal dikonfirmasi.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[54px] px-6 py-3.5 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-sm transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Kirim Pesan via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="w-full min-h-[48px] px-5 py-2.5 rounded-full border border-[#c0c9c2] hover:bg-[#f3fcf2] text-[#161d18] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#23533e]" />
                  <span>Teks Pesanan Tersalin ke Papan Klip</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#414943]" />
                  <span>Salin Format Pesan WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
