import React, { useState } from 'react';
import { Heart, X, Send, CheckCircle2, BookOpen, Lightbulb, Smile, MessageSquare, Compass, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FeedbackWidget.css';

const FeedbackWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState({
        clarity: '',
        helpful: '',
        satisfaction: '',
        navigation: '',
        interactivity: '',
        comments: ''
    });

    const isFormValid = feedback.clarity && feedback.helpful && feedback.satisfaction && feedback.navigation && feedback.interactivity;

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const timestamp = new Date().toLocaleString();
        const newFeedback = { ...feedback, timestamp };
        const existingData = JSON.parse(localStorage.getItem('lab_feedback') || '[]');
        localStorage.setItem('lab_feedback', JSON.stringify([...existingData, newFeedback]));

        setSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setSubmitted(false);
            setFeedback({ clarity: '', helpful: '', satisfaction: '', comments: '' });
        }, 3000);
    };

    const QuestionRow = ({ icon: Icon, label, name, options, value, onChange }) => (
        <div className="feedback-row">
            <div className="question-header">
                <Icon size={18} className="q-icon" />
                <label className="step-question">{label}</label>
            </div>
            <div className="options-row">
                {options.map(opt => (
                    <label key={opt} className={`opt-pill ${value === opt ? 'active' : ''}`}>
                        <input
                            type="radio"
                            name={name}
                            value={opt}
                            checked={value === opt}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );

    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';

    if (isAdmin) return null;

    return (
        <>
            <div className="feedback-widget">
                <div className="feedback-text">
                    <p>Happy to see your feedback!</p>
                    <span>Help us improve <b>Big Data Analytics Virtual Lab</b></span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="feedback-btn"
                    title="Send Feedback"
                >
                    <Heart size={18} fill="currentColor" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="feedback-modal-overlay">
                        <motion.div
                            className="feedback-modal glass"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        >
                            {!submitted ? (
                                <>
                                    <div className="modal-header">
                                        <div className="header-info">
                                            <h3>Share Your Feedback</h3>
                                            <p className="modal-subtitle">Your input helps us improve the learning experience.</p>
                                        </div>
                                        <button onClick={() => setIsOpen(false)} className="close-btn"><X size={20} /></button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="feedback-form-all">
                                        <QuestionRow
                                            icon={BookOpen}
                                            label="1. Clarity of the lab procedures?"
                                            name="clarity"
                                            value={feedback.clarity}
                                            options={['Excellent', 'Good', 'Average', 'Poor']}
                                            onChange={(val) => setFeedback({ ...feedback, clarity: val })}
                                        />

                                        <QuestionRow
                                            icon={Lightbulb}
                                            label="2. Cloud Shell instructions helpful?"
                                            name="helpful"
                                            value={feedback.helpful}
                                            options={['Very Helpful', 'Helpful', 'Neutral', 'Not helpful']}
                                            onChange={(val) => setFeedback({ ...feedback, helpful: val })}
                                        />

                                        <QuestionRow
                                            icon={Compass}
                                            label="3. Ease of website navigation?"
                                            name="navigation"
                                            value={feedback.navigation}
                                            options={['Excellent', 'Good', 'Average', 'Poor']}
                                            onChange={(val) => setFeedback({ ...feedback, navigation: val })}
                                        />

                                        <QuestionRow
                                            icon={MousePointer2}
                                            label="4. Quality of GUI and interactivity?"
                                            name="interactivity"
                                            value={feedback.interactivity}
                                            options={['Smooth', 'Good', 'Average', 'Needs Work']}
                                            onChange={(val) => setFeedback({ ...feedback, interactivity: val })}
                                        />

                                        <QuestionRow
                                            icon={Smile}
                                            label="5. Overall satisfaction?"
                                            name="satisfaction"
                                            value={feedback.satisfaction}
                                            options={['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied']}
                                            onChange={(val) => setFeedback({ ...feedback, satisfaction: val })}
                                        />

                                        <div className="feedback-row">
                                            <div className="question-header">
                                                <MessageSquare size={18} className="q-icon" />
                                                <label className="step-question">6. Any other comments? (Optional)</label>
                                            </div>
                                            <textarea
                                                className="feedback-textarea"
                                                placeholder="Tell us what you think..."
                                                value={feedback.comments}
                                                onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="submit-all-btn"
                                            disabled={!isFormValid}
                                        >
                                            <span>Submit Feedback</span>
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle2 size={60} color="#10b981" />
                                    <h2>Thank you!</h2>
                                    <p>Your feedback has been successfully submitted.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeedbackWidget;
