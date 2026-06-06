import React from "react";

const PRODUCTS = [
  {
    title: "Equities",
    desc: "NSE & BSE stocks with seamless delivery and intraday.",
    icon: "fa-line-chart",
  },
  {
    title: "F&O",
    desc: "Index and stock derivatives with advanced order types.",
    icon: "fa-exchange",
  },
  {
    title: "Mutual funds",
    desc: "Direct plans, zero commission, easy SIP setup.",
    icon: "fa-pie-chart",
  },
  {
    title: "APIs",
    desc: "Build algos and automations with REST & WebSocket APIs.",
    icon: "fa-code",
  },
  {
    title: "Academy",
    desc: "Free courses from market basics to advanced strategies.",
    icon: "fa-graduation-cap",
  },
  {
    title: "Community",
    desc: "Discuss ideas and learn from active traders.",
    icon: "fa-users",
  },
];

function Universe() {
  return (
    <section className="bg-light-custom section-padding">
      <div className="container">
        <h2 className="fs-2 fw-bold text-center mb-2">The TradeFlow universe</h2>
        <p className="text-muted text-center mb-5 mx-auto" style={{ maxWidth: "560px" }}>
          One account. Every product. Designed to work together.
        </p>
        <div className="row g-4">
          {PRODUCTS.map(({ title, desc, icon }) => (
            <div key={title} className="col-12 col-md-6 col-lg-4">
              <div className="universe-card h-100">
                <i className={`fa ${icon} universe-icon`} aria-hidden="true" />
                <h3>{title}</h3>
                <p className="text-muted mb-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Universe;
