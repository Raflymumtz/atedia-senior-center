# Atedia Senior Center

Website untuk Atedia Senior Center — tampilan publik (Home, Service, Facilities, Activities, Testimoni, About Us) dan panel admin untuk CRUD konten.

## Fitur

- **Publik**: Home, Service, Facilities, Activities, Testimoni, About Us — desain mengacu pada [Atedia Senior Center (Google Sites)](https://sites.google.com/view/atediaseniorcenter/home).
- **Admin**: Login dengan password, lalu edit konten untuk setiap bagian (Create, Read, Update, Delete).

## Cara Menjalankan

1. **Instal dependensi**
   ```bash
   npm install
   ```

2. **Atur password admin (opsional)**  
   Buat file `.env.local` di root project:
   ```
   ADMIN_PASSWORD=password_rahasia_anda
   ```
   Jika tidak diatur, password default: `atedia2024`.

3. **Jalankan development server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) untuk situs publik.

4. **Akses admin** (link terpisah, tidak ada di navigasi publik)
   - Buka langsung: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Masukkan password admin
   - Edit Home, Service, Facilities, Activities, Testimoni, atau About Us

## Build Produksi

```bash
npm run build
npm start
```

## Struktur Data

Konten disimpan di `data/site.json`. File ini dibuat otomatis saat pertama kali akses. Backup file ini untuk menyimpan konten.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
