import React from 'react';
import { Container } from 'react-bootstrap';
import "./Marketplace.css";

const Marketplace = () => {
    return (
        <Container className='pt-high about_content'>
            <div className="pt-3 text-danger d-flex justify-content-center">
                <div className="heading my-2">
                    <h1 className='section-heading text-uppercase'>Pricing</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <div className="py-4">
                <div className="row g-0  bg-price price-bg-1 text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex justify-content-center">
                                HOW MUCH?
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pricing-content pricing-border">
                            <div className="pricing-list">
                                <p>Get the NFT for <b>SGD3000 (169987.87 Indian Rupees)<br /> from 16 July 2022.</b> </p>
                                <p>It will go up 4 times before the launch. </p>
                                <p> <i>It is still worth for a lifetime private jet experience.</i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="row g-0  bg-price price-bg-2 text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading text-uppercase d-flex justify-content-center">
                                Any Other
                                Costs?
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pricing-content pricing-border">
                            <div className="pricing-list">
                                <p>Taxes will be added as per the country law.</p>
                                <p> <i>We can guarantee nothing will be more than SGD 3000 (113325.24 Indian Rupee).
                                    If it is more than that we will bear it.</i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default Marketplace;