import React from "react";
import { Link } from "react-router-dom";

const STATS = [
  { value: "5M+", label: "Active investors" },
  { value: "₹0", label: "Delivery brokerage" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "24/7", label: "Support availability" },
];

const TEAM = [
  { name: "Aanya Sharma", role: "CEO & Co-founder", initials: "AS" },
  { name: "Rohan Mehta", role: "CTO", initials: "RM" },
  { name: "Priya Nair", role: "Head of Product", initials: "PN" },
  { name: "Vikram Singh", role: "Head of Operations", initials: "VS" },
];

function Team() {
  return (
    <>
      <section className="container section-padding pt-0">
        <div className="row g-4 text-center about-stats">
          {STATS.map(({ value, label }) => (
            <div key={label} className="col-6 col-md-3">
              <div className="about-stat-card">
                <h3>{value}</h3>
                <p className="text-muted mb-0">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding bg-light-custom rounded-3 mb-5">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <h2 className="fs-2 fw-bold mb-3">Our mission</h2>
            <p className="text-muted">
              We believe everyone deserves access to fair, fast, and simple
              capital markets. TradeFlow removes friction from investing — from
              your first SIP to your most complex F&amp;O strategy.
            </p>
            <p className="text-muted mb-4">
              We&apos;re a technology-first team obsessed with reliability,
              security, and design that gets out of your way.
            </p>
            <Link to="/signup" className="custom-link">
              Join TradeFlow <i className="fa fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="/media/images/largestBroker.svg"
              alt="TradeFlow growth"
              className="img-fluid"
              style={{ maxWidth: "320px" }}
            />
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <h2 className="fs-2 fw-bold text-center mb-2">Leadership team</h2>
        <p className="text-muted text-center mb-5 mx-auto" style={{ maxWidth: "520px" }}>
          Experienced builders from fintech, exchanges, and consumer technology.
        </p>
        <div className="row g-4 justify-content-center">
          {TEAM.map(({ name, role, initials }) => (
            <div key={name} className="col-6 col-md-4 col-lg-3">
              <div className="team-card text-center">
                <div className="team-avatar">{initials}</div>
                <h3 className="team-name">{name}</h3>
                <p className="text-muted mb-0">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Team;
