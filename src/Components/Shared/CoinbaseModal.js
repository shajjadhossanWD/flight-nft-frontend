import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { forwardRef, useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FlightNFTContext } from '../../Context/FlightNFTContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
});

const CoinbaseModal = () => {
    const { coinbaseModal, closeCoinbaseModal, connectToCoinbase } = useContext(FlightNFTContext);

    return (
        <div className='dialogDiv-coinbase'>
            <Dialog
                open={coinbaseModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeCoinbaseModal}
                aria-describedby="alert-dialog-slide-description"
                className='dialog'
            >
                <div className="dialogWallet pt-4 dialogDiv-coinbase">
                    <DialogContent className='alertWalletDiv coinbase-dialog'>
                        <DialogContentText id="alert-dialog-slide-description ">
                            {/* <div className="d-none">
                                <p className=' contents  mt-1 text-center wallet-texts' style={{ fontSize: 14 }}>Please note:</p>
                                <p className='contents text-center mb-0 wallet-texts' style={{ fontSize: 14 }}>1. Login to Metamask before clicking the metamask icon below.</p>
                                <p className='contents text-center mb-0 wallet-texts' style={{ fontSize: 14 }}>2. Click again if you are not connected.</p>
                            </div> */}
                            <Row xs={1} md={1} className="g-2">
                                <Col>
                                    <Card className='walletDiv border-0'
                                        onClick={connectToCoinbase}
                                    >
                                        <Card.Img variant="top" src="https://i.ibb.co/XJnPgBq/92a1c4a2-d2e2-4a23-8d1e-6bfcd8a1c3c9-removebg-preview.png" className="imgWallet" />
                                        <Card.Body>
                                            <Card.Title className='walletName wallet-texts'>Coin Base</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="contentDiv">
                                <p className='contents wallet-texts'>Login with coinbase</p>
                                <p className='contents wallet-texts d-none'>Add Binance Chain in your Metamask as follows.</p>
                                <p className='contents px-2 wallet-texts d-none'><a className='contents1' href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_any" >https://academy.binance.com/en/articles
                                    /connecting-metamask-to-binance-smart-chain</a></p>
                            </div>
                            <p className='text-center mt-4'>
                                <Button onClick={closeCoinbaseModal} className="text-white fs-6 bg-danger wallet-texts  coin-btn">Cancel</Button>
                            </p>

                        </DialogContentText>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
};

export default CoinbaseModal;