import React, { useState } from 'react'
import './ResetPassword.css'
import { supabase } from './supabaseClient'

function ResetPassword({ onComplete }) {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState(null)
    const [success, setSuccess] = useState(false)

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Check if form is complete
    const isFormComplete = () => {
        return (
            formData.password.trim() &&
            formData.password.length >= 6 &&
            formData.confirmPassword.trim() &&
            formData.password === formData.confirmPassword
        )
    }

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
        if (authError) setAuthError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        setAuthError(null)

        try {
            const { error } = await supabase.auth.updateUser({
                password: formData.password
            })

            if (error) {
                setAuthError(error.message || 'Failed to update password.')
            } else {
                setSuccess(true)
            }
        } catch (err) {
            setAuthError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="reset-password-page">
                <div className="reset-password-container">
                    <div className="reset-success-content">
                        <div className="success-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h1 className="reset-password-title">Password Updated</h1>
                        <p className="reset-success-text">
                            Your password has been successfully updated. You can now log in with your new password.
                        </p>
                        <button
                            className="btn btn-primary btn-continue"
                            onClick={onComplete}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                {/* Header */}
                <div className="reset-password-header">
                    <h1 className="reset-password-title">Set New Password</h1>
                    <p className="reset-password-subtitle">
                        Enter your new password below. Make sure it's at least 6 characters long.
                    </p>
                </div>

                {/* Form */}
                <form className="reset-password-form" onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div className="form-field">
                        <label htmlFor="password" className="form-label">
                            *New Password
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

                    {/* Confirm Password Field */}
                    <div className="form-field">
                        <label htmlFor="confirmPassword" className="form-label">
                            *Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                            placeholder="Re-enter your password"
                        />
                        {errors.confirmPassword && (
                            <span className="form-error">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Auth Error */}
                    {authError && (
                        <div className="auth-error-banner">
                            <p>{authError}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`btn btn-primary btn-continue ${(!isFormComplete() || loading) ? 'btn-disabled' : ''}`}
                        disabled={!isFormComplete() || loading}
                    >
                        {loading ? 'Updating…' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
