import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const API_BASE = "http://localhost:5000/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // profile (name/mobile) form
  const [profileForm, setProfileForm] = useState({ fullName: "", mobile: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // password form
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  const navigate = useNavigate();

  const handleAuthFailure = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const loadProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleAuthFailure();
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setProfileForm({
        fullName: data.user.fullName || "",
        mobile: data.user.mobile || "",
      });
    } catch (err) {
      setProfileError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [handleAuthFailure]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    setProfileMsg("");
    setProfileError("");
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
    setPwMsg("");
    setPwError("");
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");

    if (!profileForm.fullName.trim()) {
      setProfileError("Full name cannot be empty.");
      return;
    }
    if (!/^\d{10}$/.test(profileForm.mobile.replace(/\s/g, ""))) {
      setProfileError("Enter a valid 10-digit mobile number.");
      return;
    }

    setSavingProfile(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      if (res.status === 401) {
        handleAuthFailure();
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setProfileError(data.message || "Could not update profile.");
        return;
      }
      setUser(data.user);
      // keep localStorage user in sync so the dashboard greeting updates
      localStorage.setItem("user", JSON.stringify(data.user));
      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileError("Could not reach the server. Is the backend running?");
    } finally {
      setSavingProfile(false);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setPwMsg("");
    setPwError("");

    if (!pwForm.currentPassword || !pwForm.newPassword) {
      setPwError("Fill in all password fields.");
      return;
    }
    if (pwForm.newPassword.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }

    setSavingPw(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/auth/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: pwForm.currentPassword,
          newPassword: pwForm.newPassword,
        }),
      });
      if (res.status === 401) {
        // 401 here means wrong current password, not an expired session
        const data = await res.json();
        setPwError(data.message || "Current password is incorrect.");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setPwError(data.message || "Could not change password.");
        return;
      }
      setPwMsg("Password changed successfully.");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwError("Could not reach the server. Is the backend running?");
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="signup-page page-offset-nav">
        <div className="container">
          {loading ? (
            <p className="text-muted">Loading your profile...</p>
          ) : (
            <div className="row g-5">
              <div className="col-12 col-lg-4">
                <p className="signup-eyebrow">Account</p>
                <h1 className="signup-title">Your profile</h1>
                <p className="signup-lead text-muted">
                  Manage your account details and password.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Back to dashboard
                </button>
              </div>

              <div className="col-12 col-lg-8">
                {/* account info + edit */}
                <div className="signup-card">
                  <h2 className="signup-card-title">Account details</h2>
                  <p className="text-muted" style={{ marginBottom: "1.25rem" }}>
                    Email: <strong>{user?.email}</strong> (cannot be changed)
                  </p>

                  {profileError && (
                    <div className="signup-error" style={{ marginBottom: "1rem" }}>
                      {profileError}
                    </div>
                  )}
                  {profileMsg && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        color: "#15803d",
                        fontWeight: 500,
                      }}
                    >
                      {profileMsg}
                    </div>
                  )}

                  <form className="signup-form" onSubmit={submitProfile} noValidate>
                    <div className="signup-field">
                      <label htmlFor="fullName">Full name</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="signup-field">
                      <label htmlFor="mobile">Mobile</label>
                      <div className="signup-mobile-wrap">
                        <span className="signup-mobile-prefix">+91</span>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          maxLength={10}
                          value={profileForm.mobile}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={savingProfile}
                    >
                      {savingProfile ? "Saving..." : "Save changes"}
                    </button>
                  </form>
                </div>

                {/* change password */}
                <div className="signup-card mt-4">
                  <h2 className="signup-card-title">Change password</h2>

                  {pwError && (
                    <div className="signup-error" style={{ marginBottom: "1rem" }}>
                      {pwError}
                    </div>
                  )}
                  {pwMsg && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        color: "#15803d",
                        fontWeight: 500,
                      }}
                    >
                      {pwMsg}
                    </div>
                  )}

                  <form className="signup-form" onSubmit={submitPassword} noValidate>
                    <div className="signup-field">
                      <label htmlFor="currentPassword">Current password</label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        autoComplete="current-password"
                        value={pwForm.currentPassword}
                        onChange={handlePwChange}
                      />
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="signup-field">
                          <label htmlFor="newPassword">New password</label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Min. 8 characters"
                            value={pwForm.newPassword}
                            onChange={handlePwChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="signup-field">
                          <label htmlFor="confirmPassword">
                            Confirm new password
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={pwForm.confirmPassword}
                            onChange={handlePwChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={savingPw}
                    >
                      {savingPw ? "Changing..." : "Change password"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;