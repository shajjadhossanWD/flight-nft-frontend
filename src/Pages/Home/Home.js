import { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [flightData, setFlightData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString())

    useEffect(() => {
        axios.get("/FakeFlightData.json")
            .then(res => {
                setFlightData(res.data);
                setFilterData(res.data.slice(0, 3))
            });
    }, [])

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

    const filterDate = (e) => {
        const date = new Date(e.target.value).toLocaleDateString();
        const newArr = flightData.filter(flight => flight.departureDate === date);
        setSelectDate(date);
        setFilterData(newArr);
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
        <>
            <div className='banner'>
                <Container className="pb-5 pt-3">
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className="">
                                <h6 className='text-white text-center'>First Phase: 0 of 10000 sold</h6>
                                <video src="/banner-bg-2.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                            </div>
                        </Col>

                        <Col md={4} className="text-center">
                            <div className='banner-content-wrapper'>
                                <h1 className="text-danger pt-3">FLIGHT NFT</h1>
                                <p className="text-info text-white py-2">Fly in Private. {""}  Get your NFTs now. <br /> This NFT is your flight ticket for private flying. </p>
                                <Link to="/how-it-works" className=' banner-button text-decoration-none' underline="none">LEARN MORE</Link>
                                <form className='mt-4' onSubmit={handleSubmit}>
                                    <p htmlFor='title' className="text-start text-white mb-0">Departure Airport</p>
                                    <select className='form-select mb-3' name="DepartureAirport" id="DepartureAirport" value={DepartureAirport} onChange={handleDepartureAirport} required>
                                        {
                                            DepartureAirportList.map(airport => <option value={airport}>{airport}</option>)
                                        }
                                    </select>
                                    <p htmlFor="industry" className="text-start text-white mb-0">Arrival Airport</p>
                                    <select className='form-select mb-3' name="ArrivalAirport" id="ArrivalAirport" value={ArrivalAirport} onChange={e => setArrivalAirport(e.target.value)} required>
                                        {
                                            ArrivalAirportList.map((airport) => <option value={airport}>{airport}</option>)
                                        }

                                    </select>
                                    <button className='banner-button2 text-decoration-none mb-4' type="submit">Buy</button>
                                </form>
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

                            <div className="col-md-8">
                                <div className="pricing-content">
                                    <div className="pricing-list">
                                        <p className="top-border">Get your NFTs now.The NFTs can be used
                                            for trips to 30 airports in India for the first
                                            phase. </p>
                                        <p className="top-border">More airports and countries will be
                                            launched soon. </p>
                                        <p className="top-border dif-color">This NFT is your flight ticket.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Row className="align-items-center mt-4 mb-0">
                        <Col md={7} className="mb-4">
                            <input type="date" name="date" className="mb-2" onChange={filterDate} />
                            <div className="pricing-image-home w-100 bg-white">
                                <Row>
                                    <Col>
                                        <h5 className="text-start px-3 py-2">SIN{'>'}IND &nbsp;&nbsp;&nbsp; {selectDate} </h5>
                                    </Col>
                                </Row>
                                {
                                    filterData.length ?
                                        filterData.map((flight, index) =>
                                            <Row key={index} className="border border-1 border-bottom-0 border-start-0 border-end-0 mx-0">
                                                <Col sm={4} className="">
                                                    <img src={flight?.image} alt="" className="w-100 h-100 p-3" />
                                                </Col>
                                                <Col sm={8} className="py-3 text-start">
                                                    <h5>{flight?.aircraftName}</h5>
                                                    <p>Estimate USD {flight?.cost}</p>
                                                    <div>
                                                        <span><i class="fa-solid fa-user"></i> {flight?.aircraftSpecifications?.seats}</span>
                                                        <span className="ms-4"><i class="fa-solid fa-clock"></i> {flight?.departureTime}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                        :
                                        <h4 className='text-center py-2 border border-1 border-bottom-0 border-start-0 border-end-0'>No Flight Founds</h4>
                                }
                                {/* <img className="img-fluid" src="https://i.ibb.co/DKdNrn9/09.jpg" alt="Pricing" /> */}
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="flight_content">
                                <h1 className='text-white'>What is the average cost for one person in other Private Jets?</h1>
                                <br />
                                <p className='text-white'><b>SGD 11,000.00 (626,134.04 Indian Rupees)</b></p>
                                <p className='text-white'>You need to share with another 9 passengers.</p>
                            </div>
                        </Col>
                    </Row>

                </Container>

                <Modal show={openModal} onHide={handleCloseModal} centered closeButton>
                    <div className="bg-dark text-white">
                        <Modal.Header >
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
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Home;