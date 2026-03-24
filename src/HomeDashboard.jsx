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
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

    const getScoreIcon = (score) => {
        if (score >= 90) return 'sentiment_very_satisfied'
        if (score >= 80) return 'sentiment_satisfied'
        if (score >= 70) return 'sentiment_neutral'
        if (score >= 60) return 'sentiment_dissatisfied'
        return 'sentiment_very_dissatisfied'
    }

    const hasSavedResults = savedResults.length > 0

    return (
        <div className="relative mx-auto max-w-[430px] min-h-screen bg-white dark:bg-background-dark flex flex-col border-x border-slate-100 shadow-sm">
            <header className="flex items-center bg-white/90 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-10 px-6 py-5 justify-between border-b border-slate-100 dark:border-slate-800">
                <button
                    onClick={() => {
                        setActiveNav('profile')
                        if (onNavigate) onNavigate('profile')
                    }}
                    className="text-slate-600 dark:text-slate-300 flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-100 cursor-pointer bg-transparent hover:bg-slate-50 transition-colors"
                >
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
                <h2 className="text-slate-800 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">Checked</h2>
                <div className="flex w-10 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-slate-600 dark:text-slate-300 border border-slate-100 cursor-pointer transition-colors hover:bg-slate-50">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-28">
                {/* Weekly Health Index Section */}
                <section className="px-6 pt-8 pb-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-slate-400 dark:text-slate-400 text-sm font-medium mb-1">Weekly Health Index</p>
                                {hasSavedResults ? (
                                    <h3 className="text-4xl font-bold font-display text-slate-800 dark:text-slate-100">{weeklyIndex}%</h3>
                                ) : (
                                    <h3 className="text-4xl font-bold font-display text-slate-800 dark:text-slate-100">—</h3>
                                )}
                            </div>
                            {hasSavedResults && trend !== null && (
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border ${trend >= 0 ? 'bg-teal-50 dark:bg-primary/10 text-primary border-teal-100 dark:border-primary/20' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    <span className="material-symbols-outlined text-sm">{trend >= 0 ? 'trending_up' : 'trending_down'}</span>
                                    {trend >= 0 ? '+' : ''}{trend}%
                                </span>
                            )}
                        </div>

                        <div className="flex min-h-[160px] flex-col gap-5">
                            {hasSavedResults && chartResults.length > 1 ? (
                                <svg fill="none" height="120" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                    <path d={area} fill="url(#paint0_linear)"></path>
                                    <path d={line} stroke="#14b8a6" strokeLinecap="round" strokeWidth="3"></path>
                                    <defs>
                                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                                            <stop stopColor="#14b8a6" stopOpacity="0.15"></stop>
                                            <stop offset="1" stopColor="#14b8a6" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            ) : (
                                <svg fill="none" height="120" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 11 363.077 11C381.231 11 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear)"></path>
                                    <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 11 363.077 11C381.231 11 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#14b8a6" strokeOpacity="0.3" strokeLinecap="round" strokeWidth="3"></path>
                                    <defs>
                                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                                            <stop stopColor="#14b8a6" stopOpacity="0.05"></stop>
                                            <stop offset="1" stopColor="#14b8a6" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            )}

                            <div className="flex justify-between px-2">
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                    <p key={day} className="text-slate-400 text-[10px] font-semibold tracking-wide">{day}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Keep current streak / Start check CTA */}
                <section className="px-6 py-4">
                    <div className="home-cta-card-custom relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-md">
                        <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] dark:opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl text-primary">health_and_safety</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-slate-800 dark:text-slate-100 text-xl font-bold font-display mb-3">Ready for today's check?</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-[240px] leading-relaxed">Complete your daily health assessment to maintain your streak and track trends.</p>
                            <button onClick={onStartCheck} className="start-assessment-btn">
                                <span>Start New Assessment</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                    <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Recent Results */}
                <section className="p-6 pt-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100">Recent Results</h3>
                        <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors cursor-pointer bg-transparent border-none">View All</button>
                    </div>

                    {hasSavedResults ? (
                        <div className="space-y-4">
                            {savedResults.slice(0, 4).map((result, idx) => (
                                <div key={idx} className="flex items-center gap-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:border-slate-200">
                                    <div className={`size-12 rounded-full border flex items-center justify-center ${result.score >= 80 ? 'bg-slate-50 border-slate-100 text-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                        <span className="material-symbols-outlined">{getScoreIcon(result.score)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100 font-display text-sm mb-1">{getScoreLabel(result.score)}</h4>
                                        <p className="text-xs text-slate-400">{formatDate(result.date)} • {formatTime(result.date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xl font-bold font-display ${result.score >= 80 ? 'text-teal-600' : 'text-slate-600'}`}>{result.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-10 flex flex-col items-center justify-center text-center">
                            <div className="size-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
                                <span className="material-symbols-outlined text-3xl">medical_information</span>
                            </div>
                            <h4 className="text-slate-800 dark:text-slate-100 font-bold mb-2">No results yet</h4>
                            <p className="text-slate-500 text-sm max-w-[200px]">Take your first health assessment to start tracking trends.</p>
                        </div>
                    )}
                </section>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl pb-8 pt-4 flex justify-around items-center z-20">
                <button
                    onClick={() => setActiveNav('home')}
                    className={`flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none ${activeNav === 'home' ? '' : 'text-slate-400 hover:text-slate-600'}`}
                    style={activeNav === 'home' ? { color: 'var(--Primary-600)' } : undefined}
                >
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Home</span>
                </button>
                <button
                    onClick={() => {
                        setActiveNav('profile')
                        if (onNavigate) onNavigate('profile')
                    }}
                    className={`flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none ${activeNav === 'profile' ? '' : 'text-slate-400 hover:text-slate-600'}`}
                    style={activeNav === 'profile' ? { color: 'var(--Primary-600)' } : undefined}
                >
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Profile</span>
                </button>
            </nav>
        </div>
    )
}

export default HomeDashboard
