import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavbarHeader from './Navbar/NavbarHeader';
import WalletModal from './WalletModal';

const PublicLayout = () => {
    return (
        <div>
            <NavbarHeader />
            <Outlet />
            <WalletModal />
            <Footer />
        </div>
    );
};

export default PublicLayout;