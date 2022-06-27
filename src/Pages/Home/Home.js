import React, { useState, useContext } from 'react';
import { Container, Row, Col, Modal, Button, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import WalletModal from '../../Components/WalletModal';
import { FlightNFTContext } from '../../Context/FlightNFTContext';

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [industry, setIndustry] = useState("Bollywood");
    const navigate = useNavigate();
    const { openLoginModal } = useContext(FlightNFTContext);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleOpenModal();
    }

    const searchData = () => {
        navigate(`/search?title=${title}&&industry=${industry}`);
    }
    return (
        <div className='banner'>
            <Navbar bg="none" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <Nav>
                            <Nav.Link href="#" as={NavLink} to="/" className="fw-bold" style={{ color: "#2a569c" }}>
                                FLIGHT NFT
                            </Nav.Link>
                        </Nav>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link href="#about" as={NavLink} to="/" className='mx-2'>ABOUT US</Nav.Link>
                            <Nav.Link href="#how-it-works" as={NavLink} to="/" className='mx-2'>HOW IT WORKS?</Nav.Link>
                            <Nav.Link href="#marketplace" as={NavLink} to="/" className='mx-2'>MARKETPLACE</Nav.Link>
                            <Nav.Link href="#contact" as={NavLink} to="/" className='mx-2'>CONTACT</Nav.Link>
                            <Nav.Link href="#login" className='ms-2 pe-0' onClick={openLoginModal}>
                                Login With Wallet <div className='bg-primary px-3 py-2 text-white d-inline-block rounded'><i className="fa-solid fa-wallet"></i></div>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={4} className="text-center">
                        <h1 className="text-primary">FLY IN PRIVATE JET NFT</h1>
                        <p className="text-info">Get your NFTs now.This NFT is your flight ticket. </p>
                        <Link to="/how-it-works" className='btn btn-primary banner-button' underline="none">LEARN MORE</Link>
                        <form className='mt-4' onSubmit={handleSubmit}>
                            <p htmlFor='title' className="text-start mb-0">Title</p>
                            <input type="text" className='form-control mb-3' name="title" id="title" placeholder='Enter your preferred title' value={title} onChange={e => setTitle(e.target.value)} required />
                            <p htmlFor="industry" className="text-start mb-0">Select Airport</p>
                            <select className='form-control mb-3' name="industry" id="industry" value={industry} onChange={e => setIndustry(e.target.value)} required>

                            </select>
                            <button className='btn btn-danger' type="submit">Search</button>
                        </form>
                    </Col>
                    <Col md={8}>
                        <div className="">
                            <video src="/video-of-aircraft.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={openModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Have you selected the industry correctly.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={searchData}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <WalletModal />
        </div>
    );
};

export default Home;