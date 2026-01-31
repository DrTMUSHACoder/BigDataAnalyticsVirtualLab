import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    const [sidebarVisible, setSidebarVisible] = React.useState(true);
    const location = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Sidebar isVisible={sidebarVisible} onToggle={() => setSidebarVisible(!sidebarVisible)} />
            <main style={{
                marginLeft: sidebarVisible ? '280px' : '0',
                flex: 1,
                position: 'relative',
                width: sidebarVisible ? 'calc(100% - 280px)' : '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
            }}>
                {!sidebarVisible && (
                    <button
                        onClick={() => setSidebarVisible(true)}
                        style={{
                            position: 'fixed',
                            left: '1.5rem',
                            top: '1.5rem',
                            zIndex: 100,
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="Show Sidebar"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                )}
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
