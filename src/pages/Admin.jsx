import React, { useState, useEffect } from 'react';
import { LogIn, Download, Trash2, LayoutDashboard, User } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminLoggedIn') === 'true');
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [feedbackData, setFeedbackData] = useState([]);

    const fetchFeedback = async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzXYafW4j5maR2X4LAg2BjqCUquMHnJpocL_W-2lLUEowELu4qo_v-Y2hEPaD_ZkZY8Yw/exec');
            const data = await response.json();
            setFeedbackData(data);
        } catch (error) {
            console.error("Failed to fetch feedback:", error);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchFeedback();

        // Polling every 30 seconds to keep admin updated
        const interval = setInterval(fetchFeedback, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === 'ushadevi' && credentials.password === 'TMusha_29081978') {
            setIsLoggedIn(true);
            localStorage.setItem('adminLoggedIn', 'true');
            setError('');
            // Fetch immediately on login
            fetchFeedback();
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    const downloadExcel = () => {
        if (feedbackData.length === 0) return;

        const headers = ['Timestamp', 'Clarity', 'Helpful', 'Navigation', 'Interactivity', 'Satisfaction', 'Comments'];
        const csvRows = [
            headers.join(','),
            ...feedbackData.map(row => [
                `"${row.timestamp}"`,
                `"${row.clarity}"`,
                `"${row.helpful}"`,
                `"${row.navigation || ''}"`,
                `"${row.interactivity || ''}"`,
                `"${row.satisfaction}"`,
                `"${row.comments || ''}"`
            ].join(','))
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "lab_feedback.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearFeedback = () => {
        // Since data is on Google Sheets, we just clear the local view
        // To delete real data, user should go to the Sheet
        if (window.confirm('This will clear the view. To delete permanent data, please open the Google Sheet.')) {
            setFeedbackData([]);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <div className="login-card glass">
                    <div className="login-header">
                        <User size={40} className="login-icon" />
                        <h2>Admin Login</h2>
                        <p>Access Big Data Analytics Virtual Lab Feedback</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="login-btn">
                            Login <LogIn size={18} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header glass">
                <div className="header-left">
                    <LayoutDashboard size={24} />
                    <h1>Feedback Dashboard</h1>
                </div>
                <div className="header-actions">
                    <button onClick={downloadExcel} className="action-btn download">
                        <Download size={18} /> Export to Excel (CSV)
                    </button>
                    <button onClick={clearFeedback} className="action-btn clear">
                        <Trash2 size={18} /> Clear Data
                    </button>
                    <button onClick={() => {
                        setIsLoggedIn(false);
                        localStorage.removeItem('adminLoggedIn');
                    }} className="action-btn logout">
                        Logout
                    </button>
                </div>
            </div>

            <div className="feedback-table-container glass">
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Procedure Clarity</th>
                            <th>Helpfulness</th>
                            <th>Overall Satisfaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackData.length > 0 ? (
                            feedbackData.slice().reverse().map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.timestamp}</td>
                                    <td>
                                        <span className={`status-badge ${item.clarity.toLowerCase()}`}>
                                            {item.clarity}
                                        </span>
                                    </td>
                                    <td>{item.helpful}</td>
                                    <td>{item.satisfaction}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-msg">No feedback submitted yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
