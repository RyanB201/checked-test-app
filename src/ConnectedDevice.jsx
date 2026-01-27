import React, { useEffect } from 'react'
import './ConnectedDevice.css'
import checkCircleIcon from './assets/check-circle-icon.svg'

function ConnectedDevice({ onContinue }) {
    // Auto-transition after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onContinue) {
                onContinue()
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [onContinue])

    return (
        <div className="connected-device-page">
            <div className="connected-device-container">
                {/* Progress Section */}
                <div className="connected-progress-section">
                    <div className="connected-progress-header">
                        <span className="connected-progress-text">Completion: 30%</span>
                    </div>
                    <div className="connected-progress-bar">
                        <div
                            className="connected-progress-bar-fill"
                            style={{ width: '30%' }}
                        ></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="connected-device-content">
                    {/* Title */}
                    <h1 className="connected-device-title">Connect Your Device</h1>

                    {/* Success Card */}
                    <div className="connected-card">
                        <div className="success-icon-container">
                            <img src={checkCircleIcon} alt="Connected" className="check-circle-icon" />
                        </div>

                        {/* Status Text */}
                        <p className="connected-status-text">Connected</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectedDevice

