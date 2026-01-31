import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Code2, Container, Cloud, Home, User, X } from 'lucide-react';
import { exercises } from '../data/exercises';
import './Sidebar.css';

const Sidebar = ({ isVisible, onToggle }) => {
    return (
        <aside className={`sidebar ${!isVisible ? 'hidden' : ''}`}>
            <div className="sidebar-controls">
                <button onClick={onToggle} className="toggle-sidebar-btn" title="Hide Sidebar">
                    <X size={20} />
                </button>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <Code2 size={24} />
                    </div>
                    <div className="brand-text">
                        <h1>Big Data Analytics<br /><span>Virtual Lab</span></h1>
                    </div>
                </div>
            </Link>

            <div className="setup-guides">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `guide-link ${isActive ? 'active' : ''}`}
                >
                    <Home size={18} />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/cloud-shell"
                    className={({ isActive }) => `guide-link ${isActive ? 'active' : ''}`}
                    style={{ justifyContent: 'center' }}
                >
                    <Cloud size={18} />
                    <span style={{ fontSize: '0.85rem' }}>Cloud Shell Setup Guide</span>
                </NavLink>
            </div>

            <div className="nav-section-title">List of Experiments</div>
            <nav className="nav-list">
                {exercises.map((ex) => (
                    <NavLink
                        key={ex.id}
                        to={`/exercise/${ex.id}`}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <div className="nav-item-content">
                            <span className="nav-experiment-label">Experiment {ex.id}</span>
                            <span className="nav-title">{ex.shortTitle}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
};
export default Sidebar;
