import React from "react";
import { Link } from "react-router-dom";

function PageHero({ eyebrow, title, subtitle, ctaLabel, ctaTo }) {
  return (
    <section className="page-hero page-offset-nav">
      <div className="container text-center">
        {eyebrow && <p className="page-hero-eyebrow">{eyebrow}</p>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle text-muted">{subtitle}</p>}
        {ctaLabel && ctaTo && (
          <Link to={ctaTo} className="btn btn-primary mt-3">
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}

export default PageHero;
