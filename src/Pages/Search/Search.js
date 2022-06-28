import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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

const Search = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [message, setMessage] = useState("");
    const [available, setAvailable] = useState(null);
    const [DepartureAirport, setDepartureAirport] = useState(params.get('DepartureAirport'));
    const [ArrivalAirportList, setArrivalAirportList] = useState([...indianAirports]);
    const [ArrivalAirport, setArrivalAirport] = useState(params.get('ArrivalAirport'));

    const navigate = useNavigate();

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

    return (
        <Container className="py-4">
            <Row>
                <Col>
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
                    <div className="border border-1 mt-5 p-5">
                        <h6 className='text-white fw-normal'>Departure Airport: {DepartureAirport} &nbsp; &nbsp; &nbsp; &nbsp; Arrival Airport: {ArrivalAirport}</h6>
                        <h3 className={`${available ? "text-danger" : "text-white"} text-center text-md-start`}>{message}
                            {/* <Button variant="success" className={`float-md-end mt-1 mt-md-0`} disabled={available ? false : true}>Mint Your Title Now for {industryList.find((ind) => ind.industry === industry).bnb} BNB</Button> */}
                        </h3>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Search;