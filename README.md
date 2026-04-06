💰 Finance Manager
Track smarter. Spend wiser. Grow richer. 🚀

A modern full-stack finance management app that helps users monitor income, track expenses, and gain insights through interactive dashboards — all with secure role-based access.

✨ Why This Project?

Managing finances shouldn’t feel overwhelming. This app is built to:

📊 Give clear financial insights
⚡ Offer a fast and smooth UI experience
🔐 Ensure secure and role-based access
📈 Help users make smarter financial decisions
🔥 Key Highlights
🧠 Smart Dashboard with real-time analytics
🔐 Secure Authentication using JWT
👥 Role-Based Access Control (RBAC)
📋 Advanced Records Management
📊 Interactive Charts & Insights
⚡ Optimized performance with modern stack
📊 Features Breakdown
📈 Dashboard (Your Financial Command Center)
Visualize expenses with doughnut charts
Track monthly trends using bar graphs
Instantly see:
💰 Total Income
💸 Total Expenses
🧾 Net Balance
🎯 Personalized view based on user role
📋 Records Management
➕ Add transactions in seconds
✏️ Edit existing records
🗑️ Delete unwanted entries
🔎 Filter by:
Type (Income / Expense)
Category
Date range
🏷️ Organized categorization for clarity
👤 Role-Based Access Control
Role	Capabilities
👁️ Viewer	View summary only
🔬 Analyst	Full dashboard + read-only records
👑 Admin	Full control (CRUD + user management)
🔐 Authentication & Security
JWT-based authentication
Password hashing with bcrypt
Protected frontend & backend routes
Persistent login sessions
🧱 Tech Stack
🎨 Frontend
⚛️ React 19
⚡ Vite
🎨 Tailwind CSS
🔀 React Router
📡 Axios
📊 Chart.js
🖼️ Lucide Icons
⚙️ Backend
🟩 Node.js
🚂 Express
🔷 Prisma ORM
🐘 PostgreSQL (Neon)
🔑 JWT Auth
🔒 bcrypt
🌐 CORS
🏗️ Architecture Overview
Frontend (React + Vite)
        ↓
API Layer (Axios)
        ↓
Backend (Express + Prisma)
        ↓
Database (PostgreSQL - Neon)
🚀 Getting Started
📋 Prerequisites
Node.js (v18+)
npm (v9+)
PostgreSQL database (Neon recommended)
⚙️ Backend Setup
cd backend
npm install
cp .env.example .env

Update .env:

DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
PORT=5000
npx prisma db push
npm run dev
🎨 Frontend Setup
cd frontend
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api
npm run dev
🔌 API Overview
🔐 Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
📋 Records
GET /api/records
POST /api/records
PUT /api/records/:id
DELETE /api/records/:id
📊 Dashboard
GET /api/dashboard
GET /api/dashboard/summary
👥 Users (Admin)
GET /api/users
PUT /api/users/:id
🗄️ Database Design (Simplified)
User
name, email, password
role (Viewer / Analyst / Admin)
Record
amount, type, category
date, note
linked to user
💡 What Makes It Stand Out?
Clean and scalable architecture
Real-world RBAC implementation
Production-style API design
Modern UI with great UX
Built with industry-relevant tools
🤝 Contributing

Want to improve this project?

git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature

Open a PR 🚀

📄 License

MIT License

❤️ Final Note

If you found this project useful:

⭐ Star the repo
🍴 Fork it
🚀 Build on top of it

Made with ❤️ by Anish