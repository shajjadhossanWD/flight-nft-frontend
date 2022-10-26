import { forwardRef, useContext } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { Card, Col, Row } from 'react-bootstrap';
import { FlightNFTContext } from '../../Context/FlightNFTContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

const WalletModal = () => {
  const { connectToMetamask, walletModal, openCoinbaseModal, closeWalletModal, } = useContext(FlightNFTContext);

  return (
    <div className='dialogDiv'>
      <Dialog
        open={walletModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeWalletModal}
        aria-describedby="alert-dialog-slide-description"
        className='dialog'
      >
        <div className="dialogWallet pt-4">


          <DialogContent className='alertWalletDiv'>


            <DialogContentText id="alert-dialog-slide-description">
              <div className="">
                <p className=' contents  mt-1 text-center' style={{ fontSize: 14 }}>Please note:</p>
                <p className='contents text-center mb-0' style={{ fontSize: 14 }}>1. Login to Metamask before clicking the metamask icon below.</p>
                <p className='contents text-center mb-0' style={{ fontSize: 14 }}>2. Click again if you are not connected.</p>
              </div>

              <Row xs={1} md={1} className="g-2">
                <Col>
                  <Card className='walletDiv walletModal_icon' onClick={connectToMetamask} >
                    <Card.Img variant="top" src="https://i.ibb.co/vVf533V/1.png" className="imgWallet" />
                    <Card.Body>
                      <Card.Title className='walletName'>Metamask</Card.Title>
                      <p>Click here to login</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="contentDiv">
                <p className='contents'>You can use Binance Chain to connect.</p>
                <p className='contents'>Add Binance Chain in your Metamask as follows.</p>
                <p className='contents px-2'><a className='contents1' href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_any" >https://academy.binance.com/en/articles
                  /connecting-metamask-to-binance-smart-chain</a></p>
              </div>
              <p className='text-center mt-4'>
                <Button onClick={closeWalletModal} className="text-white fs-6 bg-danger">Cancel</Button>
              </p>
              <p className='contents wallet-texts'><span
                className='text-decoration-underline text-primary click-here'
                onClick={() => { openCoinbaseModal(); closeWalletModal() }}
              >Click here</span> for other wallet logins.</p>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletModal;

