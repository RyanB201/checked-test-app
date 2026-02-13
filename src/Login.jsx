import React, { useState } from 'react'
import './Login.css'
import { supabase } from './supabaseClient'

function Login({ onBack, onSignUp, onContinue }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState(null)

    // Calculate completion percentage
    const completion = () => {
        let filled = 0
        if (formData.email.trim()) filled++
        if (formData.password.trim()) filled++
        return Math.round((filled / 2) * 100)
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

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
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })

            if (error) {
                if (error.message?.toLowerCase().includes('invalid login credentials')) {
                    setAuthError('Invalid email or password. Please try again.')
                } else if (error.message?.toLowerCase().includes('email not confirmed')) {
                    setAuthError('Please confirm your email address before logging in.')
                } else {
                    setAuthError(error.message || 'An error occurred during login.')
                }
                setLoading(false)
                return
            }

            // Success — navigate to device connection
            if (onContinue) {
                onContinue()
            }
        } catch (err) {
            setAuthError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        const email = formData.email?.trim()
        if (!email) {
            setAuthError('Please enter your email address first, then click "Forgot password?"')
            return
        }

        setLoading(true)
        setAuthError(null)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin
            })

            if (error) {
                setAuthError(error.message || 'Failed to send reset email.')
            } else {
                setAuthError('✓ Password reset email sent! Check your inbox.')
            }
        } catch (err) {
            setAuthError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const completionPercentage = completion()

    return (
        <div className="login-page">
            <div className="login-container">
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
                <div className="login-nav">
                    <button className="nav-button" onClick={onBack}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.0001 15.8334L4.16675 10.0001L10.0001 4.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                {/* Title */}
                <h1 className="login-title">Welcome Back!</h1>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit}>
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
                        <div className="form-label-row">
                            <label htmlFor="password" className="form-label">
                                *Password
                            </label>
                            <a href="#" className="forgot-password-link" onClick={handleForgotPassword}>
                                Forgot password?
                            </a>
                        </div>
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
                            <p>{authError}</p>
                        </div>
                    )}

                    {/* Continue Button */}
                    <button
                        type="submit"
                        className={`btn btn-primary btn-continue ${(!isFormComplete() || loading) ? 'btn-disabled' : ''}`}
                        disabled={!isFormComplete() || loading}
                    >
                        {loading ? 'Logging in…' : 'Continue'}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="signup-link-text">
                    Don't have an account?{' '}
                    <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); onSignUp && onSignUp(); }}>
                        Sign up
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

export default Login
