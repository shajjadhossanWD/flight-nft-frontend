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

    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [sendEmailOTP, setSendEmailOTP] = useState(false);
    const [sendMobileOTP, setSendMobileOTP] = useState(false);

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

    const sendEmailVerificationCode = (e) => {
        e.preventDefault();

        if (!email || email.length === 0) {
            swal({
                title: "Attention",
                text: "Please enter your email",
                icon: "warning",
                button: "OK!",
                className: "modal_class_success",
            });
        } else {
            axios.post("https://backend.flightnft.net/api/v1/contact/send-email-verification-code", { email })
                .then(res => {
                    if (res.status === 200) {
                        swal({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            button: "OK!",
                            className: "modal_class_success",
                        });
                        setSendEmailOTP(true);
                        localStorage.setItem("contactToken", res.data.token);
                    }
                    setOpenEmail(true)

                })
                .catch(error => {
                    swal({
                        title: "Attention",
                        text: error.response.data.message,
                        icon: "warning",
                        button: "OK!",
                        className: "modal_class_success",
                    });
                });
        }
    }

    const sendMobileVerificationCode = (e) => {
        e.preventDefault();

        if (!mobile || mobile.length === 0) {
            swal({
                title: "Attention",
                text: "Please enter your mobile number",
                icon: "warning",
                button: "OK!",
                className: "modal_class_success",
            });
        } else {
            axios.post("https://backend.flightnft.net/api/v1/contact/send-mobile-verification-code", {
                mobile: countryCode + mobile
            }, {
                headers: { "authorization": `Bearer ${localStorage.getItem("contactToken")}` }
            })
                .then(res => {
                    if (res.status === 200) {
                        swal({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            button: "OK!",
                            className: "modal_class_success",
                        });
                        setSendMobileOTP(true)
                        sendMobileVerificationCode(true);
                        setOpenPhone(true)

                    }
                })
                .catch(error => {
                    swal({
                        title: "Attention",
                        text: error.response.data.message,
                        icon: "warning",
                        button: "OK!",
                        className: "modal_class_success",
                    });
                });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const ideas = e.target.ideas.value;

        axios.post("https://backend.flightnft.net/api/v1/contact/save-full-data-ideas", {
            name, ideas
        }, {
            headers: { "authorization": `Bearer ${localStorage.getItem("contactToken")}` }
        })
            .then(res => {
                if (res.status === 200) {
                    swal({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        button: "OK!",
                        className: "modal_class_success",
                    });
                }
            })
            .catch(error => {
                swal({
                    title: "Attention",
                    text: error.response.data.message,
                    icon: "warning",
                    button: "OK!",
                    className: "modal_class_success",
                });
            });
    }



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
                                    <form onSubmit={handleSubmit}>
                                    <div className='mb-1'>
                                        <label for="comment">Name*</label>
                                        <input type="text" className='form-control' name="name" placeholder="Name" />
                                    </div>

                                    <div className='mb-1'>
                                        <label for="comment">Email*</label>
                                        <div className='d-flex'>
                                            <input type="text" className='form-control' name="email" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)} style={{ borderRadius: "3px 0px 0px 3px" }} />
                                            <button type="submit" className='btn btn-danger' onClick={sendEmailVerificationCode}  style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>Verify</button>
                                        </div>
                                    </div>

                                    <div className='mb-1'>
                                        <label for="comment">Mobile number*</label>
                                        <div className='d-flex'>
                                            <select className='form-control w-auto' name='countryCode' value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ borderRadius: "3px 0px 0px 3px" }}>
                                                {
                                                    countryList.map((country, index) => <option value={country.callingCodes} key={index}>{country.alpha2Code} (+{country.callingCodes})</option>)
                                                }
                                            </select>
                                            <input type="text" className='form-control' name="number" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} style={{ borderRadius: '0' }} />
                                            <button type="submit" className='btn btn-danger' onClick={sendMobileVerificationCode} style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>Verify</button>
                                        </div>
                                    </div>

                                    <div className='mb-2'>
                                        <label className='' for="comment">Your idea to use our private flying:</label>
                                        <textarea className="form-control" rows="5" id="idea" name="ideas"></textarea>
                                    </div>

                                    <button type="submit" className='btn btn-danger pt-3 pb-3  text15 mt-2' >STAND A CHANCE TO WIN 1000 USDSC</button>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 "
            data-aos="fade-up"
            data-aos-duration="3000" >
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
            <div className="py-4 "
            data-aos="fade-up"
            data-aos-duration="3000"
            >
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
            <div className="py-4 " 
            data-aos="fade-up"
            data-aos-duration="3000"
            >
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
            <div className="py-4 "
            data-aos="fade-up"
            data-aos-duration="3000"
            >
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