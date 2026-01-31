import React, { useState } from 'react';
import { Heart, X, Send, CheckCircle2 } from 'lucide-react';
import './FeedbackWidget.css';

const FeedbackWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState({
        clarity: '',
        helpful: '',
        satisfaction: '',
        comments: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store in localStorage (Simulating database/excel storage)
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

            {isOpen && (
                <div className="feedback-modal-overlay">
                    <div className="feedback-modal glass">
                        {!submitted ? (
                            <>
                                <div className="modal-header">
                                    <h3>Share Your Feedback</h3>
                                    <button onClick={() => setIsOpen(false)} className="close-btn"><X size={20} /></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>1. Clarity of the lab procedures?</label>
                                        <div className="options-grid">
                                            {['Excellent', 'Good', 'Average', 'Poor'].map(opt => (
                                                <label key={opt} className={`opt-label ${feedback.clarity === opt ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="clarity"
                                                        required
                                                        value={opt}
                                                        onChange={(e) => setFeedback({ ...feedback, clarity: e.target.value })}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>2. Cloud Shell instructions helpful?</label>
                                        <div className="options-grid">
                                            {['Very Helpful', 'Helpful', 'Neutral', 'Not helpful'].map(opt => (
                                                <label key={opt} className={`opt-label ${feedback.helpful === opt ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="helpful"
                                                        required
                                                        value={opt}
                                                        onChange={(e) => setFeedback({ ...feedback, helpful: e.target.value })}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>3. Overall satisfaction?</label>
                                        <div className="options-grid">
                                            {['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'].map(opt => (
                                                <label key={opt} className={`opt-label ${feedback.satisfaction === opt ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="satisfaction"
                                                        required
                                                        value={opt}
                                                        onChange={(e) => setFeedback({ ...feedback, satisfaction: e.target.value })}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>4. Any other comments? (Optional)</label>
                                        <textarea
                                            className="feedback-textarea"
                                            placeholder="Tell us what you think..."
                                            value={feedback.comments}
                                            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        Submit Feedback <Send size={16} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="success-message">
                                <CheckCircle2 size={48} color="var(--success)" />
                                <h2>Thank you for your valuable time!</h2>
                                <p>Your feedback helps us make the Big Data Analytics Virtual Lab even better.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackWidget;
