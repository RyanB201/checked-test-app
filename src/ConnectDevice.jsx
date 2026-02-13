import React from 'react'
import './ConnectDevice.css'
import deviceIcon from './assets/device-icon.png'

function ConnectDevice({ onBack, onContinue }) {
  return (
    <div className="connect-device-page">
      <div className="connect-device-container">
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">Completion: 10%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: '10%' }}
            ></div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="connect-device-nav">
          <button className="nav-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="connect-device-content">
          {/* Title */}
          <h1 className="connect-device-title">Connect Your Device</h1>

          {/* Device Connection Card */}
          <div className="device-connection-card">
            <div className="device-icon-wrapper">
              <img src={deviceIcon} alt="Device Connection Icon" className="device-icon-image" />
            </div>
            <p className="device-connection-text">
              Ready to connect to your medical device
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="connect-device-footer">
          {/* Connect Device Button */}
          <button className="btn btn-primary btn-connect-device" onClick={onContinue}>
            Connect Device
          </button>

          {/* Help Link */}
          <p className="help-text">
            Having trouble? <a href="#" className="help-link" onClick={(e) => { e.preventDefault(); /* Handle help */ }}>Click Here</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConnectDevice
