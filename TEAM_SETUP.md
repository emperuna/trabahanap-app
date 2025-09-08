# TrabaHanap - Team Setup Guide

## 🚀 Quick Start for Team Members

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. **Ask team lead for `.env` file** with database credentials

3. Place the `.env` file in the `backend/` directory

4. Install dependencies and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### Test Login Credentials
- **Username:** `testuser`
- **Password:** `password123`

## 🔐 Environment Variables

### Required for Backend (.env file)
```env
DATABASE_URL=your_neon_database_url
DB_USERNAME=your_db_username  
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
```

### Required for Frontend (.env file)
```env
VITE_API_URL=http://localhost:8080/api
```

## ⚠️ Important Notes

- **Never commit `.env` files** to version control
- **Ask team lead** for environment variables
- **Database is hosted on Neon** (cloud PostgreSQL)
- **All user data persists** between app restarts

## 🛠️ Development Workflow

1. **Pull latest changes:** `git pull origin main`
2. **Start backend:** `cd backend && mvn spring-boot:run`
3. **Start frontend:** `cd frontend && npm run dev`
4. **Access app:** http://localhost:5173

---
**Need help?** Contact the team lead for `.env` files and setup assistance.