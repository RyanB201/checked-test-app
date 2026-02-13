import React, { useState } from 'react'
import './SignUp.css'
import { supabase } from './supabaseClient'

function SignUp({ onBack, onClose, onContinue, onLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

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
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    if (authError) setAuthError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setAuthError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName
          }
        }
      })

      if (error) {
        // Handle specific Supabase errors
        const msg = error.message?.toLowerCase() || ''
        if (msg.includes('already registered') ||
          msg.includes('already been registered')) {
          setAuthError('duplicate')
        } else if (msg.includes('rate limit') ||
          msg.includes('security purposes') ||
          msg.includes('request this after')) {
          setAuthError('Too many sign-up attempts. Please wait a moment and try again.')
        } else {
          setAuthError(error.message || 'An error occurred during sign up.')
        }
        setLoading(false)
        return
      }

      // Supabase may return a user with empty identities if email already exists
      // (when "Confirm email" is enabled and the email is already confirmed)
      if (data?.user && data.user.identities?.length === 0) {
        setAuthError('duplicate')
        setLoading(false)
        return
      }

      // Success — navigate to demographics
      if (onContinue) {
        onContinue()
      }
    } catch (err) {
      setAuthError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
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
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
          <button className="nav-button nav-button-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h1 className="signup-title">Sign Up Today!</h1>

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

          {/* Auth Error */}
          {authError && (
            <div className="auth-error-banner">
              {authError === 'duplicate' ? (
                <p>
                  An account with this email already exists.{' '}
                  <a href="#" className="auth-error-link" onClick={(e) => { e.preventDefault(); onLogin && onLogin(); }}>
                    Log in instead
                  </a>
                </p>
              ) : (
                <p>{authError}</p>
              )}
            </div>
          )}

          {/* Continue Button */}
          <button
            type="submit"
            className={`btn btn-primary btn-continue ${(!isFormComplete() || loading) ? 'btn-disabled' : ''}`}
            disabled={!isFormComplete() || loading}
          >
            {loading ? 'Signing up…' : 'Continue'}
          </button>
        </form>

        {/* Login Link */}
        <p className="login-link-text">
          Have an account already?{' '}
          <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); onLogin && onLogin(); }}>
            Log in
          </a>
        </p>

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
