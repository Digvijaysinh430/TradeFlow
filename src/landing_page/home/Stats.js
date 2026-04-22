import React from 'react';

function Stats() {
    return (  
        <div className='container section-padding'>
            <div className='row align-items-center'>
                <div className='col-12 col-lg-5 mb-5 mb-lg-0 pe-lg-5'>
                    <h1 className='fs-2 mb-5 fw-bold'>An ecosystem designed for your financial flow.</h1>
                    
                    <div className='mb-4'>
                        <h2 className='fs-4 fw-medium mb-2'>Fort Knox Security</h2>
                        <p className='text-muted'>Military-grade encryption and biometric authentication ensure your portfolio is always safe.</p>
                    </div>

                    <div className='mb-4'>
                        <h2 className='fs-4 fw-medium mb-2'>No-nonsense UI</h2>
                        <p className='text-muted'>We cut the clutter. Execute trades with zero friction on interfaces built for power users but simple enough for beginners.</p>
                    </div>

                    <div className='mb-4'>
                        <h2 className='fs-4 fw-medium mb-2'>The TradeFlow Universe</h2>
                        <p className='text-muted'>Seamlessly sync your data between our mobile app, desktop terminal, and smartwatch dashboard. Your portfolio goes where you go.</p>
                    </div>

                     <div className='mb-4'>
                        <h2 className='fs-4 fw-medium mb-2'>Pro Analytics</h2>
                        <p className='text-muted'>Unlock institutional-level charting, algorithmic backtesting, and AI-driven market sentiment indicators.</p>
                    </div>
                </div>
                
                <div className='col-12 col-lg-7 text-center'>
                    <img src='/media/images/ecosystem_graphic.png' alt='TradeFlow Ecosystem' className='img-fluid mb-4' style={{maxWidth: "90%"}} />
                    <div className='d-flex justify-content-center gap-4 mt-3'>
                        <a href='/products' className='custom-link'>
                            Explore our products <i className="fa fa-arrow-right"></i>
                        </a>
                        <a href='/ecosystem' className='custom-link'>
                            See the ecosystem <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;