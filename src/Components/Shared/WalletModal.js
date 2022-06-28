import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FlightNFTContext } from '../../Context/FlightNFTContext';

const wallet = [
    { img: "/paymentWallet/1.png", name: "Metamask" },
    // { img: "/paymentWallet/2.png", name: "Bitski" },
    // { img: "/paymentWallet/3.png", name: "Formatic" },
    // { img: "/paymentWallet/5.png", name: "Coinbase" },
    // { img: "/paymentWallet/6.png", name: "Arkane" },
    // { img: "/paymentWallet/7.png", name: "Authereum" },
    // { img: "/paymentWallet/8.png", name: "Torus" },
    // { img: "/paymentWallet/4.png", name: "WalletConnect" },
]

const WalletModal = () => {
    const { loginModal, closeLoginModal, connectWallet } = useContext(FlightNFTContext);
    return (
        <Modal show={loginModal} onHide={closeLoginModal} centered style={{ zIndex: 100001 }}>
            <Modal.Body>
                <div className="row py-2 text-center">
                    <div>
                        <p>Please note:</p>
                        <p className='mb-0'>1. Login to Metamask before clicking the metamask icon below.</p>
                        <p>2. Click again if you are not connected.</p>
                    </div>
                    {
                        wallet.map((item, index) =>
                            <div className="payment-option py-2" key={index} onClick={() => connectWallet(item.name)}>
                                <img src={item.img} alt="" />
                                <p>{item.name}</p>
                            </div>
                        )
                    }
                    <div>
                        <h6>You can use Binance Chain to connect.</h6>
                        <h6>Add Binance Chain in your Metamask as follows.</h6>
                        <h6>
                            <a href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_blank" rel="noreferrer">https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain</a>
                        </h6>
                    </div>
                    <div className='py-2'>
                        <Button variant="secondary" onClick={closeLoginModal} className="m-auto">
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default WalletModal;