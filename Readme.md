# BlogVerse — Full-Stack MERN Blog Platform

A full-stack blog platform built on the MERN stack with JWT authentication, three-tier role-based authorization, and full CRUD for articles and comments.

## Features

- **JWT authentication** with HTTP-only cookies
- **Role-based access control** — Admin, Author, and User roles, each with a dedicated API route group (`AdminAPI`, `AuthorAPI`, `UserAPI`, `CommonAPI`)
- **Full CRUD for articles**, categorized under Programming, DSA, AI/ML, and WebDev
- **Nested commenting system** tied to registered user accounts
- **Profile image uploads** via Cloudinary + Multer
- **Strong password validation** (uppercase, lowercase, and numeric characters required)
- Form validation with React Hook Form, toast notifications via react-hot-toast
- Client-side state management with Zustand

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS 4, React Router 7, Zustand, React Hook Form, Axios, react-hot-toast

**Backend:** Node.js, Express 5, MongoDB + Mongoose, JWT, bcryptjs, Cloudinary, Multer, cookie-parser, CORS

## Project Structure

```
BlogApp-MERN-frontend/
├── backend/
│   ├── APIs/          # AdminAPI, AuthorAPI, UserAPI, CommonAPI route handlers
│   ├── config/
│   ├── middlewares/   # auth & role guards
│   ├── models/        # UserModel, ArticleModel
│   ├── services/
│   └── server.js
└── frontend/          # Vite + React app
```

## Data Models

**User** — firstName, lastName, email, password (validated), profileImageUrl, role (`ADMIN` / `AUTHOR` / `USER`), isActive

**Article** — author (ref → User), title, category, content, comments (nested, ref → User), isArticleActive

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)
- A Cloudinary account (for image uploads)

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
node server.js
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

## Roadmap

- [ ] Re-deploy a stable public demo
- [ ] Add pagination and search for articles
- [ ] Add unit/integration tests for API routes
