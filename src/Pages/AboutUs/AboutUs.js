import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get("https://dslegends.org/api/about-dsl")
            .then(res => {
                setData(res.data)
            })
            .finally(() => setLoading(false));
    }, [])
    return (
        <Container>

            <div className="pt-3 text-danger d-flex justify-content-center mb-3">
                <div className="heading">
                    <h1 className='section-heading text-uppercase'>About Us</h1>
                    <span className='underline'></span>
                </div>
            </div>
            <Row>
                <Col>
                    {
                        loading && <h3 className='text-white'>Loading...</h3>
                    }
                    <div dangerouslySetInnerHTML={{ __html: data }} className="text-white"></div>
                </Col>
            </Row>
        </Container>
    );
}
export default AboutUs;