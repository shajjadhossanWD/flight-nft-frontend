import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



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
  p: 4,
};

export default function ViewDataModal({ open, setOpenModal, singleData }) {

  const handleClose = () => setOpenModal(false);

  const hendelSubmit = (e) => {
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

        <Box className='BoxModal' id="viewDataModal" sx={style} >
          <div className='closeD'>
            <Button className='iconClose' onClick={handleClose}><CloseIcon className='iconClose' style={{ color: "red" }} /></Button>

          </div>
          <h3 className='mb-2'>{singleData?.aircraftName}</h3>
          <h6>Estimated Price: SGD {singleData?.cost} For one passenger</h6>
          <h6>Departure Airport: {singleData?.departureAirport} </h6>
          <h6>Arrival  Airport: {singleData?.arrivalAirport}</h6>


          <div className='row pt-5' style={{ alignItems: "center" }}>
            <div className='col-3'>
              <span><i className="fa-solid fa-user" style={{ color: "cadetblue" }} ></i> {singleData?.aircraftSpecifications?.seats}</span>
            </div>
            <div className='col-9'>
              <Link to='/'><button className='banner-button2 text-decoration-none mb-4 text13 smallDvButton pt-1' onClick={handleClose} id="font14">BUY OURS AT SGD 10000</button></Link>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
