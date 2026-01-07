# Panduan Deployment ke Render

File `render.yaml` telah dibuat untuk memudahkan deployment Strapi CMS Anda ke Render.

## 📋 Prasyarat

1. Akun Render (daftar di https://render.com)
2. Repository Git (GitHub, GitLab, atau Bitbucket)
3. Project sudah di-push ke repository

## 🚀 Langkah-langkah Deployment

### 1. Push Code ke Repository

Pastikan semua file termasuk `render.yaml` sudah di-commit dan di-push:

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy di Render

#### Opsi A: Menggunakan Blueprint (Otomatis)

1. Login ke [Render Dashboard](https://dashboard.render.com)
2. Klik **"New +"** → **"Blueprint"**
3. Pilih repository Anda
4. Render akan otomatis mendeteksi `render.yaml`
5. Review konfigurasi dan klik **"Apply"**

#### Opsi B: Manual Setup

1. Login ke [Render Dashboard](https://dashboard.render.com)
2. Buat PostgreSQL Database:
   - Klik **"New +"** → **"PostgreSQL"**
   - Nama: `portfolio-cms-db`
   - Plan: Pilih sesuai kebutuhan (Free/Starter)
   - Klik **"Create Database"**

3. Buat Web Service:
   - Klik **"New +"** → **"Web Service"**
   - Connect repository Anda
   - Konfigurasi:
     - **Name**: `portfolio-cms-ambar`
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start`
     - **Plan**: Pilih sesuai kebutuhan

### 3. Konfigurasi Environment Variables

Render akan otomatis generate beberapa environment variables, tapi Anda bisa customize jika perlu:

**Environment Variables yang akan di-generate otomatis:**
- `APP_KEYS` - Untuk enkripsi session
- `API_TOKEN_SALT` - Untuk API tokens
- `ADMIN_JWT_SECRET` - Untuk admin JWT
- `TRANSFER_TOKEN_SALT` - Untuk transfer tokens
- `JWT_SECRET` - Untuk JWT authentication

**Environment Variables yang sudah dikonfigurasi:**
- `NODE_ENV=production`
- `DATABASE_CLIENT=postgres`
- `DATABASE_URL` - Otomatis dari PostgreSQL database
- `HOST=0.0.0.0`
- `PORT=10000`

### 4. Persistent Storage

File `render.yaml` sudah mengkonfigurasi disk untuk uploads:
- **Mount Path**: `/opt/render/project/src/public/uploads`
- **Size**: 1GB (bisa diubah sesuai kebutuhan)

## 🔧 Konfigurasi Tambahan

### Mengubah Plan

Edit `render.yaml` untuk mengubah plan:

```yaml
services:
  - type: web
    plan: free  # Ubah ke: free, starter, standard, pro, dll

databases:
  - name: portfolio-cms-db
    plan: free  # Ubah ke: free, starter, standard, pro, dll
```

### Menambah Environment Variables

Tambahkan di section `envVars`:

```yaml
envVars:
  - key: NAMA_VARIABLE
    value: nilai_variable
```

### Mengubah Ukuran Disk

Edit section `disk`:

```yaml
disk:
  name: strapi-uploads
  mountPath: /opt/render/project/src/public/uploads
  sizeGB: 5  # Ubah sesuai kebutuhan
```

## 📝 Catatan Penting

1. **Database**: Project ini menggunakan PostgreSQL di production (bukan SQLite seperti di development)
2. **Uploads**: File yang di-upload akan disimpan di persistent disk
3. **Build Time**: Build pertama mungkin memakan waktu 5-10 menit
4. **Auto-deploy**: Setiap push ke branch main akan trigger auto-deploy

## 🔍 Monitoring

Setelah deployment:
1. Cek logs di Render Dashboard
2. Akses admin panel di: `https://your-app-name.onrender.com/admin`
3. Setup admin user pertama kali

## 🆘 Troubleshooting

### Build Gagal
- Cek logs di Render Dashboard
- Pastikan semua dependencies ada di `package.json`
- Pastikan Node version compatible (20.x)

### Database Connection Error
- Pastikan DATABASE_URL sudah terhubung dengan benar
- Cek database credentials di Render Dashboard

### Upload Files Tidak Tersimpan
- Pastikan disk sudah ter-mount dengan benar
- Cek permission di `/public/uploads`

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)

## 💰 Estimasi Biaya

### Free Tier
- Web Service: Free (dengan batasan)
- PostgreSQL: Free (dengan batasan)
- Total: $0/bulan

### Starter Tier (Recommended)
- Web Service: $7/bulan
- PostgreSQL: $7/bulan
- Total: $14/bulan

Pilih plan sesuai dengan kebutuhan traffic dan storage Anda.
