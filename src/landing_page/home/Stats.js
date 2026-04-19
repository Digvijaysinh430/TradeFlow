import React from 'react';

function Stats() {
    return (  
        <div className='container p-3'>
            <div className='row p-5'>
                <div className='col-6 p-5'>
                    <h1 className='fs-2 mb-5'>Trust with confidence</h1>
                    <h2 className='fs-4'> Customer-first always</h2>
                    <p className='text-muted'>Experience the difference that comes with choosing a customer-first approach.</p>

                    <h2 className='fs-4'> No spams or gimmicks</h2>
                    <p className='text-muted'> No gimmicks , spams,gammification or annoying push notifications  </p>

                    <h2 className='fs-4'> Tradeflow universe</h2>
                    <p className='text-muted'>Not just an app, but a complete ecosystem for traders.</p>

                     <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>With our advanced tools and insights, make smarter financial decisions.</p>
                </div>
                <div className='col-6 p-5'>
                    <img src='media/images/ecosystem.png' alt='Ecosystem' style={{width:"75%"}} />
                    <div className='text-center p-5'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our ecosystem</a>
                        <a href=''  style={{textDecoration:"none"}}>Learn more</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;