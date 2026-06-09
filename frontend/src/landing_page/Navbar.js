import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "/signup", label: "Signup" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/pricing", label: "Pricing" },
  { to: "/support", label: "Support" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header>
      <nav
        className={`tradeflow-navbar ${scrolled ? "scrolled" : ""} ${
          menuOpen ? "menu-open" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          <Link
            to="/"
            className="navbar-logo"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/media/images/logo.svg"
              alt="TradeFlow"
              className="site-logo site-logo--nav"
              width="148"
              height="36"
            />
          </Link>

          <div className="navbar-center">
            <div className="navbar-links">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link ${isActive(to) ? "active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="navbar-actions">
            <Link to="/login" className="btn-login">
              Log In
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            className="navbar-toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
        </div>

        <div
          className={`navbar-mobile-panel ${menuOpen ? "open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className="navbar-mobile-links">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive(to) ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="navbar-mobile-actions">
            <Link to="/login" className="btn-login">
              Log In
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
