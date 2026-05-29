import { useState, useEffect, useCallback, useRef } from 'react'

interface CarouselGalleryProps {
  images: string[]
  autoPlay?: boolean
  interval?: number
}

export function CarouselGallery({
  images,
  autoPlay = false,
  interval = 3000,
}: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index)
    },
    []
  )

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    if (autoPlay && images.length > 1) {
      timerRef.current = setInterval(goToNext, interval)
    }
  }, [autoPlay, interval, goToNext, stopAutoPlay, images.length])

  useEffect(() => {
    startAutoPlay()
    return stopAutoPlay
  }, [startAutoPlay, stopAutoPlay])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  if (images.length === 0) {
    return null
  }

  const showNavigation = images.length > 1

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 transition-all duration-300">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 object-cover transition-all duration-300"
        />

        {/* Navigation arrows */}
        {showNavigation && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {showNavigation && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 w-4'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
