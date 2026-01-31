import React from 'react';
import './PageHeader.css';

const PageHeader = () => {
    return (
        <header className="page-header glass">
            <div className="header-top-row">
                <div className="header-left-col">
                    <img src="/ramachandra-logo.png" alt="Ramachandra Logo" className="header-logo" />
                </div>

                <div className="header-main-info">
                    <h1 className="header-title">Big Data Analytics Virtual Lab</h1>
                    <span className="header-semester">III CSE(IOT) - II Semester</span>
                    <span className="header-prepared">Prepared by <b>Dr. T. M. Usha</b></span>
                    <div className="header-contact">
                        <a href="https://www.linkedin.com/in/drtmushacoder/" target="_blank" rel="noopener noreferrer">LinkedIn: https://www.linkedin.com/in/drtmushacoder/</a>
                        <span className="header-separator">•</span>
                        <a href="mailto:ushawin2020@gmail.com">Email: ushawin2020@gmail.com</a>
                    </div>
                </div>

                <div className="header-right-col">
                    {/* Spacer to keep center info perfectly centered */}
                </div>
            </div>
            <p className="header-college-text">Professor, Dept. of CSE(IoT), Ramachandra College of Engineering(A), Eluru</p>
        </header>
    );
};

export default PageHeader;
