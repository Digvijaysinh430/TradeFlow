import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

function Signup() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ""))) {
      next.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }
    if (!form.agreeTerms) {
      next.agreeTerms = "You must accept the terms to continue.";
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
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/signup`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          mobile: form.mobile,
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
      setSubmitted(true);
    } catch (err) {
      setServerError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="signup-page page-offset-nav">
        <div className="container">
          <div className="row align-items-center g-5 signup-layout">
            <div className="col-12 col-lg-5 signup-intro">
              <p className="signup-eyebrow">Get started</p>
              <h1 className="signup-title">Open your TradeFlow account</h1>
              <p className="signup-lead">
                Join thousands of investors trading equities, F&amp;O, and
                mutual funds on one seamless platform.
              </p>
              <ul className="signup-benefits">
                <li>
                  <span className="signup-benefit-icon">₹0</span>
                  <span>Zero brokerage on equity delivery</span>
                </li>
                <li>
                  <span className="signup-benefit-icon">₹20</span>
                  <span>Flat fee on intraday &amp; F&amp;O trades</span>
                </li>
                <li>
                  <span className="signup-benefit-icon">
                    <i className="fa fa-lock" aria-hidden="true" />
                  </span>
                  <span>Bank-grade security &amp; 2FA ready</span>
                </li>
              </ul>
              <p className="signup-note text-muted">
                Already have an account?{" "}
                <Link to="/login" className="signup-inline-link">
                  Log in
                </Link>
              </p>
            </div>

            <div className="col-12 col-lg-7">
              <div className="signup-card">
                {submitted ? (
                  <div className="signup-success text-center">
                    <div className="signup-success-icon">
                      <i className="fa fa-check" aria-hidden="true" />
                    </div>
                    <h2>Application received</h2>
                    <p className="text-muted">
                      Thanks, {form.fullName.split(" ")[0] || "there"}!
                      We&apos;ll email you at <strong>{form.email}</strong> with
                      next steps.
                    </p>
                    <Link to="/" className="btn btn-primary mt-3">
                      Back to home
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="signup-card-title">Create your account</h2>
                    <p className="signup-card-subtitle text-muted">
                      Free signup · No hidden charges
                    </p>
                    <form
                      className="signup-form"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {serverError && (
                        <div
                          className="signup-error"
                          style={{ marginBottom: "1rem" }}
                        >
                          {serverError}
                        </div>
                      )}
                      <div className="signup-field">
                        <label htmlFor="fullName">Full name</label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="As on PAN card"
                          value={form.fullName}
                          onChange={handleChange}
                          className={errors.fullName ? "is-invalid" : ""}
                        />
                        {errors.fullName && (
                          <span className="signup-error">
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
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
                              <span className="signup-error">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="signup-field">
                            <label htmlFor="mobile">Mobile</label>
                            <div className="signup-mobile-wrap">
                              <span className="signup-mobile-prefix">+91</span>
                              <input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                autoComplete="tel"
                                placeholder="9876543210"
                                maxLength={10}
                                value={form.mobile}
                                onChange={handleChange}
                                className={errors.mobile ? "is-invalid" : ""}
                              />
                            </div>
                            {errors.mobile && (
                              <span className="signup-error">
                                {errors.mobile}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="signup-field">
                            <label htmlFor="password">Password</label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              placeholder="Min. 8 characters"
                              value={form.password}
                              onChange={handleChange}
                              className={errors.password ? "is-invalid" : ""}
                            />
                            {errors.password && (
                              <span className="signup-error">
                                {errors.password}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="signup-field">
                            <label htmlFor="confirmPassword">
                              Confirm password
                            </label>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              autoComplete="new-password"
                              placeholder="Re-enter password"
                              value={form.confirmPassword}
                              onChange={handleChange}
                              className={
                                errors.confirmPassword ? "is-invalid" : ""
                              }
                            />
                            {errors.confirmPassword && (
                              <span className="signup-error">
                                {errors.confirmPassword}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="signup-field signup-checkbox-field">
                        <label className="signup-checkbox-label">
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={form.agreeTerms}
                            onChange={handleChange}
                          />
                          <span>
                            I agree to TradeFlow&apos;s{" "}
                            <button
                              type="button"
                              className="signup-inline-link"
                            >
                              Terms
                            </button>{" "}
                            and{" "}
                            <button
                              type="button"
                              className="signup-inline-link"
                            >
                              Privacy Policy
                            </button>
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <span className="signup-error">
                            {errors.agreeTerms}
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary signup-submit w-100"
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Create account"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
