import React, { useState, useRef, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './ProfilePage.css'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ProfilePage({ user, demographics, onBack, onNavigate, onSaveProfile, onLogout }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const fileInputRef = useRef(null)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [localAvatar, setLocalAvatar] = useState(user?.user_metadata?.avatar_url || null)

    useEffect(() => {
        if (user?.user_metadata?.avatar_url) {
            setLocalAvatar(user.user_metadata.avatar_url)
        }
    }, [user])

    const handleAvatarClick = () => {
        if (!uploadingAvatar) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0]
        if (!file || !user) return

        try {
            setUploadingAvatar(true)
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}-${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName)
                
            const avatarUrl = data.publicUrl
            
            await supabase.auth.updateUser({
                data: { avatar_url: avatarUrl }
            })
            
            setLocalAvatar(avatarUrl)
        } catch (error) {
            console.error('Error uploading avatar:', error)
            alert('Error uploading avatar: ' + error.message)
        } finally {
            setUploadingAvatar(false)
        }
    }

    // form state
    const [editForm, setEditForm] = useState({
        fullName: '',
        weight: '',
        age: '',
        gender: ''
    })

    const handleNavClick = (tab) => {
        if (onNavigate) onNavigate(tab)
    }

    const fullName = user?.user_metadata?.first_name
        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim()
        : user?.user_metadata?.full_name || '-'

    const weight = demographics?.weight || '-'
    const weightUnit = demographics?.weightUnit || 'kg'
    const age = demographics?.age || '-'
    const gender = demographics?.gender || '-'

    const handleOpenEdit = () => {
        setEditForm({
            fullName: fullName === '-' ? '' : fullName,
            weight: weight === '-' ? '' : weight,
            age: age === '-' ? '' : age,
            gender: gender === '-' ? '' : gender
        })
        setIsEditOpen(true)
    }

    const handleSaveEditClick = () => {
        setIsEditOpen(false)
        setIsAlertOpen(true)
    }

    const handleConfirmSave = () => {
        if (onSaveProfile) {
            onSaveProfile(editForm)
        }
        setIsAlertOpen(false)
    }

    const handleCancelAlert = () => {
        setIsAlertOpen(false)
        setIsEditOpen(true)
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
                        {/* File input — kept offscreen (not display:none) so .click() works in all browsers */}
                        <input
                            ref={fileInputRef}
                            id="avatar-file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                opacity: 0,
                                overflow: 'hidden',
                                zIndex: -1,
                                left: '-9999px',
                                top: '-9999px',
                            }}
                        />
                        <div className="profile-avatar" style={{ position: 'relative', overflow: 'hidden' }}>
                            {localAvatar ? (
                                <img src={localAvatar} alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            ) : (
                                <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" width="96" height="96">
                                    <circle cx="48" cy="48" r="48" fill="var(--Primary-50)" />
                                    <circle cx="48" cy="38" r="16" fill="var(--Primary-200)" />
                                    <ellipse cx="48" cy="78" rx="26" ry="18" fill="var(--Primary-300)" />
                                </svg>
                            )}
                            {uploadingAvatar && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                                        <circle cx="12" cy="12" r="10" stroke="var(--Primary-200)" strokeWidth="3" />
                                        <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--Primary-600)" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {/* Use <label htmlFor> as the primary trigger — works without JS and bypasses browser security restrictions */}
                        <label
                            htmlFor="avatar-file-input"
                            className="profile-avatar-edit"
                            aria-label="Edit profile photo"
                            style={{ cursor: uploadingAvatar ? 'not-allowed' : 'pointer', pointerEvents: uploadingAvatar ? 'none' : 'auto' }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </label>
                    </div>

                    <div className="profile-identity">
                        <p className="profile-name">{fullName}</p>
                        <p className="profile-subtitle">{user?.email || 'Health Enthusiast'} · Pro Member</p>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-btn-primary" onClick={handleOpenEdit}>Edit Profile</button>
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
                        <p className="profile-stat-value">{weight}</p>
                        <p className="profile-stat-label">Weight ({weightUnit})</p>
                    </div>
                    <div className="profile-stat-card">
                        <p className="profile-stat-value">{age}</p>
                        <p className="profile-stat-label">Age</p>
                    </div>
                    <div className="profile-stat-card" style={{ textTransform: 'capitalize' }}>
                        <p className="profile-stat-value">{gender}</p>
                        <p className="profile-stat-label">Gender</p>
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
                        <button className="profile-menu__item profile-menu__item--danger" onClick={onLogout}>
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
            <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl pb-8 pt-4 flex justify-around items-center z-20">
                <button
                    onClick={() => handleNavClick('home')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none text-slate-400 hover:text-slate-600"
                >
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Home</span>
                </button>
                <button
                    onClick={() => handleNavClick('profile')}
                    className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none"
                    style={{ color: 'var(--Primary-600)' }}
                >
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Profile</span>
                </button>
            </nav>

            {/* ── Dialogs ── */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="w-[90vw] max-w-[400px] rounded-3xl p-6 border-slate-100 bg-white">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Edit Profile</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 text-left">
                        <div className="flex flex-col gap-2">
                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</Label>
                            <Input
                                className="h-12 rounded-xl border-slate-200 text-base px-4"
                                value={editForm.fullName}
                                onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</Label>
                            <Input
                                disabled
                                className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-500 text-base px-4"
                                value={user?.email || '-'}
                            />
                            <p className="text-[10px] text-slate-400 font-medium">Email cannot be changed directly.</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weight (kg)</Label>
                                <Input
                                    className="h-12 rounded-xl border-slate-200 text-base px-4"
                                    value={editForm.weight}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, weight: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Age</Label>
                                <Input
                                    className="h-12 rounded-xl border-slate-200 text-base px-4"
                                    type="number"
                                    value={editForm.age}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gender</Label>
                            <div className="flex gap-2">
                                {['Male', 'Female', 'Other'].map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setEditForm(prev => ({ ...prev, gender: option.toLowerCase() }))}
                                        className={`flex-1 h-12 rounded-xl text-sm font-semibold transition-colors border ${editForm.gender.toLowerCase() === option.toLowerCase()
                                            ? 'bg-[var(--Primary-50)] border-[var(--Primary-600)] text-[var(--Primary-600)]'
                                            : 'bg-white border-slate-200 text-slate-500'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            className="w-full h-12 rounded-xl bg-[var(--Primary-600)] text-white font-semibold text-base hover:bg-[var(--Primary-700)] transition-colors"
                            onClick={handleSaveEditClick}
                        >
                            Save Changes
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent className="w-[90vw] max-w-[400px] rounded-3xl p-6 bg-white border-slate-100 flex flex-col items-center text-center">
                    <AlertDialogHeader className="flex flex-col items-center gap-4 text-center">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--Primary-50)] text-[var(--Primary-600)] mb-2 mt-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <AlertDialogTitle className="text-xl font-bold text-slate-900 m-0">Save profile changes?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 text-[15px] leading-relaxed m-0 text-center font-medium px-2">
                            Your updated name, weight, age, and gender will be saved to your profile immediately.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="w-full flex flex-col gap-3 mt-8">
                        <button
                            className="w-full h-12 rounded-xl bg-[var(--Primary-600)] text-white font-semibold text-base hover:bg-[var(--Primary-700)] transition-colors"
                            onClick={handleConfirmSave}
                        >
                            Yes, Save Changes
                        </button>
                        <button
                            className="w-full h-12 rounded-xl bg-slate-50 text-slate-700 font-semibold text-base hover:bg-slate-100 transition-colors"
                            onClick={handleCancelAlert}
                        >
                            Go Back
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ProfilePage
