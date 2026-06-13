# TradeFlow

A full-stack paper-trading platform for the Indian stock market. Sign up with ₹1,00,000 of virtual cash, trade NSE blue-chips at server-authoritative prices, and track holdings, realized/unrealized P&L, and a personal watchlist — all backed by live price refreshes with a simulation fallback.

Built with the MERN stack (MongoDB, Express, React, Node) as a demonstration of full-stack architecture, authentication, and deployment.

**Live demo:** https://tradeflow-gamma.vercel.app

> Note: the backend runs on a free Render instance that sleeps after 15 minutes of inactivity, so the first request after a while can take ~30–50 seconds to wake. Subsequent requests are fast.

## Features

- **JWT authentication** — signup, login, protected routes, bcrypt-hashed passwords, and a profile page for editing details and changing passwords.
- **Server-authoritative trading** — buy/sell orders are priced and validated on the server, never trusting client-supplied prices. Repeated buys update a weighted-average cost basis; full exits prune the holding.
- **Portfolio valuation** — live total value, available cash, open positions, and unrealized P&L computed against current prices.
- **Transaction ledger** — every BUY/SELL recorded in a separate collection with realized P&L tracked per sell.
- **Live price feed** — NSE prices refreshed on a schedule via `node-cron`, with a per-stock random-walk fallback when the live feed is unavailable, plus a manual refresh.
- **Personal watchlist** — add and remove stocks to track their prices.
- **Charts** — allocation and P&L visualized with Chart.js.

## Architecture

```
React SPA (Vercel)  ──HTTPS──>  Express API (Render)  ──Mongoose──>  MongoDB Atlas
                                       │
                                       ├── node-cron price job (every 10 min)
                                       └── NSE feed → simulation fallback
```

The frontend is a Create React App single-page app served statically by Vercel. It talks to the Express API over HTTPS, attaching a JWT in the `Authorization` header for protected routes. The API persists everything to MongoDB Atlas through Mongoose, and a scheduled `node-cron` job refreshes stock prices, falling back to a random-walk simulation when the NSE feed is unreachable (which it is from cloud datacenter IPs).

### Design decisions

- **Embed vs. reference** — holdings are embedded in the `Portfolio` (bounded, always fetched together); transactions are a separate collection (unbounded, queried independently).
- **Server-authoritative pricing** — the server prices and validates every trade rather than trusting the client, keeping the cost-basis math trustworthy.
- **Weighted-average cost basis** — repeated buys recompute a blended entry price, so unrealized P&L reflects true cost.
- **`null` vs. `0` realized P&L on buys** — a buy stores `null` ("not applicable"), distinct from `0` ("broke even").
- **N+1 avoidance** — portfolio valuation uses one batched `$in` query for all held symbols instead of one per holding.
- **Simulation fallback** — the NSE feed 403s from cloud IPs, so the price service degrades to a bounded random walk instead of failing.

## Tech stack

**Frontend**
- React 19 (Create React App)
- React Router 7
- Chart.js + react-chartjs-2

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 9
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- node-cron (scheduled price refresh)
- stock-nse-india (live price source)

**Infrastructure**
- Frontend hosted on Vercel
- Backend hosted on Render
- Database on MongoDB Atlas

## API reference

All routes are prefixed with `/api`. Routes marked 🔒 require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | — | Create an account (provisions a portfolio with ₹1,00,000) |
| POST | `/auth/login` | — | Authenticate and receive a JWT |
| GET | `/auth/me` | 🔒 | Get the current user |
| PATCH | `/auth/profile` | 🔒 | Update profile details |
| PATCH | `/auth/password` | 🔒 | Change password |
| GET | `/portfolio` | 🔒 | Get the portfolio with live valuation and P&L |
| GET | `/stocks` | 🔒 | List available stocks with current prices |
| POST | `/stocks/refresh` | 🔒 | Manually refresh stock prices |
| POST | `/trade/buy` | 🔒 | Buy shares at the server price |
| POST | `/trade/sell` | 🔒 | Sell shares and realize P&L |
| GET | `/transactions` | 🔒 | List transactions (newest first) with summary stats |
| GET | `/watchlist` | 🔒 | Get the user's watchlist |
| POST | `/watchlist` | 🔒 | Add a stock to the watchlist |
| DELETE | `/watchlist/:symbol` | 🔒 | Remove a stock from the watchlist |
| GET | `/health` | — | Health check |

## Running locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection — either a local `mongod` instance or a free MongoDB Atlas cluster

### 1. Clone the repository

```bash
git clone https://github.com/Digvijaysinh430/TradeFlow.git
cd TradeFlow
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tradeflow
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Seed the stock list (idempotent — safe to run repeatedly):

```bash
node src/seed/seedStocks.js
```

Start the backend:

```bash
npm run dev    # nodemon, auto-restarts on changes
# or
npm start      # plain node
```

The API runs at `http://localhost:5000`.

### 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`. The frontend reads its API base URL from `REACT_APP_API_URL` (set in `frontend/.env.development`), defaulting to `http://localhost:5000`.

### 4. Sign up and trade

Create an account in the browser — you'll start with ₹1,00,000 and can place your first trade immediately.

## Environment variables

**Backend** (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on locally (Render injects its own in production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `CLIENT_URL` | Allowed CORS origin (the frontend URL) |

**Frontend** (`frontend/.env.development`, `frontend/.env.production`)

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API |

## Author

**Digvijaysinh Dodiya**
GitHub: [@Digvijaysinh430](https://github.com/Digvijaysinh430)
LinkedIn: [digvijaysinh-dodiya](https://www.linkedin.com/in/digvijaysinh-dodiya-9513762b1)
Email: digvijaysinhdodiya430@gmail.com
