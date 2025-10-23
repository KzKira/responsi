-- Create table items for laundry sepatu service
CREATE TABLE IF NOT EXISTS public.items (
  id serial PRIMARY KEY,
  nama text NOT NULL,
  jenis text NOT NULL,
  status text NOT NULL CHECK (status IN ('Menunggu','Proses','Selesai')),
  tanggal_masuk date NOT NULL,
  tanggal_keluar date
);
