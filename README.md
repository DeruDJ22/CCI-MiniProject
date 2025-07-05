# 🌐 Mini Project Next.js by KuroAkai

Ini adalah dua aplikasi web yang dibangun dengan Next.js dan TailwindCSS, masing-masing dengan fokus berbeda: eksplorasi anime dan pengelolaan keuangan pribadi.

---

## 🎌 Anime Explorer

Sebuah aplikasi eksplorasi anime yang memanfaatkan data dari [Jikan API](https://jikan.moe/) untuk menampilkan informasi anime secara lengkap dan menarik.

### 🚀 Fitur Utama

- 🔍 Cari anime berdasarkan judul
- 🏆 Lihat daftar top anime
- 🌸 Eksplorasi anime berdasarkan musim (season)
- 📽️ Lihat trailer dan detail lengkap anime
- 🎲 Tampilkan anime acak
- 📱 Responsive design (mobile-friendly)

### 🛠️ Teknologi

- **Next.js App Router**
- **TailwindCSS**
- **Jikan API v4**
- **Shadcn/ui** (untuk komponen UI)
- **Next.js Image Optimization**

### 📂 Struktur Halaman

- `/` – Beranda
- `/anime/list` – Daftar seluruh anime
- `/anime/add` – Cari anime
- `/anime/:id` – Detail anime
- `/about` – Tentang aplikasi

---

## 💰 Finance Tracker

Aplikasi sederhana untuk mencatat pemasukan dan pengeluaran harian dengan tampilan yang interaktif dan mendukung fitur CRUD lengkap.

### ✅ Fitur Utama

- ➕ Tambah transaksi (pemasukan/pengeluaran)
- ✏️ Edit nominal transaksi
- 🗑️ Hapus transaksi
- 📊 Statistik visual (pie chart)
- 🔍 Filter transaksi berdasarkan tipe
- 🔔 Notifikasi real-time (dengan Sonner)
- 📱 Responsive & mobile-friendly

### 🛠️ Teknologi

- **Next.js App Router**
- **TailwindCSS**
- **Shadcn/ui**
- **Recharts** untuk visualisasi data
- **Sonner** untuk toast notifikasi
- **LocalStorage** sebagai data penyimpanan

### 📂 Struktur Halaman

- `/finance-tracker` – Beranda
- `/finance-tracker/transactions` – Daftar transaksi
- `/finance-tracker/add-transaction` – Tambah transaksi
- `/finance-tracker/statistics` – Statistik
- `/finance-tracker/about` – Tentang aplikasi

---

## 📦 Instalasi & Menjalankan Secara Lokal

Clone repository dan jalankan proyek secara lokal:

```bash
git clone https://github.com/DeruDJ22/CCI-MiniProject.git
cd project-nextjs
npm install
npm run dev
