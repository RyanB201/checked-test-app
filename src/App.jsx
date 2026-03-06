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
import HomeDashboard from './HomeDashboard'
import ProfilePage from './ProfilePage'
import { supabase } from './supabaseClient'

function App() {
  const [currentPage, setCurrentPage] = useState('loading')
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState(null)
  const [savedResults, setSavedResults] = useState([])
  const [sessionData, setSessionData] = useState({ systolic: 118, diastolic: 76 })

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
              setCurrentPage('connect-device')
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
    setCurrentPage('connect-device')
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
    setCurrentPage('connect-device')
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
    setCurrentPage('landing')
  }

  const handleConnectDeviceSkip = () => {
    // Navigate to next screen or complete onboarding
    console.log('Skipped device connection')
    // You can add navigation to dashboard/home here
  }

  const handleConnectDeviceScan = () => {
    // Navigate to connecting device screen (scanning flow)
    setCurrentPage('connecting-device')
  }

  const handleConnectionComplete = () => {
    // Navigate to connected device screen
    setCurrentPage('connected-device')
  }

  const handleConnectingDeviceBack = () => {
    setCurrentPage('connect-device')
  }

  const handleConnectedDeviceContinue = () => {
    // Navigate to measuring vitals screen
    setCurrentPage('measuring-vitals')
  }

  const handleConnectedDeviceBack = () => {
    setCurrentPage('connect-device')
  }

  const handleMeasuringVitalsBack = () => {
    // Go back to device connection screen
    setCurrentPage('connect-device')
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
    // Derive a simple 0–100 score from current session vitals + questionnaire
    const { systolic, diastolic } = sessionData
    const bpScore = (systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80) ? 100
      : (systolic > 140 || diastolic > 90) ? 50
        : (systolic < 90 || diastolic < 60) ? 55
          : 75

    const symptomPenalty = questionnaireAnswers
      ? [questionnaireAnswers.dizzy, questionnaireAnswers.headaches, questionnaireAnswers.nausea, questionnaireAnswers.visionChanges]
        .filter(Boolean).length * 5
      : 0

    const score = Math.max(0, Math.min(100, bpScore - symptomPenalty))

    const newResult = {
      score,
      date: new Date().toISOString(),
      systolic,
      diastolic,
      questionnaireAnswers,
    }

    setSavedResults(prev => [newResult, ...prev])
    setCurrentPage('home-dashboard')
  }

  const handleEndSession = () => {
    // End session and return to landing
    setCurrentPage('landing')
  }

  const handleNavigate = (tab) => {
    if (tab === 'profile') setCurrentPage('profile')
  }

  const handleStartCheck = () => {
    // Re-start assessment flow from the dashboard
    setCurrentPage('connect-device')
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
        systolic={sessionData.systolic}
        diastolic={sessionData.diastolic}
        questionnaireAnswers={questionnaireAnswers}
      />
    )
  }

  if (currentPage === 'home-dashboard') {
    return (
      <HomeDashboard
        savedResults={savedResults}
        onStartCheck={handleStartCheck}
        onNavigate={handleNavigate}
      />
    )
  }

  if (currentPage === 'profile') {
    return (
      <ProfilePage
        onBack={() => setCurrentPage('home-dashboard')}
        onNavigate={(tab) => {
          if (tab === 'home') setCurrentPage('home-dashboard')
        }}
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
        onScan={handleConnectDeviceScan}
      />
    )
  }

  return (
    <div className="app">
      {/* Bottom gradient wave background */}
      <div className="welcome-gradient">
        <svg viewBox="0 0 393 224" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80C0 80 80 0 196.5 40C313 80 393 20 393 20V224H0V80Z" fill="url(#welcome-gradient-fill)" fillOpacity="0.08" />
          <defs>
            <linearGradient id="welcome-gradient-fill" x1="0" y1="0" x2="393" y2="224" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1c7782" />
              <stop offset="1" stopColor="#238b97" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        {/* Logo */}
        <div className="logo-container">
          <img src={checkedLogo} alt="Checked Logo" className="logo-image" />
        </div>

        {/* Header Section */}
        <div className="header-section">
          <h1 className="app-name">Checked</h1>
          <h2 className="app-subtitle">Self-Health Assessment Tool</h2>
          <p className="description">The self health tool that helps you monitor your health easily within minutes.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="btn btn-primary" onClick={handleContinueWithEmail}>
          Create an account
        </button>
        <button className="btn btn-outline" onClick={handleGoogleSignIn}>
          <svg className="google-icon" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20454Z" fill="#4285F4" />
            <path d="M9 18C11.43 18 13.467 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65454 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
            <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05" />
            <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65454 3.57955 9 3.57955Z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>
        <button className="btn btn-outline" onClick={handleLogin}>
          <svg className="mail-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33325 3.33334H16.6666C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6666 16.6667H3.33325C2.41659 16.6667 1.66659 15.9167 1.66659 15V5.00001C1.66659 4.08334 2.41659 3.33334 3.33325 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3333 5L9.99992 10.8333L1.66659 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continue with Email
        </button>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="login-link">
          <span>Have an account? </span>
          <a href="#" className="link" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Log in</a>
        </div>
        <p className="legal-text">
          By continuing, you agree to our{' '}
          <a href="#" className="legal-link">Terms of Service </a>
          and{' '}
          <a href="#" className="legal-link">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default App
