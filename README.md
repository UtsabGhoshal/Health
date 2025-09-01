
# HealthTech

HealthTech is a full-stack healthcare management platform designed to streamline appointment scheduling, doctor management, medical records, and user authentication. The project leverages modern technologies including React, Node.js/Express, TypeScript, and TailwindCSS.

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- `client/` - Frontend React app (TypeScript, TailwindCSS)
- `server/` - Backend API (Node.js, Express, TypeScript)
- `shared/` - Shared types and API utilities
- `public/` - Static assets
- `netlify/` - Netlify serverless functions

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** (Add your DB, e.g., MongoDB, PostgreSQL)
- **Authentication:** Firebase (or custom JWT)
- **Deployment:** Netlify, Vercel, or custom server

## Features

- User authentication (signup/login)
- Doctor and appointment management
- Medical records management
- Responsive UI for mobile and desktop
- Serverless functions (Netlify)
- Error handling and toast notifications
- Modular UI components

## Getting Started

1. **Clone the repository**
   ```
   git clone https://github.com/detactivepritam/healthtech.git
   cd healthtech
   ```
2. **Install dependencies**
   ```
   pnpm install
   ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` and fill in required values

4. **Start development servers**
   - Frontend: `pnpm dev` or `npm run dev`
   - Backend: `pnpm start` or `npm run start`

## Scripts

- `dev` - Start frontend development server
- `start` - Start backend server
- `build` - Build frontend for production

## Environment Variables

- See `.env.example` for required variables (e.g., Firebase config, API keys)

## API Endpoints

- `/api/appointments` - Manage appointments
- `/api/doctors` - Doctor management
- `/api/medical-records` - Medical records
- `/api/auth` - Authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request


