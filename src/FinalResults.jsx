import React from 'react'
import './FinalResults.css'

function FinalResults({ onBack, onSaveResults, onEndSession, systolic = 118, diastolic = 76, questionnaireAnswers }) {
    // Calculate position percentage for systolic (range 40-200)
    const systolicPosition = Math.min(Math.max(((systolic - 40) / (200 - 40)) * 100, 0), 100);
    // Calculate position percentage for diastolic (range 30-130)
    const diastolicPosition = Math.min(Math.max(((diastolic - 30) / (130 - 30)) * 100, 0), 100);

    // Determine BP status
    const getStatus = () => {
        if (systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80) {
            return 'Normal';
        } else if (systolic > 140 || diastolic > 90) {
            return 'High';
        } else if (systolic < 90 || diastolic < 60) {
            return 'Low';
        }
        return 'Elevated';
    };

    const status = getStatus();

    // Determine severity level based on questionnaire answers + BP
    const getSeverityLevel = () => {
        if (!questionnaireAnswers) return 'normal';

        const { dizzy, headaches, nausea, visionChanges } = questionnaireAnswers;
        const hasSymptoms = dizzy || headaches || nausea || visionChanges;
        const symptomCount = [dizzy, headaches, nausea, visionChanges].filter(Boolean).length;
        const hasBPConcern = status === 'High' || status === 'Low';

        // Tier 3 — Emergency: worsening symptoms (high/low BP combined with multiple symptoms)
        if (hasBPConcern && symptomCount >= 2) {
            return 'emergency';
        }

        // Tier 2 — Urgent: any symptoms present (headaches, dizziness, nausea, vision changes)
        if (hasSymptoms) {
            return 'urgent';
        }

        // Tier 1 — Normal: all "No" answers
        return 'normal';
    };

    const severityLevel = getSeverityLevel();

    // Get guidance config based on severity
    const getGuidanceConfig = () => {
        switch (severityLevel) {
            case 'emergency':
                return {
                    icon: 'warning',
                    iconClass: 'guidance-icon-emergency',
                    title: 'Immediate Attention Recommended',
                    text: 'Your blood pressure readings combined with your reported symptoms suggest a potentially serious condition. Please visit your nearest emergency care hospital or call emergency services immediately. Do not delay seeking medical attention.',
                    cardClass: 'guidance-card-emergency'
                };
            case 'urgent':
                return {
                    icon: 'info',
                    iconClass: 'guidance-icon-urgent',
                    title: 'Medical Consultation Recommended',
                    text: 'Based on your responses, you are experiencing symptoms such as headaches, dizziness, or nausea that should be evaluated by a healthcare professional. Please schedule a visit with your family doctor or visit a walk-in clinic at your earliest convenience.',
                    cardClass: 'guidance-card-urgent'
                };
            case 'normal':
            default:
                return {
                    icon: 'check',
                    iconClass: 'guidance-icon-normal',
                    title: 'Health Guidance',
                    text: 'Great job! Your blood pressure is within a healthy range and you reported no concerning symptoms. Keep up the good work with regular monitoring and maintaining healthy habits.',
                    cardClass: 'guidance-card-normal'
                };
        }
    };

    const guidance = getGuidanceConfig();

    // Render the appropriate icon
    const renderGuidanceIcon = () => {
        if (guidance.icon === 'warning') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        } else if (guidance.icon === 'check') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
            );
        }
        // Default info icon
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="8" r="1" fill="currentColor" />
            </svg>
        );
    };

    // Build symptom summary for urgent/emergency
    const getSymptomSummary = () => {
        if (!questionnaireAnswers) return null;
        const symptoms = [];
        if (questionnaireAnswers.dizzy) symptoms.push('dizziness');
        if (questionnaireAnswers.headaches) symptoms.push('headaches');
        if (questionnaireAnswers.nausea) symptoms.push('nausea');
        if (questionnaireAnswers.visionChanges) symptoms.push('vision changes');
        return symptoms;
    };

    const symptoms = getSymptomSummary();

    return (
        <div className="final-results-page">
            {/* Sticky Header */}
            <header className="final-results-header-sticky">
                <div className="final-results-progress-section">
                    <div className="final-results-progress-header">
                        <span className="final-results-progress-text">Completion: 100%</span>
                    </div>
                    <div className="final-results-progress-bar">
                        <div
                            className="final-results-progress-bar-fill"
                            style={{ width: '100%' }}
                        ></div>
                    </div>
                </div>
                <button className="final-results-back-button" onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back</span>
                </button>
            </header>

            {/* Scrollable Main Content */}
            <main className="final-results-main">
                {/* Title */}
                <h1 className="final-results-title">Your Results</h1>

                {/* Overall Status Card */}
                <div className="status-card">
                    <div className="status-card-content">
                        <div className="status-card-left">
                            <div className="status-check-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <span className="status-card-label">Overall Status</span>
                        </div>
                        <span className={`status-badge status-badge-${status.toLowerCase()}`}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* Blood Pressure Metrics Card */}
                <div className="metrics-card">
                    <div className="metrics-card-header">
                        <div className="metrics-card-title-group">
                            <h2 className="metrics-card-title">Blood Pressure Metrics</h2>
                            <span className="metrics-card-subtitle">Measured in mmHg</span>
                        </div>
                        <span className="metrics-card-value">{systolic}/{diastolic}</span>
                    </div>

                    <div className="metrics-divider"></div>

                    {/* Systolic Section */}
                    <div className="metrics-section">
                        <div className="metrics-section-header">
                            <span className="metrics-section-label">Systolic</span>
                            <span className="metrics-section-value">{systolic}</span>
                        </div>
                        <div className="metrics-range-bar">
                            <div className="metrics-range-track">
                                <div className="metrics-range-highlight" style={{ left: '30%', width: '40%' }}></div>
                            </div>
                            <div
                                className="metrics-range-marker"
                                style={{ left: `${systolicPosition}%` }}
                            ></div>
                        </div>
                        <div className="metrics-range-labels">
                            <span className="metrics-range-label">Low</span>
                            <span className="metrics-range-label metrics-range-label-normal">Normal (90-120)</span>
                            <span className="metrics-range-label">High</span>
                        </div>
                    </div>

                    {/* Diastolic Section */}
                    <div className="metrics-section">
                        <div className="metrics-section-header">
                            <span className="metrics-section-label">Diastolic</span>
                            <span className="metrics-section-value">{diastolic}</span>
                        </div>
                        <div className="metrics-range-bar">
                            <div className="metrics-range-track">
                                <div className="metrics-range-highlight" style={{ left: '25%', width: '35%' }}></div>
                            </div>
                            <div
                                className="metrics-range-marker"
                                style={{ left: `${diastolicPosition}%` }}
                            ></div>
                        </div>
                        <div className="metrics-range-labels">
                            <span className="metrics-range-label">Low</span>
                            <span className="metrics-range-label metrics-range-label-normal">Normal (60-80)</span>
                            <span className="metrics-range-label">High</span>
                        </div>
                    </div>
                </div>

                {/* Reported Symptoms Card (only shown when symptoms exist) */}
                {symptoms && symptoms.length > 0 && (
                    <div className="symptoms-card">
                        <div className="symptoms-card-header">
                            <div className={`symptoms-icon ${severityLevel === 'emergency' ? 'symptoms-icon-emergency' : 'symptoms-icon-urgent'}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12h-4l-3 9-6-18-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="symptoms-card-title">Reported Symptoms</h3>
                        </div>
                        <ul className="symptoms-list">
                            {symptoms.map((symptom, index) => (
                                <li key={index} className="symptom-item">
                                    <span className={`symptom-dot ${severityLevel === 'emergency' ? 'symptom-dot-emergency' : 'symptom-dot-urgent'}`}></span>
                                    <span className="symptom-text">{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Health Guidance Card — tier-based */}
                <div className={`guidance-card ${guidance.cardClass}`}>
                    <div className="guidance-card-header">
                        <div className={`guidance-icon ${guidance.iconClass}`}>
                            {renderGuidanceIcon()}
                        </div>
                        <h3 className="guidance-card-title">{guidance.title}</h3>
                    </div>
                    <p className="guidance-card-text">
                        {guidance.text}
                    </p>
                    <div className="guidance-disclaimer">
                        <p className="guidance-disclaimer-text">
                            <strong>Medical Disclaimer:</strong> This is not a medical diagnosis from a licensed provider. If you're noticing worsening symptoms, please consult with your family doctor or head to your nearest emergency care hospital.
                        </p>
                    </div>
                </div>
            </main>

            {/* Fixed Bottom Action Buttons */}
            <footer className="final-results-footer">
                <button className="save-results-button" onClick={onSaveResults}>
                    Save my results
                </button>
                <button className="end-session-button" onClick={onEndSession}>
                    End Session
                </button>
            </footer>
        </div>
    )
}

export default FinalResults
