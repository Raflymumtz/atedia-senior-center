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
}

export interface SiteData {
  home: HomeContent;
  services: Service[];
  facilitiesMain: FacilityMain[];
  facilitiesOther: FacilityOther[];
  /** Gambar background untuk hero banner halaman facilities */
  facilitiesHeroImage?: string;
  activities: Activity[];
  /** Gambar background untuk hero banner halaman activities */
  activitiesHeroImage?: string;
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
  /** URL YouTube video untuk section testimoni */
  testimonialsVideoUrl?: string;
  /** Title untuk section video testimoni */
  testimonialsVideoTitle?: string;
  /** Deskripsi untuk section video testimoni */
  testimonialsVideoDescription?: string;
  about: AboutContent;
}
