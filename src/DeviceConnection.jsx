import React from 'react'
import './DeviceConnection.css'

const AVAILABLE_DEVICES = [
    {
        id: 'health-monitor-pro',
        name: 'Health Monitor Pro',
        status: 'Battery: 85% • Ready to connect',
        icon: 'smartphone'
    },
    {
        id: 'fitness-tracker-x2',
        name: 'Fitness Tracker X2',
        status: 'Battery: 62% • Ready to connect',
        icon: 'watch'
    }
]

function DeviceConnection({ onConnect, onScanDevice }) {
    return (
        <div className="device-connection-page">
            <div className="device-connection-container">
                {/* Segmented Progress Bar */}
                <div className="dc-progress">
                    <div className="dc-progress-segment filled"></div>
                    <div className="dc-progress-segment filled"></div>
                </div>

                {/* Heading */}
                <div className="dc-heading">
                    <h1 className="dc-title">Connect your device</h1>
                    <p className="dc-subtitle">Pair your health monitoring device to get started</p>
                </div>

                {/* Available Devices */}
                <div className="dc-devices-section">
                    <h2 className="dc-devices-heading">Available Devices</h2>
                    <div className="dc-devices-list">
                        {AVAILABLE_DEVICES.map((device) => (
                            <div key={device.id} className="dc-device-card">
                                <div className="dc-device-icon-wrapper">
                                    <span className="dc-device-icon material-icons-round">{device.icon}</span>
                                </div>
                                <div className="dc-device-info">
                                    <h3 className="dc-device-name">{device.name}</h3>
                                    <p className="dc-device-status">{device.status}</p>
                                </div>
                                <button
                                    className="dc-connect-btn"
                                    onClick={() => onConnect && onConnect(device)}
                                >
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="dc-bottom-actions">
                    <button
                        className="dc-scan-btn"
                        onClick={() => onScanDevice && onScanDevice()}
                    >
                        Scan Device
                    </button>
                </div>

                {/* Privacy Notice */}
                <p className="dc-privacy-notice">
                    Your health data is encrypted and secure. We never share your personal information without your consent.
                </p>
            </div>
        </div>
    )
}

export default DeviceConnection
