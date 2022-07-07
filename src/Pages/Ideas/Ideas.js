import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import swal from 'sweetalert';
import EmailVerifyModal from './VerifyModal/Email.Modal';
import PhoneVerifyModal from './VerifyModal/Phone.verify';

const Ideas = () => {
    const [countryList, setCountryList] = useState([]);
    const [countryCode, setCountryCode] = useState("");
    const [openPhone, setOpenPhone] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);



    useEffect(() => {
        axios.get("https://restcountries.com/v2/all?fields=alpha2Code,callingCodes")
            .then(res => {
                setCountryList(res.data)
            })
    }, []);

    useEffect(() => {
        axios.get("https://api.ipregistry.co/?key=nd2chql8jm9f7gxa")
            .then(res => {
                // setLocatedCountry(res.data);
                setCountryCode(res.data.location.country.calling_code)
            })
    }, [])


    const handleOpenPhone = () => {
        setOpenPhone(true)
    }

    const handleOpenEmail = () => {
        setOpenEmail(true)
    }

    const handelSave = () => {
        swal("Comming Soon!", " !!");

    }

    return (
        <Container className="pt-high">
            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>Ideas</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row  text-white">
                    <div className="col">
                        <div className="idea-input-wrapper text-center">
                            <p className='my-3'>Suggest how our private flying can be used. Best idea will win USDSC 1000. Scroll down for some of our ideas. Closing date 30 September 2022.</p>
                            <div className="idea-input text-white d-grid">
                                <div className='textLeft'>

                                    <div className='mb-1'>
                                        <label for="comment">Name*</label>
                                        <input type="text" className='form-control' name="name" placeholder="Name" />
                                    </div>

                                    <div className='mb-1'>
                                        <label for="comment">Email*</label>
                                        <div className='d-flex'>
                                            <input type="text" className='form-control' name="email" placeholder="Email" style={{ borderRadius: "3px 0px 0px 3px" }} />
                                            <button type="submit" className='btn btn-danger' onClick={handleOpenEmail} style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>Verify</button>
                                        </div>
                                    </div>

                                    <div className='mb-1'>
                                        <label for="comment">Mobile Number*</label>
                                        <div className='d-flex'>
                                            <select className='form-control w-auto' name='countryCode' value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ borderRadius: "3px 0px 0px 3px" }}>
                                                {
                                                    countryList.map((country, index) => <option value={country.callingCodes} key={index}>{country.alpha2Code} (+{country.callingCodes})</option>)
                                                }
                                            </select>
                                            <input type="text" className='form-control' name="number" placeholder="Numbers" style={{ borderRadius: '0' }} />
                                            <button type="submit" className='btn btn-danger' onClick={handleOpenPhone} style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>Verify</button>
                                        </div>
                                    </div>

                                    <div className='mb-2'>
                                        <label className='' for="comment">Your idea to use our private flying:</label>
                                        <textarea className="form-control" rows="5" id="idea" name="idea"></textarea>
                                    </div>

                                    <button type="submit" className='btn btn-danger pt-3 pb-3  text15 mt-2' onClick={handelSave}>STAND A CHANCE TO WIN 1000 USDSC</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 " >
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'>Impress your <br /> loved one</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/impress.mp4" controls style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'>Propose to your <br /> loved one</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/propose.mp4" controls style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 " >
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex text-center justify-content-center">
                                <i className='py-2'>Do business <br /> in sky</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/business.mp4" controls style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'> Enjoy a safe <br /> journey</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video">
                            <video src="/safejourney.mp4" controls style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
                <PhoneVerifyModal open={openPhone} setOpenPhone={setOpenPhone} />
                <EmailVerifyModal open={openEmail} setOpenEmail={setOpenEmail} />

            </div>
        </Container>
    );
};

export default Ideas;