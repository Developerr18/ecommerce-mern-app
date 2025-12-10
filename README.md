# Ecommerce MERN

Full-stack e-commerce app with a customer-facing store, an admin dashboard, and an Express/MongoDB API. Frontend and admin are built with React + Vite; backend handles products, carts, orders (COD + Stripe), authentication, and media uploads via Cloudinary.

## Project structure
- `frontend/` – customer storefront (React, React Router, Tailwind, axios).
- `admin/` – admin panel for catalog and order management (React, Tailwind, axios).
- `backend/` – Express API, MongoDB models, Stripe checkout, JWT auth, Cloudinary uploads.
- `multer/` – small upload demo (not required for the main app).

## Features
- Product browsing with search, sizing, and cart management.
- JWT-based user auth (login/register) and persistent carts.
- Checkout with Cash on Delivery or Stripe; order verification endpoint.
- Admin login with product create/list and order status updates.
- Cloudinary-backed image uploads.

## Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Stripe account (for card payments)
- Cloudinary account (for product images)

## Backend setup (`backend/`)
1) Create `.env`:
```
PORT=4000
MONGODB_URI=<mongodb connection string>
JWT_SECRET=<jwt secret>
ADMIN_EMAIL=<admin login email>
ADMIN_PASSWORD=<admin login password>
CLOUDINARY_NAME=<cloudinary cloud name>
CLOUDINARY_API_KEY=<cloudinary api key>
CLOUDINARY_SECRET_KEY=<cloudinary secret key>
STRIPE_SECRET_KEY=<stripe secret key>
```
2) Install & run:
```
cd backend
npm install
npm run server   # or: npm start
```
API base: `http://localhost:4000/api`

## Frontend setup (`frontend/`)
1) Create `.env`:
```
VITE_BACKEND_URL=http://localhost:4000
```
2) Install & run:
```
cd frontend
npm install
npm run dev
```

## Admin dashboard (`admin/`)
1) Create `.env`:
```
VITE_BACKEND_URL=http://localhost:4000
```
2) Install & run:
```
cd admin
npm install
npm run dev
```
Use the admin credentials from backend `.env`.

## Scripts reference
- Frontend/Admin: `npm run dev` | `npm run build` | `npm run preview`
- Backend: `npm start` (prod) | `npm run server` (dev with nodemon)

## Notes
- Default dev ports: backend 4000, Vite 5173 (frontend) and 5174 (admin, may vary). Update `.env` URLs if you change ports.
- Product seed images live in `backend/uploads/`; Cloudinary stores new uploads.
- Ensure CORS allows your frontend/admin origins if deploying separately.

