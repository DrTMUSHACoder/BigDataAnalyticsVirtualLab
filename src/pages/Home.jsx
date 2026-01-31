import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, Zap, Cpu, Code2, Play, FileCode, Container, Cloud } from 'lucide-react';
import { exercises } from '../data/exercises';
import './Home.css';

const Home = () => {
    const getExerciseBadge = (id) => {
        if (id === 1) return { icon: <Code2 size={14} />, label: 'Java', class: 'badge-browser' };
        if (id >= 2 && id <= 3) return { icon: <FileCode size={14} />, label: 'Hadoop', class: 'badge-commands' };
        if (id >= 4 && id <= 9) return { icon: <Container size={14} />, label: 'MapReduce', class: 'badge-hadoop' };
        if (id >= 10) return { icon: <Database size={14} />, label: 'Hive/Pig', class: 'badge-tools' };
        return null;
    };

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="home-sections-grid">
                <div className="feature-grid-container glass">
                    <div className="feature-grid">
                        <div className="feature-item">
                            <div className="feature-icon"><Database size={28} /></div>
                            <h3 className="feature-heading">HDFS & Storage</h3>
                            <p className="feature-text">Master the Hadoop Distributed File System and file management operations.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><Cpu size={28} /></div>
                            <h3 className="feature-heading">MapReduce</h3>
                            <p className="feature-text">Develop scalable parallel processing algorithms for large datasets.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><Zap size={28} /></div>
                            <h3 className="feature-heading">Pig & Hive</h3>
                            <p className="feature-text">Perform advanced data analytics and warehousing tasks efficiently.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="setup-info glass">
                <h2 className="info-title">🚀 Getting Started</h2>
                <p className="info-text">
                    Use Google Cloud Shell for running Hadoop exercises (Free Tier):
                </p>
                <div className="setup-options">
                    <Link to="/cloud-shell" className="setup-card">
                        <Cloud size={32} />
                        <h3>Cloud Shell Environment</h3>
                        <p>Launch Hadoop in Google Cloud Shell</p>
                        <span className="recommended">Recommended</span>
                    </Link>
                </div>
            </div>

            <div className="exercises-section">
                <h2 className="section-heading">📚 List of Experiments</h2>
                <div className="exercises-grid">
                    {exercises.map((exercise, index) => {
                        const badge = getExerciseBadge(exercise.id);
                        return (
                            <motion.div
                                key={exercise.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/exercise/${exercise.id}`} className="exercise-card glass-card">
                                    <div className="card-header">
                                        <div className="exercise-label">
                                            Experiment {exercise.id}
                                        </div>
                                        {badge && (
                                            <div className={`exercise-badge ${badge.class}`}>
                                                {badge.icon}
                                                <span>{badge.label}</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="card-title">{exercise.title}</h3>
                                    <p className="card-description">{exercise.description}</p>
                                    <div className="card-footer">
                                        <Code2 size={16} />
                                        <span>View Details →</span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
