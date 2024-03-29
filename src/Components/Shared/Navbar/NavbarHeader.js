import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { FlightNFTContext } from '../../../Context/FlightNFTContext';

const NavbarHeader = () => {
    const { user, logOut, openWalletModal } = useContext(FlightNFTContext);
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

    return (
        <div>
            <Navbar variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="#home">
                        <Nav>
                            <Nav.Link href="#" as={NavLink} to="/" className="fw-bold text-danger fs-3 logoLink" style={{ color: "#fff" }}>

                                <img className='logo ' src="https://i.ibb.co/sFRh0Rk/logo-e.jpg" alt="logo" />

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
                            {(!user.walletAddress || user.walletAddress === "undefined") ?
                                <Nav.Link href="#login" className='ms-2 navitem pe-0' onClick={openWalletModal}>
                                    <span className='pclogin me-3'>Login With Wallet</span>
                                    <div className='bg-danger px-3 py-2 text-white d-inline-block rounded nav-model'><i className="fa-solid fa-wallet"></i></div>
                                    <span className='mobilelogin'>Login With Wallet</span>
                                </Nav.Link>
                                :
                                <Nav.Link as={NavLink} to="/profile" className='banner-button2 mx-2 navitem'>PROFILE</Nav.Link>

                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarHeader;