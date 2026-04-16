# AgaraX: Enterprise-Grade Digital Systems

AgaraX is a premium software engineering platform designed to showcase and manage scalable digital products and services. The project features a high-fidelity frontend built with Next.js and a robust backend powered by Express and MongoDB.

## 🚀 Key Features

- **Service Catalog**: Comprehensive showcases of infrastructure, automation, AI, and web development services.
- **Product Ecosystem**: Featured SaaS products and solution clusters.
- **Career Management**: Integrated job board with application tracking and candidate management.
- **Lead Generation**: Specialized conversion flows for project demonstrations and architect consultations.
- **Admin Dashboard**: Secure administrative interface for managing applications, inquiries, and job postings.
- **Premium UI/UX**: Modern design system using glassmorphism, dynamic animations, and responsive layouts.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (Motion)
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT & Bcryptjs
- **Email**: Nodemailer
- **Runner**: TSX

## 📁 Project Structure

```text
.
├── backend/            # Express server, MongoDB models, and API logic
│   ├── models/         # Database schemas (Admin, Job, Application, etc.)
│   ├── seed_admin.ts   # Utility for initializing admin accounts
│   └── server.ts       # Main entry point
├── frontend/           # Next.js application
│   ├── app/            # App router pages and layouts
│   ├── components/     # Reusable UI components and business logic
│   └── lib/            # Shared utilities and state management
└── package.json        # Root configuration for concurrent execution
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (Latest LTS recommended)
- MongoDB instance (Local or Atlas)

### Installation
1. Clone the repository
2. Install all dependencies from the root directory:
   ```bash
   npm run install:all
   ```

### Development
Start both the frontend and backend concurrently:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Admin Setup
To create a default admin user, navigate to the backend directory and run:
```bash
cd backend
npx tsx seed_admin.ts
```

## 📜 Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts frontend and backend concurrently |
| `npm run install:all` | Installs dependencies for root, frontend, and backend |
| `npm run restart` | Kills existing processes and restarts dev server |
| `npm run dev:frontend` | Starts only the Next.js development server |
| `npm run dev:backend` | Starts only the Express development server |

---

Developed by the AgaraX Engineering Team.
