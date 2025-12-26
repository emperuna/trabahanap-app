<p align="center">
  <img src="frontend/public/logo.png" alt="TrabaHanap Logo" width="120" height="120">
</p>

<h1 align="center">TrabaHanap</h1>

<p align="center">
  <strong>🇵🇭 A Modern Job Portal for the Filipino Workforce</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-17+-orange?style=flat-square&logo=openjdk&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/license/mit-blue?style=flat-square" alt="License">
</p>

---

## 📖 Overview

**TrabaHanap** (_"trabaho" + "hanap" = "looking for work"_ in Filipino) is a full-stack job portal application designed to connect Filipino job seekers with employers. The platform provides a seamless experience for posting jobs, searching opportunities, and managing applications.

### 🎯 Key Highlights

- **Full-Stack Monorepo** — Spring Boot backend + React frontend in one repository
- **Cloud-Native** — Deployed on Railway (backend) and Cloudflare Pages (frontend)
- **Modern Architecture** — Feature-based frontend structure with RESTful API backend
- **Secure** — JWT-based authentication with role-based access control

---

## ✨ Features

### For Job Seekers

- 🔍 **Job Search** — Browse and filter job listings by location, category, and keywords
- 📝 **One-Click Apply** — Submit applications with resume uploads
- 💾 **Save Jobs** — Bookmark interesting opportunities for later
- 👤 **Profile Management** — Build and manage your professional profile
- 📊 **Application Tracking** — Monitor the status of your applications

### For Employers

- 📋 **Job Posting** — Create and manage job listings with rich descriptions
- 👥 **Applicant Management** — Review, shortlist, and track candidates
- 🏢 **Company Profiles** — Showcase your company to attract talent
- 📈 **Dashboard Analytics** — Insights into job posting performance

### Platform Features

- 🔐 **Secure Authentication** — JWT tokens with role-based permissions
- 📱 **Responsive Design** — Mobile-first UI that works on all devices
- ⚡ **Fast Performance** — Optimized React + Vite frontend
- 🐳 **Docker Support** — Containerized for easy deployment

---

## 🛠️ Tech Stack

### Backend

| Technology          | Purpose                        |
| ------------------- | ------------------------------ |
| **Spring Boot 3.2** | REST API framework             |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database ORM                   |
| **PostgreSQL**      | Production database (via Neon) |
| **H2 Database**     | Development/testing database   |
| **JWT (jjwt)**      | Token-based authentication     |
| **AWS SDK**         | Cloudflare R2 integration      |
| **Maven**           | Build & dependency management  |

### Frontend

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| **React 19**       | UI library              |
| **Vite**           | Build tool & dev server |
| **Chakra UI**      | Component library       |
| **Tailwind CSS 4** | Utility-first styling   |
| **React Router 7** | Client-side routing     |
| **Axios**          | HTTP client             |
| **Framer Motion**  | Animations              |

### Infrastructure

| Service              | Purpose               |
| -------------------- | --------------------- |
| **Railway**          | Backend hosting       |
| **Cloudflare Pages** | Frontend hosting      |
| **Neon**             | Serverless PostgreSQL |
| **Cloudflare R2**    | File storage          |
| **GitHub Actions**   | CI/CD pipelines       |

---

## 🚀 Getting Started

### Prerequisites

- **Java 17+** — [Download](https://adoptium.net/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **Maven 3.6+** — [Download](https://maven.apache.org/)
- **Git** — [Download](https://git-scm.com/)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/trabahanap-app.git
   cd trabahanap-app
   ```

2. **Backend Setup**

   ```bash
   cd backend

   # Copy environment template
   cp .env.example .env

   # Edit .env with your database credentials
   # (Ask team lead for production credentials)

   # Install dependencies and run
   mvn clean install
   mvn spring-boot:run
   ```

   Backend runs at: `http://localhost:8080`

3. **Frontend Setup**

   ```bash
   cd frontend

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

   Frontend runs at: `http://localhost:5173`

### Environment Variables

#### Backend (`backend/.env`)

```env
# Database (Neon PostgreSQL)
DATABASE_URL=jdbc:postgresql://your-neon-host/your-database
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_secret_key_min_256_bits
JWT_EXPIRATION_MS=86400000

# CORS
FRONTEND_URL=http://localhost:5173

# Cloudflare R2 (optional)
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket
R2_ENDPOINT=your_endpoint
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📁 Project Structure

```
trabahanap-app/
├── 📂 backend/                 # Spring Boot API
│   ├── src/main/java/com/trabahanap/
│   │   ├── config/            # Security, CORS, JWT config
│   │   ├── controller/        # REST controllers
│   │   ├── dto/               # Data transfer objects
│   │   ├── exception/         # Global exception handling
│   │   ├── mapper/            # Entity-DTO mappers
│   │   ├── model/             # JPA entities
│   │   ├── repository/        # JPA repositories
│   │   ├── security/          # Auth components
│   │   ├── service/           # Business logic
│   │   └── util/              # Utilities
│   ├── Dockerfile
│   └── pom.xml
│
├── 📂 frontend/                # React + Vite SPA
│   ├── src/
│   │   ├── app/               # App-level components
│   │   ├── assets/            # Images, icons
│   │   ├── features/          # Feature modules
│   │   │   ├── applications/  # Job applications
│   │   │   ├── auth/          # Authentication
│   │   │   ├── dashboard/     # User dashboards
│   │   │   ├── jobs/          # Job listings
│   │   │   ├── profile/       # User profiles
│   │   │   └── settings/      # User settings
│   │   ├── shared/            # Shared components, hooks, utils
│   │   └── theme/             # Chakra UI theme config
│   ├── index.html
│   └── package.json
│
├── 📂 .github/workflows/       # CI/CD pipelines
│   ├── backend-ci.yml
│   └── frontend-ci.yml
│
├── docker-compose.yml          # Local development
├── TEAM_SETUP.md              # Team onboarding guide
└── LICENSE                    # MIT License
```

---

## 🐳 Docker Development

Run the entire stack with Docker Compose:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This starts:

- **Backend** on port `8080`
- Optional **PostgreSQL** (uncomment in `docker-compose.yml`)

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
mvn test                    # Run all tests
mvn test -Dtest=AuthTest    # Run specific test
```

### Frontend Linting

```bash
cd frontend
npm run lint               # Run ESLint
```

---

## 🚢 Deployment

### Backend (Railway)

The backend automatically deploys to Railway when changes are pushed to `main`:

1. Ensure Railway is connected to your GitHub repository
2. Configure environment variables in Railway dashboard
3. Push to `main` branch — deployment is automatic

### Frontend (Cloudflare Pages)

The frontend deploys to Cloudflare Pages:

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure `VITE_API_URL` environment variable

---

## 🔒 API Documentation

### Authentication Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/auth/signin` | User login        |
| `POST` | `/api/auth/signup` | User registration |

### Jobs Endpoints

| Method   | Endpoint         | Description           |
| -------- | ---------------- | --------------------- |
| `GET`    | `/api/jobs`      | List all jobs         |
| `GET`    | `/api/jobs/{id}` | Get job details       |
| `POST`   | `/api/jobs`      | Create job (Employer) |
| `PUT`    | `/api/jobs/{id}` | Update job            |
| `DELETE` | `/api/jobs/{id}` | Delete job            |

### Applications Endpoints

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| `POST` | `/api/applications/apply`    | Submit application        |
| `GET`  | `/api/applications/my`       | User's applications       |
| `GET`  | `/api/applications/job/{id}` | Job applicants (Employer) |

### User Roles

- `ROLE_USER` — Job seekers
- `ROLE_EMPLOYER` — Companies posting jobs
- `ROLE_ADMIN` — System administrators

> **Note:** Protected endpoints require JWT token in Authorization header:
>
> ```
> Authorization: Bearer <your-jwt-token>
> ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/)
- Ensure all tests pass before submitting PR
- Update documentation for new features
- Keep PRs focused and reasonably sized

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Created and maintained by **Jeremy Garin** and contributors.

---

<p align="center">
  <sub>Built with ❤️ for the Filipino workforce</sub>
</p>
