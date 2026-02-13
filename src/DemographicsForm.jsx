import React, { useState } from 'react'
import './DemographicsForm.css'

function DemographicsForm({ onBack, onContinue }) {
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        weightUnit: 'kg',
        gender: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleUnitToggle = (unit) => {
        setFormData(prev => ({
            ...prev,
            weightUnit: unit
        }))
    }

    const handleGenderSelect = (gender) => {
        setFormData(prev => ({
            ...prev,
            gender
        }))
    }

    const isFormComplete = () => {
        return (
            formData.age.trim() &&
            formData.weight.trim() &&
            !isNaN(formData.age) &&
            !isNaN(formData.weight) &&
            Number(formData.age) > 0 &&
            Number(formData.weight) > 0 &&
            formData.gender !== ''
        )
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.age.trim()) {
            newErrors.age = 'Age is required'
        } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
            newErrors.age = 'Please enter a valid age'
        }

        if (!formData.weight.trim()) {
            newErrors.weight = 'Weight is required'
        } else if (isNaN(formData.weight) || Number(formData.weight) <= 0) {
            newErrors.weight = 'Please enter a valid weight'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Demographics submitted:', formData)
            if (onContinue) {
                onContinue(formData)
            }
        }
    }

    return (
        <div className="demographics-page">
            <div className="demographics-container">
                {/* Segmented Progress Bar */}
                <div className="demographics-progress">
                    <div className="demographics-progress-segment filled"></div>
                    <div className="demographics-progress-segment unfilled"></div>
                </div>

                {/* Heading */}
                <div className="demographics-heading">
                    <h1 className="demographics-title">Tell us about yourself</h1>
                    <p className="demographics-subtitle">Help us personalize your health journey</p>
                </div>

                {/* Form */}
                <form className="demographics-form" onSubmit={handleSubmit}>
                    {/* Age Field */}
                    <div className="demographics-field">
                        <label htmlFor="age" className="demographics-label">
                            <span className="required-asterisk">*</span>Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`demographics-input ${errors.age ? 'demographics-input-error' : ''}`}
                            placeholder="Enter your age"
                            min="1"
                            max="150"
                        />
                        {errors.age && (
                            <span className="demographics-error">{errors.age}</span>
                        )}
                    </div>

                    {/* Weight Field with Unit Toggle */}
                    <div className="demographics-field">
                        <label htmlFor="weight" className="demographics-label">
                            <span className="required-asterisk">*</span>Weight
                        </label>
                        <div className="demographics-weight-row">
                            <div className="demographics-weight-input-wrapper">
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className={`demographics-input ${errors.weight ? 'demographics-input-error' : ''}`}
                                    placeholder="Enter your weight"
                                    min="1"
                                />
                            </div>
                            <div className="unit-toggle">
                                <button
                                    type="button"
                                    className={`unit-toggle-btn ${formData.weightUnit === 'kg' ? 'active' : ''}`}
                                    onClick={() => handleUnitToggle('kg')}
                                >
                                    kg
                                </button>
                                <button
                                    type="button"
                                    className={`unit-toggle-btn ${formData.weightUnit === 'lbs' ? 'active' : ''}`}
                                    onClick={() => handleUnitToggle('lbs')}
                                >
                                    lbs
                                </button>
                            </div>
                        </div>
                        {errors.weight && (
                            <span className="demographics-error">{errors.weight}</span>
                        )}
                    </div>

                    {/* Gender Selection */}
                    <div className="demographics-gender-section">
                        <span className="demographics-gender-label">Gender <span className="required-asterisk">*</span></span>
                        <div className="demographics-gender-options">
                            <div
                                className={`gender-card ${formData.gender === 'male' ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect('male')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGenderSelect('male') }}
                                aria-label="Select Male"
                            >
                                <span className="gender-card-icon">&#xe58e;</span>
                                <span className="gender-card-label">Male</span>
                            </div>
                            <div
                                className={`gender-card ${formData.gender === 'female' ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect('female')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGenderSelect('female') }}
                                aria-label="Select Female"
                            >
                                <span className="gender-card-icon">&#xe590;</span>
                                <span className="gender-card-label">Female</span>
                            </div>
                            <div
                                className={`gender-card ${formData.gender === 'other' ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect('other')}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGenderSelect('other') }}
                                aria-label="Select Other"
                            >
                                <span className="gender-card-icon">&#xe58d;</span>
                                <span className="gender-card-label">Other</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="demographics-bottom">
                        <button
                            type="submit"
                            className="demographics-continue-btn"
                            disabled={!isFormComplete()}
                        >
                            Continue
                        </button>
                        <p className="demographics-privacy-notice">
                            Your health data is encrypted and secure. We never share your personal information without your consent.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DemographicsForm
