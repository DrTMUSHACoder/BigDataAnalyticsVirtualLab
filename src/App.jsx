import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ExerciseDetail from './components/ExerciseDetail';
import Home from './pages/Home';
import DockerSetup from './pages/DockerSetup';
import CloudShell from './pages/CloudShell';
import Footer from './components/Footer';
import FeedbackWidget from './components/FeedbackWidget';
import Admin from './pages/Admin';
import PageHeader from './components/PageHeader';

function AppContent() {
    const [sidebarVisible, setSidebarVisible] = useState(typeof window !== 'undefined' ? window.innerWidth > 1024 : true);
    const location = useLocation();

    // Auto-hide sidebar on mobile/tablet when navigating
    React.useEffect(() => {
        if (window.innerWidth <= 1024) {
            setSidebarVisible(false);
        }
    }, [location]);

    // Handle initial resize and subsequent window changes
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
            {/* Mobile Overlay */}
            {sidebarVisible && window.innerWidth <= 1024 && (
                <div
                    onClick={() => setSidebarVisible(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 45,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}
            <Sidebar isVisible={sidebarVisible} onToggle={() => setSidebarVisible(!sidebarVisible)} />
            <main style={{
                marginLeft: (sidebarVisible && window.innerWidth > 1024) ? '280px' : '0',
                flex: 1,
                position: 'relative',
                width: (sidebarVisible && window.innerWidth > 1024) ? 'calc(100% - 280px)' : '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                minWidth: 0 // Prevent overflow issues
            }}>
                <button
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                    style={{
                        position: 'fixed',
                        left: sidebarVisible && window.innerWidth <= 1024 ? '230px' : '1.5rem',
                        top: '1.2rem',
                        zIndex: 1100,
                        background: 'rgba(14, 165, 233, 0.8)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '0.6rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        display: (window.innerWidth <= 1024 || !sidebarVisible) ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}
                    title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {sidebarVisible ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
                <FeedbackWidget />
                <PageHeader />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/exercise/:id" element={<ExerciseDetail />} />
                        <Route path="/docker-setup" element={<DockerSetup />} />
                        <Route path="/cloud-shell" element={<CloudShell />} />
                    </Routes>
                </div>
                <Footer />
            </main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App;
