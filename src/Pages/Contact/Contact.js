import axios from "axios";
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';

const Contact = () => {
    const [countryList, setCountryList] = useState([]);
    const [countryCode, setCountryCode] = useState("");
    // const [locatedCountry, setLocatedCountry] = useState({});
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
        const emailVerificationCode = e.target.emailVerificationCode.value;
        const phoneVerificationCode = e.target.phoneVerificationCode.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value;

        axios.post("https://backend.flightnft.net/api/v1/contact/save-full-data", {
            name, emailVerificationCode, phoneVerificationCode, subject, message
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

    return (
        <Container className="pt-high">
            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>Contact</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control mb-3' name="name" placeholder="Name" reqiured />

                        <input type="email" className='form-control mb-3' name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

                        <div className='d-flex mb-3'>
                            <input type="text" className='form-control' name="emailVerificationCode" placeholder="Email Verification Code" required />

                            <Button variant='danger' size='sm' className='text-nowrap' type="button" onClick={sendEmailVerificationCode} disabled={(email.length === 0) ? true : false}>Send OTP</Button>
                        </div>

                        <div className='d-flex mb-3'>
                            <select className='form-control w-auto' name='countryCode' value={countryCode} onChange={e => setCountryCode(e.target.value)}>

                                {
                                    countryList.map((country, index) => <option value={country.callingCodes} key={index}>{country.alpha2Code} (+{country.callingCodes})</option>)
                                }
                            </select>

                            <input type="text" className='form-control' name="number" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required />
                        </div>

                        <div className='d-flex mb-3'>
                            <input type="text" className='form-control' name="phoneVerificationCode" placeholder="Mobile Verification Code" required />

                            <Button variant='danger' size='sm' className='text-nowrap' type="button" onClick={sendMobileVerificationCode} disabled={(mobile.length !== 0 && sendEmailOTP === true) ? false : true}>Send OTP</Button>
                        </div>

                        {/* <input type="text" className='form-control mb-3' name="subject" placeholder="Subject" required /> */}

                        <textarea name="message" placeholder='Message' className='form-control mb-3' rows={4} required></textarea>

                        <Button variant='danger' className='text-nowrap' type="submit" disabled={(sendEmailOTP && sendMobileOTP) ? false : true}>Submit</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
export default Contact;
