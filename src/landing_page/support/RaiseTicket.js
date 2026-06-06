import React, { useState } from "react";

const FAQ = [
  {
    q: "How do I reset my password?",
    a: "Use Forgot password on the login screen. You'll receive an OTP on your registered mobile and email.",
  },
  {
    q: "When will my account be activated?",
    a: "After eKYC verification, most accounts are activated within 24 hours on business days.",
  },
  {
    q: "What are TradeFlow's brokerage charges?",
    a: "₹0 on equity delivery and direct mutual funds. ₹20 flat per executed order on intraday and F&O.",
  },
  {
    q: "How do I add funds to my account?",
    a: "Go to Funds → Add money in the app or terminal. UPI and net banking are supported.",
  },
];

const INITIAL = {
  name: "",
  email: "",
  category: "account",
  subject: "",
  message: "",
};

function RaiseTicket() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="container section-padding pt-0">
      <div className="row g-5">
        <div className="col-12 col-lg-5">
          <h2 className="fs-3 fw-bold mb-4">Frequently asked questions</h2>
          <div className="accordion faq-accordion" id="supportFaq">
            {FAQ.map(({ q, a }, i) => (
              <div className="accordion-item" key={q}>
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button ${i === 0 ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq-${i}`}
                    aria-expanded={i === 0}
                    aria-controls={`faq-${i}`}
                  >
                    {q}
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                  data-bs-parent="#supportFaq"
                >
                  <div className="accordion-body text-muted">{a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="signup-card">
            <h2 className="signup-card-title">Raise a ticket</h2>
            <p className="signup-card-subtitle text-muted">
              Describe your issue and we&apos;ll get back to you by email.
            </p>
            {submitted ? (
              <div className="signup-success text-center py-3">
                <div className="signup-success-icon">
                  <i className="fa fa-check" aria-hidden="true" />
                </div>
                <p className="text-muted mb-0">
                  Ticket submitted. We&apos;ll reply to <strong>{form.email}</strong> soon.
                </p>
              </div>
            ) : (
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="signup-field">
                      <label htmlFor="ticketName">Name</label>
                      <input
                        id="ticketName"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="signup-field">
                      <label htmlFor="ticketEmail">Email</label>
                      <input
                        id="ticketEmail"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="signup-field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="signup-select"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="account">Account &amp; KYC</option>
                    <option value="funds">Funds &amp; payouts</option>
                    <option value="trading">Trading &amp; orders</option>
                    <option value="technical">Technical issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="signup-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="signup-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="signup-textarea"
                  />
                </div>
                <button type="submit" className="btn btn-primary signup-submit w-100">
                  Submit ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RaiseTicket;
