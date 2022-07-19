 
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CertificatModal from './Certificate.modal';
import { FlightNFTContext } from '../../Context/FlightNFTContext';
 

const AboutUs = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { 
        getBalanceTestnet, 
        RewardFreeUSDSC, 
        currentAccount, 
        SwitchNetwork, 
        mintTicketNFTTestnetBNB, 
        mintTicketNFTTestnetUSDSC, 
        get, 
        RewardFreeDSL, 
        mintTicketNFTTestnetDSL, 
        getBalanceMainnet,
        getNFTMetaDataTestnet
        } = useContext(FlightNFTContext);


    const [open, setOpen] = useState(false);


    useEffect(() => {
        setLoading(true)
        axios.get("https://dslegends.org/api/about-dsl")
            .then(res => {
                setData(res.data)
            })
            .finally(() => setLoading(false));
    }, [])
    
    function Test(){
    //     getBalanceMainnet();
    //     const email = "izaansohail10.is@gmail.com"
    //     RewardFreeUSDSC(currentAccount, email);
    //     const network = "bsc";
        const url = "https://jsonkeeper.com/b/JD10";
        const price = "30";
        mintTicketNFTTestnetDSL(url, price)
        // get();
        // RewardFreeDSL(currentAccount, email)
        // mintTicketNFTTestnetDSL(url)
        // getBalanceTestnet();
        // getNFTMetaDataTestnet()
    }
    
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
 
               <div>
                  <button className='banner-button2 pt-3 pb-3 fontText' id="font14" onClick={setOpen} style={{ borderRadius: "0px 3px 3px 0px", background: "#FF512F", border: "1px solid #FF512F" }}>FinTech Certificate</button>
               </div>
            </Row> 
            <CertificatModal open={open } setOpen={setOpen} />
            {/* <button onClick={Test}>test</button> */}
        </Container>
    );
}
export default AboutUs;
