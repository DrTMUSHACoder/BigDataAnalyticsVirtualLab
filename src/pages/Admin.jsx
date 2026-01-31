import React, { useState, useEffect } from 'react';
import { LogIn, Download, Trash2, LayoutDashboard, User } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const storedFeedback = JSON.parse(localStorage.getItem('lab_feedback') || '[]');
        setFeedbackData(storedFeedback);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === 'ushadevi' && credentials.password === 'TMusha_29081978') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    const downloadExcel = () => {
        if (feedbackData.length === 0) return;

        const headers = ['Timestamp', 'Clarity', 'Helpful', 'Satisfaction'];
        const csvRows = [
            headers.join(','),
            ...feedbackData.map(row => [
                `"${row.timestamp}"`,
                `"${row.clarity}"`,
                `"${row.helpful}"`,
                `"${row.satisfaction}"`
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
        if (window.confirm('Are you sure you want to clear all feedback data?')) {
            localStorage.removeItem('lab_feedback');
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
                    <button onClick={() => setIsLoggedIn(false)} className="action-btn logout">
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
