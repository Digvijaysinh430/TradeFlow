import React from "react";
import { Link } from "react-router-dom";

function RightSection() {
  return (
    <section className="container section-padding pt-0">
      <div className="row align-items-center g-5 feature-row">
        <div className="col-12 col-md-6">
          <h2 className="fs-2 fw-bold mb-3">TradeFlow Mobile</h2>
          <p className="text-muted mb-4">
            Trade on the go with the same portfolio, orders, and alerts synced
            instantly from your desktop. Biometric login keeps your account secure.
          </p>
          <ul className="list-unstyled feature-list">
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              Instant order updates
            </li>
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              SIPs &amp; mutual funds
            </li>
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              Price alerts &amp; notifications
            </li>
          </ul>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <img
              src="/media/images/googlePlayBadge.svg"
              alt="Get it on Google Play"
              height="40"
            />
            <img
              src="/media/images/appstoreBadge.svg"
              alt="Download on the App Store"
              height="40"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 text-center">
          <img
            src="/media/images/education.svg"
            alt="TradeFlow mobile app"
            className="img-fluid feature-img"
          />
        </div>
      </div>

      <div className="row align-items-center g-5 feature-row mt-2">
        <div className="col-12 col-md-6 order-md-1 text-center">
          <img
            src="/media/images/sensibullLogo.svg"
            alt="Options analytics"
            className="img-fluid feature-img"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <div className="col-12 col-md-6 order-md-2">
          <h2 className="fs-2 fw-bold mb-3">Options &amp; analytics</h2>
          <p className="text-muted mb-4">
            Strategy builders, payoff diagrams, and risk metrics for F&amp;O
            traders — integrated directly into your workflow.
          </p>
          <Link to="/signup" className="custom-link d-inline-flex">
            Start trading F&amp;O <i className="fa fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RightSection;
