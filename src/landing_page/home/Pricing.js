import React from 'react';

function Pricing() {
    return (  
        <div className="container ">
            <div className='row'>
                <div className='col-4'>
                    <h1 className='mb-3 fs-2'>Unbeatable Pricing</h1>
                    <p className='mb-4'>Experience the best value for your money with our competitive pricing plans. We offer flexible options to suit your needs, ensuring you get the most out of our services without breaking the bank.</p>
                    <a href=''  style={{textDecoration:"none"}}>See Pricing</a>
                </div>
                <div className='col-2'></div>
                <div className='col-6 mb-5'>
                    <div className='row text-center'>
                        <div className='col p-3 border '>
                            <h1 className='mb-3'> ₹0</h1>
                            <p> Free equity delivery and <br/>direct mutual funds  </p>
                        </div>
                        <div className='col p-3 border '>
                            <h1 className='mb-3'> ₹20</h1>
                            <p> Intra-day and F&O </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;