import React from 'react';
import './PageHeader.css';
import ThemeSwitcher from './ThemeSwitcher';

const PageHeader = () => {
    return (
        <header className="page-header glass">
            <div className="header-top-row">
                <div className="header-left-col">
                    <img src="/ramachandra-logo.png" alt="Ramachandra Logo" className="header-logo" />
                </div>

                <div className="header-main-info">
                    <h1 className="header-title">Big Data Analytics Virtual Lab</h1>
                    <div className="header-meta">
                        <span className="header-semester">III CSE(IOT) - II Semester</span>
                        <span className="meta-dot">•</span>
                        <span className="header-prepared">Prepared by Dr. T. M. Usha</span>
                    </div>
                </div>

                <div className="header-right-col">
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="header-bottom-line">
                <p className="header-college-text">Professor, Dept. of CSE(IoT), Ramachandra College of Engineering (A), Eluru</p>
            </div>
        </header>
    );
};

export default PageHeader;
