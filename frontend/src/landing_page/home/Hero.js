import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container section-padding text-center page-offset-nav'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8'>
                    <img 
                        src='/media/images/hero_graphic.png' 
                        alt='TradeFlow Cross-Platform Trading' 
                        className='img-fluid mb-5'
                        style={{ maxWidth: '80%' }}
                    />
                    <h1 className='display-4 fw-bold mb-3'>The future of trading, flowing seamlessly.</h1>
                    <p className='lead text-muted mb-5'>
                        Experience lightning-fast execution, intuitive design, and deep analytics across all your devices. Welcome to TradeFlow.
                    </p>
                    <Link to='/signup' className='btn btn-primary btn-lg px-5 py-3 fs-5'>
                        Start trading for free
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;