import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`tradeflow-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="/media/images/tradeflow_logo_light.png" alt="TradeFlow Logo" />
        </a>
        
        <div className="navbar-links">
          <a href="/signup" className="nav-link">Signup</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/products" className="nav-link">Products</a>
          <a href="/pricing" className="nav-link">Pricing</a>
          <a href="/support" className="nav-link">Support</a>
        </div>

        <div className="navbar-actions">
           <button className="btn-login">Log In</button>
           <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;