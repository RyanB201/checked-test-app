import React, { useState } from 'react'
import './SignUp.css'

function SignUp({ onBack, onClose, onContinue }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  // Calculate completion percentage
  const completion = () => {
    let filled = 0
    if (formData.firstName.trim()) filled++
    if (formData.email.trim()) filled++
    if (formData.password.trim()) filled++
    return Math.round((filled / 3) * 100)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.firstName.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.password.length >= 6 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData)
      // Navigate to next step
      if (onContinue) {
        onContinue()
      }
    }
  }

  const completionPercentage = completion()

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">Completion: {completionPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="signup-nav">
          <button className="nav-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>
          <button className="nav-button nav-button-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Title */}
        <h1 className="signup-title">Sign up for free</h1>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="form-field">
            <label htmlFor="firstName" className="form-label">
              *First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
              placeholder=""
            />
            {errors.firstName && (
              <span className="form-error">{errors.firstName}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              *Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              placeholder=""
            />
            {errors.email && (
              <span className="form-error">{errors.email}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              *Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
              placeholder="Password (6+ characters)"
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className={`btn btn-primary btn-continue ${!isFormComplete() ? 'btn-disabled' : ''}`}
            disabled={!isFormComplete()}
          >
            Continue
          </button>
        </form>

        {/* Legal Text */}
        <p className="legal-text">
          By continuing you indicate that you've read and agree to our{' '}
          <a href="#" className="legal-link">Terms of Service</a> and{' '}
          <a href="#" className="legal-link">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
