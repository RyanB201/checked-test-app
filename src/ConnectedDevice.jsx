import React from 'react'
import './ConnectedDevice.css'

function ConnectedDevice({ onContinue, onBack }) {
    return (
        <div className="ctd-page">
            <div className="ctd-container">
                {/* Progress Bar */}
                <div className="ctd-progress-section">
                    <span className="ctd-progress-text">Completion: 20%</span>
                    <div className="ctd-progress-bar">
                        <div
                            className="ctd-progress-bar-fill"
                            style={{ width: '20%' }}
                        />
                    </div>
                </div>

                {/* Back Button */}
                <button className="ctd-back-btn" onClick={() => onBack && onBack()}>
                    <span className="material-symbols-outlined ctd-back-arrow">arrow_back</span>
                    <span className="ctd-back-text">Back</span>
                </button>

                {/* Main Content */}
                <div className="ctd-main-content">
                    <h1 className="ctd-title">Connect Your Device</h1>

                    {/* Success Icon */}
                    <div className="ctd-success-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Status Text */}
                    <div className="ctd-status-text-group">
                        <p className="ctd-status-label">Connected</p>
                        <p className="ctd-status-subtitle">
                            Your device has been successfully paired and is ready to use
                        </p>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="ctd-bottom-actions">
                    <button
                        className="ctd-continue-btn"
                        onClick={() => onContinue && onContinue()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConnectedDevice
