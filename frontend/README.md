# TradeFlow 📈

**TradeFlow** is a modern, high-performance fintech platform designed to make trading and investing seamless, transparent, and accessible to everyone. Built with a pristine, light-themed aesthetic resembling industry-leading brokerages, TradeFlow provides an institutional-grade experience for retail investors.

Whether you're trading equities, diving into derivatives, or building a long-term mutual fund portfolio, TradeFlow offers the tools, security, and speed you need.

---

## ✨ Key Features

### 🏦 Core Trading & Investing
*   **Zero-Fee Equity Delivery**: Invest in stocks for the long term with absolutely zero brokerage fees.
*   **Flat-Fee Intraday & F&O**: Trade derivatives and intraday equity with a transparent, flat ₹20 fee per executed order.
*   **Direct Mutual Funds**: Seamlessly invest in commission-free direct mutual funds and track your SIPs.
*   **Fractional Shares & ETFs**: Access global markets and automated ETF portfolios with ease.

### 💻 Advanced Platform Ecosystem
*   **Lightning-Fast Execution**: Millisecond order execution powered by a robust backend architecture.
*   **Pro Analytics & Charting**: Institutional-level charting tools, real-time market sentiment indicators, and algorithmic backtesting capabilities.
*   **Cross-Platform Sync**: A unified experience across the TradeFlow Web Terminal, Mobile App, and Smartwatch dashboards.

### 📚 TradeFlow Academy
*   **Comprehensive Education**: Completely free, high-quality financial education modules covering everything from the basics of the stock market to advanced options strategies.
*   **Active Community**: Engage with thousands of active traders to discuss market trends and share insights.

---

## 🛠️ Technology Stack

TradeFlow is powered by the robust **MERN Stack** (MongoDB, Express.js, React.js, Node.js), ensuring speed, scalability, and a flawless user experience.

*   **Database**: MongoDB
*   **Backend Framework**: Express.js & Node.js
*   **Frontend Framework**: React.js
*   **Styling & UI**: Custom CSS variables, modern utility classes, and Bootstrap 5 grid systems.
*   **Typography**: Inter (Google Fonts) for clean, readable data presentation.
*   **Icons**: FontAwesome & custom SVG assets.
*   **Build Tool**: Webpack (via Create React App)

---

## 🚀 Getting Started

Follow these instructions to set up the TradeFlow frontend environment locally for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/en/download/) (v14.0.0 or higher)
*   npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)
*   Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Digvijaysinh430/TradeFlow.git
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd TradeFlow/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application Locally

To boot up the local development server:

```bash
npm start
# or
yarn start
```

The application will start and automatically open in your default web browser at `http://localhost:3000`. The page will hot-reload if you make any edits to the source files.

---

## 🏗️ Folder Structure

A quick overview of the frontend project structure:

```text
TradeFlow/frontend/
├── public/                 # Static assets
│   ├── media/images/       # Application images, logos, and generated 3D graphics
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/                    # Application source code
│   ├── landing_page/       # Components for the marketing/landing page
│   │   ├── home/           # Hero, Stats, Awards, Pricing, Education sections
│   │   ├── Navbar.js       # Global Navigation
│   │   ├── Footer.js       # Global Mega-Footer
│   │   └── OpenAccount.js  # Reusable CTA component
│   ├── index.css           # Global CSS variables, utility classes, and overrides
│   └── index.js            # React application entry point
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## 📦 Building for Production

When you are ready to deploy the application to a production environment (like Vercel, Netlify, or AWS), run:

```bash
npm run build
# or
yarn build
```

This command will bundle React in production mode and optimize the build for the best performance. The build artifacts will be stored in the `build/` directory, ready to be served.

---

## 🤝 Contributing

We welcome contributions to make TradeFlow even better! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
