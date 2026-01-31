import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <p className="footer-main">Big Data Analytics Virtual Lab developed and maintained by</p>
                <h4 className="footer-author">Dr. T. M. Usha</h4>
                <p className="footer-details">
                    Professor, Dept. of CSE(IoT), Ramachandra College of Engineering(A), Eluru
                </p>
                <div className="footer-contact">
                    <a href="https://www.linkedin.com/in/drtmushacoder/" target="_blank" rel="noopener noreferrer">LinkedIn: https://www.linkedin.com/in/drtmushacoder/</a>
                    <span className="footer-separator">•</span>
                    <a href="mailto:ushawin2020@gmail.com">Email: ushawin2020@gmail.com</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
