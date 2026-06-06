import React from "react";
import { Link } from "react-router-dom";

function LeftSection() {
  return (
    <section className="container section-padding">
      <div className="row align-items-center g-5 feature-row">
        <div className="col-12 col-md-6 order-md-1 text-center">
          <img
            src="/media/images/intradayTrades.svg"
            alt="TradeFlow terminal"
            className="img-fluid feature-img"
          />
        </div>
        <div className="col-12 col-md-6 order-md-2">
          <h2 className="fs-2 fw-bold mb-3">TradeFlow Terminal</h2>
          <p className="text-muted mb-4">
            A blazing-fast web platform for charts, watchlists, and order
            execution. Built for traders who need depth, speed, and zero clutter.
          </p>
          <ul className="list-unstyled feature-list">
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              Advanced charting &amp; indicators
            </li>
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              Basket orders &amp; GTT
            </li>
            <li>
              <i className="fa fa-check-circle text-primary me-2" />
              Real-time market depth
            </li>
          </ul>
          <Link to="/pricing" className="custom-link mt-3 d-inline-flex">
            View pricing <i className="fa fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;
