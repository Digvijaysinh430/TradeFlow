import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const INITIAL_FORM = {
  email: "",
  password: "",
};

function Login() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Enter your password.";
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(
          data.message || "Something went wrong. Please try again.",
        );
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setServerError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="signup-page page-offset-nav"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5">
              <div className="signup-card">
                <h2 className="signup-card-title">Welcome back</h2>
                <p className="signup-card-subtitle text-muted">
                  Log in to your TradeFlow account
                </p>
                <form className="signup-form" onSubmit={handleSubmit} noValidate>
                  {serverError && (
                    <div
                      className="signup-error"
                      style={{ marginBottom: "1rem" }}
                    >
                      {serverError}
                    </div>
                  )}
                  <div className="signup-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "is-invalid" : ""}
                    />
                    {errors.email && (
                      <span className="signup-error">{errors.email}</span>
                    )}
                  </div>

                  <div className="signup-field">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Your password"
                      value={form.password}
                      onChange={handleChange}
                      className={errors.password ? "is-invalid" : ""}
                    />
                    {errors.password && (
                      <span className="signup-error">{errors.password}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary signup-submit w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </form>

                <p className="signup-note text-muted mt-3">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="signup-inline-link">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;