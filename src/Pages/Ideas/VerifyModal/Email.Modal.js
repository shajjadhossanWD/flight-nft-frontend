import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  color: "white",
  borderRadius: '5px',
  p: 4
};

export default function EmailVerifyModal({ open, setOpenEmail, emailOtpCode, setError, sendEmailVerificationCode }) {

  const [otpCode, setOtpCode] = useState()
  const [isOtpError, setOtpError] = useState(false)

  const handleClose = () => setOpenEmail(false);

  const hendelSubmit = (e) => {

    if (emailOtpCode == otpCode) {
      swal({
        title: "OTP Code Successfully Matched",
        icon: "success",
        button: "OK!",
        className: "modal_class_success",
      });
      setOtpError(false)
      setError(false)
      handleClose(false)
      return;
    }
    setError('Email OTP Code not matched')
    setOtpError(true)

  }

  return (
    <div>
      <Modal
        open={open} P
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="">
          <div className='closeD'>
            <Button className='iconClose' onClick={handleClose}><CloseIcon className='iconClose' style={{ color: "red" }} /></Button>
          </div>
          <Typography id="modal-modal-title text-light" variant="h6" component="h2">
            Verify Email
          </Typography>
          <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
            Check your email for OTP
          </Typography>
          <form className="d-flex input-group mt-2 mb-2" >
            <input type="text" className="form-control" placeholder="OTP code" aria-label="OTP code !!" aria-describedby="button-addon2" onChange={e => setOtpCode(e.target.value)} />
            <button className="btn btn-outline-secondary" onClick={hendelSubmit} type="submit" id="button-addon2">Verify</button>
          </form>

          {isOtpError ? <p style={{ color: 'red' }}>You have entered wrong OTP</p> : ''}
          <div className='d-flex' style={{ justifyContent: 'center' }}>
            <button type='submit' onClick={sendEmailVerificationCode} className='submit banner-button2 font14 text-decoration-none pb-2' id="font14">Resend OTP</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
