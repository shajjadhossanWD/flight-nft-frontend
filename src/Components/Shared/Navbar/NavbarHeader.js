import React, { useContext, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { FlightNFTContext } from '../../../Context/FlightNFTContext';
import WalletModal from '../WalletModal';

const NavbarHeader = () => {
    const { user1, logOut} = useContext(FlightNFTContext);
    const Logout = () => {
        logOut();
        swal({
            // title: "S",
            text: "You have successfully logged out.",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
        });
    }
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Navbar variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="#home">
                    <Nav>
                        <Nav.Link href="#" as={NavLink} to="/" className="fw-bold text-danger fs-3" style={{ color: "#fff " }}>
                           <img className='logo ' src="https://i.ibb.co/pj6JDSs/flightnftlogoo.jpg" alt="logo" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/about-us" href='#about' className='mx-2 navitem'>ABOUT US</Nav.Link>
                        <Nav.Link as={NavLink} to="/how-it-works" href='#works' className='mx-2 navitem'>HOW IT WORKS?</Nav.Link>
                        <Nav.Link as={NavLink} to="/pricing" href='#pricing' className='mx-2 navitem'>PRICING</Nav.Link>
                        <Nav.Link as={NavLink} to="/ideas" href='#ideas' className='mx-2 navitem'>IDEAS</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" href='#contact' className='mx-2 navitem'>CONTACT</Nav.Link>
                        { (!user1.walletAddress || user1.walletAddress === "undefined") ?
                        <Nav.Link href="#login" className='ms-2 navitem pe-0' onClick={handleClickOpen}>
                           <span className='pclogin me-3'>Login With Wallet</span>  
                           <div className='bg-danger px-3 py-2 text-white d-inline-block rounded'><i className="fa-solid fa-wallet"></i></div>
                           <span className='mobilelogin'>Login With Wallet</span>
                        </Nav.Link>
                         :
                         <Nav.Link as={NavLink} to="/profile" className='mx-2 navitem'>PROFILE</Nav.Link>

                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {(!user1.walletAddress || user1.walletAddress === "undefined") &&

      <WalletModal
          open={open}
          handleClose={handleClose}
      >
      </WalletModal>}
        </div>
    );
}

export default NavbarHeader;