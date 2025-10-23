# Laundry Sepatu API

REST API sederhana untuk layanan daftar barang cuci sepatu menggunakan Node.js, Express dan Supabase (PostgreSQL).

## Tujuan
- Menyediakan API untuk menyimpan dan mengelola daftar sepatu yang sedang dicuci.

## Fitur Utama
- Operasi CRUD untuk items (sepatu)
- Filter berdasarkan `status` (Menunggu, Proses, Selesai)

## Struktur Data (`items`)

```
id: integer (primary key, auto increment)
nama: text
jenis: text
status: text ("Menunggu", "Proses", "Selesai")
tanggal_masuk: date
tanggal_keluar: date (nullable)
```

## Endpoints

- GET /items
  - Deskripsi: Ambil semua data items. Dapat difilter dengan query `status`.
  - Contoh: `/items?status=Selesai`

- GET /items/:id
  - Deskripsi: Ambil data item berdasarkan ID

- POST /items
  - Deskripsi: Tambah item baru

- PUT /items/:id
  - Deskripsi: Update item

- DELETE /items/:id
  - Deskripsi: Hapus item

All responses are JSON.

### Contoh Request & Response

- POST /items

Request body (JSON):

```
{
  "nama": "Nike Air Max",
  "jenis": "Sneakers",
  "status": "Menunggu",
  "tanggal_masuk": "2025-10-23",
  "tanggal_keluar": null
}
```

Response (201 Created):

```
{
  "id": 1,
  "nama": "Nike Air Max",
  "jenis": "Sneakers",
  "status": "Menunggu",
  "tanggal_masuk": "2025-10-23",
  "tanggal_keluar": null
}
```

- GET /items?status=Selesai

Response (200 OK):

```
[
  {
    "id": 2,
    "nama": "Adidas Superstar",
    "jenis": "Sneakers",
    "status": "Selesai",
    "tanggal_masuk": "2025-10-18",
    "tanggal_keluar": "2025-10-20"
  }
]
```

### Instalasi & Menjalankan secara Lokal

1. Clone repository
2. Install dependencies

```powershell
cd repo-folder
npm install
```

3. Buat file `.env` berdasarkan `.env.example` dan isi `SUPABASE_URL` dan `SUPABASE_KEY`.
4. Jalankan server secara lokal

```powershell
npm run dev
```

Server akan berjalan di `http://localhost:3000` secara default.

### Migrate (Buat Tabel)

Gunakan SQL di `db/migrations/001_create_items_table.sql` untuk membuat tabel `items` di database Supabase (SQL Editor atau psql).

### Deploy ke Vercel

Project siap untuk deploy ke Vercel. Tambahkan environment variables `SUPABASE_URL` dan `SUPABASE_KEY` di Vercel dashboard.

Link deploy: (isi setelah deploy)
