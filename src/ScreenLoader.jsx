import React, { useState, useEffect } from 'react'
import './ScreenLoader.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function ScreenLoader({ onLoadComplete, duration = 3000 }) {
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
        // Start fade out before calling onLoadComplete
        const fadeTimer = setTimeout(() => {
            setIsFading(true)
        }, duration - 500) // Start fading 500ms before the end

        // Call onLoadComplete after the full duration
        const completeTimer = setTimeout(() => {
            if (onLoadComplete) {
                onLoadComplete()
            }
        }, duration)

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(completeTimer)
        }
    }, [duration, onLoadComplete])

    return (
        <div className={`screen-loader-page ${isFading ? 'fade-out' : ''}`}>
            <div className="screen-loader-container">
                <DotLottieReact
                    src="/screen-loader.json"
                    loop
                    autoplay
                    className="screen-loader-animation"
                />
            </div>
        </div>
    )
}

export default ScreenLoader
