import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Footer.css';

const Footer = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        // Using counterapi.dev for persistent counting
        // Namespace: bigdata-lab-v1, Key: visits
        const fetchCount = async () => {
            try {
                // This API increments by default on 'up' endpoint
                const response = await fetch('https://api.counterapi.dev/v1/bigdata-lab-v1/visits/up');
                const data = await response.json();

                if (data && data.count) {
                    setVisitCount(data.count);

                    // Check for milestone (every 10th visitor)
                    if (data.count > 0 && data.count % 10 === 0) {
                        setShowCelebration(true);
                        triggerConfetti();
                    }
                }
            } catch (error) {
                console.error("Counter error:", error);
                // Try to get read-only count if increment failed
                try {
                    const readResponse = await fetch('https://api.counterapi.dev/v1/bigdata-lab-v1/visits');
                    const readData = await readResponse.json();
                    if (readData.count) setVisitCount(readData.count);
                } catch (e) {
                    setVisitCount("10+"); // Fallback that looks better than 1
                }
            }
        };

        fetchCount();
    }, []);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6366f1', '#10b981', '#f59e0b']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6366f1', '#10b981', '#f59e0b']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    };

    return (
        <footer className="main-footer">
            {showCelebration && (
                <div className="milestone-banner">
                    🎉 Congratulations! You are visitor #{visitCount}! Thank you using our Virtual Lab! 🎉
                </div>
            )}
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
                        <div className="footer-link-item visitor-badge">
                            <Users size={18} />
                            <span>Total Visitors: <b>{visitCount}</b></span>
                        </div>
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
