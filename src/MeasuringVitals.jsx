import React, { useState, useEffect } from 'react'
import './MeasuringVitals.css'

function MeasuringVitals({ onBack, onMeasurementComplete }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    // Simulated blood pressure results
    const systolicValue = 118
    const diastolicValue = 76

    // Animation duration in milliseconds
    const animationDuration = 8000

    // SVG circle parameters
    const radius = 52
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    useEffect(() => {
        const startTime = Date.now()

        const animateProgress = () => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / animationDuration) * 100, 100)

            setProgress(Math.round(newProgress))

            if (newProgress < 100) {
                requestAnimationFrame(animateProgress)
            } else {
                // Measurement complete - show results
                setIsComplete(true)
            }
        }

        const animationFrame = requestAnimationFrame(animateProgress)

        return () => cancelAnimationFrame(animationFrame)
    }, [])

    return (
        <div className="measuring-vitals-page">
            <div className="measuring-vitals-container">
                {/* Progress Section */}
                <div className="measuring-progress-section">
                    <div className="measuring-progress-header">
                        <span className="measuring-progress-text">Completion: {isComplete ? '50%' : '40%'}</span>
                    </div>
                    <div className="measuring-progress-bar">
                        <div
                            className="measuring-progress-bar-fill"
                            style={{ width: isComplete ? '50%' : '40%' }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="measuring-nav">
                    <button className="measuring-back-button" onClick={onBack}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="measuring-vitals-content">
                    {/* Title */}
                    <h1 className="measuring-vitals-title">Measurement in Progress...</h1>

                    {/* Measurement Card */}
                    <div className="measurement-card">
                        {/* Circular Progress */}
                        <div className="circular-progress-container">
                            <svg className="circular-progress-svg" viewBox="0 0 120 120">
                                {/* Background circle */}
                                <circle
                                    className="circular-progress-bg"
                                    cx="60"
                                    cy="60"
                                    r={radius}
                                />
                                {/* Progress arc */}
                                <circle
                                    className="circular-progress-fg"
                                    cx="60"
                                    cy="60"
                                    r={radius}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </svg>
                            <span className="circular-progress-text">{progress}%</span>
                        </div>

                        {/* Status Text */}
                        <p className={`measuring-status-text ${isComplete ? 'status-complete' : ''}`}>
                            {isComplete ? 'Measurement Complete' : <>Measuring blood<br />pressure...</>}
                        </p>

                        {/* Data Fields */}
                        <div className="data-fields-container">
                            <div className="data-field-row">
                                <span className="data-field-label">Systolic</span>
                                <span className={`data-field-value ${isComplete ? 'value-complete' : ''}`}>
                                    {isComplete ? `${systolicValue} mmHg` : '— mmHg'}
                                </span>
                            </div>
                            <div className="data-field-row">
                                <span className="data-field-label">Diastolic</span>
                                <span className={`data-field-value ${isComplete ? 'value-complete' : ''}`}>
                                    {isComplete ? `${diastolicValue} mmHg` : '— mmHg'}
                                </span>
                            </div>
                        </div>

                        {/* Continue Button - shown when complete */}
                        {isComplete && (
                            <button className="measuring-continue-button" onClick={onMeasurementComplete}>
                                View Results
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeasuringVitals

