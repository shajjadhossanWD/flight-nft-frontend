import { Container } from 'react-bootstrap';

const Ideas = () => {
    return (
        <Container className="pt-high">
            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>Ideas</h1>
                    <span className='underline'></span>
                </div>

            </div>
            <div className="py-4 ">
                <div className="row  text-white">
                    <div className="col">
                    <div className="idea-input-wrapper text-center">
                    <h3 className='my-3'>Suggest your Idea and win 1000 USDSC</h3>
                        <div className="idea-input text-white d-flex">
                            
                            <input type="text" className='form-control' name="name" placeholder="Suggest your idea.." />
                            <button type="submit" className='btn btn-danger'>save</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'>Impress your <br /> loved one</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/impress.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'>Propose to your <br /> loved one</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/propose.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex text-center justify-content-center">
                                <i className='py-2'>Do business <br /> in sky</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video ">
                            <video src="/business.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 ">
                <div className="row g-0  bg-idea text-white">
                    <div className="col-md-4">
                        <div className="priceHeading">
                            <h1 className="price-heading d-flex  text-center  justify-content-center">
                                <i className='py-2'> Enjoy a safe <br /> journey</i>
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="idea-video">
                            <video src="/safejourney.mp4" controls autoPlay style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Ideas;