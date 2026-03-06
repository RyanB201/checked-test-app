import React from 'react'
import './ProfilePage.css'

function ProfilePage({ onBack, onNavigate }) {

    const handleNavClick = (tab) => {
        if (onNavigate) onNavigate(tab)
    }

    return (
        <div className="profile-page">
            {/* ── Header ── */}
            <header className="profile-header">
                <button
                    className="profile-header__back"
                    aria-label="Go back"
                    onClick={onBack}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 className="profile-header__title">Profile</h2>
                <button className="profile-header__action" aria-label="Settings">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                </button>
            </header>

            {/* ── Scrollable Body ── */}
            <main className="profile-main">

                {/* ── Avatar + Name ── */}
                <section className="profile-hero">
                    <div className="profile-avatar-wrap">
                        <div className="profile-avatar">
                            {/* Placeholder avatar illustration */}
                            <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" width="96" height="96">
                                <circle cx="48" cy="48" r="48" fill="var(--Primary-50)" />
                                <circle cx="48" cy="38" r="16" fill="var(--Primary-200)" />
                                <ellipse cx="48" cy="78" rx="26" ry="18" fill="var(--Primary-300)" />
                            </svg>
                        </div>
                        <button className="profile-avatar-edit" aria-label="Edit profile photo">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="profile-identity">
                        <p className="profile-name">Alex Johnson</p>
                        <p className="profile-subtitle">Health Enthusiast · Pro Member</p>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-btn-primary">Edit Profile</button>
                        <button className="profile-btn-icon" aria-label="Share profile">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
                                <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                                <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
                                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* ── Health Stats ── */}
                <section className="profile-stats">
                    <div className="profile-stat-card">
                        <p className="profile-stat-value">72.4</p>
                        <p className="profile-stat-label">Weight (kg)</p>
                    </div>
                    <div className="profile-stat-card">
                        <p className="profile-stat-value">182</p>
                        <p className="profile-stat-label">Height (cm)</p>
                    </div>
                    <div className="profile-stat-card">
                        <p className="profile-stat-value">21.8</p>
                        <p className="profile-stat-label">BMI Index</p>
                    </div>
                </section>

                {/* ── Account & Devices ── */}
                <section className="profile-section">
                    <h3 className="profile-section__title">Account &amp; Devices</h3>

                    <div className="profile-menu">
                        {/* Linked Devices */}
                        <button className="profile-menu__item">
                            <div className="profile-menu__icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="profile-menu__label">Linked Devices</span>
                            <div className="profile-menu__right">
                                <span className="profile-menu__badge">2 Active</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>

                        {/* Notifications */}
                        <button className="profile-menu__item">
                            <div className="profile-menu__icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="profile-menu__label">Notifications</span>
                            <svg className="profile-menu__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Privacy & Security */}
                        <button className="profile-menu__item">
                            <div className="profile-menu__icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="profile-menu__label">Privacy &amp; Security</span>
                            <svg className="profile-menu__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Log Out */}
                        <button className="profile-menu__item profile-menu__item--danger">
                            <div className="profile-menu__icon-wrap profile-menu__icon-wrap--danger">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="profile-menu__label">Log Out</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* ── Bottom Nav ── */}
            <nav className="profile-nav">
                <button
                    className="profile-nav__item"
                    onClick={() => handleNavClick('home')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Home</span>
                </button>
                <button
                    className="profile-nav__item"
                    onClick={() => handleNavClick('trends')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Insights</span>
                </button>
                <button
                    className="profile-nav__item"
                    onClick={() => handleNavClick('plan')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>Plan</span>
                </button>
                <button
                    className="profile-nav__item profile-nav__item--active"
                    onClick={() => handleNavClick('profile')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" strokeLinecap="round" />
                    </svg>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    )
}

export default ProfilePage
