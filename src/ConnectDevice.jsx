import React from 'react'
import './ConnectDevice.css'

function ConnectDevice({ onBack, onScan }) {
  const devices = [
    {
      id: 1,
      name: 'Health Monitor Pro',
      icon: 'smartphone',
      battery: 85,
      status: 'Ready to connect',
    },
    {
      id: 2,
      name: 'Fitness Tracker X2',
      icon: 'watch',
      battery: 62,
      status: 'Ready to connect',
    },
  ]

  return (
    <div className="cd-page">
      <div className="cd-container">
        {/* Segmented Progress Bar */}
        <div className="cd-progress">
          <div className="cd-progress-segment cd-progress-filled" />
          <div className="cd-progress-segment cd-progress-filled" />
        </div>

        {/* Heading Section */}
        <div className="cd-heading">
          <h1 className="cd-title">Connect your device</h1>
          <p className="cd-subtitle">Pair your health monitoring device to get started</p>
        </div>

        {/* Available Devices */}
        <div className="cd-devices-section">
          <h2 className="cd-devices-label">Available Devices</h2>
          <div className="cd-devices-list">
            {devices.map((device) => (
              <div className="cd-device-card" key={device.id}>
                <div className="cd-device-icon-bg">
                  <span className="material-icons-round cd-device-icon">{device.icon}</span>
                </div>
                <div className="cd-device-info">
                  <h3 className="cd-device-name">{device.name}</h3>
                  <p className="cd-device-status">
                    Battery: {device.battery}% • {device.status}
                  </p>
                </div>
                <button className="cd-connect-btn" onClick={onScan}>
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scan Device Button */}
        <div className="cd-scan-section">
          <button className="cd-scan-btn" onClick={onScan}>
            Scan Device
          </button>
        </div>

        {/* Privacy Notice */}
        <p className="cd-privacy-text">
          Your health data is encrypted and secure. We never share your personal information without your consent.
        </p>
      </div>
    </div>
  )
}

export default ConnectDevice
