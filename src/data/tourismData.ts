export type DestinationCategory =
  | 'Semua'
  | 'Alam & Air'
  | 'Terasering & Kebun'
  | 'Budaya & Kemah';

export interface Destination {
  id: string;
  name: string;
  category: Exclude<DestinationCategory, 'Semua'>;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  meta: string;
  openHours: string;
  ticketPrice: string;
  accessNote: string;
  highlights: string[];
  mapPosition: { x: number; y: number };
  walkTimeFromGate: string;
  elevation: string;
}

export interface TourPackage {
  id: string;
  name: string;
  subtitle: string;
  pricePerPerson: number;
  priceUnit: string;
  minPeople: number;
  duration: string;
  featured?: boolean;
  includes: string[];
  note: string;
}

export interface PackageAddon {
  id: string;
  label: string;
  price: number;
  perPerson: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  location: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  packageTaken: string;
  quote: string;
  rating: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const WHATSAPP_NUMBER = '6281234567890';
export const WHATSAPP_DISPLAY = '0812-3456-7890';

export const VILLAGE_ADDRESS =
  'Jl. Raya Lereng Asri No. 18, Kec. Pegunungan Sejuk, Kab. Asri Indah, Jawa Tengah 55582';

export const VILLAGE_COORDS = {
  lat: -7.6012,
  lng: 110.4235,
  label: '7°36\'04.3"S 110°25\'24.6"E',
};

export const HERO_IMAGE = '/src/assets/images/hero_lereng_asri_1794887039120.jpg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'air-terjun-embun',
    name: 'Air Terjun Embun Pagi',
    category: 'Alam & Air',
    shortDesc:
      'Air terjun alami setinggi 18 meter dengan kolam jernih yang tenang dan aman untuk bermain air bersama keluarga.',
    fullDesc:
      'Terletak di lembah hijau bagian timur desa, Air Terjun Embun Pagi menawarkan aliran air mata pegunungan yang jernih dan sejuk sepanjang tahun. Jalur menuju lokasi telah dilengkapi tangga batu landai dan pegangan bambu yang nyaman.',
    image: '/src/assets/images/dest_air_terjun_1794887039948.jpg',
    imageAlt: 'Air Terjun Embun Pagi dengan kolam alami jernih di tengah hutan hijau',
    meta: 'Alam & Air · Jalan Kaki 12 Menit · Ramah Anak',
    openHours: '07.00 – 16.30 WIB',
    ticketPrice: 'Rp 15.000 / orang',
    accessNote: 'Jalur setapak batu rapi dengan gazebo istirahat di 2 titik.',
    highlights: [
      'Kolam dangkal khusus anak (60 cm)',
      'Ruang ganti & kamar bilas bersih',
      'Spot foto jembatan bambu alami',
    ],
    mapPosition: { x: 78, y: 30 },
    walkTimeFromGate: '12 menit berjalan santai',
    elevation: '1.140 mdpl',
  },
  {
    id: 'terasering-sawah',
    name: 'Terasering Sawah & Kebun Teh',
    category: 'Terasering & Kebun',
    shortDesc:
      'Jalur titian kayu di atas hamparan sawah bertingkat dan kebun teh yang memukau saat matahari terbit.',
    fullDesc:
      'Nikmati panorama lembah berkabut tipis di pagi hari dari jalur kayu aman berpagar bambu. Pengunjung dapat berjalan santai tanpa terjal, menyapa petani lokal, atau duduk menikmati teh hangat di gardu pandang.',
    image: '/src/assets/images/dest_terasering_1794887039942.jpg',
    imageAlt: 'Hamparan terasering hijau dan jembatan kayu saat matahari terbit',
    meta: 'Terasering & Kebun · Sunrise Spot · Ramah Lansia',
    openHours: '05.30 – 17.30 WIB',
    ticketPrice: 'Rp 10.000 / orang',
    accessNote: 'Akses datar dari area parkir atas, nyaman untuk orang tua dan anak.',
    highlights: [
      'Gardu pandang menghadap timur',
      'Jalur titian kayu berpagar kokoh',
      'Warung teh tubruk & jajanan pasar',
    ],
    mapPosition: { x: 46, y: 24 },
    walkTimeFromGate: '6 menit berjalan kaki',
    elevation: '1.180 mdpl',
  },
  {
    id: 'pendopo-adat',
    name: 'Pendopo Adat & Dapur Desa',
    category: 'Budaya & Kemah',
    shortDesc:
      'Rumah joglo kayu yang hangat untuk mencicipi nasi liwet daun pisang, jamu tradisional, dan istirahat keluarga.',
    fullDesc:
      'Pusat keramahan warga Desa Lereng Asri. Di pendopo ini, rombongan keluarga disambut dengan hidangan rumahan segar hasil kebun desa, mulai dari sayur lodeh, ayam kampung bakar, tempe mendoan hangat, hingga wedang jahe.',
    image: '/src/assets/images/dest_kampung_adat_1794887041375.jpg',
    imageAlt: 'Keluarga bersantap hidangan tradisional di pendopo kayu Desa Lereng Asri',
    meta: 'Budaya & Kuliner · Akses Mobil · Kapasitas 60 Orang',
    openHours: '07.00 – 20.00 WIB',
    ticketPrice: 'Gratis masuk (bayar sesuai pesanan)',
    accessNote: 'Tepat di dekat gerbang utama desa, dapat diakses kursi roda.',
    highlights: [
      'Masakan rumahan segar tanpa MSG',
      'Homestay joglo nyaman untuk keluarga',
      'Mushola bersih & tempat duduk luas',
    ],
    mapPosition: { x: 24, y: 58 },
    walkTimeFromGate: '2 menit (Area Utama)',
    elevation: '1.080 mdpl',
  },
  {
    id: 'camping-pinus',
    name: 'Bumi Perkemahan Hutan Pinus',
    category: 'Budaya & Kemah',
    shortDesc:
      'Area glamping dan tenda keluarga di atas dek kayu yang bersih di bawah rindangnya pohon pinus pegunungan.',
    fullDesc:
      'Tidur nyenyak mendengarkan suara alam tanpa khawatir becek. Setiap tenda berdiri di atas panggung kayu kokoh, lengkap dengan matras empuk, selimut tebal, lampu gantung hangat, serta akses air hangat 24 jam.',
    image: '/src/assets/images/galeri_camping_pinus_1794887041595.jpg',
    imageAlt: 'Tenda glamping keluarga di atas dek kayu di tengah hutan pinus',
    meta: 'Kemah & Glamping · Air Hangat · Keamanan 24 Jam',
    openHours: 'Check-in 14.00 WIB · Check-out 12.00 WIB',
    ticketPrice: 'Rp 75.000 / orang (lahan) · Glamping tersedia',
    accessNote: 'Parkir kendaraan berjarak 80 meter dari area tenda.',
    highlights: [
      'Dek kayu anti-lembap & bersih',
      'Kamar mandi bersih dengan pemanas air',
      'Area api unggun komunal yang aman',
    ],
    mapPosition: { x: 70, y: 66 },
    walkTimeFromGate: '8 menit atau antar-jemput desa',
    elevation: '1.150 mdpl',
  },
  {
    id: 'kebun-kopi',
    name: 'Kebun Kopi Arabika Lereng',
    category: 'Terasering & Kebun',
    shortDesc:
      'Belajar memetik buah kopi merah bersama petani desa dan mencicipi seduhan kopi sangrai tradisional.',
    fullDesc:
      'Berjalan menyusuri kebun kopi arabika di ketinggian 1.200 mdpl sambil mendengar kisah petani setempat. Anak-anak dan dewasa dapat ikut memetik ceri kopi matang serta melihat proses sangrai menggunakan wajan tanah liat.',
    image: '/src/assets/images/galeri_edukasi_tani_1794887042937.jpg',
    imageAlt: 'Petani Desa Lereng Asri tersenyum menunjukkan buah kopi merah segar',
    meta: 'Edukasi Tani · Cicip Kopi Gratis · Buka 08.00–16.00',
    openHours: '08.00 – 16.00 WIB',
    ticketPrice: 'Rp 25.000 / orang (termasuk seduhan kopi/teh)',
    accessNote: 'Disarankan memakai sepatu kets atau sandal gunung nyaman.',
    highlights: [
      'Dipandu langsung oleh petani setempat',
      'Mencicipi kopi arabika & gula aren murni',
      'Oleh-oleh biji/bubuk kopi kemasan desa',
    ],
    mapPosition: { x: 48, y: 74 },
    walkTimeFromGate: '10 menit berjalan kaki',
    elevation: '1.200 mdpl',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-sehari',
    name: 'Paket Sehari Segar',
    subtitle: 'Cocok untuk liburan keluarga akhir pekan tanpa menginap',
    pricePerPerson: 125000,
    priceUnit: 'per orang',
    minPeople: 4,
    duration: '08.00 – 14.30 WIB (6,5 Jam)',
    includes: [
      'Tiket masuk seluruh 5 destinasi desa',
      '1x makan siang nasi liwet & lauk kampung di Pendopo',
      'Pemandu warga lokal ramah sepanjang rute',
      'Welcome drink wedang jahe / teh tubruk hangat',
    ],
    note: 'Gratis untuk balita usia di bawah 4 tahun.',
  },
  {
    id: 'paket-menginap',
    name: 'Paket Menginap Keluarga',
    subtitle: 'Pilihan terfavorit untuk menikmati malam tenang & matahari terbit',
    pricePerPerson: 320000,
    priceUnit: 'per orang',
    minPeople: 4,
    duration: '2 Hari 1 Malam',
    featured: true,
    includes: [
      'Menginap 1 malam di Homestay Joglo atau Glamping Pinus',
      '3x makan prasmanan tradisional + camilan sore',
      'Jalan pagi terasering & wisata edukasi petik kopi',
      'Sesi api unggun malam dengan jagung bakar & teh hangat',
    ],
    note: 'Tersedia pilihan kamar keluarga pribadi atau tenda glamping.',
  },
  {
    id: 'paket-edukasi',
    name: 'Paket Edukasi Tani & Sekolah',
    subtitle: 'Dirancang khusus untuk rombongan sekolah, komunitas, dan kantor',
    pricePerPerson: 95000,
    priceUnit: 'per peserta',
    minPeople: 15,
    duration: '08.30 – 13.30 WIB (5 Jam)',
    includes: [
      'Praktik tanam padi / petik kopi bersama petani desa',
      'Workshop membuat kerajinan anyaman bambu',
      '1x makan siang kotak tradisional + air mineral',
      'Area pendopo utama & pelantang suara untuk acara',
    ],
    note: 'Pendamping / guru pendamping mendapatkan potongan khusus.',
  },
  {
    id: 'paket-kemah',
    name: 'Paket Kemah & Glamping Pinus',
    subtitle: 'Bermalam di bawah hutan pinus dengan fasilitas air hangat',
    pricePerPerson: 175000,
    priceUnit: 'per orang',
    minPeople: 2,
    duration: '2 Hari 1 Malam',
    includes: [
      'Tenda bersih berkapasitas 2–4 orang di atas dek kayu',
      'Matras busa, sleeping bag, bantal, dan lampu tenda',
      'Sarapan pagi hangat (nasi goreng kampung / bubur)',
      'Akses kamar mandi air hangat 24 jam & keamanan',
    ],
    note: 'Bisa bawa tenda sendiri cukup Rp 75.000 / orang.',
  },
];

export const PACKAGE_ADDONS: PackageAddon[] = [
  {
    id: 'addon-fotografer',
    label: 'Jasa Dokumentasi Foto Keluarga (File Digital)',
    price: 150000,
    perPerson: false,
  },
  {
    id: 'addon-bakar-ikan',
    label: 'Sajian Malam Bakar Ikan Nila & Sambal Desa',
    price: 45000,
    perPerson: true,
  },
  {
    id: 'addon-oleh-oleh',
    label: 'Bingkisan Kopi Lereng & Gula Aren (Per Orang)',
    price: 35000,
    perPerson: true,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pagi Cerah di Lereng Asri',
    caption: 'Kabut tipis menyelimuti lembah saat matahari terbit di dekat pendopo bambu.',
    location: 'Pendopo Lembah Timur',
    image: HERO_IMAGE,
    imageAlt: 'Pemandangan pagi hari Desa Wisata Lereng Asri dengan kabut dan matahari terbit',
  },
  {
    id: 'gal-2',
    title: 'Kesegaran Air Terjun Embun',
    caption: 'Pengunjung menikmati beningnya kolam alami di tengah rimbunnya pakis hutan.',
    location: 'Air Terjun Embun Pagi',
    image: '/src/assets/images/dest_air_terjun_1794887039948.jpg',
    imageAlt: 'Wisatawan berdiri di batu tepi kolam Air Terjun Embun Pagi',
  },
  {
    id: 'gal-3',
    title: 'Menyusuri Titian Terasering',
    caption: 'Jalur kayu ramah pejalan kaki membelah sawah hijau yang terawat asri.',
    location: 'Bukit Terasering Sawah',
    image: '/src/assets/images/dest_terasering_1794887039942.jpg',
    imageAlt: 'Jembatan kayu di tengah sawah terasering saat fajar',
  },
  {
    id: 'gal-4',
    title: 'Jamuan Hangat Dapur Pendopo',
    caption: 'Hidangan tradisional disajikan beralas daun pisang dengan senyum tuan rumah.',
    location: 'Pendopo Adat Lereng Asri',
    image: '/src/assets/images/dest_kampung_adat_1794887041375.jpg',
    imageAlt: 'Ibu tuan rumah desa menyajikan hidangan di pendopo kayu tradisional',
  },
  {
    id: 'gal-5',
    title: 'Sore Hangat di Hutan Pinus',
    caption: 'Keluarga berkumpul santai di dek glamping menjelang senja dengan lampu temaram.',
    location: 'Bumi Perkemahan Pinus',
    image: '/src/assets/images/galeri_camping_pinus_1794887041595.jpg',
    imageAlt: 'Keluarga bersantai di meja kayu depan tenda glamping hutan pinus',
  },
  {
    id: 'gal-6',
    title: 'Senyum Petani Kopi Lokal',
    caption: 'Panen ceri kopi merah bersama warga lokal yang selalu siap berbagi cerita.',
    location: 'Kebun Kopi Arabika 1.200 mdpl',
    image: '/src/assets/images/galeri_edukasi_tani_1794887042937.jpg',
    imageAlt: 'Empat petani desa tersenyum memegang hasil panen kopi merah',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Ibu Ratna Kusumawardhani',
    origin: 'Semarang · Rombongan Keluarga (9 Orang)',
    packageTaken: 'Paket Menginap Keluarga',
    quote:
      'Jalan menuju desa sudah beraspal mulus, jadi orang tua saya yang sudah sepuh tetap nyaman. Makanannya enak sekali, homestay bersih, dan anak-anak betah main air di air terjun.',
    rating: '5,0',
  },
  {
    id: 'testi-2',
    name: 'Bapak Hendro Wibowo',
    origin: 'Yogyakarta · Komunitas Sepeda & Keluarga',
    packageTaken: 'Paket Sehari Segar',
    quote:
      'Pemandunya sabar dan sangat informatif. Harga paketnya jelas dari awal lewat WhatsApp tanpa biaya tambahan mendadak. Pemandangan pagi di teraseringnya juara.',
    rating: '4,9',
  },
  {
    id: 'testi-3',
    name: 'Siti Aminah, S.Pd.',
    origin: 'Solo · SD Harapan Bangsa (34 Siswa)',
    packageTaken: 'Paket Edukasi Tani & Sekolah',
    quote:
      'Anak-anak belajar langsung menanam padi dan mengenal kopi dengan cara yang menyenangkan. Toilet bersih dan area pendopo sangat luas serta aman untuk anak.',
    rating: '5,0',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah akses jalan bisa dilalui mobil pribadi atau bus medium?',
    answer:
      'Ya, jalan menuju gerbang Desa Wisata Lereng Asri sudah beraspal mulus dan lebar. Mobil pribadi, minibus (HiAce/Elf), hingga bus medium kapasitas 30 kursi dapat masuk hingga area parkir utama.',
  },
  {
    id: 'faq-2',
    question: 'Apakah destinasi aman untuk anak-anak dan lansia?',
    answer:
      'Sangat aman. Pendopo Adat dan Gardu Pandang Terasering memiliki akses datar tanpa tanjakan berat. Untuk Air Terjun Embun Pagi, tersedia tangga batu landai dengan pegangan bambu dan bangku istirahat di sepanjang jalan.',
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara memesan paket wisata dan sistem pembayarannya?',
    answer:
      'Cukup klik tombol Pesan via WhatsApp untuk mengecek ketersediaan tanggal dengan pengelola desa (Pokdarwis). Pemesanan dikunci dengan uang muka ringan 30% dan pelunasan dapat dilakukan saat tiba di desa (tunai atau QRIS).',
  },
  {
    id: 'faq-4',
    question: 'Apakah tersedia sinyal seluler dan fasilitas ibadah?',
    answer:
      'Sinyal 4G operator utama tersedia baik di area Pendopo dan Terasering, serta tersedia Wi-Fi gratis di Pendopo Adat. Mushola yang bersih dengan air wudhu jernih pegunungan tersedia di 2 titik strategis.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
