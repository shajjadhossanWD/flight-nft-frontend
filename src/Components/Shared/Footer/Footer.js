import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [link, setLink] = useState({});
    useEffect(() => {
        fetch("https://dslegends.org/api/social-links.php")
            .then(res => res.json())
            .then(data => {
                setLink(data)
            })
    }, [])
    return (
        <div className='text-center my-3 footer'>
            <span className='underline2'></span>
            <p className="text-light position-relative">Copyright &copy; 2022 flightnft.net </p>
            <div className="d-flex justify-content-center gap-3 flex-row">
            <p className='text-light mb-0'>Follow Us: </p>

            <div className="social_link_wrapper d-flex justify-content-center gap-3">

                <div className="social_link1 d-flex gap-3">
                {
                    link.medium &&
                    <a className="icon-part text-decoration-none" target="_blank" href={link.medium} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <span className='icons fw-bold'>M</span>
                        </div>
                    </a>
                }
                {
                    link.linkedin &&
                    <a className="icon-part" target="_blank" href={link.linkedin} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-linkedin-in icons" ></i>
                        </div>
                    </a>
                }
                {
                    link.twitter &&
                    <a className="icon-part" target="_blank" href={link.twitter} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-twitter icons"></i>
                        </div>
                    </a>
                }
                {
                    link.pinterest &&
                    <a className="icon-part" target="_blank" href={link.pinterest} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-pinterest-p icons"></i>
                        </div>
                    </a>
                }

                </div>
                <div className="social_link2 d-flex gap-3">
                {
                    link.facebook &&
                    <a className="icon-part" target="_blank" href={link.facebook} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-facebook-f icons"></i>
                        </div>

                    </a>
                }
                {
                    link.instagram &&
                    <a className="icon-part" target="_blank" href={link.instagram} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-instagram icons"></i>
                        </div>
                    </a>
                }
                {
                    link.tiktok &&
                    <a className="icon-part" target="_blank" href={link.tiktok} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-tiktok icons"></i>
                        </div>
                    </a>
                }

                {
                    link.telegram &&
                    <a className="icon-part" target="_blank" href={link.telegram} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-solid fa-paper-plane icons"></i>
                        </div>
                    </a>
                }

                {
                    link.youtube &&
                    <a className="icon-part" target="_blank" href={link.youtube} rel="noopener noreferrer">
                        <div className="icon-sm">
                            <i className="fa-brands fa-youtube icons"></i>
                        </div>
                    </a>
                }
                </div>
            </div>
            </div>
                
               
        </div>
    );
};

export default Footer;