import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FlightNFTContext } from '../../../Context/FlightNFTContext';

const NavbarHeader = () => {
    const { openLoginModal } = useContext(FlightNFTContext);


    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <Nav>
                        <Nav.Link href="#" as={NavLink} to="/" className="fw-bold text-danger" style={{ color: "#fff " }}>
                            FLIGHT NFT
                        </Nav.Link>
                    </Nav>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/about-us" className='mx-2'>ABOUT US</Nav.Link>
                        <Nav.Link as={NavLink} to="/how-it-works" className='mx-2'>HOW IT WORKS?</Nav.Link>
                        <Nav.Link as={NavLink} to="/pricing" className='mx-2'>PRICING</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" className='mx-2'>CONTACT</Nav.Link>
                        <Nav.Link href="#login" className='ms-2 pe-0' onClick={openLoginModal}>
                            Login With Wallet <div className='bg-danger px-3 py-2 text-white d-inline-block rounded'><i className="fa-solid fa-wallet"></i></div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarHeader;