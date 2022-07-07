import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import axios from "axios";
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
});

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

const Search = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [message, setMessage] = useState("");
    const [available, setAvailable] = useState(null);
    const [DepartureAirport, setDepartureAirport] = useState(params.get('DepartureAirport'));
    const [ArrivalAirportList, setArrivalAirportList] = useState([...indianAirports]);
    const [ArrivalAirport, setArrivalAirport] = useState(params.get('ArrivalAirport'));

    const navigate = useNavigate();

    const ticketTemplate = useRef();

    useEffect(() => {
        if (DepartureAirport !== "Singapore") {
            setArrivalAirportList(["Singapore"])
            setArrivalAirport("Singapore")
        }
        axios.get(`https://backend.flightnft.net/api/v1/flight/${DepartureAirport}/${ArrivalAirport}`)
            .then(res => {
                if (res.status === 200) {
                    setMessage(res.data.message);
                    setAvailable(true);
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setMessage(err.response.data.message);
                    setAvailable(false);
                }
            });
    }, [DepartureAirport, ArrivalAirport])

    const handleDepartureAirport = (e) => {
        setDepartureAirport(e.target.value);
        if (e.target.value === "Singapore") {
            setArrivalAirportList(indianAirports)
            setArrivalAirport(indianAirports[0])
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?DepartureAirport=${DepartureAirport}&&ArrivalAirport=${ArrivalAirport}`);
    }

    const mintFlight = async () => {
        const dataUrl = await htmlToImage.toPng(ticketTemplate.current);
        const data = new FormData();
        data.append('file', dataUrl);
        data.append('filename', 'ticket.png');
        await axios.post('https://backend.flightnft.net/api/v1/mint/test-image-upload', data)
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <>
            <Container className="py-5 ">
                <Row>
                    <Col className="searchDiv">
                        <form className='d-flex' onSubmit={handleSearch}>
                            <select className='form-control' name="DepartureAirport" id="DepartureAirport" value={DepartureAirport} onChange={handleDepartureAirport} required>
                                {
                                    DepartureAirportList.map(airport => <option value={airport}>{airport}</option>)
                                }
                            </select>
                            <select className='form-control' name="ArrivalAirport" id="ArrivalAirport" value={ArrivalAirport} onChange={e => setArrivalAirport(e.target.value)} required>
                                {
                                    ArrivalAirportList.map((airport) => <option value={airport}>{airport}</option>)
                                }
                            </select>
                            <button type="submit" className='btn btn-danger'><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="border border-1 mt-5">
                            {/* <h6 className='text-white fw-normal'>Departure Airport: {DepartureAirport} &nbsp; &nbsp; &nbsp; &nbsp; Arrival Airport: {ArrivalAirport}</h6> */}
                            <div className="tickit_name_wraper">
                                <h3 className={`${available ? "text-danger" : "ticket_color"} text-center`}>{message} </h3>
                            </div>
                            {/* <Button variant="success" className={`float-md-end mt-1 mt-md-0`} disabled={available ? false : true}>Mint Your Title Now for {industryList.find((ind) => ind.industry === industry).bnb} BNB</Button> */}
                            {/* </h3> */}
                            <div className="ticket_image_wrapper text-dark" ref={ticketTemplate}>
                                <div className="from position_ticket">
                                    <p className='fromto ticket_color2'>From</p>
                                    <p className="mb-0">{DepartureAirport}</p>
                                </div>
                                <div className="to position_ticket">
                                    <p className='fromto ticket_color2'>To</p>
                                    <p className="mb-0">{ArrivalAirport}</p>
                                </div>
                                <div className="ticket_right d-flex">
                                    <p className="from-right mb-0">
                                        {DepartureAirport}
                                    </p>
                                    <p className="ticket_to mb-0">
                                        To
                                    </p>
                                    <p className="to-right mb-0">
                                        {ArrivalAirport}
                                    </p>
                                </div>
                                <div className="ticket_serial">
                                    <p className='mb-0 serial_number'>SERIAL NUMBER</p>
                                </div>
                                <div className="ticket_nft">
                                    <p className='mb-0 nft_number'>NFT ID</p>
                                </div>
                            </div>
                            <div className="text-center ticket_btn" style={{ color: "white    " }}>
                                <p>You need to pay SGD 3000 (Rs xxxxxx): USD xxxx</p>
                                <button onClick={mintFlight} className='text-center banner-button text-decoration-none' underline="none">MINT FLIGHT NFT NOW</button>
                                <h6 className='mt-4 font14'>You can pay BNB.USDSC and DSL</h6>
                                <h6 className='ps-2 pe-2 font14'>If you pay by DSL, you can enjoy 30%, Gas Fees is paid by BNB</h6>


                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>



            <div className='dialogDiv '>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    className='dialog theme-bg'
                >
                    <div className="dialogWallet pt-4">

                        <DialogContent className='alertWalletDiv text-center'>

                            <DialogContentText id="alert-dialog-slide-description">

                                <h1 className="text-danger p-5 my-3">Launching 16 July 2022</h1>

                                <Link to="/ideas" className='mb-3 banner-button text-decoration-none' underline="none">OK</Link>
                            </DialogContentText>
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
        </>
    );
};

export default Search;