// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import swal from 'sweetalert';
// import axios from 'axios';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// const Get_your_USDSC = () => {
//     const [emailVarified, setEmailVarified] = useState(false);
//     const [email, setEmail] = useState('');
//     const [openOtpPopup, setOpenOtpPopup] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [claims, setClaims] = useState(0);

//     const handleClose = () => {
//         setOpenOtpPopup(false);
//     }

//     const handleOtp = (e) => {
//         const otp = e.target.value;
//         setOtp(otp)
//     }

//     const handleVerifyEmail = (e) => {
//         e.preventDefault();
//         axios.get(`https://backend.grighund.net/api/testnet-usdsc/check-lastclaim/${email}`)
//             .then(async (res) => {
//                 if (res.status === 200) {
//                     setClaims(res.data.claims);
//                     axios.post("https://backend.grighund.net/api/testnet-usdsc/email", { email })
//                         .then(res => {
//                             if (res.status === 200) {
//                                 setOtp('');
//                                 setOpenOtpPopup(true);
//                             }
//                         })
//                         .catch(error => {
//                             swal({
//                                 title: "Attention!",
//                                 text: error.response.data.message,
//                                 icon: "warning",
//                                 button: "OK!",
//                                 className: "modal_class_success",
//                             });
//                         })
//                 }
//             })
//             .catch(error => {
//                 setClaims(error.response.data.claims);
//                 swal({
//                     title: "Attention!",
//                     text: error.response.data.message,
//                     icon: "warning",
//                     button: "OK!",
//                     className: "modal_class_success",
//                 });
//             })
//     }

//     const handleEmailOtp = (e) => {
//         e.preventDefault();
//         axios.post(`https://backend.grighund.net/api/testnet-usdsc/otp/`, { email, otp })
//             .then(res => {
//                 if (res.status === 200) {
//                     handleClose();
//                     setEmailVarified(true);
//                     swal({
//                         title: "Good job!",
//                         text: "Successfully verify your Email Address",
//                         icon: "success",
//                         button: "OK!",
//                         className: "modal_class_success",

//                     });
//                 }
//             })
//             .catch(error => {
//                 swal({
//                     title: "Attention!",
//                     text: error.response.data.message,
//                     icon: "warning",
//                     button: "OK!",
//                     className: "modal_class_success",
//                 });
//             })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const address = e.target.address.value;
//         const checkAddress = await verifyAddress(address);
//         if (checkAddress) {
//             await axios.get(`https://backend.grighund.net/api/testnet-usdsc/check-lastclaim/${email}`)
//                 .then(async (res) => {
//                     if (res.status === 200) {
//                         setClaims(res.data.claims);
//                         console.log(res.data.claims)
//                         verifyandPayAdress(address, email);
//                     }
//                 })
//                 .catch(error => {
//                     setClaims(error.response.data.claims);
//                     swal({
//                         title: "Attention!",
//                         text: error.response.data.message,
//                         icon: "warning",
//                         button: "OK!",
//                         className: "modal_class_success",
//                     });
//                 })
//         }
//         else {
//             return swal({
//                 title: "Attention",
//                 text: "Please Enter Valid Address",
//                 icon: "warning",
//                 button: "OK!",
//                 className: "modal_class_success",
//             });
//         }
//     }
//     return (
//         <div>
            
//             <h1 className={`PageTitle m-0`}>Get Your Testnet USDSC</h1>

//             <div className="works container mb-4 text-start">
//                 <div className="row">
//                     <div className="col-md-6 offset-md-3">
//                         <p className='text-center text-white'>We are encouraging the usage of USDSC in different DApps. Every 24 hours you can get USDSC 1000 (Testnet).</p>
//                         <form onSubmit={handleSubmit} className="position-relative w-100">
//                             <div className="d-flex mb-3">
//                                 <input name='email' placeholder='Enter your Email Address' className='form-control position-relative' value={email} onChange={e => setEmail(e.target.value)} />
//                                 <button type='button' onClick={handleVerifyEmail} className={`btn ${email.length === 0 ? "btn-secondary" : "btn-primary"}`} disabled={email.length === 0 ? true : false} style={{ width: 90 }}>Verify</button>
//                             </div>
//                             <div className="d-flex mb-3">
//                                 <input name='address' placeholder='Enter your BSC address' className='form-control position-relative' />
//                                 <p className='position-absolute text-dark my-2 d-none d-md-block' style={{ right: 90 }}>Testnet</p>
//                                 <button className={`btn ${emailVarified ? "btn-danger" : "btn-secondary"}`} type="submit" disabled={emailVarified ? false : true} style={{ width: 90 }}>Submit</button>
//                             </div>
//                         </form>
//                         <p className='text-center text-white'>Please enter your BSC address to get your USDSC 1000. You can enter your address whenever you want. Only USDSC 1000 per 24 hours.</p>
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className='col-md-6 offset-md-3'>
//                         <p className='text-center text-white'>No of claims: <span className='text-danger'>{claims}</span></p>
//                         {/* <p className='text-center text-white'>No of addresses: <span className='text-danger'>0</span></p> */}
//                     </div>
//                 </div>
//             </div>
//             <Modal
//                 open={openOtpPopup}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Your Email OTP
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         <h6 className='text-dark'>Please Check your Email for OTP.</h6>
//                         <input
//                             className='form-control'
//                             placeholder='OTP code'
//                             type="number"
//                             name="otp"
//                             required
//                             value={otp}
//                             onChange={handleOtp}
//                         />
//                         <button className='otpBtn' onClick={handleEmailOtp}>Submit</button>
//                     </Typography>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default Get_your_USDSC;