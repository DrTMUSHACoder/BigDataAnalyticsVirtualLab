import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-info">
                        <span className="developed-by">Designed & Developed by</span>
                        <h3 className="footer-author-name">Dr. T. M. Usha</h3>
                        <p className="footer-author-title">Professor, Dept. of CSE(IoT)</p>
                        <p className="footer-college">Ramachandra College of Engineering (Autonomous), Eluru</p>
                    </div>

                    <div className="footer-v-divider"></div>

                    <div className="footer-contact-grid">
                        <a href="https://www.linkedin.com/in/drtmushacoder/" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                            <Linkedin size={18} />
                            <span>LinkedIn Profile</span>
                        </a>
                        <a href="mailto:ushawin2020@gmail.com" className="footer-link-item">
                            <Mail size={18} />
                            <span>ushawin2020@gmail.com</span>
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Big Data Analytics Lab. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
