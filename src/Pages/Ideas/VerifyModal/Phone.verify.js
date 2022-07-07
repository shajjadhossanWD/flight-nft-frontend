import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius:'5px',
  color:"white",
  p: 4,
};

export default function PhoneVerifyModal({open, setOpenPhone}) {
 
  const handleClose = () => setOpenPhone(false);

  const hendelSubmit = (e)=>{
    console.log(e.terget.value)
  }

  return (
    <div> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
          <Typography id="modal-modal-title text-light" variant="h6" component="h2">
            Verify Mobile
          </Typography>
          <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
            Chack your phone and enter this OTP code.
          </Typography>
          <from className="d-flex input-group mt-2 mb-2" onSubmit={hendelSubmit} >
              <input type="text" className="form-control" placeholder="OTP code" aria-label="OTP code !!" aria-describedby="button-addon2" />
              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">send</button>
          </from>
         </Box>
      </Modal>
    </div>
  );
}
