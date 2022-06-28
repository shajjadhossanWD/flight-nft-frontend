import React, { useState, useEffect } from 'react';
import NavbarHeader from '../../Components/Shared/Navbar/NavbarHeader';
import { Row, Col, Button, Container } from 'react-bootstrap';
import axios from "axios";

const Contact = () => {
    const [countryCode, setCountryCode] = useState([]);
    useEffect(() => {
        axios.get("https://restcountries.com/v2/all?fields=alpha2Code,callingCodes")
            .then(res => {
                setCountryCode(res.data)
            })
    }, [])
    return (
        <Container>
            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>Contact</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <Row>
                <Col>
                    <form>
                        <input type="text" className='form-control mb-3' name="name" placeholder="Name" />
                        <input type="email" className='form-control mb-3' name="email" placeholder="Email" />
                        <div className='d-flex mb-3'>
                            <input type="text" className='form-control' name="emailOtp" placeholder="Email Verification Code" />
                            <Button variant='danger' size='sm' className='text-nowrap' type="button">SEND OTP</Button>
                        </div>
                        <div className='d-flex mb-3'>
                            <select className='form-control w-auto' name='countryCode'>
                                {
                                    countryCode.map((country, index) => <option value={country.callingCodes} key={index}>{country.alpha2Code} (+{country.callingCodes})</option>)
                                }
                            </select>
                            <input type="text" className='form-control' name="number" placeholder="Mobile Number" />
                        </div>
                        <div className='d-flex mb-3'>
                            <input type="text" className='form-control' name="mobileOtp" placeholder="Mobile Verification Code" />
                            <Button variant='danger' size='sm' className='text-nowrap' type="button">SEND OTP</Button>
                        </div>
                        <input type="text" className='form-control mb-3' name="subject" placeholder="Subject" />
                        <textarea name="message" placeholder='Message' className='form-control mb-3' rows={4}></textarea>
                        <Button variant='danger' className='text-nowrap mb-5' type="submit">Submit</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
export default Contact;
