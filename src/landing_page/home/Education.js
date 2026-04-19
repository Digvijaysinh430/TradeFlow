import React from 'react';


function Education() {
    return (  
       <div className="container mt-5">
            <div className='row'>
                <div className='col-6'>
                    <img src = "media/images/education.svg" alt="Education"  style={{width : "70%"}}/>
                </div>
                <div className='col-6'>
                    <h1 className='mb-3 fs-2'>Free and open market education</h1>
                    <p className='mb-4'>Expand your knowledge with our comprehensive educational resources, designed to empower you with the skills and insights needed to navigate the markets with confidence.</p>
                    <a href=''  style={{textDecoration:"none"}}> Education</a>

                    <p className='mt-5'>TradingQ&A , the most active trading and investment community in india for all market related queries.</p>
                    <a href=''  style={{textDecoration:"none"}}> TradingQ&A</a>
                </div>
                
            </div>
        </div>
    );
}

export default Education;