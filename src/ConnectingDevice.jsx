import React from 'react'
import './ConnectingDevice.css'
import zapIcon from './assets/zap-icon.svg'

function ConnectingDevice({ onConnectionComplete, onBack }) {
  // Simulate connection process
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onConnectionComplete) {
        onConnectionComplete()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [onConnectionComplete])

  return (
    <div className="connecting-device-page">
      <div className="connecting-device-container">
        {/* Progress Bar */}
        <div className="cd-progress-section">
          <span className="cd-progress-text">Completion: 20%</span>
          <div className="cd-progress-bar">
            <div
              className="cd-progress-bar-fill"
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        {/* Back Button */}
        <button className="cd-back-btn" onClick={() => onBack && onBack()}>
          <span className="cd-back-arrow material-symbols-outlined">arrow_back</span>
          <span className="cd-back-text">Back</span>
        </button>

        {/* Main Content — vertically centered */}
        <div className="cd-main-content">
          <h1 className="cd-title">Connect Your Device</h1>

          <div className="cd-status-container">
            {/* Featured Icon */}
            <div className="cd-featured-icon">
              <img src={zapIcon} alt="Connecting" className="cd-zap-icon" />
            </div>

            {/* Status */}
            <p className="cd-status-text">Connecting...</p>

            {/* Subtitle */}
            <p className="cd-subtitle">
              Please wait while we establish a secure connection with your device
            </p>
          </div>
        </div>

        {/* Bottom Notice */}
        <p className="cd-bottom-notice">
          Secure Bluetooth connection. Your device will sync data automatically once connected.
        </p>
      </div>
    </div>
  )
}

export default ConnectingDevice
