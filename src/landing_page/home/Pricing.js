import React from 'react';

function Pricing() {
    return (  
        <div className="container section-padding">
            <div className='row align-items-center'>
                <div className='col-12 col-md-5 mb-5 mb-md-0'>
                    <h1 className='mb-3 fs-2 fw-bold'>Unbeatable pricing</h1>
                    <p className='mb-4 text-muted'>
                        We disrupted the industry with transparent, ultra-low pricing. No hidden fees, ever. Experience premium features without the premium price tag.
                    </p>
                    <a href='/pricing' className='custom-link'>
                        See pricing <i className="fa fa-arrow-right"></i>
                    </a>
                </div>
                
                <div className='col-12 col-md-7'>
                    <div className='row g-4 text-center'>
                        <div className='col-6'>
                            <div className='pricing-card h-100'>
                                <h1>₹0</h1>
                                <p className='text-muted mb-0'>Free equity delivery<br/>and direct mutual funds</p>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='pricing-card h-100'>
                                <h1>₹20</h1>
                                <p className='text-muted mb-0'>Intraday and F&O<br/>per executed order</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;