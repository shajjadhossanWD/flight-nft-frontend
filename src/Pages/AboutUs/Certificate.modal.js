import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  color:"white",
  borderRadius:'5px',
  
};

export default function CertificatModal({open, setOpen}) {
 
  const handleClose = () => setOpen(false);

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
         <Box className='certificatModal' id="certificatModal" sx={style}>
             <img src="https://i.ibb.co/G0bxDBj/Whats-App-Image-2022-07-06-at-9-23-46-PM.jpg" alt="" className="p-2" style={{width:"100%", height:"100%" }} />
         </Box>
      </Modal>
    </div>
  );
}
