import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AllocationChart from "./AllocationChart";
import PnlChart from "./PnlChart";
import Watchlist from "./Watchlist";

const API_BASE = "http://localhost:5000/api";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n ?? 0);

function Dashboard() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [txSummary, setTxSummary] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // trade form state
  const [tradeSymbol, setTradeSymbol] = useState("");
  const [tradeQty, setTradeQty] = useState("");
  const [tradeError, setTradeError] = useState("");
  const [tradeMessage, setTradeMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  // shared auth-failure handler — mirrors the existing pattern
  const handleAuthFailure = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // load user, portfolio, and the tradable stock universe in parallel
  const loadDashboard = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const [meRes, portfolioRes, stocksRes, txRes, wlRes] = await Promise.all([
        fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/stocks`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/watchlist`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (meRes.status === 401 || portfolioRes.status === 401) {
        handleAuthFailure();
        return;
      }

      const meData = await meRes.json();
      const portfolioData = await portfolioRes.json();
      setUser(meData.user);
      setPortfolio(portfolioData);

      // stocks endpoint is optional — degrade gracefully if it 404s
      if (stocksRes.ok) {
        const stocksData = await stocksRes.json();
        const list = Array.isArray(stocksData) ? stocksData : stocksData.stocks;
        setStocks(list || []);
        if (list && list.length > 0) {
          setTradeSymbol(list[0].symbol);
        }
      }

      // transactions endpoint — degrade gracefully if unavailable
      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData.transactions || []);
        setTxSummary(txData.summary || null);
      }

      // watchlist endpoint — degrade gracefully if unavailable
      if (wlRes.ok) {
        const wlData = await wlRes.json();
        setWatchlist(wlData.watchlist || []);
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [handleAuthFailure]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // auto-refresh the dashboard every 10 minutes so prices/P&L stay current
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadDashboard();
    }, 10 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [loadDashboard]);

  // manual "refresh prices" — triggers a server-side price refresh, then reloads
  const refreshPrices = async () => {
    setRefreshing(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/stocks/refresh`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleAuthFailure();
        return;
      }
      await loadDashboard();
    } catch (err) {
      setError("Could not refresh prices. Is the backend running?");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // add a symbol to the watchlist, then reload
  const addToWatchlist = async (symbol) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol }),
      });
      if (res.status === 401) {
        handleAuthFailure();
        return;
      }
      await loadDashboard();
    } catch (err) {
      setError("Could not update watchlist. Is the backend running?");
    }
  };

  // remove a symbol from the watchlist, then reload
  const removeFromWatchlist = async (symbol) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/watchlist/${symbol}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleAuthFailure();
        return;
      }
      await loadDashboard();
    } catch (err) {
      setError("Could not update watchlist. Is the backend running?");
    }
  };

  const submitTrade = async (side) => {
    setTradeError("");
    setTradeMessage("");

    const qty = Number(tradeQty);
    if (!tradeSymbol) {
      setTradeError("Select a stock.");
      return;
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      setTradeError("Enter a whole quantity greater than zero.");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/trade/${side}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol: tradeSymbol, quantity: qty }),
      });

      if (res.status === 401) {
        handleAuthFailure();
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setTradeError(data.message || "Trade failed. Please try again.");
        return;
      }

      setTradeMessage(data.message);
      setTradeQty("");
      // refresh portfolio so balances and holdings reflect the trade
      await loadDashboard();
    } catch (err) {
      setTradeError("Could not reach the server. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  const holdings = portfolio?.holdings || [];

  return (
    <>
      <Navbar />
      <main className="signup-page page-offset-nav">
        <div className="container">
          {loading ? (
            <p className="text-muted">Loading your dashboard...</p>
          ) : error ? (
            <div className="signup-error">{error}</div>
          ) : (
            <div className="dashboard">
              <div className="dashboard-header">
                <div>
                  <p className="signup-eyebrow">Dashboard</p>
                  <h1 className="signup-title">
                    Welcome, {user?.fullName?.split(" ")[0] || "trader"}
                  </h1>
                  <p className="signup-lead text-muted">
                    You&apos;re logged in as {user?.email}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={refreshPrices}
                    disabled={refreshing}
                  >
                    {refreshing ? "Refreshing..." : "Refresh prices"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>

              {/* summary cards */}
              <div className="row g-4 mt-2">
                <div className="col-md-3">
                  <div className="signup-card">
                    <h2 className="signup-card-title">
                      {formatINR(portfolio?.totalValue)}
                    </h2>
                    <p className="text-muted">Total value</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="signup-card">
                    <h2 className="signup-card-title">
                      {formatINR(portfolio?.cashBalance)}
                    </h2>
                    <p className="text-muted">Available cash</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="signup-card">
                    <h2 className="signup-card-title">{holdings.length}</h2>
                    <p className="text-muted">Open positions</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="signup-card">
                    <h2
                      className="signup-card-title"
                      style={{
                        color:
                          (txSummary?.realizedPnl ?? 0) >= 0
                            ? "#15803d"
                            : "#dc2626",
                      }}
                    >
                      {formatINR(txSummary?.realizedPnl)}
                    </h2>
                    <p className="text-muted">Realized P&amp;L</p>
                  </div>
                </div>
              </div>

              {/* watchlist */}
              <div className="mt-4">
                <Watchlist
                  items={watchlist}
                  stocks={stocks}
                  onAdd={addToWatchlist}
                  onRemove={removeFromWatchlist}
                />
              </div>

              {/* trade panel */}
              <div className="signup-card mt-4">
                <h2 className="signup-card-title">Place an order</h2>
                {tradeError && (
                  <div className="signup-error" style={{ marginBottom: "1rem" }}>
                    {tradeError}
                  </div>
                )}
                {tradeMessage && (
                  <div
                    className="signup-success"
                    style={{ marginBottom: "1rem", color: "#15803d" }}
                  >
                    {tradeMessage}
                  </div>
                )}
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-md-5">
                    <label htmlFor="tradeSymbol" className="form-label">
                      Stock
                    </label>
                    <select
                      id="tradeSymbol"
                      className="form-select"
                      value={tradeSymbol}
                      onChange={(e) => setTradeSymbol(e.target.value)}
                    >
                      {stocks.length === 0 && (
                        <option value="">No stocks available</option>
                      )}
                      {stocks.map((s) => (
                        <option key={s.symbol} value={s.symbol}>
                          {s.symbol} — {formatINR(s.lastPrice)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="tradeQty" className="form-label">
                      Quantity
                    </label>
                    <input
                      id="tradeQty"
                      type="number"
                      min="1"
                      step="1"
                      className="form-control"
                      placeholder="0"
                      value={tradeQty}
                      onChange={(e) => setTradeQty(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      disabled={submitting}
                      onClick={() => submitTrade("buy")}
                    >
                      {submitting ? "..." : "Buy"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      disabled={submitting}
                      onClick={() => submitTrade("sell")}
                    >
                      {submitting ? "..." : "Sell"}
                    </button>
                  </div>
                </div>
              </div>

              {/* charts — only meaningful when there are holdings */}
              {holdings.length > 0 && (
                <div className="row g-4 mt-2">
                  <div className="col-md-6">
                    <div className="signup-card">
                      <h2 className="signup-card-title">Allocation</h2>
                      <AllocationChart
                        holdings={holdings}
                        cashBalance={portfolio?.cashBalance}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="signup-card">
                      <h2 className="signup-card-title">P&amp;L by holding</h2>
                      <PnlChart holdings={holdings} />
                    </div>
                  </div>
                </div>
              )}

              {/* holdings table */}
              <div className="signup-card mt-4">
                <h2 className="signup-card-title">Your holdings</h2>
                {holdings.length === 0 ? (
                  <p className="text-muted mb-0">
                    You don&apos;t own any stocks yet. Place your first order
                    above.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Symbol</th>
                          <th className="text-end">Qty</th>
                          <th className="text-end">Avg cost</th>
                          <th className="text-end">LTP</th>
                          <th className="text-end">Current value</th>
                          <th className="text-end">P&amp;L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map((h) => {
                          const positive = h.pnl >= 0;
                          return (
                            <tr key={h.symbol}>
                              <td>{h.symbol}</td>
                              <td className="text-end">{h.quantity}</td>
                              <td className="text-end">
                                {formatINR(h.avgBuyPrice)}
                              </td>
                              <td className="text-end">
                                {formatINR(h.currentPrice)}
                              </td>
                              <td className="text-end">
                                {formatINR(h.currentValue)}
                              </td>
                              <td
                                className="text-end"
                                style={{ color: positive ? "#15803d" : "#dc2626" }}
                              >
                                {formatINR(h.pnl)} ({positive ? "+" : ""}
                                {h.pnlPercent}%)
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* order history */}
              <div className="signup-card mt-4">
                <h2 className="signup-card-title">Order history</h2>
                {transactions.length === 0 ? (
                  <p className="text-muted mb-0">
                    No trades yet. Your order history will appear here.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Side</th>
                          <th>Symbol</th>
                          <th className="text-end">Qty</th>
                          <th className="text-end">Price</th>
                          <th className="text-end">Total</th>
                          <th className="text-end">Realized P&amp;L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((t) => {
                          const isBuy = t.side === "BUY";
                          const hasPnl =
                            t.realizedPnl !== null &&
                            t.realizedPnl !== undefined;
                          const pnlPositive = (t.realizedPnl ?? 0) >= 0;
                          return (
                            <tr key={t._id}>
                              <td>
                                {new Date(t.createdAt).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </td>
                              <td>
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: isBuy ? "#15803d" : "#dc2626",
                                  }}
                                >
                                  {t.side}
                                </span>
                              </td>
                              <td>{t.symbol}</td>
                              <td className="text-end">{t.quantity}</td>
                              <td className="text-end">{formatINR(t.price)}</td>
                              <td className="text-end">
                                {formatINR(t.totalAmount)}
                              </td>
                              <td
                                className="text-end"
                                style={{
                                  color: !hasPnl
                                    ? "inherit"
                                    : pnlPositive
                                    ? "#15803d"
                                    : "#dc2626",
                                }}
                              >
                                {hasPnl ? formatINR(t.realizedPnl) : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;