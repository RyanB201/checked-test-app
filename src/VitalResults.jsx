import React from 'react'
import './VitalResults.css'

function VitalResults({ onBack, onContinue, systolic = 118, diastolic = 76 }) {
    // Determine blood pressure status
    const getStatus = () => {
        if (systolic < 120 && diastolic < 80) {
            return 'Normal'
        } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
            return 'Elevated'
        } else if (systolic >= 130 || diastolic >= 80) {
            return 'High'
        }
        return 'Normal'
    }

    const status = getStatus()

    return (
        <div className="vital-results-page">
            <div className="vital-results-container">
                {/* Progress Section */}
                <div className="vital-results-progress-section">
                    <div className="vital-results-progress-header">
                        <span className="vital-results-progress-text">Completion: 70%</span>
                    </div>
                    <div className="vital-results-progress-bar">
                        <div
                            className="vital-results-progress-bar-fill"
                            style={{ width: '70%' }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="vital-results-nav">
                    <button className="vital-results-back-button" onClick={onBack}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="vital-results-content">
                    {/* Title */}
                    <h1 className="vital-results-title">Your Results</h1>

                    {/* Blood Pressure Reading */}
                    <p className="blood-pressure-reading">{systolic}/{diastolic} mmHg</p>

                    {/* Status Section with Icon */}
                    <div className="status-section">
                        <div className="status-icon-container">
                            <svg className="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="status-label">{status}</p>
                        <p className="status-description">
                            Your blood pressure is within a healthy range today.
                        </p>
                    </div>

                    {/* Data Fields */}
                    <div className="vital-data-fields-container">
                        <div className="vital-data-field-row">
                            <span className="vital-data-field-label">Systolic</span>
                            <span className="vital-data-field-value">{systolic} mmHg</span>
                        </div>
                        <div className="vital-data-field-row">
                            <span className="vital-data-field-label">Diastolic</span>
                            <span className="vital-data-field-value">{diastolic} mmHg</span>
                        </div>
                        <div className="vital-data-field-row">
                            <span className="vital-data-field-label">Status</span>
                            <span className="vital-data-field-value status-normal">{status}</span>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="vital-results-actions">
                    <button className="continue-questionnaire-button" onClick={onContinue}>
                        Continue to Questionnaire
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VitalResults
