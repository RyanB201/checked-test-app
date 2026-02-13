import React from 'react'
import './ConnectedDevice.css'
import checkCircleIcon from './assets/check-circle-icon.svg'

function ConnectedDevice({ onContinue, onBack }) {
    return (
        <div className="connected-device-page">
            <div className="connected-device-container">
                {/* Progress Bar */}
                <div className="cdd-progress-section">
                    <span className="cdd-progress-text">Completion: 20%</span>
                    <div className="cdd-progress-bar">
                        <div
                            className="cdd-progress-bar-fill"
                            style={{ width: '20%' }}
                        ></div>
                    </div>
                </div>

                {/* Back Button */}
                <button className="cdd-back-btn" onClick={() => onBack && onBack()}>
                    <span className="cdd-back-arrow material-symbols-outlined">arrow_back</span>
                    <span className="cdd-back-text">Back</span>
                </button>

                {/* Main Content — vertically centered */}
                <div className="cdd-main-content">
                    <h1 className="cdd-title">Connect Your Device</h1>

                    <div className="cdd-status-container">
                        {/* Featured Icon — green success circle */}
                        <div className="cdd-featured-icon">
                            <img src={checkCircleIcon} alt="Connected" className="cdd-check-icon" />
                        </div>

                        {/* Status */}
                        <p className="cdd-status-text">Connected</p>

                        {/* Subtitle */}
                        <p className="cdd-subtitle">
                            Your device has been successfully paired and is ready to use
                        </p>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="cdd-bottom-actions">
                    <button
                        className="cdd-continue-btn"
                        onClick={() => onContinue && onContinue()}
                    >
                        Continue
                    </button>

                    <p className="cdd-bottom-notice">
                        Secure Bluetooth connection. Your device will sync data automatically once connected.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConnectedDevice
