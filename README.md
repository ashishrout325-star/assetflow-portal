# AssetFlow Portal

A full-stack asset management system with an animated login page, JWT-based authentication, and a responsive dashboard for tracking company assets.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT
- Styling: Custom CSS with glassmorphism and animation

## Features

- Animated login screen
- Admin authentication
- Dashboard overview cards
- Add/edit/delete assets
- Asset status tracking
- Search and status-based filtering support
- Responsive layout for desktop and mobile

## Project Structure

- `backend/` — Express API with MongoDB
- `frontend/` — React frontend UI

## Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3) Create a user

Visit the register endpoint or use a MongoDB utility script.

POST `/api/auth/register`

```json
{
  "name": "Admin",
  "email": "admin@assetflow.com",
  "password": "admin123"
}
```

Then login using:

```json
{
  "email": "admin@assetflow.com",
  "password": "admin123"
}
```

## Default Ports

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Notes

Before running the app, make sure MongoDB is installed and running locally.
