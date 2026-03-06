import React, { useState } from 'react'
import './HomeDashboard.css'

function HomeDashboard({ savedResults = [], onStartCheck, onNavigate }) {

    const [activeNav, setActiveNav] = useState('home')

    // Calculate weekly health index from saved results (average of last 7)
    const recentScores = savedResults.slice(0, 7).map(r => r.score)
    const weeklyIndex = recentScores.length > 0
        ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
        : null

    const prevWeekScores = savedResults.slice(7, 14).map(r => r.score)
    const prevWeekIndex = prevWeekScores.length > 0
        ? Math.round(prevWeekScores.reduce((a, b) => a + b, 0) / prevWeekScores.length)
        : null

    const trend = weeklyIndex && prevWeekIndex ? weeklyIndex - prevWeekIndex : null

    // Build chart data from results (last 7 days)
    const chartResults = savedResults.slice(0, 7).reverse()

    // SVG sparkline from scores
    const buildSparklinePath = (results) => {
        if (results.length === 0) return { area: '', line: '' }
        const W = 478, H = 150, pad = 10
        const maxScore = 100, minScore = 0
        const points = results.map((r, i) => {
            const x = results.length === 1 ? W / 2 : (i / (results.length - 1)) * W
            const y = pad + ((maxScore - r.score) / (maxScore - minScore)) * (H - pad * 2)
            return [x, y]
        })
        const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ')
        const areaD = lineD + ` L${points[points.length - 1][0]} ${H} L${points[0][0]} ${H} Z`
        return { area: areaD, line: lineD }
    }

    const { area, line } = buildSparklinePath(chartResults)

    // Format date label  
    const formatDate = (dateStr) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const formatTime = (dateStr) => {
        const d = new Date(dateStr)
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }

    const getScoreLabel = (score) => {
        if (score >= 90) return 'Optimal Wellness'
        if (score >= 80) return 'Good Balance'
        if (score >= 70) return 'Moderate Recovery'
        if (score >= 60) return 'Fair Health'
        return 'Needs Attention'
    }

    const getScoreOpacity = (score) => {
        if (score >= 90) return '1'
        if (score >= 80) return '0.85'
        if (score >= 70) return '0.65'
        return '0.5'
    }

    const hasSavedResults = savedResults.length > 0

    return (
        <div className="home-dashboard">
            {/* Header */}
            <header className="home-header">
                <div className="home-header-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 className="home-header-title">Health Dashboard</h2>
                <button className="home-header-notif" aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </header>

            {/* Scrollable Main */}
            <main className="home-main">

                {/* ── Weekly Health Index Card ── */}
                <section className="home-section">
                    <div className="home-card home-card--chart">
                        <div className="home-card__header-row">
                            <div>
                                <p className="home-label">Weekly Health Index</p>
                                {hasSavedResults ? (
                                    <h3 className="home-metric-value">{weeklyIndex}%</h3>
                                ) : (
                                    <h3 className="home-metric-value home-metric-value--empty">—</h3>
                                )}
                            </div>
                            {hasSavedResults && trend !== null && (
                                <span className={`home-badge ${trend >= 0 ? 'home-badge--positive' : 'home-badge--negative'}`}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        {trend >= 0
                                            ? <path d="M22 7l-8.5 8.5-5-5L2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            : <path d="M22 17l-8.5-8.5-5 5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        }
                                    </svg>
                                    {trend >= 0 ? '+' : ''}{trend}%
                                </span>
                            )}
                        </div>

                        {/* Sparkline Chart */}
                        <div className="home-chart-wrap">
                            {hasSavedResults && chartResults.length > 1 ? (
                                <svg
                                    width="100%"
                                    height="120"
                                    viewBox="0 0 478 150"
                                    preserveAspectRatio="none"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d={area} fill="url(#home-gradient)" />
                                    <path d={line} stroke="var(--Primary-400)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="home-gradient" x1="236" y1="0" x2="236" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="var(--Primary-400)" stopOpacity="0.25" />
                                            <stop offset="1" stopColor="var(--Primary-400)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                /* Placeholder chart when no data */
                                <svg width="100%" height="120" viewBox="0 0 478 150" preserveAspectRatio="none" fill="none">
                                    <path
                                        d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C126 93 126 33 144 33C162 33 162 101 180 101C198 101 198 61 216 61C234 61 234 45 252 45C270 45 270 121 288 121C306 121 306 149 324 149C342 149 342 11 360 11C378 11 378 81 396 81C414 81 414 129 432 129C450 129 450 25 468 25V149H0V109Z"
                                        fill="url(#home-gradient-placeholder)"
                                    />
                                    <path
                                        d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C126 93 126 33 144 33C162 33 162 101 180 101C198 101 198 61 216 61C234 61 234 45 252 45C270 45 270 121 288 121C306 121 306 149 324 149C342 149 342 11 360 11C378 11 378 81 396 81C414 81 414 129 432 129C450 129 450 25 468 25"
                                        stroke="var(--Primary-400)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="home-gradient-placeholder" x1="236" y1="0" x2="236" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="var(--Primary-400)" stopOpacity="0.15" />
                                            <stop offset="1" stopColor="var(--Primary-400)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            )}
                        </div>

                        {/* Day labels */}
                        <div className="home-chart-labels">
                            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                <span key={day} className="home-chart-label">{day}</span>
                            ))}
                        </div>
                    </div>

                    {/* ── 2-col metric grid ── */}
                    <div className="home-metrics-grid">
                        {/* Heart Rate */}
                        <div className="home-metric-card">
                            <div className="home-metric-card__label-row">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="home-metric-card__label">Heart Rate</span>
                            </div>
                            <p className="home-metric-card__value">72 <span className="home-metric-card__unit">bpm</span></p>
                        </div>

                        {/* Steps — highlighted */}
                        <div className="home-metric-card home-metric-card--highlighted">
                            <div className="home-metric-card__bg-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0zM7 20l3-8 3 3 2-5 2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="home-metric-card__label-row home-metric-card__label-row--primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0zM7 20l3-8 3 3 2-5 2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="home-metric-card__label">Steps</span>
                            </div>
                            <p className="home-metric-card__value">12.4k <span className="home-metric-card__unit">/ 10k</span></p>
                        </div>

                        {/* Sleep — highlighted */}
                        <div className="home-metric-card home-metric-card--highlighted">
                            <div className="home-metric-card__bg-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="home-metric-card__label-row home-metric-card__label-row--primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="home-metric-card__label">Sleep</span>
                            </div>
                            <p className="home-metric-card__value">8h 15m</p>
                        </div>

                        {/* Calories */}
                        <div className="home-metric-card">
                            <div className="home-metric-card__label-row">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-4.5-5-9-5-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="home-metric-card__label">Calories</span>
                            </div>
                            <p className="home-metric-card__value">2,100 <span className="home-metric-card__unit">kcal</span></p>
                        </div>
                    </div>
                </section>

                {/* ── Today's Check CTA ── */}
                <section className="home-section home-section--no-top-pad">
                    <div className="home-cta-card">
                        <div className="home-cta-card__bg-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="home-cta-card__content">
                            <h3 className="home-cta-card__title">Today's Check</h3>
                            <p className="home-cta-card__subtitle">Maintain your current health streak.</p>
                            <button className="home-cta-card__btn" onClick={onStartCheck}>
                                Start Now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Recent Results ── */}
                <section className="home-section home-section--results">
                    <div className="home-results-header">
                        <h3 className="home-results-title">Recent Results</h3>
                        <button className="home-results-view-all">View All</button>
                    </div>

                    {hasSavedResults ? (
                        <div className="home-results-list">
                            {savedResults.slice(0, 4).map((result, index) => (
                                <div key={index} className="home-result-item">
                                    <div className="home-result-item__meta">
                                        <h4 className="home-result-item__label">{getScoreLabel(result.score)}</h4>
                                        <span className="home-result-item__date">
                                            {formatDate(result.date)} · {formatTime(result.date)}
                                        </span>
                                    </div>
                                    <div className="home-result-item__bar-row">
                                        <div className="home-result-item__bar-track">
                                            <div
                                                className="home-result-item__bar-fill"
                                                style={{
                                                    width: `${result.score}%`,
                                                    opacity: getScoreOpacity(result.score)
                                                }}
                                            />
                                        </div>
                                        <span className="home-result-item__score">{result.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="home-results-empty">
                            <div className="home-results-empty__icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="home-results-empty__title">No results yet</p>
                            <p className="home-results-empty__subtitle">Complete your first check to see your health results here.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Bottom Nav */}
            <nav className="home-nav">
                <button
                    className={`home-nav__item ${activeNav === 'home' ? 'home-nav__item--active' : ''}`}
                    onClick={() => setActiveNav('home')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Home</span>
                </button>
                <button
                    className={`home-nav__item ${activeNav === 'trends' ? 'home-nav__item--active' : ''}`}
                    onClick={() => setActiveNav('trends')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Trends</span>
                </button>
                <button
                    className={`home-nav__item ${activeNav === 'assess' ? 'home-nav__item--active' : ''}`}
                    onClick={() => setActiveNav('assess')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Assess</span>
                </button>
                <button
                    className={`home-nav__item ${activeNav === 'profile' ? 'home-nav__item--active' : ''}`}
                    onClick={() => {
                        setActiveNav('profile')
                        if (onNavigate) onNavigate('profile')
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    )
}

export default HomeDashboard
