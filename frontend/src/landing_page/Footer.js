import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer bg-light-custom mt-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <img
              src="/media/images/logo.svg"
              alt="TradeFlow"
              className="site-logo site-logo--footer mb-3"
              width="140"
              height="33"
            />
            <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>
              © 2026, TradeFlow.<br />
              A personal project.
            </p>
            <div className="footer-socials">
              <a
                href="https://github.com/Digvijaysinh430/TradeFlow"
                className="footer-social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                className="footer-social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/"
                className="footer-social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4 className="footer-heading">Company</h4>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/pricing" className="footer-link">Pricing</Link>
          </div>

          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4 className="footer-heading">Support</h4>
            <Link to="/support" className="footer-link">Support portal</Link>
            <Link to="/pricing" className="footer-link">List of charges</Link>
          </div>

          <div className="col-12 col-md-3">
            <h4 className="footer-heading">Account</h4>
            <Link to="/signup" className="footer-link">Open an account</Link>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            TradeFlow is a personal portfolio project built for educational
            and demonstration purposes only. It is not a real brokerage,
            does not handle real money, and does not facilitate the buying
            or selling of actual securities.
          </p>
          <p>
            TradeFlow is not affiliated with, endorsed by, or registered
            with any stock exchange, depository, or regulatory authority.
            All trading features are simulated using virtual funds.
          </p>
          <p>
            Any company names, logos, or layouts referenced are used solely
            for design inspiration and learning, and do not represent a real
            financial service.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
