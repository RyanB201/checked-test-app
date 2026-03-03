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
        <div className="vr-page">
            <div className="vr-container">
                {/* Progress Bar */}
                <div className="vr-progress-section">
                    <span className="vr-progress-text">Completion: 70%</span>
                    <div className="vr-progress-bar">
                        <div
                            className="vr-progress-bar-fill"
                            style={{ width: '70%' }}
                        />
                    </div>
                </div>

                {/* Back Button */}
                <button className="vr-back-btn" onClick={onBack}>
                    <span className="material-symbols-outlined vr-back-arrow">arrow_back</span>
                    <span className="vr-back-text">Back</span>
                </button>

                {/* Main Content */}
                <div className="vr-main-content">
                    <h1 className="vr-title">Your Results</h1>

                    {/* Blood Pressure Reading */}
                    <p className="vr-bp-reading">{systolic}/{diastolic} mmHg</p>

                    {/* Status Section */}
                    <div className="vr-status-section">
                        <div className="vr-status-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12L11 14L15 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="2" />
                            </svg>
                        </div>
                        <p className="vr-status-label">{status}</p>
                        <p className="vr-status-desc">
                            Your blood pressure is within a healthy range today.
                        </p>
                    </div>

                    {/* Data Fields */}
                    <div className="vr-data-fields">
                        <div className="vr-data-row">
                            <span className="vr-data-label">Systolic</span>
                            <span className="vr-data-value">{systolic} mmHg</span>
                        </div>
                        <div className="vr-data-row">
                            <span className="vr-data-label">Diastolic</span>
                            <span className="vr-data-value">{diastolic} mmHg</span>
                        </div>
                        <div className="vr-data-row">
                            <span className="vr-data-label">Status</span>
                            <span className="vr-data-value vr-status-normal">{status}</span>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="vr-bottom-actions">
                    <button className="vr-continue-btn" onClick={onContinue}>
                        Continue to Questionnaire
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VitalResults
