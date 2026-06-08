import React from 'react';
import Hero from './Hero';
import RaiseTicket from './RaiseTicket';
import Navbar from '../Navbar';
import Footer from '../Footer';

function SupportPage() {
    return ( 
        <>
            <Navbar />
            <Hero />
            <RaiseTicket />
            <Footer />
        </>
     );
}

export default SupportPage;