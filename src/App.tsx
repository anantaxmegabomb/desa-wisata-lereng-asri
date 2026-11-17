/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from 'lucide-react';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { GalleryLightboxModal } from './components/GalleryLightboxModal';
import { InteractiveVillageMap } from './components/InteractiveVillageMap';
import { ResilientImage } from './components/ResilientImage';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import {
  DESTINATIONS,
  Destination,
  DestinationCategory,
  FAQ_ITEMS,
  GALLERY_ITEMS,
  HERO_IMAGE,
  TESTIMONIALS,
  TOUR_PACKAGES,
  VILLAGE_ADDRESS,
  WHATSAPP_DISPLAY,
  formatRupiah,
} from './data/tourismData';

const CATEGORIES: DestinationCategory[] = [
  'Semua',
  'Alam & Air',
  'Terasering & Kebun',
  'Budaya & Kemah',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('Semua');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingNote, setBookingNote] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const filteredDestinations =
    selectedCategory === 'Semua'
      ? DESTINATIONS
      : DESTINATIONS.filter((dest) => dest.category === selectedCategory);

  const openWhatsAppBooking = (packageId?: string, note = '') => {
    setBookingPackageId(packageId);
    setBookingNote(note);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3fcf2] text-[#161d18] flex flex-col">
      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="w-full border-b border-[#dce5dc] bg-[#f3fcf2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element wordmark */}
          <a
            href="#beranda"
            className="text-xl font-extrabold tracking-tight text-[#063c28] whitespace-nowrap shrink-0"
          >
            Lereng Asri
          </a>

          {/* Zone 2: Clean single-line text nav links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-[15px] font-semibold text-[#414943]"
          >
            <a
              href="#destinasi"
              className="hover:text-[#063c28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Destinasi
            </a>
            <a
              href="#paket"
              className="hover:text-[#063c28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Paket Wisata
            </a>
            <a
              href="#galeri"
              className="hover:text-[#063c28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Galeri
            </a>
            <a
              href="#lokasi"
              className="hover:text-[#063c28] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Peta Lokasi
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openWhatsAppBooking()}
              className="min-h-[44px] px-5 py-2 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Pesan WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick-Jump Strip (Thumb-friendly navigation without bloating header) */}
        <nav
          aria-label="Pintasan bagian halaman"
          className="md:hidden border-t border-[#e2eae1] bg-[#edf6ed] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
          <a
            href="#destinasi"
            className="min-h-[40px] px-4 rounded-full bg-[#ffffff] border border-[#dce5dc] text-sm font-semibold text-[#161d18] flex items-center whitespace-nowrap shrink-0"
          >
            Destinasi
          </a>
          <a
            href="#paket"
            className="min-h-[40px] px-4 rounded-full bg-[#ffffff] border border-[#dce5dc] text-sm font-semibold text-[#161d18] flex items-center whitespace-nowrap shrink-0"
          >
            Paket & Harga
          </a>
          <a
            href="#galeri"
            className="min-h-[40px] px-4 rounded-full bg-[#ffffff] border border-[#dce5dc] text-sm font-semibold text-[#161d18] flex items-center whitespace-nowrap shrink-0"
          >
            Galeri Foto
          </a>
          <a
            href="#lokasi"
            className="min-h-[40px] px-4 rounded-full bg-[#ffffff] border border-[#dce5dc] text-sm font-semibold text-[#161d18] flex items-center whitespace-nowrap shrink-0"
          >
            Peta Lokasi
          </a>
        </nav>
      </header>

      <main className="flex-1 pb-24 md:pb-12">
        {/* 1. BERANDA & FOTO UTAMA */}
        <section id="beranda" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Hero Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5 order-2 lg:order-1">
              <p className="text-sm font-semibold text-[#23533e]">
                Desa Wisata Pegunungan · Ketinggian 1.100 mdpl · Ramah Keluarga
              </p>

              <h1 className="text-[30px] leading-[38px] sm:text-[38px] sm:leading-[46px] lg:text-[42px] lg:leading-[50px] font-bold tracking-[-0.02em] text-[#161d18]">
                Sejuknya Alam &amp; Hangatnya Tradisi di Lereng Asri
              </h1>

              <p className="text-[17px] leading-[27px] text-[#414943] max-w-xl">
                Lepaskan penat di tengah hamparan terasering hijau, bermain air di air terjun
                alami, dan nikmati hidangan hangat rumahan bersama keramahan warga desa kami.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsAppBooking()}
                  className="min-h-[54px] px-7 py-3.5 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Pesan via WhatsApp</span>
                </button>

                <a
                  href="#paket"
                  className="min-h-[54px] px-7 py-3.5 rounded-full border-2 border-[#063c28] text-[#063c28] hover:bg-[#edf6ed] font-bold text-base flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>Lihat Paket &amp; Harga</span>
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Hero Main Photo Column */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative w-full h-full min-h-[250px] sm:min-h-[340px] lg:min-h-[420px] rounded-3xl overflow-hidden border border-[#dce5dc] shadow-[0_8px_24px_-4px_rgba(35,83,62,0.12)]">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Pemandangan pagi hari di Desa Wisata Lereng Asri dengan sawah terasering dan pendopo bambu"
                  className="w-full h-full lg:h-full object-cover"
                  fallbackTitle="Desa Wisata Lereng Asri"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161d18]/85 via-[#161d18]/40 to-transparent p-5 sm:p-6">
                  <p className="text-sm sm:text-[15px] font-semibold text-white">
                    Pendopo Lembah Timur · Buka Setiap Hari 07.00 – 17.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Quick Highlights Strip */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#ffffff] rounded-2xl border border-[#dce5dc] p-4 sm:p-5">
              <p className="text-2xl font-extrabold text-[#063c28] tabular-nums">4,9 / 5,0</p>
              <p className="text-sm text-[#414943] mt-1">Penilaian Wisatawan Keluarga</p>
            </div>
            <div className="bg-[#ffffff] rounded-2xl border border-[#dce5dc] p-4 sm:p-5">
              <p className="text-2xl font-extrabold text-[#063c28] tabular-nums">5 Destinasi</p>
              <p className="text-sm text-[#414943] mt-1">Alam, Air Terjun &amp; Edukasi</p>
            </div>
            <div className="bg-[#ffffff] rounded-2xl border border-[#dce5dc] p-4 sm:p-5">
              <p className="text-2xl font-extrabold text-[#063c28] tabular-nums">Mulai Rp 75rb</p>
              <p className="text-sm text-[#414943] mt-1">Harga Transparan Tanpa Biaya Tersembunyi</p>
            </div>
            <div className="bg-[#ffffff] rounded-2xl border border-[#dce5dc] p-4 sm:p-5">
              <p className="text-2xl font-extrabold text-[#063c28] tabular-nums">45 Menit</p>
              <p className="text-sm text-[#414943] mt-1">Dari Pusat Kota via Jalan Aspal Mulus</p>
            </div>
          </div>
        </section>

        {/* 2. DAFTAR DESTINASI */}
        <section
          id="destinasi"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-[#dce5dc]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-[#97472e]">Jelajah Kawasan Desa</p>
              <h2 className="mt-1 text-[26px] sm:text-[32px] font-bold text-[#161d18] leading-tight">
                Daftar Destinasi Pilihan
              </h2>
              <p className="mt-2 text-base text-[#414943] max-w-2xl">
                Semua lokasi berada dalam satu kawasan desa yang tertata rapi, aman untuk anak-anak,
                dan mudah dijangkau dengan berjalan santai.
              </p>
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6"
            role="tablist"
            aria-label="Filter kategori destinasi"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[44px] px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#063c28] text-white'
                      : 'bg-[#e8f0e7] text-[#161d18] hover:bg-[#dce5dc]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <article
                key={dest.id}
                className="bg-[#ffffff] rounded-3xl border border-[#dce5dc] overflow-hidden flex flex-col shadow-[0_4px_16px_-2px_rgba(35,83,62,0.05)]"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-[#e8f0e7]">
                  <ResilientImage
                    src={dest.image}
                    alt={dest.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={dest.name}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-[13px] font-semibold text-[#23533e]">
                      {dest.meta}
                    </p>
                    <h3 className="text-xl font-bold text-[#161d18] leading-snug">
                      {dest.name}
                    </h3>
                    <p className="text-[15px] text-[#414943] leading-relaxed">
                      {dest.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#e8f0e7] space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#414943]">Tiket masuk</span>
                      <span className="font-bold text-[#161d18] tabular-nums">
                        {dest.ticketPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveDestination(dest)}
                      className="w-full min-h-[48px] px-5 py-3 rounded-full border-2 border-[#063c28] text-[#063c28] hover:bg-[#edf6ed] font-bold text-[15px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Lihat Rincian &amp; Jam Buka</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. PAKET WISATA & HARGA */}
        <section
          id="paket"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-[#dce5dc]"
        >
          <div className="max-w-2xl mb-8">
            <p className="text-sm font-semibold text-[#97472e]">Harga Jelas &amp; Terjangkau</p>
            <h2 className="mt-1 text-[26px] sm:text-[32px] font-bold text-[#161d18] leading-tight">
              Paket Wisata &amp; Harga Resmi Desa
            </h2>
            <p className="mt-2 text-base text-[#414943]">
              Pilih paket sesuai kebutuhan keluarga atau rombongan Anda. Klik tombol pesan untuk
              menghitung total biaya dan langsung terhubung ke WhatsApp pengelola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOUR_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border shadow-[0_4px_16px_-2px_rgba(35,83,62,0.05)] ${
                  pkg.featured
                    ? 'bg-[#ffffff] border-2 border-[#97472e]'
                    : 'bg-[#ffffff] border-[#dce5dc]'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs sm:text-[13px] font-semibold text-[#97472e]">
                      {pkg.featured ? 'Paling Diminati Keluarga · ' : ''}
                      {pkg.duration} · Minimal {pkg.minPeople} Orang
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-[#161d18]">{pkg.name}</h3>
                    <p className="mt-1 text-[15px] text-[#414943]">{pkg.subtitle}</p>
                  </div>

                  <div className="py-3 border-y border-[#e8f0e7] flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#063c28] tabular-nums">
                      {formatRupiah(pkg.pricePerPerson)}
                    </span>
                    <span className="text-[15px] font-medium text-[#414943]">
                      / {pkg.priceUnit}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#161d18] mb-2.5">Sudah Termasuk:</p>
                    <ul className="space-y-2.5">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-[15px] text-[#161d18]">
                          <Check className="w-5 h-5 text-[#23533e] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 space-y-3">
                  <p className="text-xs sm:text-sm text-[#414943]">{pkg.note}</p>
                  <button
                    type="button"
                    onClick={() => openWhatsAppBooking(pkg.id)}
                    className={`w-full min-h-[52px] px-6 py-3.5 rounded-full text-white font-bold text-base flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      pkg.featured
                        ? 'bg-[#97472e] hover:bg-[#772f18]'
                        : 'bg-[#063c28] hover:bg-[#23533e]'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>Pesan Paket Ini via WhatsApp</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Claim-to-Proof Adjacency: Testimonials immediately after Packages */}
          <div className="mt-12 pt-10 border-t border-[#e2eae1]">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#23533e]">Cerita Pengunjung Sebelumnya</p>
              <h3 className="mt-1 text-2xl font-bold text-[#161d18]">
                Kesan Keluarga &amp; Rombongan yang Sudah Berkunjung
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.id}
                  className="bg-[#ffffff] rounded-3xl border border-[#dce5dc] p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#472f00] tabular-nums">
                      <Star className="w-4 h-4 fill-[#ecaf42] text-[#ecaf42]" />
                      <span>{item.rating} / 5,0</span>
                      <span className="text-[#717973] font-normal">· {item.packageTaken}</span>
                    </div>
                    <p className="text-[15px] text-[#161d18] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <footer className="pt-3 border-t border-[#e8f0e7]">
                    <p className="text-sm font-bold text-[#161d18]">{item.name}</p>
                    <p className="text-xs text-[#414943] mt-0.5">{item.origin}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GALERI SUASANA DESA */}
        <section
          id="galeri"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-[#dce5dc]"
        >
          <div className="max-w-2xl mb-8">
            <p className="text-sm font-semibold text-[#97472e]">Potret Suasana Asli</p>
            <h2 className="mt-1 text-[26px] sm:text-[32px] font-bold text-[#161d18] leading-tight">
              Galeri Foto Desa Wisata Lereng Asri
            </h2>
            <p className="mt-2 text-base text-[#414943]">
              Ketuk foto mana saja untuk melihat tampilan penuh beserta keterangan lokasinya.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#dce5dc] bg-[#e8f0e7] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#063c28]"
              >
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackTitle={item.title}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161d18]/85 via-[#161d18]/40 to-transparent p-3.5 sm:p-5">
                  <p className="text-xs font-medium text-[#baeed2] hidden sm:block">
                    {item.location}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 5. PETA LOKASI & PANDUAN RUTE */}
        <section
          id="lokasi"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-[#dce5dc]"
        >
          <div className="max-w-2xl mb-8">
            <p className="text-sm font-semibold text-[#97472e]">Peta &amp; Akses Menuju Desa</p>
            <h2 className="mt-1 text-[26px] sm:text-[32px] font-bold text-[#161d18] leading-tight">
              Peta Lokasi &amp; Rute Kedatangan
            </h2>
            <p className="mt-2 text-base text-[#414943]">
              Lihat sebaran titik wisata di dalam kawasan desa dan buka rute Google Maps langsung
              ke area parkir utama kami.
            </p>
          </div>

          <InteractiveVillageMap
            onSelectDestinationDetail={(dest) => setActiveDestination(dest)}
          />
        </section>

        {/* 6. PERTANYAAN UMUM (FAQ) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-[#dce5dc]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <p className="text-sm font-semibold text-[#97472e]">Informasi Tambahan</p>
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#161d18] leading-tight">
                Pertanyaan yang Sering Ditanyakan
              </h2>
              <p className="text-base text-[#414943]">
                Masih ada yang ingin ditanyakan tentang akses, menu makanan, atau rombongan?
                Pengelola kami siap membalas pesan Anda dengan ramah.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    openWhatsAppBooking(
                      undefined,
                      'Saya ingin bertanya informasi sebelum berkunjung ke Desa Wisata Lereng Asri.'
                    )
                  }
                  className="min-h-[52px] px-6 py-3 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-bold text-base inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Tanya Pengelola Desa</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-[#ffffff] rounded-2xl border border-[#dce5dc] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[56px] px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-base text-[#161d18] hover:bg-[#f3fcf2] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#23533e] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-[15px] text-[#414943] leading-relaxed border-t border-[#e8f0e7]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#2a322c] text-[#eaf3ea] border-t border-[#414943] pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-xl font-extrabold text-white">Desa Wisata Lereng Asri</p>
            <p className="text-sm text-[#c0c9c2] leading-relaxed">
              Dikelola oleh Kelompok Sadar Wisata (Pokdarwis) Warga Lereng Asri untuk wisata alam
              dan budaya yang lestari serta ramah bagi seluruh keluarga.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-bold text-white">Lokasi &amp; Jam Operasional</p>
            <p className="text-[#c0c9c2] flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#9fd2b6]" />
              <span>{VILLAGE_ADDRESS}</span>
            </p>
            <p className="text-[#c0c9c2] flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-[#9fd2b6]" />
              <span className="tabular-nums">WhatsApp Resmi: {WHATSAPP_DISPLAY}</span>
            </p>
            <p className="text-[#c0c9c2]">Buka Setiap Hari · 07.00 – 17.00 WIB</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-bold text-white">Tautan Halaman</p>
            <div className="flex flex-col space-y-1.5 text-[#c0c9c2]">
              <a href="#beranda" className="hover:text-white transition-colors">
                Beranda
              </a>
              <a href="#destinasi" className="hover:text-white transition-colors">
                Daftar Destinasi
              </a>
              <a href="#paket" className="hover:text-white transition-colors">
                Paket Wisata &amp; Harga
              </a>
              <a href="#galeri" className="hover:text-white transition-colors">
                Galeri Foto
              </a>
              <a href="#lokasi" className="hover:text-white transition-colors">
                Peta Lokasi &amp; Rute
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 border-t border-[#414943] text-xs text-[#c0c9c2] flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; 2026 Pokdarwis Desa Wisata Lereng Asri.</span>
          <span>Wisata Ramah Keluarga &amp; Lingkungan.</span>
        </div>
      </footer>

      {/* Mobile Floating WhatsApp Booking Bar (Under 15% Mobile Sticky Cap: ~68px) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#ffffff]/95 backdrop-blur-md border-t border-[#dce5dc] px-4 py-2.5 shadow-[0_-8px_24px_rgba(22,29,24,0.10)]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#23533e] truncate">
              Butuh info jadwal atau harga?
            </p>
            <p className="text-sm font-bold text-[#161d18] truncate tabular-nums">
              Paket mulai Rp 75rb/org
            </p>
          </div>
          <button
            type="button"
            onClick={() => openWhatsAppBooking()}
            className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-bold text-sm flex items-center gap-2 shrink-0 whitespace-nowrap shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>Pesan WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Desktop Quick WhatsApp Button */}
      <button
        type="button"
        onClick={() => openWhatsAppBooking()}
        className="hidden md:flex fixed bottom-6 right-6 z-40 min-h-[54px] px-6 py-3 rounded-full bg-[#063c28] hover:bg-[#23533e] text-white font-bold text-[15px] items-center gap-2.5 shadow-[0_12px_28px_-4px_rgba(6,60,40,0.3)] transition-colors cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span>Pesan via WhatsApp</span>
      </button>

      {/* Modals */}
      <DestinationDetailModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
        onBookDestination={(destinationName) => {
          setActiveDestination(null);
          openWhatsAppBooking(
            undefined,
            `Ingin mengunjungi destinasi: ${destinationName}`
          );
        }}
      />

      <WhatsAppBookingModal
        isOpen={bookingOpen}
        initialPackageId={bookingPackageId}
        initialNote={bookingNote}
        onClose={() => setBookingOpen(false)}
      />

      <GalleryLightboxModal
        items={GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}

