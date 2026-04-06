<div align="center">

# 💰 Finance Manager

### *Track smarter. Spend wiser. Grow richer.* 🚀

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## ✨ Features

### 📊 Smart Dashboard
- 🥧 **Doughnut chart** — visual expense breakdown by category
- 📈 **Bar chart** — monthly income vs expense trends
- 💳 **Summary cards** — total income, total expenses, net balance
- 🎯 **Role-aware UI** — different views for Admin, Analyst, and Viewer

### 📁 Records Management
- ➕ Add, ✏️ edit, and 🗑️ delete financial records
- 🏷️ Categorise records (Office Rent, Equity Investment, User Subscriptions, and more)
- 🔎 Filter by **type**, **category**, and **date range**
- 📅 Date-stamped entries with optional notes

### 👤 Role-Based Access Control (RBAC)

| Role | Dashboard | Records | Charts | User Management |
|------|-----------|---------|--------|-----------------|
| 👁️ **Viewer** | Summary only | ❌ | ❌ | ❌ |
| 🔬 **Analyst** | Full | View only | ✅ | ❌ |
| 👑 **Admin** | Full | Full CRUD | ✅ | ✅ |

### 🔐 Authentication
- 🔑 JWT-based login & registration
- 🔒 Password hashing with **bcryptjs**
- 🛡️ Protected routes on both frontend and backend
- 💾 Persistent sessions via localStorage

---

## 🧱 Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|------------|---------|
| ⚛️ React 19 | UI framework |
| ⚡ Vite 8 | Build tool & dev server |
| 🎨 Tailwind CSS 3 | Utility-first styling |
| 🔀 React Router 7 | Client-side routing |
| 📡 Axios | HTTP requests |
| 📊 Chart.js 4 | Beautiful charts |
| 🖼️ Lucide React | Icon library |

### ⚙️ Backend

| Technology | Purpose |
|------------|---------|
| 🟩 Node.js | Runtime |
| 🚂 Express 5 | Web framework |
| 🔷 Prisma 6 | ORM & database toolkit |
| 🐘 PostgreSQL (Neon) | Database |
| 🔑 JWT | Authentication tokens |
| 🔒 bcryptjs | Password hashing |
| 🌐 CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
finance-manager/
├── 🎨 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 📋 AddRecord.jsx
│   │   │   ├── 🏗️ Layout.jsx
│   │   │   ├── 🔝 Navbar.jsx
│   │   │   ├── 🔐 ProtectedRoute.jsx
│   │   │   ├── 📄 RecordList.jsx
│   │   │   ├── 🪟 RecordModal.jsx
│   │   │   ├── 📌 Sidebar.jsx
│   │   │   └── 👥 UserManagement.jsx
│   │   ├── pages/
│   │   │   ├── 🏠 Dashboard.jsx
│   │   │   ├── 🔑 Login.jsx
│   │   │   ├── 📋 Records.jsx
│   │   │   └── 📝 Register.jsx
│   │   ├── services/
│   │   │   └── 📡 api.js
│   │   └── constants/
│   │       └── 🏷️ recordCategories.js
│
└── ⚙️ backend/
    ├── src/
    │   ├── controllers/      🎮 Request handlers
    │   ├── routes/           🛣️ API route definitions
    │   ├── services/         🔧 Business logic
    │   ├── middleware/        🛡️ Auth & role guards
    │   └── utils/            🧰 JWT & Prisma helpers
    └── prisma/
        └── 🗄️ schema.prisma  Database schema
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have these installed:
- 🟩 **Node.js** v18+
- 📦 **npm** v9+
- 🐘 A **PostgreSQL** database (we recommend [Neon](https://neon.tech) — it's free!)

---

### ⚙️ Backend Setup

```bash
# 1️⃣ Navigate to backend
cd backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create your .env file
cp .env.example .env
```

Fill in your `.env`:
```env
DATABASE_URL="postgresql://user:password@host/dbname"
JWT_SECRET="your_super_secret_key"
PORT=5000
```

```bash
# 4️⃣ Push the Prisma schema to your database
npx prisma db push

# 5️⃣ Start the backend server
npm run dev
```

✅ Backend running at `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
# 1️⃣ Navigate to frontend
cd frontend

# 2️⃣ Install dependencies
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# 3️⃣ Start the dev server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

---

## 🔌 API Endpoints

### 🔐 Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | 📝 Register a new user |
| `POST` | `/api/auth/login` | 🔑 Login and get JWT |
| `GET` | `/api/auth/me` | 👤 Get current user info |

### 📋 Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/records` | 📄 Get all records (with filters) |
| `POST` | `/api/records` | ➕ Create a record |
| `PUT` | `/api/records/:id` | ✏️ Update a record |
| `DELETE` | `/api/records/:id` | 🗑️ Delete a record |

### 📊 Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/summary` | 💳 Income, expenses & balance |
| `GET` | `/api/dashboard` | 📈 Category & monthly insights |

### 👥 Users *(Admin only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | 👥 Get all users |
| `PUT` | `/api/users/:id` | ✏️ Update role or status |

---

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(VIEWER)
  isActive  Boolean  @default(true)
  records   Record[]
}

model Record {
  id        String     @id @default(uuid())
  amount    Float
  type      RecordType
  category  String
  note      String?
  date      DateTime
  user      User       @relation(fields: [userId], references: [id])
  userId    String
}
```

---

## 🏷️ Record Categories

| Category | Label |
|----------|-------|
| `SALARY` | 💼 Salary |
| `FREELANCE` | 💻 Freelance |
| `EQUITY_INVESTMENT` | 📈 Equity Investment |
| `USER_SUBSCRIPTIONS` | 🔔 User Subscriptions |
| `OFFICE_RENT` | 🏢 Office Rent |
| `UTILITIES` | ⚡ Utilities |
| `MARKETING` | 📣 Marketing |
| `OTHER` | 🗂️ Other |

---

## 🤝 Contributing

Contributions are welcome! 🎉

```bash
# 1️⃣ Fork the repo
# 2️⃣ Create your feature branch
git checkout -b feature/amazing-feature

# 3️⃣ Commit your changes
git commit -m "✨ Add some amazing feature"

# 4️⃣ Push to the branch
git push origin feature/amazing-feature

# 5️⃣ Open a Pull Request 🚀
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE) 📜

---

<div align="center">

Made with ❤️ by **Anish**

⭐ Star this repo if you found it helpful!

</div>