import React, { useState, useEffect } from 'react'
import './App.css'
import checkedLogo from './assets/checked-logo.png'
import SignUp from './SignUp'
import ConnectDevice from './ConnectDevice'
import ConnectingDevice from './ConnectingDevice'
import ConnectedDevice from './ConnectedDevice'
import MeasuringVitals from './MeasuringVitals'
import VitalResults from './VitalResults'
import Questionnaire from './Questionnaire'
import ScreenLoader from './ScreenLoader'
import FinalResults from './FinalResults'
import Login from './Login'
import DemographicsForm from './DemographicsForm'
import DeviceConnection from './DeviceConnection'
import ResetPassword from './ResetPassword'
import { supabase } from './supabaseClient'

function App() {
  const [currentPage, setCurrentPage] = useState('loading')
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState(null)

  // Listen for auth state changes (handles Google OAuth redirect)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          // User clicked password reset link — show reset screen
          setCurrentPage('reset-password')
          return
        }

        if (event === 'SIGNED_IN' && session) {
          // Check if this is an OAuth sign-in (Google)
          const provider = session.user?.app_metadata?.provider
          if (provider === 'google') {
            // Check if user is new by looking at created_at vs last_sign_in_at
            const createdAt = new Date(session.user.created_at).getTime()
            const now = Date.now()
            const isNewUser = (now - createdAt) < 10000 // Created within last 10 seconds

            if (isNewUser) {
              // New Google user → demographics
              setCurrentPage('demographics')
            } else {
              // Existing Google user → connect device
              setCurrentPage('device-connection')
            }
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLoadComplete = () => {
    setCurrentPage('landing')
  }

  const handleResetPasswordComplete = () => {
    setCurrentPage('login')
  }

  const handleContinueWithEmail = () => {
    setCurrentPage('signup')
  }

  const handleLogin = () => {
    setCurrentPage('login')
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) {
      console.error('Google sign-in error:', error.message)
    }
  }

  const handleLoginBack = () => {
    setCurrentPage('landing')
  }

  const handleLoginContinue = () => {
    setCurrentPage('device-connection')
  }

  const handleSwitchToSignUp = () => {
    setCurrentPage('signup')
  }

  const handleBack = () => {
    setCurrentPage('landing')
  }

  const handleClose = () => {
    setCurrentPage('landing')
  }

  const handleSignUpContinue = () => {
    setCurrentPage('demographics')
  }

  const handleDemographicsBack = () => {
    setCurrentPage('signup')
  }

  const handleDemographicsContinue = () => {
    setCurrentPage('device-connection')
  }

  const handleDeviceConnect = (device) => {
    setCurrentPage('measuring-vitals')
  }

  const handleDeviceScan = () => {
    setCurrentPage('connect-device')
  }

  const handleDeviceSkip = () => {
    // Skip device connection for now
    console.log('Skipped device connection')
    setCurrentPage('landing')
  }

  const handleConnectDeviceBack = () => {
    setCurrentPage('device-connection')
  }

  const handleConnectDeviceSkip = () => {
    // Navigate to next screen or complete onboarding
    console.log('Skipped device connection')
    // You can add navigation to dashboard/home here
  }

  const handleConnectDeviceContinue = () => {
    // Navigate to connecting device screen
    setCurrentPage('connecting-device')
  }

  const handleConnectionComplete = () => {
    // Navigate to connected device screen
    setCurrentPage('connected-device')
  }

  const handleConnectingDeviceBack = () => {
    setCurrentPage('device-connection')
  }

  const handleConnectedDeviceContinue = () => {
    // Navigate to measuring vitals screen
    setCurrentPage('measuring-vitals')
  }

  const handleConnectedDeviceBack = () => {
    setCurrentPage('device-connection')
  }

  const handleMeasuringVitalsBack = () => {
    // Go back to device connection screen
    setCurrentPage('device-connection')
  }

  const handleMeasurementComplete = () => {
    // Navigate to vital results screen
    setCurrentPage('vital-results')
  }

  const handleVitalResultsBack = () => {
    // Go back to measuring vitals screen
    setCurrentPage('measuring-vitals')
  }

  const handleVitalResultsContinue = () => {
    // Navigate to questionnaire
    setCurrentPage('questionnaire')
  }

  const handleQuestionnaireBack = () => {
    // Go back to vital results screen
    setCurrentPage('vital-results')
  }

  const handleQuestionnaireSubmit = (answers) => {
    // Store questionnaire answers for FinalResults
    setQuestionnaireAnswers(answers)
    // Navigate to final results
    setCurrentPage('final-results')
  }

  const handleFinalResultsBack = () => {
    // Go back to questionnaire
    setCurrentPage('questionnaire')
  }

  const handleSaveResults = () => {
    // Save results functionality
    console.log('Saving results...')
    alert('Your results have been saved!')
  }

  const handleEndSession = () => {
    // End session and return to landing
    setCurrentPage('landing')
  }

  if (currentPage === 'loading') {
    return <ScreenLoader onLoadComplete={handleLoadComplete} duration={3000} />
  }

  if (currentPage === 'signup') {
    return <SignUp onBack={handleBack} onClose={handleClose} onContinue={handleSignUpContinue} onLogin={handleLogin} />
  }

  if (currentPage === 'demographics') {
    return (
      <DemographicsForm
        onBack={handleDemographicsBack}
        onContinue={handleDemographicsContinue}
      />
    )
  }

  if (currentPage === 'login') {
    return (
      <Login
        onBack={handleLoginBack}
        onSignUp={handleSwitchToSignUp}
        onContinue={handleLoginContinue}
      />
    )
  }

  if (currentPage === 'reset-password') {
    return (
      <ResetPassword
        onComplete={handleResetPasswordComplete}
      />
    )
  }

  if (currentPage === 'connecting-device') {
    return (
      <ConnectingDevice
        onConnectionComplete={handleConnectionComplete}
        onBack={handleConnectingDeviceBack}
      />
    )
  }

  if (currentPage === 'connected-device') {
    return (
      <ConnectedDevice
        onContinue={handleConnectedDeviceContinue}
        onBack={handleConnectedDeviceBack}
      />
    )
  }

  if (currentPage === 'measuring-vitals') {
    return (
      <MeasuringVitals
        onBack={handleMeasuringVitalsBack}
        onMeasurementComplete={handleMeasurementComplete}
      />
    )
  }

  if (currentPage === 'vital-results') {
    return (
      <VitalResults
        onBack={handleVitalResultsBack}
        onContinue={handleVitalResultsContinue}
        systolic={118}
        diastolic={76}
      />
    )
  }

  if (currentPage === 'questionnaire') {
    return (
      <Questionnaire
        onBack={handleQuestionnaireBack}
        onSubmit={handleQuestionnaireSubmit}
      />
    )
  }

  if (currentPage === 'final-results') {
    return (
      <FinalResults
        onBack={handleFinalResultsBack}
        onSaveResults={handleSaveResults}
        onEndSession={handleEndSession}
        systolic={118}
        diastolic={76}
        questionnaireAnswers={questionnaireAnswers}
      />
    )
  }

  if (currentPage === 'device-connection') {
    return (
      <DeviceConnection
        onConnect={handleDeviceConnect}
        onScanDevice={handleDeviceScan}
        onSkip={handleDeviceSkip}
      />
    )
  }

  if (currentPage === 'connect-device') {
    return (
      <ConnectDevice
        onBack={handleConnectDeviceBack}
        onSkip={handleConnectDeviceSkip}
        onContinue={handleConnectDeviceContinue}
      />
    )
  }

  return (
    <div className="app">
      <div className="container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo">
            <img src={checkedLogo} alt="Checked Logo" className="logo-image" />
          </div>
          <h1 className="app-name">Checked</h1>
          <p className="tagline">Self-Health Assessment Tool</p>
          <p className="description">This self health tool helps you monitor your health easily.</p>
        </div>

        {/* Pagination Indicators */}
        <div className="pagination">
          <div className="pagination-dot active"></div>
          <div className="pagination-dot"></div>
          <div className="pagination-dot"></div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button className="btn btn-primary" onClick={handleContinueWithEmail}>
            Continue with Email
          </button>
          <button className="btn btn-secondary" onClick={handleGoogleSignIn}>
            <svg className="google-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20454Z" fill="#4285F4" />
              <path d="M9 18C11.43 18 13.467 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65454 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05" />
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65454 3.57955 9 3.57955Z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Login Link */}
        <div className="login-link">
          <span>Have an account? </span>
          <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Log in</a>
        </div>
      </div>
    </div>
  )
}

export default App
