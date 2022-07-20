import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import EmailVerifyModal from '../../Ideas/VerifyModal/Email.Modal';
import PhoneVerifyModal from '../../Ideas/VerifyModal/Phone.verify';

import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid white',
    boxShadow: 24,
    color: "white",
    borderRadius: '5px',
    p: 4
};

export default function AutoOpenModal({ autoOpen, setAutoOpen }) {
    const [openPhone, setOpenPhone] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [countryCode, setCountryCode] = useState("");
    const [isError, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileVerify, setMobileVerify] = useState(false);
    const [isName, setInputName] = useState('');
    const [sendEmailOTP, setSendEmailOTP] = useState(false);
    const [sendMobileOTP, setSendMobileOTP] = useState(false);

    const [phoneOtpCode, setPhoneVerificationCode] = useState('')
    const [emailOtpCode, setEmailVerificationCode] = useState('')


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


    const handleClose = () => setAutoOpen(false);

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
            setEmailVerify(true);
            axios.post("https://backend.flightnft.net/api/v1/waiting-list/send-email-verification-code", { email })
                .then(res => {
                    if (res.status === 200) {
                        setEmailVerificationCode(res.data.emailVerificationCode)
                        swal({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            button: "OK!",
                            className: "modal_class_success",
                        });

                        setSendEmailOTP(true);
                        localStorage.setItem("waittingListToken", res.data.token);
                    }
                    setOpenEmail(true)

                })
                .catch(error => {
                    setEmailVerify(false);
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
            setMobileVerify(true)
            axios.post("https://backend.flightnft.net/api/v1/waiting-list/send-mobile-verification-code", {
                mobile: countryCode + mobile
            }, {
                headers: { "authorization": `Bearer ${localStorage.getItem("waittingListToken")}` }
            })
                .then(res => {
                    if (res.status === 200) {
                        setPhoneVerificationCode(res.data.phoneVerificationCode)

                        swal({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            button: "OK!",
                            className: "modal_class_success",
                        });
                        setOpenPhone(true)
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



    const handleSubmit = (e) => {
        e.preventDefault();

        if (email == '') {
            setError('Email field is required')
            return;
        }
        if (isName == '') {
            setError('Name field is required')
            return;
        }
        if (mobile == '') {
            setError('Phone Number field is required')
            return;
        }
        const name = e.target.name.value;
        axios.post("https://backend.flightnft.net/api/v1/waiting-list/save-full-data-waitingList", {
            name
        }, {
            headers: { "authorization": `Bearer ${localStorage.getItem("waittingListToken")}` }
        })
            .then(res => {
                if (res.status === 200) {
                    handleClose()
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
        <div>
            <Modal
                open={autoOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id="certificatModal">
                    <div className='closeD'>
                        <Button className='iconClose' onClick={handleClose}><CloseIcon className='iconClose' style={{ color: "red" }} /></Button>
                    </div>
                    <Typography id="modal-modal-title text-light mb-2 text17" variant=" " style={{ fontSize: '15px', lineHeight: '1.3' }}>
                        Join Our Waiting List. When we launch you might be the lucky 100 to get the NFT free.
                    </Typography>
                    <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>

                    </Typography>



                    <form className="d-grid mt-2 mb-2" onSubmit={handleSubmit} >
                        <div className='mb-1'>
                            <label className='text14' for="comment">Name*</label>
                            <Tippy content="Please Enter Your Name">
                                <input
                                    type="text" className='form-control' name="name" value={isName} onChange={e => setInputName(e.target.value)} placeholder="Name" required />
                            </Tippy>
                        </div>

                        <div className='mb-1'>
                            <label className='text14' for="comment">Email*</label>
                            <div className='d-flex'>
                                <Tippy content="Please Enter Your Email">
                                    <input type="text" className='form-control' name="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); setEmailVerify(false) }} style={{ borderRadius: "3px 0px 0px 3px" }} required />
                                </Tippy>
                                <button type="button" className={`btn ${email ? emailVerify ? "btn-secondary" : "btn-danger" : "btn-secondary"}`} style={{ borderRadius: "0px 3px 3px 0px" }} onClick={sendEmailVerificationCode} disabled={email ? emailVerify ? true : false : true}>Verify</button>
                            </div>
                        </div>

                        <div className='mb-1'>
                            <label className='text14' for="comment">Mobile number*</label>
                            <div className='d-flex'>
                                <select className='form-control w-auto' name='countryCode' value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ borderRadius: "3px 0px 0px 3px" }}>
                                    {
                                        countryList.map((country, index) => <option value={country.callingCodes} key={index}>{country.alpha2Code} (+{country.callingCodes})</option>)
                                    }
                                </select>
                                <Tippy content="Please Enter Your Number">
                                    <input type="number" className='form-control' name="phone" placeholder="Mobile number" value={mobile} onChange={e => { setMobile(e.target.value); setMobileVerify(false) }} style={{ borderRadius: '0' }} required />
                                </Tippy>
                                <button type="button" className={`btn ${mobile ? mobileVerify ? "btn-secondary" : "btn-danger" : "btn-secondary"}`} onClick={sendMobileVerificationCode} style={{ borderRadius: "0px 3px 3px 0px" }} disabled={mobile ? mobileVerify ? true : false : true}>Verify</button>
                            </div>
                        </div>

                        {isError ? <span style={{ color: "red" }}> {isError} </span> : ''}

                        <div className='d-flex' style={{ justifyContent: 'center' }}>
                            <button type='submit' className='submit banner-button2 font14 text-decoration-none mb-2 mt-3 pt-2 pb-2' id="font14">Submit</button>
                        </div>



                    </form>
                </Box>
            </Modal>
            <PhoneVerifyModal sendMobileVerificationCode={sendMobileVerificationCode} open={openPhone} setOpenPhone={setOpenPhone} phoneOtpCode={phoneOtpCode} setError={setError} />
            <EmailVerifyModal sendEmailVerificationCode={sendEmailVerificationCode} open={openEmail} setOpenEmail={setOpenEmail} emailOtpCode={emailOtpCode} setError={setError} />
        </div>
    );
}
