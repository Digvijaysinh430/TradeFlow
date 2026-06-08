import React from "react";
import PageHero from "../common/PageHero";

function Hero() {
  return (
    <PageHero
      eyebrow="Products"
      title="Everything you need to trade and invest"
      subtitle="Stocks, derivatives, mutual funds, and powerful tools — unified across web, mobile, and APIs."
      ctaLabel="Open account"
      ctaTo="/signup"
    />
  );
}

export default Hero;
