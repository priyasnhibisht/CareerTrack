**Product Requirements Document**

**CareerTrack: Job Application & Growth Tracker**

| Version: | 1.0 |
| --- | --- |
| Date: | February 18, 2026 |
| Status: | Development Phase |

# 1\. Executive Summary

## 1.1 Product Vision

CareerTrack is a full-stack web application that helps job seekers track their applications while focusing on personal growth and learning throughout the job search journey. Unlike generic spreadsheets or basic trackers, CareerTrack transforms the job search from a numbers game into a strategic, insight-driven process with emotional intelligence built-in.

## 1.2 Problem Statement

Job seekers face multiple challenges:

*   **Disorganization:** Losing track of where they have applied and when to follow up
*   **Lack of insights:** No understanding of what is working and what is not
*   **Emotional toll:** Job searching is draining with no positive reinforcement
*   **No learning loop:** Rejections feel like failures instead of learning opportunities
*   **Strategic blindness:** Cannot identify which application sources or strategies yield results

## 1.3 Target Users

*   **Primary:** Entry-level to mid-level professionals actively job hunting
*   **Secondary:** Recent graduates, bootcamp students, career switchers
*   **Tertiary:** Students seeking internships

## 1.4 Success Metrics

*   User can track 10+ applications within first week
*   80% of users report feeling "more organized" after 2 weeks
*   Users identify at least one actionable insight from their data within 3 weeks
*   Application completion rate: 90%+ for core features

# 2\. Product Scope

## 2.1 In Scope (MVP - Version 1.0)

### Core Functionality:

*   User authentication (signup, login, logout)
*   CRUD operations for job applications
*   Dashboard with application overview
*   Growth tracking features
*   Basic analytics and insights
*   Application source tracking
*   Mobile-responsive design

### Unique Differentiators:

*   Growth-focused rejection insights
*   Application source performance tracking
*   Preparation level self-assessment
*   Learning notes and focus areas
*   Positive reinforcement and milestone celebrations

## 2.2 Out of Scope (Future Versions)

### Version 2.0 (Post-MVP):

*   AI-powered job description summaries
*   Automated company information lookup
*   Email reminder system
*   Calendar integration
*   Resume version tracking
*   Network/referral contact management

### Version 3.0 (Advanced):

*   Resume-to-job matching score
*   Chrome extension for one-click saving
*   Email parsing (forward emails to extract data)
*   Team/mentor sharing features
*   Mobile native apps (iOS/Android)
*   Salary negotiation insights

# 3\. Technical Requirements

## 3.1 Technology Stack

### Frontend:

*   **Framework:** React 18+ (with Vite)
*   **Language:** JavaScript/TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API / Zustand
*   **Routing:** React Router v6
*   **HTTP Client:** Axios
*   **Charts:** Recharts
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast

### Backend:

*   **Runtime:** Node.js 20+
*   **Framework:** Express.js
*   **Language:** JavaScript
*   **Authentication:** JWT (jsonwebtoken)
*   **Password Hashing:** bcrypt
*   **Validation:** express-validator
*   **CORS:** cors middleware

### Database:

*   **Primary DB:** PostgreSQL 15+
*   **ORM:** Raw SQL with pg library (OR Prisma)
*   **Migrations:** node-pg-migrate

### Deployment:

*   **Backend Hosting:** Render / Railway (free tier)
*   **Frontend Hosting:** Vercel / Netlify (free tier)
*   **Database Hosting:** Railway / Supabase (free tier)
*   **Domain:** Optional custom domain

## 3.2 Database Schema

### Table: users

Core user authentication table.

| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary key |
| email | VARCHAR(255) | User email (unique) |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| created_at | TIMESTAMP | Account creation date |

### Table: applications

Job application tracking with growth metrics.

| Column | Type | Description |
| --- | --- | --- |
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key to users |
| company_name | VARCHAR(255) | Company name |
| position | VARCHAR(255) | Job title |
| status | VARCHAR(50) | Application status |
| opportunity_type | VARCHAR(50) | Job or internship |
| applied_date | DATE | Date applied |
| salary_min | INTEGER | Minimum salary |
| salary_max | INTEGER | Maximum salary |
| application_source | VARCHAR(100) | Where found (LinkedIn, etc.) |
| stage_reached | VARCHAR(100) | Interview stage reached |
| learning_notes | TEXT | Growth insights |

## 3.3 API Endpoints

### Authentication:

*   **POST /api/auth/signup** - Create new user account
*   **POST /api/auth/login** - Login and receive JWT token
*   **GET /api/auth/me** - Get current user info (protected)

### Applications:

*   **GET /api/applications** - Get all applications for user
*   **GET /api/applications/:id** - Get single application
*   **POST /api/applications** - Create new application
*   **PUT /api/applications/:id** - Update application
*   **DELETE /api/applications/:id** - Delete application

### Analytics:

*   **GET /api/analytics/overview** - Get summary statistics
*   **GET /api/analytics/sources** - Application source performance
*   **GET /api/analytics/pipeline** - Interview conversion rates
*   **GET /api/analytics/timeline** - Applications over time

# 4\. Development Phases

## Phase 1: Foundation (Week 1)

**Goal:** Working authentication + basic backend

Deliverables:

*   Project setup (frontend + backend)
*   PostgreSQL database configured
*   User signup/login working
*   JWT authentication implemented
*   Basic React app with routing

## Phase 2: Core CRUD (Week 2)

**Goal:** Users can manage applications

Deliverables:

*   All application CRUD endpoints working
*   Dashboard showing application list
*   Add/edit/delete functionality in UI
*   Basic filtering (status)

## Phase 3: Growth Features (Week 3)

**Goal:** Unique differentiators implemented

Deliverables:

*   Stage tracking working
*   Learning notes functionality
*   Focus areas multi-select
*   Preparation level tracking
*   Application source dropdown

## Phase 4: Analytics (Week 4)

**Goal:** Insights and data visualization

Deliverables:

*   Analytics dashboard complete
*   Charts showing key metrics
*   Source performance analysis
*   Pipeline visualization

## Phase 5: Deployment (Week 5)

**Goal:** Production-ready application

Deliverables:

*   Deployed application (live URL)
*   Comprehensive README
*   Demo video/screenshots
*   Bug fixes
*   Performance optimizations

# 5\. Success Criteria

## 5.1 Launch Criteria (MVP)

### Must Have (Blockers):

*   User can signup/login/logout
*   User can add/edit/delete applications
*   User can view all their applications
*   User can filter by status
*   User can track application source
*   User can add learning notes
*   Analytics dashboard shows basic stats
*   Application is deployed and accessible
*   No critical security vulnerabilities
*   Works on mobile and desktop

### Should Have (Important):

*   Stage tracking functional
*   Focus areas implemented
*   Source performance insights
*   Pipeline visualization
*   Search functionality
*   Milestone celebrations

### Could Have (Nice to Have):

*   Multiple chart types
*   Export data (CSV)
*   Dark mode
*   Profile settings page

# 6\. Security Requirements

## Must Have:

*   Passwords hashed with bcrypt (salt rounds: 10)
*   JWT tokens with expiration
*   CORS configured (whitelist frontend domain)
*   SQL injection prevention (parameterized queries)
*   XSS protection (input sanitization)
*   HTTPS in production
*   Environment variables for secrets
*   Rate limiting on auth endpoints

## Authorization:

Users can only access their own applications. Every API call checks: application.user\_id === authenticated\_user.id

# 7\. Future Roadmap (Post-MVP)

## Version 2.0 (3-6 months)

*   AI job description summaries (Claude API integration)
*   Company information auto-lookup
*   Email reminder system (background jobs)
*   Resume version tracking
*   Interview preparation checklist
*   Cover letter templates

## Version 3.0 (6-12 months)

*   Chrome extension for one-click save
*   Email parsing (forward confirmations to extract data)
*   Salary negotiation insights
*   Team features (share with mentor/coach)
*   Public profile for networking
*   Mobile native apps

## Version 4.0 (12+ months)

*   AI resume optimization
*   Job matching recommendations
*   Interview question database
*   Community features (tips from others)
*   Premium tier (advanced analytics)
*   Integration with LinkedIn/Indeed APIs

_  
  
Document End_

CareerTrack PRD v1.0 | February 18, 2026