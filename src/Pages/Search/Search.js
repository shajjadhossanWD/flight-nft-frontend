import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import axios from "axios";
import React, { forwardRef, useEffect, useState, useRef, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import { FlightNFTContext } from '../../Context/FlightNFTContext';
import swal from 'sweetalert';

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

    const { user, openWalletModal, getNFTMetaDataTestnet, NFTMetaData, mintTicketNFTTestnetBNB, mintTicketNFTTestnetUSDSC, mintTicketNFTTestnetDSL, setRequestLoading } = useContext(FlightNFTContext);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [message, setMessage] = useState("");
    const [available, setAvailable] = useState(null);
    const [DepartureAirport, setDepartureAirport] = useState(params.get('DepartureAirport'));
    const [ArrivalAirportList, setArrivalAirportList] = useState([...indianAirports]);
    const [ArrivalAirport, setArrivalAirport] = useState(params.get('ArrivalAirport'));
    const [token, setToken] = useState("bnb");

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

    useEffect(() => {
        getNFTMetaDataTestnet();
    }, [user?.walletAddress])

    const mintFlight = async () => {
        if (!user?.walletAddress) {
            return openWalletModal();
        }
        setRequestLoading(true);
        const dataUrl = await htmlToImage.toPng(ticketTemplate.current);
        const data = new FormData();
        data.append('file', dataUrl);
        data.append('departureAirport', DepartureAirport);
        data.append('arrivalAirport', ArrivalAirport);
        data.append('serialNumber', NFTMetaData?.SerialNumber);
        data.append('TokenID', NFTMetaData?.ID);

        await axios.post('https://backend.flightnft.net/api/v1/mint/uri-json-nft', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(async (res) => {
                let mint_hash;
                if (res.status === 200) {
                    data.append('ticket', res.data.ticket);
                    if (token === "bnb") {
                        mint_hash = await mintTicketNFTTestnetBNB(res.data.uri, 3000);
                    }
                    else if (token === "usdsc") {
                        mint_hash = await mintTicketNFTTestnetUSDSC(res.data.uri, 3000);
                    }
                    else if (token === "dsl") {
                        mint_hash = await mintTicketNFTTestnetDSL(res.data.uri, (3000 * 0.7));
                    }
                    data.append("mint_hash", mint_hash);
                    await axios.post("https://backend.flightnft.net/api/v1/mint/save-nft", data, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(res => {
                            if (res.status === 200) {
                                setRequestLoading(false);
                                const wrapper = document.createElement("div");
                                wrapper.innerHTML = `<a href=${mint_hash} target="_any" className="link_hash">${mint_hash}</a> <br/> <p class="success"><b>You have successfully minted flight ticket NFT.<b></p>`
                                swal({
                                    title: "Minted",
                                    content: wrapper,
                                    icon: "success",
                                    button: "OK",
                                    className: "modal_class_success",
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            setRequestLoading(false);
                            const wrapper = document.createElement("div");
                            wrapper.innerHTML = `<a href=${mint_hash} target="_any" className="link_hash">${mint_hash}</a> <br/> <p class="success"><b>You have successfully minted flight ticket NFT but error in while saving data.<b></p>`
                            swal({
                                title: "Warning",
                                content: wrapper,
                                icon: "warning",
                                button: "OK",
                                className: "modal_class_success",
                            });
                        })
                }
            })
            .catch(err => {
                console.log(err);
                setRequestLoading(false);
                return swal({
                    title: "Attention",
                    text: "Something went wrong. Please try again later.",
                    icon: "warning",
                    button: "OK",
                    dangerMode: true,
                    className: "modal_class",
                });
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
                            <div className="tickit_name_wraper">
                                <h3 className={`${available ? "text-danger" : "ticket_color"} text-center`}>{message} </h3>
                            </div>
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
                                    <p className='mb-0 serial_number'>{NFTMetaData?.SerialNumber}</p>
                                </div>
                                <div className="ticket_nft">
                                    <p className='mb-0 nft_number'>{NFTMetaData?.ID}</p>
                                </div>
                            </div>
                            <div className="text-center ticket_btn" style={{ color: "white    " }}>

                                {token === "dsl" ? <p>You need to pay SGD 2100 (Rs 119,154.78) : USD 1,495.73</p> : <p>You need to pay SGD 3000 (Rs 170042.79) : USD 2144.36</p>}
                                <label>Pay by</label>

                                <select className='form-control mx-auto mt-1 mb-3 w-75' name="token" id="token" value={token} onChange={e => setToken(e.target.value)} style={{ maxWidth: 450, width: "100%" }}>
                                    <option value="bnb">BNB</option>
                                    <option value="usdsc">USDSC</option>
                                    <option value="dsl">DSL</option>
                                </select>
                                <button onClick={mintFlight} className='text-center banner-button text-decoration-none' underline="none">MINT FLIGHT NFT NOW</button>
                                <div className='flex justify-content-center'>
                                    {token === "dsl" &&
                                        <p className="mb-0 p-2 discountText rounded"><span className='text-uppercase'>You get discount of :</span> SGD 900 (Rs 51,095.89 ) : USD 641.06 </p>
                                    }
                                    {token === "dsl" &&
                                        <p className="mb-0 p-2 discountText2 rounded ">You get discount of :<br /> SGD 900 (Rs 51,095.89 ) : USD 641.06 </p>
                                    }
                                </div>
                                <h6 className='mt-4 font14'>You can pay BNB.USDSC and DSL</h6>
                                <h6 className='ps-2 pe-2 font14'>If you pay by DSL, you can enjoy 30%.</h6>
                                <h6 className='ps-2 pe-2 font14'>Gas Fees is paid by BNB only</h6>
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