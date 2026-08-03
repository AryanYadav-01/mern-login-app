# MERN Login / Register App (College Project)

A simple full-stack MERN app: React frontend, Express backend, MongoDB
database. No JWT, no sessions — just a straightforward register → save
to DB → redirect to login → check credentials → redirect to home flow.

## Structure

```
mern-login-app/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── models/User.js          # Mongoose User schema
│   ├── controllers/authController.js  # register/login logic
│   ├── routes/authRoutes.js    # /api/auth/register, /api/auth/login
│   ├── server.js               # Express app entry point
│   └── .env.example            # copy to .env and fill in your Mongo URI
└── frontend/
    ├── src/
    │   ├── pages/Login.jsx
    │   ├── pages/Register.jsx
    │   ├── pages/Home.jsx
    │   ├── api/axios.js
    │   ├── assets/icons/       # <-- REPLACE these placeholder SVGs
    │   │   ├── logo-placeholder.svg
    │   │   └── brand-placeholder.svg
    │   ├── styles/auth.css
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

## Icons

`logo-placeholder.svg` and `brand-placeholder.svg` are plain gray
placeholders (clearly marked with a comment inside each file). Swap
them out for your own edited icons — just keep the same filenames, or
update the `import` paths in `Login.jsx` / `Register.jsx` if you
rename them.

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI is different (defaults to local Mongo)
npm run dev
```

Runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000` and proxies `/api` calls to the
backend (see `vite.config.js`).

### 3. MongoDB

Make sure MongoDB is running locally (`mongod`), or point
`MONGO_URI` in `.env` at a MongoDB Atlas connection string instead.

## Flow

1. User fills out the **Register** page → data is sent to
   `POST /api/auth/register` → password is hashed (bcrypt) and the
   user document is saved to MongoDB → frontend redirects to `/`
   (Login page).
2. User fills out the **Login** page → `POST /api/auth/login` checks
   the username/email + password against MongoDB → on success,
   frontend redirects to `/home`.
3. `/home` is just a placeholder page — no auth guard, no JWT, no
   protected routes, per the assignment scope. Add that later if your
   course covers it.

## Notes for your write-up

- Passwords are hashed with `bcryptjs` before being stored — even in
  a simple project, storing plain-text passwords is worth avoiding
  and it's a one-line change with `bcryptjs`.
- There's no session/auth token, so refreshing `/home` or navigating
  there directly won't "remember" who's logged in — that's expected
  given the no-JWT scope you described.
