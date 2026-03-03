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
                setIsComplete(true)
            }
        }

        const animationFrame = requestAnimationFrame(animateProgress)
        return () => cancelAnimationFrame(animationFrame)
    }, [])

    return (
        <div className="mv-page">
            <div className="mv-container">
                {/* Progress Bar */}
                <div className="mv-progress-section">
                    <span className="mv-progress-text">
                        Completion: {isComplete ? '50%' : '40%'}
                    </span>
                    <div className="mv-progress-bar">
                        <div
                            className="mv-progress-bar-fill"
                            style={{ width: isComplete ? '50%' : '40%' }}
                        />
                    </div>
                </div>

                {/* Back Button */}
                <button className="mv-back-btn" onClick={onBack}>
                    <span className="material-symbols-outlined mv-back-arrow">arrow_back</span>
                    <span className="mv-back-text">Back</span>
                </button>

                {/* Main Content */}
                <div className="mv-main-content">
                    <h1 className="mv-title">Measurement in Progress...</h1>

                    {/* Measurement Card */}
                    <div className="mv-card">
                        {/* Circular Progress */}
                        <div className="mv-circle-container">
                            <svg className="mv-circle-svg" viewBox="0 0 120 120">
                                <circle
                                    className="mv-circle-bg"
                                    cx="60"
                                    cy="60"
                                    r={radius}
                                />
                                <circle
                                    className="mv-circle-fg"
                                    cx="60"
                                    cy="60"
                                    r={radius}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                />
                            </svg>
                            <span className="mv-circle-text">{progress}%</span>
                        </div>

                        {/* Status Text */}
                        <p className={`mv-status-text ${isComplete ? 'mv-status-complete' : ''}`}>
                            {isComplete ? 'Measurement Complete' : <>Measuring blood<br />pressure...</>}
                        </p>

                        {/* Data Fields */}
                        <div className="mv-data-fields">
                            <div className="mv-data-row">
                                <span className="mv-data-label">Systolic</span>
                                <span className="mv-data-value">
                                    {isComplete ? `${systolicValue} mmHg` : '— mmHg'}
                                </span>
                            </div>
                            <div className="mv-data-row">
                                <span className="mv-data-label">Diastolic</span>
                                <span className="mv-data-value">
                                    {isComplete ? `${diastolicValue} mmHg` : '— mmHg'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Results Button — outside card, shown when complete */}
                {isComplete && (
                    <div className="mv-bottom-actions">
                        <button className="mv-results-btn" onClick={onMeasurementComplete}>
                            View Results
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MeasuringVitals
