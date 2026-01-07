# ✅ Checklist Deployment ke Render

Gunakan checklist ini untuk memastikan semua langkah deployment sudah dilakukan dengan benar.

## 📋 Persiapan Sebelum Deploy

- [ ] **Install PostgreSQL driver**
  ```bash
  npm install
  ```

- [ ] **Generate Secret Keys**
  ```bash
  node generate-secrets.js
  ```
  Simpan output keys ini untuk digunakan nanti.

- [ ] **Test Build Locally** (Opsional tapi direkomendasikan)
  ```bash
  npm run build
  ```

- [ ] **Commit semua perubahan**
  ```bash
  git add .
  git commit -m "Add Render deployment configuration"
  ```

- [ ] **Push ke repository**
  ```bash
  git push origin main
  ```

## 🚀 Deployment di Render

- [ ] **Login ke Render**
  - Buka https://dashboard.render.com
  - Login dengan akun Anda

- [ ] **Create New Blueprint**
  - Klik "New +" → "Blueprint"
  - Connect repository Anda
  - Pilih repository: `portfolio-cms-ambar`
  - Render akan detect `render.yaml` otomatis

- [ ] **Review Configuration**
  - Service name: `portfolio-cms-ambar`
  - Database name: `portfolio-cms-db`
  - Plan: Pilih sesuai budget (Free/Starter/Standard)

- [ ] **Apply Blueprint**
  - Klik "Apply"
  - Tunggu proses provisioning (2-5 menit)

## 🔧 Konfigurasi Environment Variables

Render akan otomatis generate beberapa variables, tapi pastikan semua ada:

- [ ] `NODE_ENV` = `production`
- [ ] `DATABASE_CLIENT` = `postgres`
- [ ] `DATABASE_URL` = (auto-generated dari database)
- [ ] `HOST` = `0.0.0.0`
- [ ] `PORT` = `10000`
- [ ] `APP_KEYS` = (auto-generated atau dari generate-secrets.js)
- [ ] `API_TOKEN_SALT` = (auto-generated atau dari generate-secrets.js)
- [ ] `ADMIN_JWT_SECRET` = (auto-generated atau dari generate-secrets.js)
- [ ] `TRANSFER_TOKEN_SALT` = (auto-generated atau dari generate-secrets.js)
- [ ] `JWT_SECRET` = (auto-generated atau dari generate-secrets.js)

## 📦 Verifikasi Deployment

- [ ] **Check Build Logs**
  - Buka service di Render Dashboard
  - Klik tab "Logs"
  - Pastikan tidak ada error

- [ ] **Check Database Connection**
  - Pastikan database status "Available"
  - Check connection dari service logs

- [ ] **Test Application**
  - Buka URL aplikasi: `https://portfolio-cms-ambar.onrender.com`
  - Pastikan halaman loading tanpa error

- [ ] **Setup Admin User**
  - Akses: `https://portfolio-cms-ambar.onrender.com/admin`
  - Create admin user pertama kali
  - Login dan verify dashboard berfungsi

## 🔍 Post-Deployment Checks

- [ ] **Test API Endpoints**
  - Test GET request ke API
  - Verify response format correct

- [ ] **Test File Upload**
  - Upload test image di admin panel
  - Verify file tersimpan dan accessible

- [ ] **Check Persistent Storage**
  - Verify disk mounted correctly
  - Check `/public/uploads` directory

- [ ] **Setup Auto-Deploy** (Opsional)
  - Enable auto-deploy dari Git
  - Test dengan push perubahan kecil

## 🎯 Optimisasi (Opsional)

- [ ] **Setup Custom Domain**
  - Add custom domain di Render
  - Update DNS records
  - Enable SSL

- [ ] **Configure CORS**
  - Update CORS settings jika perlu
  - Test dari frontend application

- [ ] **Setup Monitoring**
  - Enable Render monitoring
  - Setup alerts untuk downtime

- [ ] **Backup Strategy**
  - Setup database backup schedule
  - Test restore procedure

## 📝 Troubleshooting

Jika ada masalah, check:

- [ ] Build logs untuk error messages
- [ ] Database connection status
- [ ] Environment variables configuration
- [ ] Disk mount status
- [ ] Node version compatibility

## 🎉 Deployment Selesai!

Jika semua checklist sudah ✅, deployment Anda berhasil!

**URLs Penting:**
- Admin Panel: `https://portfolio-cms-ambar.onrender.com/admin`
- API: `https://portfolio-cms-ambar.onrender.com/api`
- Health Check: `https://portfolio-cms-ambar.onrender.com/_health`

**Next Steps:**
1. Populate content di admin panel
2. Test semua API endpoints
3. Connect frontend application
4. Monitor performance dan logs

---

**Butuh bantuan?**
- Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk dokumentasi lengkap
- Check [Render Documentation](https://render.com/docs)
- Check [Strapi Documentation](https://docs.strapi.io)
