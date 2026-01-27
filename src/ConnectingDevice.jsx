import React from 'react'
import './ConnectingDevice.css'
import zapIcon from './assets/zap-icon.svg'

function ConnectingDevice({ onConnectionComplete }) {
  // Simulate connection process - in production, this would be actual device connection logic
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onConnectionComplete) {
        onConnectionComplete()
      }
    }, 5000) // Simulate 5 second connection time

    return () => clearTimeout(timer)
  }, [onConnectionComplete])

  return (
    <div className="connecting-device-page">
      <div className="connecting-device-container">
        {/* Progress Section */}
        <div className="connecting-progress-section">
          <div className="connecting-progress-header">
            <span className="connecting-progress-text">Completion: 20%</span>
          </div>
          <div className="connecting-progress-bar">
            <div 
              className="connecting-progress-bar-fill" 
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="connecting-device-content">
          {/* Title */}
          <h1 className="connecting-device-title">Connect Your Device</h1>

          {/* Connection Card with Breathing Animation */}
          <div className="connecting-card">
            <div className="breathing-animation-container">
              {/* Concentric breathing rings */}
              <div className="breathing-ring breathing-ring-1"></div>
              <div className="breathing-ring breathing-ring-2"></div>
              <div className="breathing-ring breathing-ring-3"></div>
              
              {/* Zap Icon */}
              <div className="zap-icon-container">
                <img src={zapIcon} alt="Connecting" className="zap-icon" />
              </div>
            </div>

            {/* Status Text */}
            <p className="connecting-status-text">Connecting...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectingDevice
