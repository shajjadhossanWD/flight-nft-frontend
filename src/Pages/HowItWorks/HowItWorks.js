import React from 'react';
import { Container } from 'react-bootstrap';

const HowItWorks = () => {
    return (
        <Container>
            <div className="pt-3 text-danger d-flex justify-content-center">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>How It Works</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <div className="py-4">
                <div className="row">
                    <div className="text-center col">
                        <video src="/banner-bg-2.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="border border-1 mt-5 p-5">
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-2 fs-4 text-danger"><b>The problem</b>
                                </p>
                                <p>Getting on a flight is one of the
                                    most exciting experiences you
                                    can have, and yet the process
                                    can feel so tedious and lengthy.
                                    The average time spent in the
                                    airport from arrival to boarding
                                    the plane was a whopping 133
                                    minutes.</p>
                                <p> People who are plus size and
                                    with special abilities always
                                    face issues in the airport or in
                                    the flight.
                                </p>
                            </div>
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-2 fs-4 text-danger"><b>The Solution</b>
                                </p>
                                <p>You can check in 30 mins
                                    before the flight
                                    <br /> There will be 5 other fellow
                                    passengers only. Special
                                    attention will be given by
                                    our crew.</p>
                            </div>
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-2 fs-4 text-danger"><b>What you can do?</b>
                                </p>
                                <p>
                                    <ol>
                                        <li>Get your NFTs now. The NFTs can be used
                                            for trips to 30 airports in India for the first
                                            release. </li>
                                        <li>More airports and countries will be
                                            launched soon.</li>
                                        <li>This NFT is your flight ticket. </li>
                                        <li>It will have a serial number which can be
                                            entered to book your ticket.</li>
                                    </ol>
                                </p>
                            </div>
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-1 fs-4 text-danger"><b>Fequency</b>
                                </p>
                                <span>First Phase:</span>
                                <p>
                                    <ol>
                                        <li>Daily 2 flights from Singapore </li>
                                        <li>Daily 2 Flights from India</li>
                                        <li>Singapore: Seletar Airport</li>
                                        <li>India: Popular Airports </li>
                                        <li>Only for 12 passengers per day from Singapore</li>
                                        <li>Only for 12 passengers per day from India</li>
                                    </ol>
                                </p>
                            </div>
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-2 fs-4 text-danger"><b>What you get with NFT?</b>
                                </p>
                                <p>
                                    <ol>
                                        <li>A single trip to destination provided by us.</li>
                                        <li>In-flight Meal prepared by Renowned  Singapore Chef or Renowned Indian
                                            Chef.</li>
                                        <li>Welcome Snack Pack.</li>
                                        <li>Souvenir.</li>
                                        <li>30 mins checkout before the flight.</li>
                                        <li>50 kg weight allowance.</li>
                                        <li>5 Co-Passengers only.</li>
                                        <li>Free Inflight – WIFI Card</li>
                                    </ol>
                                </p>
                            </div>
                            <div className="problem-single-content text-white mb-4">
                                <p className="mb-2 fs-4 text-danger"><b> For Whom?</b>
                                </p>
                                <p>
                                    <ol>
                                        <li>Adventure Seekers</li>
                                        <li>Businessman</li>
                                        <li>Investors who want to buy and sell</li>
                                        <li>Anyone with special needs</li>
                                        <li>Anyone who values time</li>
                                    </ol>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default HowItWorks;