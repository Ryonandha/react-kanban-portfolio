# 📋 Kanban Board (Trello Clone)

Aplikasi manajemen tugas interaktif yang dibangun menggunakan **React** dan **Vite**. Proyek ini mendemonstrasikan kemampuan pengelolaan **Complex State**, **Drag-and-Drop interactions**, dan **Data Persistence**.

![Project Screenshot](./Screenshot_Kaban.png)

## 🚀 Fitur Utama

- **Drag & Drop:** Memindahkan kartu tugas antar kolom atau mengubah urutan dalam satu kolom dengan mulus.
- **Create & Delete:** Menambah tugas baru dan menghapus tugas yang sudah selesai.
- **Data Persistence:** Data tersimpan otomatis di **LocalStorage** browser, sehingga tidak hilang saat direfresh.
- **Responsive UI:** Tampilan tetap rapi dan bisa discroll secara horizontal.

## 🛠️ Tech Stack

- **Core:** React JS (Vite)
- **Library:** @hello-pangea/dnd (untuk logika Drag and Drop)
- **Icons:** Lucide React
- **Utilities:** UUID (untuk Unique ID generation)
- **Styling:** CSS3 Custom Styling

## 📦 Cara Menjalankan Project (Installation)

1.  **Clone repository ini**

    ```bash
    git clone [https://github.com/Ryonandha/react-kanban-portfolio.git](https://github.com/Ryonandha/react-kanban-portfolio.git)
    ```

2.  **Masuk ke folder project**

    ```bash
    cd react-kanban-portfolio
    ```

3.  **Install dependencies**

    ```bash
    npm install
    ```

4.  **Jalankan server development**

    ```bash
    npm run dev
    ```

5.  Buka browser di `http://localhost:5173`

## 🧠 Pelajaran yang Didapat (Learning Outcomes)

Dalam membangun proyek ini, saya belajar tentang:

- Mengimplementasikan logika `onDragEnd` untuk menangani manipulasi array yang kompleks.
- Mengelola state lokal yang sinkron dengan LocalStorage menggunakan `useEffect`.
- Membuat struktur komponen yang modular (`Column`, `TaskCard`, `Board`).
- Menangani edge-cases seperti dropping di luar area valid.

---

Created by Ryonandha
