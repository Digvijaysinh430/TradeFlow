import React from "react";
import PageHero from "../common/PageHero";

function Hero() {
  return (
    <PageHero
      eyebrow="Pricing"
      title="Simple, honest pricing"
      subtitle="No hidden fees. No surprises. Pay only for what you use."
      ctaLabel="Open free account"
      ctaTo="/signup"
    />
  );
}

export default Hero;
