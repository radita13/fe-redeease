# Project Folder Structure Design

Dokumen ini menjelaskan struktur folder (Architecture Directory) dari project React Vite saat ini secara lengkap dan komprehensif. Struktur ini dirancang dengan standar praktik terbaik (best practices) untuk skalabilitas, kerapian, dan integrasi dengan **Tailwind CSS v4** serta **Shadcn UI**.

## 📂 Struktur Utama (`client/`)

```text
client/
├── dist/                   # Folder hasil build produksi (di-generate otomatis oleh Vite)
│
├── public/                 # File statis publik (tidak akan diproses oleh Webpack/Vite)
│   ├── favicon.ico         # Ikon tab browser
│   ├── logo192.png         # Logo resolusi 192px (untuk PWA/manifest)
│   ├── logo512.png         # Logo resolusi 512px
│   ├── manifest.json       # Metadata Progressive Web App (PWA)
│   └── robots.txt          # Aturan indexing untuk Search Engine/Bot
│
├── src/                    # Source code utama aplikasi React Anda
│   ├── components/         # Tempat untuk semua reusable components
│   │   ├── ui/             # Component dasar bawaan Shadcn UI (Button, Input, dll)
│   │   └── shared/         # Component spesifik proyek yang dipakai berulang (CardItem, Navbar, dll)
│   │
│   ├── constants/          # Tempat variabel konstan, hardcoded values, atau konfigurasi statis
│   │
│   ├── context/            # Global state yang menggunakan React Context API
│   │
│   ├── hooks/              # Custom React Hooks (contoh: useFetch, useAuth)
│   │
│   ├── layouts/            # Komponen tata letak halaman (misal: MainLayout, AuthLayout, Sidebar)
│   │
│   ├── lib/                # Konfigurasi library eksternal atau utilitas khusus (seperti utils.js shadcn)
│   │   └── utils.js        # File helper wajib dari Shadcn UI untuk menggabungkan class Tailwind (clsx & twMerge)
│   │
│   ├── pages/              # Komponen level rute / halaman utama (contoh: Home.jsx, Dashboard.jsx)
│   │
│   ├── services/           # Modul untuk memanggil API / backend (Axios, Fetchers, Endpoints)
│   │
│   ├── store/              # Global state management yang lebih kompleks (Zustand)
│   │
│   ├── styles/             # File stylesheet CSS global
│   │   └── global.css      # CSS utama proyek yang mengimpor Tailwind v4, variabel tema Shadcn, dan font
│   │
│   ├── utils/              # Fungsi-fungsi helper umum murni (formatDate, calculateLogic, dll)
│   │
│   ├── App.jsx             # Komponen root aplikasi & penentu rute utama (Routing Config)
│   ├── App.test.js         # File testing bawaan untuk komponen App
│   ├── index.jsx           # Entry point utama untuk me-render React ke DOM (Vite entry)
│   ├── reportWebVitals.js  # Utilitas untuk mengukur performa (Web Vitals)
│   └── setupTests.js       # Konfigurasi awal untuk testing library
│
├── .gitignore              # Daftar file/folder yang diabaikan Git (contoh: node_modules, dist)
├── .prettierignore         # Daftar file/folder yang tidak diformat oleh Prettier
├── .prettierrc             # Konfigurasi aturan format code Prettier + plugin Tailwind CSS
├── README.md               # Dokumentasi default project
├── components.json         # Konfigurasi utama CLI Shadcn UI (menyimpan preferensi path dan gaya UI)
├── index.html              # HTML Root Page untuk Vite (Tempat <div id="root"> dan script masuk)
├── jsconfig.json           # Konfigurasi compiler path alias (`@/`) untuk editor dan Shadcn UI
├── package-lock.json       # Pohon dependensi spesifik dari NPM (mengunci versi library)
├── package.json            # Daftar library proyek (dependencies), nama proyek, dan npm scripts
└── vite.config.js          # Konfigurasi bundler Vite (mencakup plugin react, tailwind, dan resolve alias)
```

---

## 🔍 Penjelasan Detail Tiap Folder Utama

### 1. File Konfigurasi Root (Paling Luar)

File-file seperti `index.html`, `vite.config.js`, `jsconfig.json`, dan `components.json` adalah tulang punggung (backbone) dari environment pengembangan Anda:

- **`index.html`**: Di Vite, file HTML utama harus berada di root agar Vite bisa memuat `<script type="module" src="/src/index.jsx"></script>` secara langsung.
- **`components.json`**: Menandakan proyek ini menggunakan Shadcn UI. File ini mengatur agar semua komponen yang di-install via CLI masuk ke `@/components/ui` dan menggunakan `src/styles/global.css` sebagai rujukan warna/gaya base.

### 2. `components/`

Folder ini dikhususkan untuk komponen yang bisa dipakai ulang (_reusable_).

- **`components/ui/`**: Eksklusif diisi oleh komponen yang di-_generate_ secara otomatis oleh Shadcn UI CLI. Sebaiknya jangan terlalu banyak diubah manual kecuali diperlukan penyesuaian khusus.
- **`components/shared/`** (Opsional): Komponen rakitan Anda sendiri yang dipakai di banyak halaman.

### 3. `pages/` (atau `views/`)

Berisi komponen tingkat tertinggi untuk setiap route/URL. Setiap file di sini seharusnya merepresentasikan satu halaman penuh dan hanya bertugas merangkai _Layouts_ dan _Components_.

### 4. `layouts/`

Berisi pembungkus (_wrapper_) halaman. Jika banyak halaman menggunakan struktur "Navbar + Content + Footer", Anda bisa membuat file `MainLayout.jsx` di sini dan membungkus halaman tersebut di dalamnya.

### 5. `lib/` vs `utils/`

- **`lib/`**: Biasanya diperuntukkan bagi kode yang membungkus _library eksternal_. Contohnya adalah `lib/utils.js` yang digunakan Shadcn UI untuk mengelola kombinasi class CSS menggunakan library `clsx` dan `tailwind-merge`.
- **`utils/`**: Berisi fungsi JavaScript murni buatan Anda sendiri (misal: menghitung diskon, format tanggal).

### 6. Manajemen State (`store/` & `context/`)

- Gunakan **`context/`** untuk hal-hal yang jarang berubah secara intensif dan membutuhkan akses global sederhana (misal: akses info User Login, pengaturan bahasa/tema).
- Gunakan **`store/`** jika Anda memasang state manager seperti Zustand atau Redux untuk state aplikasi yang reaktif dan kompleks.

### 7. `services/` (atau `api/`)

Pisahkan semua panggilan API (HTTP/Backend requests) ke dalam folder ini (misal: `authService.js`). Tujuannya agar jika endpoint API berubah, Anda cukup mencarinya di satu tempat tanpa perlu mengaduk-aduk folder komponen.

---

## 🛠 Aturan Penulisan Kode (Convention)

- **Komponen React (`.jsx`)**: Penamaan file menggunakan **PascalCase** (contoh: `Button.jsx`, `DashboardPage.jsx`).
- **File Utilitas/Service (`.js`)**: Penamaan file menggunakan **camelCase** (contoh: `apiClient.js`, `formatDate.js`).
- **Import Paths**: Biasakan selalu menggunakan _Absolute Import_ dengan alias `@/` yang sudah kita konfigurasikan di `jsconfig.json`.
  Contoh yang benar:
  `import { Button } from "@/components/ui/button"`
  Bukan:
  `import { Button } from "../../components/ui/button"`
