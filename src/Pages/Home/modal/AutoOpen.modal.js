import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import EmailVerifyModal from '../../Ideas/VerifyModal/Email.Modal';
import PhoneVerifyModal from '../../Ideas/VerifyModal/Phone.verify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid white',
  boxShadow: 24,
  color:"white",
  borderRadius:'5px',
  p: 4
};

export default function AutoOpenModal({autoOpen, setAutoOpen}) {
    const [openPhone, setOpenPhone] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [countryCode, setCountryCode] = useState("");



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

  const hendelSubmit = (e)=>{
    console.log(e.terget.value)
  }

  const handleOpenPhone = () => {
    setOpenPhone(true)
}

const handleOpenEmail = () => {
    setOpenEmail(true)
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
           <Button className='iconClose' onClick={handleClose}><CloseIcon className='iconClose' style={{color:"red"}}/></Button>
           </div>
          <Typography id="modal-modal-title text-light mb-2 text17" variant=" " style={{fontSize:'15px', lineHeight: '1.3'}}>
           Join Our Waiting List. When we launch you might be the lucky 100 to get the NFT free.
          </Typography>
          <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
            
          </Typography>
          <from className="d-grid mt-2 mb-2"   >
             <div className='mb-1'>
                 <label className='text14' for="comment">Name*</label> 

                 <input type="text" className='form-control' name="full name" placeholder="Name" />
             </div>

             <div className='mb-1'>
                 <label className='text14' for="comment">Email*</label>
                 <div className='d-flex'>
                     <input type="text" className='form-control' name="email" placeholder="Email" style={{ borderRadius: "3px 0px 0px 3px" }} />
                     <button type="submit" className='btn btn-danger' onClick={handleOpenEmail} style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>verify</button>
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
                     <input type="text" className='form-control' name="number" placeholder="Numbers" style={{ borderRadius: '0' }} />
                     <button type="submit" className='btn btn-danger' onClick={handleOpenPhone } style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>verify</button>
                 </div>
             </div>
             <div className='d-flex' style={{justifyContent: 'center'}}>
                 <button className='banner-button2 font14 text-decoration-none mb-2 mt-3 pt-2 pb-2' id="font14">Submit</button>
             </div>
           </from>
         </Box>
      </Modal>
      <PhoneVerifyModal open={openPhone} setOpenPhone={setOpenPhone} />
      <EmailVerifyModal open={openEmail} setOpenEmail={setOpenEmail} />
    </div>
  );
}
