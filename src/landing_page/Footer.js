import React from 'react';

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
                            © 2026, TradeFlow Broking Ltd.<br/>
                            All rights reserved.
                        </p>
                        <div className="footer-socials">
                            <a href="/" className="footer-social-icon"><i className="fa fa-twitter"></i></a>
                            <a href="/" className="footer-social-icon"><i className="fa fa-facebook-square"></i></a>
                            <a href="/" className="footer-social-icon"><i className="fa fa-instagram"></i></a>
                            <a href="/" className="footer-social-icon"><i className="fa fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <h4 className="footer-heading">Company</h4>
                        <a href="/about" className="footer-link">About</a>
                        <a href="/products" className="footer-link">Products</a>
                        <a href="/pricing" className="footer-link">Pricing</a>
                        <a href="/referral" className="footer-link">Referral programme</a>
                        <a href="/careers" className="footer-link">Careers</a>
                        <a href="/press" className="footer-link">Press & media</a>
                    </div>

                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <h4 className="footer-heading">Support</h4>
                        <a href="/contact" className="footer-link">Contact</a>
                        <a href="/support" className="footer-link">Support portal</a>
                        <a href="/z-connect" className="footer-link">Z-Connect blog</a>
                        <a href="/charges" className="footer-link">List of charges</a>
                        <a href="/downloads" className="footer-link">Downloads & resources</a>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="footer-heading">Account</h4>
                        <a href="/open-account" className="footer-link">Open an account</a>
                        <a href="/fund-transfer" className="footer-link">Fund transfer</a>
                        <a href="/challenge" className="footer-link">60 day challenge</a>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    <p>
                        TradeFlow Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through TradeFlow Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through TradeFlow Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: TradeFlow Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
                    </p>
                    <p>
                        Investments in securities market are subject to market risks; read all the related documents carefully before investing.
                    </p>
                    <p>
                        "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;