import React, { useState } from 'react'
import './Questionnaire.css'

function Questionnaire({ onBack, onSubmit }) {
    // State for each question (null = unanswered, true = yes, false = no)
    const [answers, setAnswers] = useState({
        dizzy: null,
        headaches: null,
        nausea: null,
        visionChanges: null
    })

    const questions = [
        {
            id: 'dizzy',
            text: 'Did you feel dizzy today?'
        },
        {
            id: 'headaches',
            text: 'Have you experienced headaches?'
        },
        {
            id: 'nausea',
            text: 'Are you experiencing any nausea?'
        },
        {
            id: 'visionChanges',
            text: 'Have you noticed any vision changes?'
        }
    ]

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
    }

    // Check if all questions are answered
    const allAnswered = Object.values(answers).every(answer => answer !== null)

    const handleSubmit = () => {
        if (allAnswered && onSubmit) {
            onSubmit(answers)
        }
    }

    return (
        <div className="questionnaire-page">
            <div className="questionnaire-container">
                {/* Progress Section */}
                <div className="questionnaire-progress-section">
                    <div className="questionnaire-progress-header">
                        <span className="questionnaire-progress-text">Completion: 70%</span>
                    </div>
                    <div className="questionnaire-progress-bar">
                        <div
                            className="questionnaire-progress-bar-fill"
                            style={{ width: '70%' }}
                        ></div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="questionnaire-nav">
                    <button className="questionnaire-back-button" onClick={onBack}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="questionnaire-content">
                    {/* Header */}
                    <div className="questionnaire-header">
                        <h1 className="questionnaire-title">Self-Health Checklist</h1>
                        <p className="questionnaire-description">
                            Please answer the following questions about your health today
                        </p>
                    </div>

                    {/* Questions */}
                    <div className="questions-container">
                        {questions.map(question => (
                            <div key={question.id} className="question-item">
                                <div className="question-label-row">
                                    <span className="question-required">*</span>
                                    <span className="question-text">{question.text}</span>
                                    <svg className="question-help-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M8 11V8M8 5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="radio-options">
                                    <label className="radio-option" onClick={() => handleAnswer(question.id, true)}>
                                        <div className={`radio-input ${answers[question.id] === true ? 'selected' : ''}`}></div>
                                        <span className="radio-label">Yes</span>
                                    </label>
                                    <label className="radio-option" onClick={() => handleAnswer(question.id, false)}>
                                        <div className={`radio-input ${answers[question.id] === false ? 'selected' : ''}`}></div>
                                        <span className="radio-label">No</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="questionnaire-actions">
                    <button
                        className="questionnaire-submit-button"
                        onClick={handleSubmit}
                        disabled={!allAnswered}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Questionnaire
