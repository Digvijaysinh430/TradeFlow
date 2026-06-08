import React from "react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    image: "/media/images/pricing0.svg",
    title: "Equity delivery",
    price: "₹0",
    detail: "No brokerage on stock delivery trades and direct mutual funds.",
  },
  {
    image: "/media/images/pricingEquity.svg",
    title: "Intraday & F&O",
    price: "₹20",
    detail: "Flat ₹20 per executed order on intraday equity and derivatives.",
  },
  {
    image: "/media/images/pricingMF.svg",
    title: "Mutual funds",
    price: "₹0",
    detail: "Zero commission on direct mutual fund investments via SIP or lump sum.",
  },
];

const CHARGES = [
  { label: "Account opening", value: "Free" },
  { label: "Annual maintenance", value: "₹300 / year" },
  { label: "Equity delivery brokerage", value: "₹0" },
  { label: "Intraday / F&O (per order)", value: "₹20" },
  { label: "DP charges (sell)", value: "₹15.34 + GST" },
];

function Brokerage() {
  return (
    <>
      <section className="container section-padding pt-0">
        <div className="row g-4">
          {PLANS.map(({ image, title, price, detail }) => (
            <div key={title} className="col-12 col-md-4">
              <div className="pricing-plan-card h-100 text-center">
                <img src={image} alt={title} className="pricing-plan-img mb-3" />
                <h3 className="fs-4 fw-bold">{price}</h3>
                <h4 className="fs-6 fw-medium mb-2">{title}</h4>
                <p className="text-muted mb-0">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding pt-0">
        <h2 className="fs-2 fw-bold text-center mb-4">Charges at a glance</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="charges-table">
              {CHARGES.map(({ label, value }) => (
                <div key={label} className="charges-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p className="text-muted text-center mt-4 small">
              Taxes and statutory charges apply as per exchange regulations.
            </p>
            <div className="text-center mt-4">
              <Link to="/signup" className="btn btn-primary btn-lg px-5">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brokerage;
