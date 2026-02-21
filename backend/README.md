# CareerTrack

CareerTrack is a full-stack job application tracker with analytics.

## Current Local Ports

- Frontend: `http://localhost:8002`
- Backend API: `http://localhost:8000`

## Backend Quick Start

### Prerequisites

- Node.js 20+
- npm

### Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
```

3. Start backend

```bash
npm run dev
```

Backend runs on `http://localhost:8000`.

## Frontend Quick Start

From project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:8002`.

## Environment (Backend)

- `PORT=8000`
- `FRONTEND_URLS=http://localhost:8002,http://localhost:3000,http://localhost:8081`
- `JWT_SECRET=...`
- `JWT_EXPIRATION=7d`

## Database

- Database: SQLite (`backend/careertrack.db`)
- Schema initialization happens in `config/database.js`
- Migration SQL: `db/migrations/001_initial_schema.sql`

## Recent Updates

- Backend port changed from `5000` to `8000`
- Frontend port set to `8002`
- Added users schema support for `name` field
- Added backward-compatible DB patch to auto-add `users.name` for old DB files
- Updated CORS to allow multiple local frontend origins via `FRONTEND_URLS`

## API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Applications

- `GET /api/applications` (protected)
- `POST /api/applications` (protected)
- `GET /api/applications/:id` (protected)
- `PUT /api/applications/:id` (protected)
- `DELETE /api/applications/:id` (protected)

### Analytics

- `GET /api/analytics/overview` (protected)
- `GET /api/analytics/sources` (protected)
- `GET /api/analytics/pipeline` (protected)
- `GET /api/analytics/timeline` (protected)
