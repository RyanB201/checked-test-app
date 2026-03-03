import React, { useState, useEffect } from 'react'
import './ConnectingDevice.css'

function ConnectingDevice({ onConnectionComplete, onBack }) {
  const [status, setStatus] = useState('ready') // 'ready' | 'connecting'

  const handleConnect = () => {
    setStatus('connecting')
  }

  // When connecting, auto-complete after 4 seconds
  useEffect(() => {
    if (status === 'connecting') {
      const timer = setTimeout(() => {
        if (onConnectionComplete) {
          onConnectionComplete()
        }
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status, onConnectionComplete])

  const completionPercent = status === 'ready' ? 10 : 20

  return (
    <div className="cting-page">
      <div className="cting-container">
        {/* Progress Bar */}
        <div className="cting-progress-section">
          <span className="cting-progress-text">Completion: {completionPercent}%</span>
          <div className="cting-progress-bar">
            <div
              className="cting-progress-bar-fill"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {/* Back Button — only in ready state */}
        {status === 'ready' && (
          <button className="cting-back-btn" onClick={onBack}>
            <span className="material-symbols-outlined cting-back-arrow">arrow_back</span>
            <span className="cting-back-text">Back</span>
          </button>
        )}

        {/* Main Content */}
        <div className="cting-main-content">
          <h1 className="cting-title">Connect Your Device</h1>

          <div className="cting-status-card">
            {/* Lightning Icon */}
            <div className={`cting-icon-circle ${status === 'connecting' ? 'cting-icon-pulse' : ''}`}>
              <svg className="cting-zap-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#1c7782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Status Text */}
            {status === 'ready' ? (
              <p className="cting-card-text">Ready to connect to your medical device</p>
            ) : (
              <p className="cting-card-text cting-card-text-bold">Connecting...</p>
            )}
          </div>
        </div>

        {/* Bottom Actions — only in ready state */}
        {status === 'ready' && (
          <div className="cting-bottom-actions">
            <button className="cting-connect-btn" onClick={handleConnect}>
              Connect Device
            </button>
            <p className="cting-help-text">
              Having trouble?{' '}
              <a href="#" className="cting-help-link" onClick={(e) => e.preventDefault()}>
                Click Here
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConnectingDevice
