

Modern ve kullanıcı dostu bir *Kütüphane Yönetim Sistemi* uygulaması.  
Kullanıcılar kitapları görüntüleyebilir, ödünç alabilir, profil sayfalarını yönetebilir ve geçmiş işlemlerini takip edebilir.  
Admin paneli sayesinde kitaplar, kullanıcılar ve ödünç işlemleri kolayca yönetilebilir.

---

# 🚀 Özellikler

## 👤 Kullanıcı Özellikleri

- Kayıt olma
- Giriş yapma
- JWT Authentication
- Profil sayfası
- Aktif ödünç alınan kitaplar
- Geçmiş ödünç işlemleri
- Kitap arama sistemi
- Kitap detay sayfası

---

## 📚 Kitap Sistemi

- Kitap listeleme
- Kitap detay görüntüleme
- ISBN desteği
- Yazar filtreleme
- Kitap görselleri
- Durum sistemi
  - Müsait
  - Ödünçte

---

## 🔍 Arama Sistemi

Navbar üzerinden:

- Kitap adına göre arama
- Yazara göre arama
- ISBN ile arama
- Canlı filtreleme
- Dropdown sonuç sistemi

---

# 🛠️ Admin Paneli

## 📚 Kitap Yönetimi

- Kitap ekleme
- Kitap düzenleme
- Kitap silme
- Arama sistemi
- Filtreleme sistemi

---

## 👤 Kullanıcı Yönetimi

- Kullanıcı listeleme
- Rol değiştirme
- Kullanıcı silme
- Ceza / puan sıfırlama

---

## 📦 Ödünç Sistemi

- Tüm ödünç kayıtları
- Geciken kitaplar
- Yaklaşan teslimler
- Teslim edilen kitaplar
- Filtreleme sistemi
- Teslim alma işlemleri

---

# 🧰 Kullanılan Teknolojiler

## Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- TailwindCSS
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

---

# 📂 Proje Yapısı

bash
src/
│
├── components/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
│   ├── features/
│   │   ├── auth/
│   │   ├── book/
│   │   ├── borrow/
│   │   └── profile/
│
└── App.tsx


---

# ⚙️ Kurulum

## 1. Projeyi klonla

bash
git clone <repo-url>

cd project-name


---

## 2. Frontend bağımlılıklarını yükle

bash
npm install


---

## 3. Backend bağımlılıklarını yükle

bash
cd backend

npm install


---

# 🔑 Environment Variables

Backend klasöründe .env oluştur:

env
PORT=3000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key


---

# ▶️ Çalıştırma

## Frontend

bash
npm run dev


## Backend

bash
npm run dev


---

# 🔐 Authentication

Sistem JWT tabanlı authentication kullanır.

Token:
- login sonrası localStorage’a kaydedilir
- axios interceptor ile otomatik gönderilir

---

# 📦 API Endpoints

## 🔑 Auth

bash
POST /auth/register

POST /auth/login

GET /auth/me


---

## 📚 Books

bash
GET /book

GET /book/:id

POST /book

PUT /book/:id

DELETE /book/:id


---

## 📦 Borrow

bash
POST /borrow

POST /borrow/return

GET /borrow


---

## 👤 Profile

bash
GET /profile/me


---

# 🖼️ Görseller

Kitap görselleri backend üzerinden servis edilir:

bash
http://localhost:3000/uploads/...


---

# 📌 Gelecek Özellikler

- Email notification sistemi
- Gerçek zamanlı bildirimler
- Dark mode
- Çoklu dil desteği
- Pagination
- Backend search optimization
- Redis cache
- Docker desteği

---

# 👨‍💻 Geliştirici

Bu proje modern full-stack mimari kullanılarak geliştirilmiştir.

Frontend ve backend tamamen TypeScript desteklidir.

---

# 📄 License

MIT License