import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          // token invalid or expired — force re-login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setUser(data.user);
      } catch (err) {
        setError("Could not reach the server. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>

              <div className="row g-4 mt-2">
                <div className="col-md-4">
                  <div className="signup-card">
                    <h2 className="signup-card-title">₹0.00</h2>
                    <p className="text-muted">Virtual balance</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="signup-card">
                    <h2 className="signup-card-title">0</h2>
                    <p className="text-muted">Open positions</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="signup-card">
                    <h2 className="signup-card-title">0</h2>
                    <p className="text-muted">Watchlist items</p>
                  </div>
                </div>
              </div>

              <p className="text-muted mt-4">
                Your trading tools will appear here as we build them out.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;