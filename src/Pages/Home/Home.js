import { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const indianAirports = [
    "Indira Gandhi International Airport",
    "Chhatrapati Shivaji Maharaj International Airport",
    "Kempegowda International Airport",
    "Rajiv Gandhi International Airport",
    "Netaji Subhas Chandra Bose International Airport",
    "Chennai International Airport",
    "Sardar Vallabhbhai Patel International Airport",
    "Dabolim Goa International Airport",
    "Cochin International Airport",
    "Pune Airport",
    "Chaudhary Charan Singh International Airport",
    "Sheikh ul-Alam International Airport",
    "Lokpriya Gopinath Bordoloi International Airport",
    "Jay Prakash Narayan Airport",
    "Jaipur International Airport",
    "Chandigarh International Airport",
    "Biju Patnaik International Airport",
    "Bagdogra International Airport",
    "Birsa Munda Airport",
    "Lal Bahadur Shastri International Airport",
    "Trivandrum International Airport",
    "Calicut International Airport",
    "Devi Ahilyabai Holkar International Airport",
    "Visakhapatnam International Airport",
    "Dr. Babasaheb Ambedkar International Airport",
    "Swami Vivekananda Airport",
    "Sri Guru Ram Dass Jee International Airport",
    "Coimbatore International Airport",
    "Jammu Airport",
    "Leh Kushok Bakula Rimpochee Airport",
    "Surat Airport",
    "Udaipur Airport",
    "Jolly Grant Airport",
    "Maharaja Bir Bikram Airport",
    "Imphal Airport"
]

const DepartureAirportList = ["Singapore", ...indianAirports];

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [DepartureAirport, setDepartureAirport] = useState(DepartureAirportList[0]);
    const [ArrivalAirportList, setArrivalAirportList] = useState([...indianAirports]);
    const [ArrivalAirport, setArrivalAirport] = useState(ArrivalAirportList[0]);
    const navigate = useNavigate();

    const handleDepartureAirport = (e) => {
        setDepartureAirport(e.target.value);
        if (e.target.value === "Singapore") {
            setArrivalAirportList(indianAirports)
        }
        if (e.target.value !== "Singapore") {
            setArrivalAirportList(["Singapore"])
        }
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleOpenModal();
    }

    const searchData = () => {
        navigate(`/search?DepartureAirport=${DepartureAirport}&&ArrivalAirport=${ArrivalAirport}`);
    }
    return (
        <div className='banner'>
            <Container className="py-5 mb-5">
                <Row className="align-items-center">
                    <Col md={4} className="text-center">
                        <h1 className="text-danger pb-2">FLY IN PRIVATE <br /> JET NFT</h1>
                        <p className="text-info text-white py-2">Get your NFTs now.This NFT is your flight ticket. </p>
                        <Link to="/how-it-works" className=' banner-button text-decoration-none' underline="none">LEARN MORE</Link>
                        <form className='mt-4' onSubmit={handleSubmit}>
                            <p htmlFor='title' className="text-start text-white mb-0">Departure Airport</p>
                            <select className='form-control mb-3' name="DepartureAirport" id="DepartureAirport" value={DepartureAirport} onChange={handleDepartureAirport} required>
                                {
                                    DepartureAirportList.map(airport => <option value={airport}>{airport}</option>)
                                }
                            </select>
                            <p htmlFor="industry" className="text-start text-white mb-0">Arrival Airport</p>
                            <select className='form-control mb-3' name="ArrivalAirport" id="ArrivalAirport" value={ArrivalAirport} onChange={e => setArrivalAirport(e.target.value)} required>
                                {
                                    ArrivalAirportList.map((airport) => <option value={airport}>{airport}</option>)
                                }

                            </select>
                            <button className='banner-button2 text-decoration-none mb-4' type="submit">Buy</button>
                        </form>
                    </Col>
                    <Col md={8}>
                        <div className="">
                            <video src="/banner-bg-2.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </Col>
                </Row>

                {/* get nft section */}
                <div className="deep-bg d-flex justify-content-center">
                    <div className="row g-0 text-white d-flex align-items-center justify-content-center">
                        <div className="col-md-4 ">
                            <div className="priceHeading">
                                <h1 className="home_flight_heading">
                                    LIFE IS <br />
                                    SHORT, FLY <br />
                                    PRIVATE <br />
                                    NOW!
                                </h1>
                            </div>
                        </div>
                        <div className="col-md-8   ">
                            <div className="pricing-content">
                                <div className="pricing-list">
                                    <p className="top-border">Get your NFTs now. The NFTs can be used
                                        for trips to 30 airports in India for the first
                                        release. </p>
                                    <p className="top-border">More airports and countries will be
                                        launched soon. </p>
                                    <p className="top-border dif-color">This NFT is your flight ticket.</p>
                                    <p className="top-border">It will have a serial number which can be
entered to book your ticket.</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Row className="align-items-center my-5">
                    <Col md={7} className="text-center mb-4">
                        <div className="pricing-image-home w-100">
                            <img className="img-fluid" src="https://i.ibb.co/DKdNrn9/09.jpg" alt="Pricing" />
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="flight_content">
                            <h1 className='text-white'>What is the average cost for 1 person in other <br /> Private Jets?</h1>
                            <br />
                            <p className='text-white'><b>SGD 11,000.00</b></p>
                            <p className='text-white'>You need to share with another 9 passengers.</p>
                        </div>
                    </Col>
                </Row>

            </Container>

            <Modal show={openModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{DepartureAirport} to {ArrivalAirport}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Have you selected the airports correctly?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="primary" onClick={searchData}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;