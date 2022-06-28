import React from 'react';
import { Container } from 'react-bootstrap';
import "./Marketplace.css";

const Marketplace = () => {
    return (
        <Container className='pt-high'>
            <div className="pt-3 text-danger d-flex justify-content-center">
                <div className="heading my-2">
                    <h1 className='section-heading text-uppercase'>Pricing</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <div className="py-4">
                <div className="row g-0  bg-price text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex justify-content-center">
                                HOW MUCH?
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pricing-content">
                            <div className="pricing-list">
                                <p>Get the NFT for <b>SGD at 3000 from 16 July 2022.</b> </p>
                                <p>It will go up 4 times before the launch. </p>
                                <p> <i>It is still worth for a lifetime private jet experience.</i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="row g-0  bg-price text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading text-uppercase d-flex justify-content-center">
                                Any Other <br />
                                Costs?
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pricing-content">
                            <div className="pricing-list">
                                <p>Taxes will be added as per the country law.</p>
                                <p> <i>We can guarantee nothing will be more than SGD 2000.
                                    If it is more than that we will bear it.</i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" py-4 my-4">
                <div className="row g-0 text-white">
                    <div className="col-md-4">
                        <div className="pricing-image-content">
                            <h1 className="price-heading text-danger mb-3">
                            Overhead of the
                                Aircraft over 5 years
                            </h1>
                            <div className="pricing-content-p">
                                <p>1 year : SGD 3,000,000</p>
                                <p>1 month: SGD 250,000</p>
                                <p>1 day: SGD 10,000 (25 days)</p>
                                <p>1 trip: SGD 2,500</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="pricing-image w-100">
                            <img className="img-fluid" src="https://i.ibb.co/Xxsk9Sy/02.jpg" alt="Pricing" />
                        </div>
                    </div>
                </div>
            </div>

            <div className=" py-4 my-4">
                <div className="row g-0 text-white">
                    <div className="col-md-4">
                        <div className="pricing-image-content">
                            <h1 className="price-heading text-danger mb-3">
                            Cost of One Trip
                            </h1>
                            <div className="pricing-content-p">
                                <p> Flight: SGD 2,500</p>
                                <p> Crew: SGD 2,000 (Pilot and Air Crew)</p>
                                <p> Fuel: SGD 2,000</p>
                                <p>Miscellaneous: SGD 3,500 (Includes Taxes, Airport Fees, Insurance and Others)</p>
                                <p><b>Total: SGD 10,000</b> </p>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="pricing-image w-100">
                            <img className="img-fluid" src="https://i.ibb.co/L0XSg8Q/04.jpg" alt="Pricing" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default Marketplace;