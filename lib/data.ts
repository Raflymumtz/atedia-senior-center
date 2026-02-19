import fs from "fs";
import path from "path";
import type { SiteData } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site.json");

// Placeholder images from web (senior care, elderly, etc.)
const IMG = {
  hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920",
  caregiver: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
  seniorCare: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
  garden: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  exercise: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800",
  room: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
  dining: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
  lounge: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800",
  seniors: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800",
};

const defaultData: SiteData = {
  home: {
    heroTitle: "Welcome to",
    heroSubtitle: "Atedia Senior Center",
    introParagraph1:
      "Di Atedia, kami percaya masa tua adalah anugerah, kesempatan untuk menikmati hidup dengan penuh arti. Kami hadir untuk membantu menjalani hari-hari dengan aman, nyaman, dan tetap mandiri, di tengah komunitas yang saling mendukung.",
    introParagraph2:
      "Dengan lingkungan yang hangat dan berkualitas, orang tua dapat tetap berkarya, bersosialisasi. Atedia membuat masa tua menjadi momen yang damai, bermakna, dan menyenangkan.",
    tagline: "Berdaya, Berkarya, dan Bahagia",
    heroImage: IMG.hero,
    sectionTitle: "Meningkatkan Kualitas Hidup dengan Perawatan Profesional",
    sectionTitleBackgroundImage: "/images/section-title-bg.png",
    mengapaHarusTitle: "Mengapa Harus Atedia?",
    mengapaHarusBullets: [
      "Tempat tinggal yang menghadirkan ketenangan, kenyamanan, dan rasa aman bagi orang tua Anda.",
      "Tenaga ahli yang berdedikasi untuk mendampingi dan merawat lansia dengan penuh perhatian.",
      "Program dan fasilitas yang mendukung kebutuhan fisik, emosional, dan sosial secara menyeluruh.",
    ],
    mengapaHarusImage: IMG.caregiver,
    temukanKenyamananTitle: "Temukan Kenyamanan Sejati",
    temukanKenyamananImage: IMG.exercise,
    featuresTitle: "Keistimewaan yang Kami Tawarkan",
    features: [
      {
        id: "1",
        title: "Aman",
        description:
          "Lingkungan terjaga dengan sistem dan pendampingan yang penuh perhatian.",
        image: IMG.seniorCare,
        order: 0,
      },
      {
        id: "2",
        title: "Asri",
        description:
          "Suasana nyaman, bersih, dan menenangkan untuk kualitas hidup yang lebih baik.",
        image: IMG.garden,
        order: 1,
      },
      {
        id: "3",
        title: "Akrab",
        description:
          "Kebersamaan yang terjalin dengan kasih, menghadirkan rasa memiliki dan ketenangan hati.",
        image: IMG.seniors,
        order: 2,
      },
    ],
  },
  services: [
    {
      id: "1",
      title: "Longstay",
      description:
        "Harian penuh untuk lansia yang membutuhkan layanan harian secara terus-menerus.",
      image: IMG.caregiver,
      order: 0,
    },
    {
      id: "2",
      title: "Senior Club",
      description:
        "Bagi lansia yang masih tinggal di rumah namun ingin mengikuti aktivitas sosial tanpa menginap.",
      image: IMG.seniors,
      order: 1,
    },
    {
      id: "3",
      title: "Staycation",
      description:
        "Menginap singkat bagi lansia saat keluarga bepergian atau sebagai percobaan sebelum Longstay.",
      image: IMG.seniors,
      order: 2,
    },
  ],
  facilitiesMain: [
    {
      id: "1",
      title: "Fasilitas Kamar Nyaman",
      description:
        "Kamar tidur lengkap dengan fasilitas modern dan akses ramah difabel. Setiap kamar dirancang untuk kenyamanan dan kemandirian warga.",
      image: IMG.room,
      order: 0,
    },
  ],
  facilitiesOther: [
    { id: "1", title: "Living & Dining Room", image: IMG.dining, order: 0 },
    { id: "2", title: "Perawat & Bantuan Teknis", image: IMG.caregiver, order: 1 },
    { id: "3", title: "Area Publik & Ruang Sosial", image: IMG.lounge, order: 2 },
    { id: "4", title: "Taman", image: IMG.garden, order: 3 },
  ],
  facilitiesHeroImage: IMG.room,
  activitiesHeroImage: IMG.exercise,
  activitiesCTATitle: "Ciptakan Pengalaman Tak Terlupakan di Atedia",
  activitiesCTAParagraph1:
    "Nikmati suasana yang hangat, nyaman, dan penuh makna di setiap momen yang Anda habiskan. Di Atedia, setiap detail dirancang untuk menghadirkan pengalaman istimewa. Dengan layanan profesional, fasilitas yang mendukung gaya hidup aktif dan sehat, serta komunitas yang saling peduli, kami memastikan setiap hari terasa lebih bermakna dan membahagiakan.",
  activitiesCTAParagraph2:
    "Setiap tawa yang tercipta, setiap cerita yang dibagikan, dan setiap kebersamaan yang terjalin menjadi bagian dari perjalanan hidup yang indah. Kami memahami bahwa setiap individu memiliki kisah dan kenangan berharga, karena itu Atedia hadir untuk merawat, menghargai, dan menemani setiap langkah dengan penuh cinta dan perhatian.",
  activitiesCTAImage: IMG.seniors,
  activitiesCTAButtonText: "Book Senior Living",
  activitiesCTAButtonLink: "#",
  activities: [
    {
      id: "1",
      title: "Aktivitas Kreatif dan Kerajinan",
      description: "Berbagai kegiatan seni dan kerajinan tangan untuk mendukung kreativitas.",
      image: IMG.seniors,
      order: 0,
    },
    {
      id: "2",
      title: "Cek Kesehatan Seminggu Sekali",
      description: "Pemeriksaan kesehatan rutin oleh tenaga medis profesional.",
      image: IMG.caregiver,
      order: 1,
    },
    {
      id: "3",
      title: "Kegiatan Senam dan Terapi Gerak",
      description: "Olahraga ringan dan terapi gerak untuk menjaga kebugaran.",
      image: IMG.exercise,
      order: 2,
    },
  ],
  gallery: [
    { id: "1", image: IMG.exercise, caption: "Senam bersama", order: 0 },
    { id: "2", image: IMG.seniors, caption: "Aktivitas kelompok", order: 1 },
    { id: "3", image: IMG.garden, caption: "Waktu di taman", order: 2 },
  ],
  testimonials: [
    {
      id: "1",
      name: "Febri, Keluarga Penghuni",
      quote:
        "Kami merasa sangat terbantu dengan perhatian staf. Lingkungan nyaman dan banyak teman baru.",
      role: "Keluarga Penghuni",
      image: IMG.seniors,
      order: 0,
    },
    {
      id: "2",
      name: "Ibu Maria, Penghuni Atedia",
      quote:
        "Yang paling seru di sini adalah suasana Senior Club dan eventnya yang ceria. Setiap hari ada kegiatan menarik sehingga tidak merasa bosan. Tempat ini benar-benar seperti rumah kedua.",
      role: "Penghuni Atedia",
      image: IMG.seniors,
      order: 1,
    },
    {
      id: "3",
      name: "Rina, Keluarga Penghuni",
      quote:
        "Pelayanan kesehatan yang sangat membantu. Ada konsultasi dokter dan pendampingan psikologis yang membuat keluarga merasa lebih tenang. Atedia bukan hanya tempat tinggal, tapi juga tempat tumbuh dan termotivasi.",
      role: "Keluarga Penghuni",
      image: IMG.seniors,
      order: 2,
    },
  ],
  about: {
    title: "Tentang Atedia Senior Center",
    description:
      "Di Atedia, kami percaya masa tua adalah anugerah. Kami hadir untuk membantu menjalani hari-hari dengan aman, nyaman, dan tetap mandiri, di tengah komunitas yang saling mendukung.",
    tagline: "Meningkatkan Kualitas Hidup dengan Perawatan Profesional",
    mission:
      "Meningkatkan kualitas hidup lansia melalui perawatan profesional, lingkungan yang aman dan asri.",
    vision:
      "Menjadi pusat perawatan lansia terpercaya yang menghadirkan rasa nyaman seperti di rumah sendiri.",
    address: "Royal Residence B15 50-52, Surabaya, Jawa Timur 60215",
    phone: "08113471778",
    email: "info@atediaseniorcenter.com",
    hours: "Senin–Sabtu (08.00–17.00)",
    whatsapp: "628113471778",
    mapEmbedUrl:
      "https://www.google.com/maps?q=-7.3215833,112.6715061&z=17&output=embed",
    directionsUrl: "https://maps.app.goo.gl/3Rp7ajpccJuPQWJP7",
    infoItems: [
      "Program harian & aktivitas sosial",
      "Pendampingan dan layanan ramah lansia",
      "Lingkungan aman, nyaman, dan bersih",
    ],
    footerBannerImage: IMG.seniors,
  },
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function mergeWithDefaults(parsed: Record<string, unknown>): SiteData {
  const merged = { ...defaultData } as Record<string, unknown>;
  for (const key of Object.keys(defaultData)) {
    if (parsed[key] !== undefined) {
      merged[key] = parsed[key];
    }
  }
  // Deep-merge about so partial admin saves keep default fields
  if (parsed.about && typeof parsed.about === "object") {
    merged.about = { ...defaultData.about, ...(parsed.about as Record<string, unknown>) } as SiteData["about"];
  }
  // Migrate old 'facilities' to facilitiesMain if facilitiesMain is empty
  if (
    parsed.facilities &&
    Array.isArray(parsed.facilities) &&
    (!parsed.facilitiesMain || (parsed.facilitiesMain as unknown[]).length === 0)
  ) {
    merged.facilitiesMain = (
      parsed.facilities as { id?: string; title: string; description?: string; image?: string; order?: number }[]
    ).map((f, i) => ({
      id: f.id || String(i),
      title: f.title,
      description: f.description || "",
      image: f.image,
      order: i,
    }));
  }
  // Ensure home features have id
  if (merged.home && Array.isArray((merged.home as { features?: { id?: string }[] }).features)) {
    (merged.home as { features: { id?: string; order?: number }[] }).features = (
      merged.home as { features: { id?: string; title: string; description: string; image?: string; order?: number }[] }
    ).features.map((f, i) => ({ ...f, id: f.id || String(i), order: f.order ?? i }));
  }
  // Ensure new home fields exist (migration)
  const h = merged.home as Record<string, unknown>;
  if (h && !h.mengapaHarusTitle) {
    h.mengapaHarusTitle = defaultData.home.mengapaHarusTitle;
    h.mengapaHarusBullets = defaultData.home.mengapaHarusBullets;
    h.mengapaHarusImage = defaultData.home.mengapaHarusImage;
    h.temukanKenyamananTitle = defaultData.home.temukanKenyamananTitle;
    h.temukanKenyamananImage = defaultData.home.temukanKenyamananImage;
    h.featuresTitle = (h.sectionSubtitle as string) || defaultData.home.featuresTitle;
  }
  return merged as SiteData;
}

export function loadData(): SiteData {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch {
    return defaultData;
  }
}

export function saveData(data: SiteData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
