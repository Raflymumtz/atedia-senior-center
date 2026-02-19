// Home - Teks pembuka + Keistimewaan
export interface HomeFeature {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  introParagraph1: string;
  introParagraph2: string;
  tagline: string;
  heroImage?: string;
  sectionTitle: string;
  /** Gambar background untuk section "Meningkatkan Kualitas Hidup" */
  sectionTitleBackgroundImage?: string;
  sectionSubtitle: string;
  /** "Mengapa Harus Atedia?" section */
  mengapaHarusTitle: string;
  mengapaHarusBullets: string[];
  mengapaHarusImage?: string;
  /** "Temukan Kenyamanan Sejati" banner */
  temukanKenyamananTitle: string;
  temukanKenyamananImage?: string;
  /** Keistimewaan (Aman, Asri, Akrab) */
  featuresTitle: string;
  features: HomeFeature[];
}

// Service - Layanan Kami
export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
}

// Halaman Service - hero + section Layanan Profesional Kami
export interface ServicePageContent {
  heroTitle: string;
  heroCaption: string;
  /** Gambar background hero (bisa banyak untuk carousel auto-slide) */
  heroSlides: string[];
  /** Judul section "Layanan Profesional Kami" */
  sectionTitle: string;
  /** Caption paragraf 1 */
  sectionCaption1: string;
  /** Caption paragraf 2 */
  sectionCaption2: string;
  /** Gambar carousel di section (bisa banyak, auto-slide) */
  carouselSlides: string[];
}

// Facilities - Fasilitas Kami + Fasilitas Lainnya
export interface FacilityMain {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
}

export interface FacilityOther {
  id: string;
  title: string;
  image?: string;
  order: number;
}

// Halaman Facilities - section konten
export interface FacilitiesPageContent {
  /** Hero section */
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  /** Section "Senior Living" */
  seniorLivingImage?: string;
  seniorLivingSubtitle?: string;
  seniorLivingDescription?: string;
  roomTypeLabel?: string;
  roomTypeValue?: string;
  serviceLabel?: string;
  serviceValue?: string;
  /** Section "Fasilitas Kami" */
  facilitiesTitle?: string;
  facilitiesParagraph1?: string;
  facilitiesParagraph2?: string;
  /** Gambar carousel untuk section Fasilitas Kami */
  facilitiesCarouselImages?: string[];
  /** Gambar carousel aktivitas (auto-slide 3 detik) */
  activityCarouselImages?: string[];
}

// Activities - Aktivitas + Galeri
export interface Activity {
  id: string;
  title: string;
  description: string;
  image?: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  image?: string;
  caption?: string;
  order: number;
}

// Testimoni
export interface Testimoni {
  id: string;
  name: string;
  quote: string;
  role?: string;
  image?: string;
  order: number;
}

// About Us
export interface AboutContent {
  title: string;
  description: string;
  /** Tagline untuk section dekoratif (daun) */
  tagline?: string;
  mission?: string;
  vision?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapEmbedUrl?: string;
  /** Link tombol Get Directions (mis. Google Maps / maps.app.goo.gl) */
  directionsUrl?: string;
  whatsapp?: string;
  infoItems?: string[];
  footerBannerImage?: string;
  /** Gambar background footer (opsional) */
  footerBackgroundImage?: string;
  /** Warna background footer (hex, mis. #5c4a3d). Dipakai jika tidak ada gambar. Kosong = default atedia-brown */
  footerBackgroundColor?: string;
}

export interface SiteData {
  home: HomeContent;
  services: Service[];
  /** Konten halaman Service (hero + section Layanan Profesional) */
  servicePage?: ServicePageContent;
  /** @deprecated Gunakan servicePage.heroSlides */
  servicesHeroImage?: string;
  facilitiesMain: FacilityMain[];
  facilitiesOther: FacilityOther[];
  /** Gambar background untuk hero banner halaman facilities */
  facilitiesHeroImage?: string;
  /** Konten halaman Facilities (section teks) */
  facilitiesPage?: FacilitiesPageContent;
  activities: Activity[];
  /** Gambar background untuk hero banner halaman activities */
  activitiesHeroImage?: string;
  /** Konten halaman Activities (hero section) */
  activitiesPage?: FacilitiesPageContent;
  /** Section CTA untuk halaman activities */
  activitiesCTATitle?: string;
  activitiesCTAParagraph1?: string;
  activitiesCTAParagraph2?: string;
  activitiesCTAImage?: string;
  activitiesCTAButtonText?: string;
  activitiesCTAButtonLink?: string;
  gallery: GalleryImage[];
  testimonials: Testimoni[];
  /** Gambar background untuk hero banner halaman testimonials */
  testimonialsHeroImage?: string;
  /** Konten halaman Testimonials (hero section) */
  testimonialsPage?: FacilitiesPageContent;
  /** URL YouTube video untuk section testimoni */
  testimonialsVideoUrl?: string;
  /** Title untuk section video testimoni */
  testimonialsVideoTitle?: string;
  /** Deskripsi untuk section video testimoni */
  testimonialsVideoDescription?: string;
  about: AboutContent;
}
