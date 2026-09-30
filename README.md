# EduSphereAI — Modern Responsive Student Portal

EduSphereAI is a next-generation, high-performance Student Login Information and Academic Management web application built with **React.js**, **Vite**, and **Tailwind CSS**. It provides university students with real-time academic tracking, profile management, CGPA monitoring, and secure JWT-authenticated REST API communication.

---

## 🚀 Key Features & Highlights

- **Modern & Responsive UI**: Curated education-themed design (Indigo & Slate palette), fully optimized for Desktop, Tablet, and Mobile viewports.
- **Robust JWT Authentication**:
  - Secure token-based session lifecycle using `Authorization: Bearer <token>`.
  - Zero storage of plain passwords on the client or localStorage.
  - Route protection for private pages (`/dashboard`, `/profile`, `/edit-profile`, `/student-info`).
- **REST API Service Architecture**:
  - Modular Axios client with request & response interceptors.
  - Automatic error normalization and feedback with custom toast alerts.
  - Built-in Mock REST Server fallback for immediate standalone local demoing.
  - Ready to connect to any backend (Node.js/Express, Python/FastAPI, Spring Boot, etc.) simply by setting `VITE_API_BASE_URL`.
- **Comprehensive Academic Hub**:
  - Live CGPA & SGPA progression analytics.
  - Subject-wise lecture attendance tracking with 75% examination threshold alerts.
  - Digital Student ID card preview and printable dossier view.
  - Institutional Document Vault with simulated verification and download.

---

## 📂 Project Architecture

```
frontend/
├── public/
├── src/
│   ├── assets/              # Static assets and icons
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Responsive header with mobile drawer & user dropdown
│   │   ├── Footer.jsx       # Institutional footer with accreditation info
│   │   ├── ProtectedRoute.jsx# Auth route guard using JWT state
│   │   ├── LoadingSpinner.jsx# Reusable animated loading indicator
│   │   ├── Modal.jsx        # Accessible dialog modal
│   │   ├── ProgressBar.jsx  # Circular & linear completion meters
│   │   └── StatCard.jsx     # Metric cards for CGPA, attendance, credits
│   ├── context/
│   │   ├── AuthContext.jsx  # Authentication state, login, register, logout
│   │   └── ToastContext.jsx # Toast notifications queue (success, error, info)
│   ├── hooks/
│   │   ├── useAuth.js       # Hook to consume AuthContext
│   │   └── useToast.js      # Hook to trigger toast notifications
│   ├── pages/
│   │   ├── LandingPage.jsx  # Landing overview with value props & quick login
│   │   ├── RegisterPage.jsx # 14-field student registration with auto-fill demo
│   │   ├── LoginPage.jsx    # Student login, show/hide password, forgot password
│   │   ├── DashboardPage.jsx# Welcome banner, profile summary, metrics, activities
│   │   ├── ProfilePage.jsx  # Student dossier, digital ID card, printable view
│   │   ├── EditProfilePage.jsx# Profile editing with locked registrar fields
│   │   ├── StudentInfoPage.jsx# Courses, SGPA chart, attendance, document vault
│   │   └── LogoutPage.jsx   # Clean session termination & redirect
│   ├── services/
│   │   ├── api.js           # Axios client with interceptors & mock API handler
│   │   ├── authService.js   # REST auth endpoints (login, register, forgot-password)
│   │   ├── studentService.js# REST student endpoints (dashboard, profile update)
│   │   └── mockData.js      # Seed student database & JWT generator
│   ├── App.jsx              # Application router and layout assembly
│   ├── index.css            # Tailwind directives and custom styles
│   └── main.jsx             # React DOM entry point
├── index.html               # HTML5 template with Inter typography & SEO tags
├── package.json             # Dependencies and build scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS theme configuration
└── vite.config.js           # Vite build configuration
```

---

## 📋 Pages Overview

| # | Page | Route | Description |
|---|------|-------|-------------|
| 1 | **Landing Page** | `/` | Hero section, portal stats, feature highlights, and 1-click evaluator login buttons. |
| 2 | **Student Registration** | `/register` | 14 required registration fields, inline validation, password strength meter, and Auto-Fill demo button. |
| 3 | **Student Login** | `/login` | Email/Register Number, Password, Show/Hide toggle, Forgot Password modal, and Demo accounts. |
| 4 | **Student Dashboard** | `/dashboard` | Welcome message, student profile summary, CGPA/attendance metrics, completion ring, recent activities, and logout. |
| 5 | **Student Profile** | `/profile` | Comprehensive academic dossier, mentor contact, printable digital student ID card. |
| 6 | **Edit Profile** | `/edit-profile` | Update mobile number, address, bio, avatar; official registrar fields remain locked. |
| 7 | **Student Information** | `/student-info` | Enrolled courses, semester SGPA history, attendance thresholds, and verified document vault. |
| 8 | **Logout** | `/logout` | Clears JWT token, confirms session termination, and offers instant sign-in redirect. |

---

## 🔑 Registration Fields Implemented

1. **Student Name** (`studentName`)
2. **Register Number** (`registerNumber`)
3. **Email** (`email`)
4. **Mobile Number** (`mobileNumber`)
5. **Date of Birth** (`dateOfBirth`)
6. **Gender** (`gender`)
7. **College Name** (`collegeName`)
8. **Department** (`department`)
9. **Year** (`year`)
10. **Section** (`section`)
11. **CGPA** (`cgpa`)
12. **Address** (`address`)
13. **Password** (`password`)
14. **Confirm Password** (`confirmPassword`)

---

## ⚡ Quick Start & Run Instructions

### 1. Prerequisites
- Node.js (v18 or higher) and npm installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be running at `http://localhost:5173/`.

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Demo Credentials

For quick evaluation, click the demo buttons on the Login page or use:

| Role | Identifier / Email | Password | Details |
|------|---------------------|----------|---------|
| **Student 1** | `21CS042` or `aarav.sharma@edusphere.edu` | `password123` | Aarav Sharma (CSE, 3rd Year, CGPA 8.92) |
| **Student 2** | `20EC108` or `priya.patel@edusphere.edu` | `password123` | Priya Patel (ECE, 4th Year, CGPA 9.15) |

---

## 🔌 Connecting to a Live Backend API

Create an `.env` file in the `frontend` root:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Expected backend endpoints:
- `POST /api/auth/login` → `{ identifier, password }` returns `{ token, student }`
- `POST /api/auth/register` → Form payload returns `{ token, student }`
- `GET /api/auth/me` → Returns current `{ student }`
- `GET /api/student/dashboard` → Returns `{ data: student }`
- `PUT /api/student/profile` → Updates coordinates returns `{ student }`
- `POST /api/auth/forgot-password` → `{ email }` sends recovery instructions
