import React from 'react';

function Awards() {
    return (
        <div className='container section-padding'>
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 mb-5 mb-md-0 text-center text-md-start'>
                    <img 
                        src='/media/images/trust_graphic.png' 
                        alt='TradeFlow Trust and Security' 
                        className='img-fluid' 
                        style={{ maxWidth: '85%' }}
                    />
                </div>

                <div className='col-12 col-md-6'>
                    <h1 className='fs-2 mb-3 fw-bold'>Engineered for speed, built for trust</h1>
                    <p className='text-muted mb-4'>
                        TradeFlow is powered by next-generation infrastructure, providing you with institutional-grade security and millisecond execution across all asset classes:
                    </p>
                    <div className='row mb-5'>
                        <div className='col-6'>
                            <ul className='list-unstyled lh-lg'>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> Global Equities</li>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> Advanced Derivatives</li>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> Currencies & Forex</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul className='list-unstyled lh-lg'>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> Fractional Shares</li>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> High-Yield Bonds</li>
                                <li><i className="fa fa-check-circle text-primary me-2"></i> Automated ETFs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Awards;