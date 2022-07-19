import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FlightIcon from '@mui/icons-material/Flight';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AutoOpenModal from './modal/AutoOpen.modal';
import ViewDataModal from './modal/ViewData.modal';

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
    "Imphal Airport",
    "Thiruchirapalli Airport"
]

const DepartureAirportList = ["Singapore", ...indianAirports];

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [autoOpen, setAutoOpen] = useState(false);

    const [DepartureAirport, setDepartureAirport] = useState(DepartureAirportList[0]);
    const [ArrivalAirportList, setArrivalAirportList] = useState([...indianAirports]);
    const [ArrivalAirport, setArrivalAirport] = useState(ArrivalAirportList[0]);
    const [flightData, setFlightData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString())
    const [singleData, setSingleData] = useState([]);
    const [openModalFlight, setOpenModalFlight] = useState(false);

    useEffect(() => {

        axios.get("/FakeFlightData.json")
            .then(res => {
                setFlightData(res.data);
                setFilterData(res.data.slice(0, 5))
            });
        //  home auto open model set state
        setAutoOpen(true)
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

    const handelerOnClick = (data) => {
        setSingleData(data)
        setOpenModalFlight(true)
    }
    return (
        <>
            <div className='banner'>
                <Container className="pb-5 pt-3">
                    <Row className="align-items-center">
                        <Col md={8}>
                            <div className='d-grid text-light' style={{ justifyItems: 'center' }}>
                                <img className=' pt-3 pb-2' src="https://i.ibb.co/pj6JDSs/flightnftlogoo.jpg" alt="logo" width="120px" />
                                <h5>First in the World</h5>
                            </div>
                            <div className="d-grid" style={{ justifyItems: 'center' }}>
                                <button className='banner-button2 text-decoration-none mb-4' id="font14" style={{ cursor: "auto" }}>First Phase: <span style={{ color: "aquamarine" }}>0</span> of 10000 sold</button>
                                <video src="/videoHome.mp4" controls style={{ width: "100%", height: "100%" }} />
                            </div>
                        </Col>
                        <Col md={4} className="text-center"
                            data-aos="fade-zoom-in"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-back"
                        >
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
                                    <button className='banner-button2 text-decoration-none mb-4' type="submit">BUY YOUR FLIGHT NFT</button>
                                </form>
                            </div>
                        </Col>

                    </Row>

                    {/* get nft section */}
                    <div className="deep-bg d-flex justify-content-center">
                        <div className="row g-0 text-white d-flex align-items-center justify-content-center">
                            <div className="col-md-4 "
                                data-aos="fade-right"
                                data-aos-duration="3000"

                            >
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
                                    <div className="pricing-list" >
                                        <p className="top-border">Get your NFTs now.The NFTs can be used
                                            for trips to popular airports in India for the first
                                            phase. </p>
                                        <p className="top-border">More airports and countries will be
                                            launched soon. </p>
                                        <p className="top-border dif-color" style={{ color: 'turquoise' }}>This NFT is your flight ticket.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Row className="align-items-center mt-4 mb-0">
                        <Col md={7} className="mb-4">
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 col-lg-8 mb-3' >
                                    <h5 className='text-danger fw-bold mb-1 pb-2'>Other Private Flights </h5>
                                    <div className='text-white d-flex mb-1' style={{ alignItems: 'center' }}>
                                        <FlightIcon className='flyIcon' />
                                        Singapore to India
                                    </div>
                                    <div className='d-flex text-white' style={{ alignItems: 'center' }}>
                                        <FlightIcon className='flyIcon' />
                                        India to Singapore
                                    </div>
                                </div>
                                <div className='col-sm-12  col-md-12 col-lg-4 flex mb-3' >
                                    {/* <input type="date" className="mb-2 dateInput" id="date" name="trip-start" value="2018. 07. 22"  onChange={filterDate} /> */}
                                </div>
                            </div>
                            <div className="pricing-image-home w-100 bg-white">

                                {
                                    filterData.length ?
                                        filterData.map((flight, index) =>
                                            <Row key={index} className="border border-1 border-bottom-0 border-start-0 border-end-0 mx-0">
                                                <Col sm={4} className="">
                                                    <Link to='#'>
                                                        <img src={flight?.image} alt="" className="p-2" style={{ width: "100%", height: "100%" }} />
                                                    </Link>
                                                </Col>
                                                <Col sm={8} className="text-start alainICenter d-grid">
                                                    <div className='row' style={{ alignItems: 'center', color: "#303030" }}>
                                                        <div className='col-9'>
                                                            <h5 className='margin0'>{flight?.aircraftName}</h5>
                                                            <p className='margin0 pb-2'>Estimate SGD {flight?.cost}</p>
                                                            <span><i className="fa-solid fa-user" style={{ color: "cadetblue" }}></i> {flight?.aircraftSpecifications?.seats}</span>
                                                        </div>
                                                        <div className='col-3 buttonArr' >
                                                            <Button variant="text" className='buttonArr' onClick={() => handelerOnClick(flight)}><ArrowForwardIosIcon className='iconsArr' /></Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                        :
                                        <h4 className='text-center py-2 border border-1 border-bottom-0 border-start-0 border-end-0'>No Flight Founds</h4>
                                }
                                {/* <img className="img-fluid" src="https://i.ibb.co/DKdNrn9/09.jpg" alt="Pricing" /> */}
                            </div>
                            <AutoOpenModal autoOpen={autoOpen} setAutoOpen={setAutoOpen} />
                            <ViewDataModal open={openModalFlight} setOpenModal={setOpenModalFlight} singleData={singleData} />
                        </Col>
                        <Col md={5}
                            data-aos="fade-up"
                            data-aos-duration="3000">
                            <div className="flight_content">
                                <h3 className='text-white averageText'>What is the average cost for one person in other Private Jets?</h3>
                                <br />
                                <p className='text-white'><b>SGD 11,000.00 (626,134.04 Indian Rupees)</b></p>
                                <p className='text-white'>You need to share with another 9 passengers.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Box className="d-flex" style={{ justifyContent: 'center' }}>
                            <h5 className='mt-3 mb-3 text-white text15' style={{ fontFamily: "system-ui" }}> <Link className='text-danger' to="/" style={{ textDecoration: 'revert' }}> Flightnft.net</Link>  is provided by DS Legends Pte Ltd.</h5>
                        </Box>
                        <img src="https://i.ibb.co/G0bxDBj/Whats-App-Image-2022-07-06-at-9-23-46-PM.jpg" alt="" className="p-2" style={{ width: "100%", height: "70%" }} />
                    </Row>
                </Container>

                <Modal show={openModal} onHide={handleCloseModal} centered closeButton>
                    <div className="bg-dark text-white">
                        <Modal.Header >
                            <Modal.Title className="text-center">{DepartureAirport} to {ArrivalAirport}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-center'>Have you selected the airports correctly?</Modal.Body>
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