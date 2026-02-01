import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Terminal, BookOpen, CheckCircle, Play, Copy, Check, Info } from 'lucide-react';
import { exercises } from '../data/exercises';
import CodeRunner from './CodeRunner';
import './ExerciseDetail.css';

const extractClassName = (code) => {
    const match = code.match(/public\s+class\s+(\w+)/);
    return match ? match[1] : 'Main';
};

const ExerciseDetail = () => {
    const { id } = useParams();
    const exercise = exercises.find(e => e.id === parseInt(id));
    const [copied, setCopied] = useState(false);

    // Reset state when exercise changes
    useEffect(() => {
        setCopied(false);
    }, [id]);

    if (!exercise) return <Navigate to="/" />;

    const handleCopy = () => {
        navigator.clipboard.writeText(exercise.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            className="exercise-container"
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <header className="exercise-header">
                <span className="exercise-id">Exercise {exercise.id < 10 ? `0${exercise.id}` : exercise.id}</span>
                <h1 className="exercise-title">{exercise.title}</h1>
            </header>

            <div className="exercise-content">
                <div className="section glass-card full-width">
                    <h2 className="section-title"><CheckCircle size={22} /> Aim</h2>
                    <p className="aim-text">{exercise.aim}</p>
                </div>

                <div className="section glass-card full-width">
                    <h2 className="section-title"><BookOpen size={22} /> Procedure</h2>
                    <ul className="procedure-list">
                        {exercise.procedure.map((step, idx) => (
                            <li key={idx} className="step-item">
                                <span className="step-text">{idx + 1}. {step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section glass-card full-width">
                    <div className="section-header-row">
                        <h2 className="section-title"><Terminal size={22} /> Program Source Code</h2>
                        <div className="code-actions">
                            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                                {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Code</>}
                            </button>
                            <span className="env-badge">
                                {exercise.id === 1 ? 'Local Java' : 'Cloud Shell'}
                            </span>
                        </div>
                    </div>

                    <div className="code-wrapper">
                        <SyntaxHighlighter
                            language={exercise.title.toLowerCase().includes('python') ? 'python' : 'java'}
                            style={vscDarkPlus}
                            showLineNumbers={true}
                            customStyle={{ margin: 0, padding: '1.5rem', background: '#0f172a', fontSize: '0.9rem', borderRadius: '0.75rem' }}
                        >
                            {exercise.code}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <div className="section glass-card full-width">
                    <h3 className="section-title"><Play size={20} /> Execution & Expected Output</h3>
                    {/* CodeRunner enabled */}
                    {[1].includes(exercise.id) ? (
                        <CodeRunner
                            code={exercise.code}
                            language="java"
                            className={extractClassName(exercise.code)}
                        />
                    ) : (
                        <div className="static-output">
                            <div className="output-header">Simulation Output</div>
                            <pre className="output-screen">{exercise.output}</pre>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ExerciseDetail;
