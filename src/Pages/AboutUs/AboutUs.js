import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { FlightNFTContext } from '../../Context/FlightNFTContext';
import { Container, Row, Col } from 'react-bootstrap';


const AboutUs = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    // const { 
    //     getBalanceTestnet, 
    //     RewardFreeUSDSC, 
    //     currentAccount, 
    //     SwitchNetwork, 
    //     mintTicketNFTTestnetBNB, 
    //     mintTicketNFTTestnetUSDSC, 
    //     get, 
    //     RewardFreeDSL, 
    //     mintTicketNFTTestnetDSL, 
    //     getBalanceMainnet,
    //     getNFTMetaDataTestnet
    //     } = useContext(FlightNFTContext);


    useEffect(() => {
        setLoading(true)
        axios.get("https://dslegends.org/api/about-dsl")
            .then(res => {
                setData(res.data)
            })
            .finally(() => setLoading(false));
    }, [])
    
    // function Test(){
        // getBalanceMainnet();
        // const email = "izaansohail10.is@gmail.com"
        // RewardFreeUSDSC(currentAccount, email);
        // const network = "bsc";
        // const url = "https://jsonkeeper.com/b/JD10";
        // mintTicketNFTTestnetUSDSC(url)
        // get();
        // RewardFreeDSL(currentAccount, email)
        // mintTicketNFTTestnetDSL(url)
        // getBalanceTestnet();
        // getNFTMetaDataTestnet()
    // }
    
    return (
        <Container className="pt-high">
            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>About Us</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <Row>
                <Col>
                    {
                        loading && <h3 className='text-white about_content'>Loading...</h3>
                    }
                    <div dangerouslySetInnerHTML={{ __html: data }} className="text-white about_content"></div>
                </Col>
            </Row>
            {/* <button onClick={Test}>Press</button> */}
        </Container>
    );
}
export default AboutUs;
