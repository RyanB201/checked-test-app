import React, { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './ScreenLoader.css'

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
                    src="https://lottie.host/4fc46233-a063-4441-828f-efd9e2f6ead6/DSMpmk2QOv.lottie"
                    loop
                    autoplay
                    className="lottie-animation"
                />
            </div>
        </div>
    )
}

export default ScreenLoader
