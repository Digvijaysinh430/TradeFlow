import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return (
        <div className='container text-center section-padding mb-5'>
            <h1 className='display-5 fw-bold mb-4'>Open a TradeFlow account</h1>
            <p className='text-muted fs-5 mb-5 mx-auto' style={{ maxWidth: '600px' }}>
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
            </p>
            <Link to='/signup' className='btn btn-primary btn-lg px-5 py-3 fs-5'>
                Sign up now
            </Link>
        </div>
    );
}

export default OpenAccount;