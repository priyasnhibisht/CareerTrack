# CareerTrack

CareerTrack is a full-stack web application that helps job seekers track applications while focusing on personal growth and learning throughout the job search journey.

Unlike a spreadsheet-only tracker, CareerTrack combines organization, analytics, and reflection so users can improve strategy over time.

## Product Vision

- Turn job searching from a chaotic process into a structured system
- Help users identify what is working (sources, stages, outcomes)
- Convert rejections into learning through notes and growth tracking

## Target Users

- Entry-level to mid-level professionals actively job hunting
- Recent graduates, bootcamp students, and career switchers
- Students applying for internships

## MVP Scope (v1.0)

- User authentication (`signup`, `login`, `me`)
- Application CRUD (create, read, update, delete)
- Dashboard with applications overview
- Status-based filtering and search
- Growth-focused fields:
  - `application_source`
  - `stage_reached`
  - `learning_notes`
- Analytics dashboard:
  - Overview stats
  - Source performance
  - Pipeline metrics
  - Timeline trends
- Mobile-responsive UI

## Tech Stack

- Frontend: React 18 + Vite, React Router, Axios, Recharts
- Backend: Node.js, Express, JWT, bcrypt
- Database: SQLite (`backend/careertrack.db`)

## Local Development

### Running Ports

- Backend API: `http://localhost:8000`
- Frontend App: `http://localhost:8002`

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:8002` in your browser.

## Environment Configuration

### Backend (`backend/.env`)

- `PORT=8000`
- `JWT_SECRET=<your-secret>`
- `JWT_EXPIRATION=7d`
- `FRONTEND_URLS=http://localhost:8002,http://localhost:3000,http://localhost:8081`

### Frontend (`frontend/.env` optional)

- `VITE_API_BASE_URL=http://localhost:8000`

## API Overview

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

## Database Notes

- The app currently uses SQLite in development.
- Schema is initialized in `backend/config/database.js`.
- SQL migration reference: `backend/db/migrations/001_initial_schema.sql`.
- Backward-compatible patch is included for older DBs missing `users.name`.

## Project Structure

```text
careertrack/
  backend/   # Express API + SQLite + auth + analytics endpoints
  frontend/  # React app (dashboard, auth, analytics)
```

## Success Criteria (PRD-Aligned)

- Users can sign up/login/logout successfully
- Users can add/edit/delete and filter applications
- Users can track source and learning notes
- Analytics page surfaces useful insights from user data
- App works on desktop and mobile

## Future Roadmap (Post-MVP)

- AI job description summaries
- Email reminders and calendar workflows
- Resume version tracking
- One-click save browser extension
- Advanced recommendation and matching features
