# BookIt - Experiences & Slots Booking Platform

A fullstack web application for exploring travel experiences, selecting available slots, and completing bookings.

## 🚀 Features

- **Browse Experiences**: Explore various travel experiences with filtering and search
- **Detailed View**: View comprehensive details, highlights, and available time slots
- **Smart Booking**: Select dates, times, and number of guests with real-time availability
- **Promo Codes**: Apply discount codes (SAVE10, FLAT100, WELCOME20, FIRST50)
- **Responsive Design**: Fully responsive and mobile-friendly UI
- **Real-time Updates**: Dynamic slot availability and booking confirmation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Sequelize** ORM
- **CORS**, **Helmet**, **Morgan** middleware

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
\\\ash
cd BookIt
\\\

### 2. Setup Backend

\\\ash
cd backend
npm install
\\\

Create a \.env\ file in the backend directory:
\\\env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/bookit
NODE_ENV=development
\\\

Create PostgreSQL database:
\\\ash
createdb bookit
\\\

### 3. Setup Frontend

\\\ash
cd frontend
npm install
\\\

Create a \.env\ file in the frontend directory:
\\\env
VITE_API_URL=http://localhost:5000/api
\\\

### 4. Seed Database

\\\ash
cd backend
npm run build
node dist/db/seed.js
\\\

## 🚀 Running the Application

### Start Backend Server
\\\ash
cd backend
npm run dev
\\\
Backend will run on http://localhost:5000

### Start Frontend Development Server
\\\ash
cd frontend
npm run dev
\\\
Frontend will run on http://localhost:3000

## 📁 Project Structure

\\\
BookIt/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── Experience.ts
│   │   │   ├── Slot.ts
│   │   │   ├── Booking.ts
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── experienceController.ts
│   │   │   ├── bookingController.ts
│   │   │   └── promoController.ts
│   │   ├── routes/
│   │   │   ├── experiences.ts
│   │   │   ├── bookings.ts
│   │   │   └── promo.ts
│   │   ├── db/
│   │   │   └── seed.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ExperienceCard.tsx
    │   │   └── LoadingSpinner.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── DetailsPage.tsx
    │   │   ├── CheckoutPage.tsx
    │   │   └── ResultPage.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    └── vite.config.ts
\\\

## 🌐 API Endpoints

### Experiences
- \GET /api/experiences\ - Get all experiences (with optional filters)
- \GET /api/experiences/:id\ - Get experience by ID with available slots

### Bookings
- \POST /api/bookings\ - Create a new booking
- \GET /api/bookings/:id\ - Get booking by ID

### Promo Codes
- \POST /api/promo/validate\ - Validate promo code

## 🎨 Available Promo Codes

- **SAVE10** - 10% discount
- **FLAT100** - ₹100 flat discount
- **WELCOME20** - 20% welcome discount
- **FIRST50** - ₹50 first booking discount

## 🚢 Deployment

This project is configured for easy deployment to cloud platforms.

### Quick Deploy Links
- **Frontend**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MoNiLBaRiYa/BookIt&project-name=bookit-frontend&root-directory=frontend)
- **Backend**: [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/MoNiLBaRiYa/BookIt)

### Manual Deployment

#### Backend (Render/Railway)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add PostgreSQL database
5. Set environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=[Auto-generated]
   PORT=10000
   ```
6. Deploy and run seed command

#### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Deploy automatically

### Detailed Deployment Guide
See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

## 🌐 Live Demo

- **Application**: [https://bookit-experiences.vercel.app](https://bookit-experiences.vercel.app)
- **API Documentation**: [https://bookit-backend.onrender.com/health](https://bookit-backend.onrender.com/health)

## 📝 License

MIT License

## 👨‍💻 Author

Built as a fullstack intern assignment project.
