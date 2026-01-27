import React from 'react'
import './FinalResults.css'

function FinalResults({ onBack, onSaveResults, onEndSession, systolic = 118, diastolic = 76 }) {
    return (
        <div className="final-results-page">
            <div className="final-results-container">
                {/* Progress Section */}
                <div className="final-results-progress-section">
                    <div className="final-results-progress-header">
                        <span className="final-results-progress-text">Completion: 100%</span>
                    </div>
                    <div className="final-results-progress-bar">
                        <div
                            className="final-results-progress-bar-fill"
                            style={{ width: '100%' }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="final-results-nav">
                    <button className="final-results-back-button" onClick={onBack}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="final-results-content">
                    {/* Header */}
                    <div className="final-results-header">
                        <h1 className="final-results-title">Your Results</h1>
                    </div>

                    {/* Blood Pressure Display */}
                    <div className="blood-pressure-section">
                        <p className="blood-pressure-label">Blood Pressure</p>
                        <p className="blood-pressure-value">{systolic}/{diastolic} mmHg</p>
                    </div>

                    {/* Status Section */}
                    <div className="status-section">
                        <div className="status-icon-container">
                            <svg className="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="status-label">Normal</p>
                    </div>

                    {/* Recommendation Card */}
                    <div className="recommendation-card">
                        <p className="recommendation-text">
                            Great job! Your blood pressure is normal and you're managing your health well. Keep up the good work with regular monitoring and maintaining healthy habits.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="final-results-actions">
                    <button className="save-results-button" onClick={onSaveResults}>
                        Save my results
                    </button>
                    <button className="end-session-button" onClick={onEndSession}>
                        End Session
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinalResults
