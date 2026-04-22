import React from 'react';

function Education() {
    return (  
       <div className="container section-padding">
            <div className='row align-items-center'>
                <div className='col-12 col-md-6 mb-5 mb-md-0 text-center text-md-start'>
                    <img 
                        src="/media/images/education_graphic.png" 
                        alt="TradeFlow Academy" 
                        className='img-fluid' 
                        style={{ maxWidth: "75%" }} 
                    />
                </div>
                
                <div className='col-12 col-md-6'>
                    <h1 className='mb-4 fs-2 fw-bold'>Master the markets with TradeFlow Academy</h1>
                    
                    <div className='mb-5'>
                        <p className='text-muted mb-3'>
                            From basics like "What is a stock?" to advanced algorithmic trading strategies, TradeFlow Academy provides completely free, high-quality financial education.
                        </p>
                        <a href='/academy' className='custom-link'>
                            TradeFlow Academy <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>

                    <div>
                        <p className='text-muted mb-3'>
                            Join the TradeFlow Community to discuss market trends, share strategies, and get your questions answered by thousands of active traders.
                        </p>
                        <a href='/community' className='custom-link'>
                            TradeFlow Community <i className="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education;