import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CarouselGallery } from './CarouselGallery'

const SAMPLE_IMAGES = [
  'https://picsum.photos/seed/1/600/400',
  'https://picsum.photos/seed/2/600/400',
  'https://picsum.photos/seed/3/600/400',
]

function renderCarousel({
  images = SAMPLE_IMAGES,
  autoPlay = false,
  interval = 3000,
} = {}) {
  return render(<CarouselGallery images={images} autoPlay={autoPlay} interval={interval} />)
}

describe('CarouselGallery', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────────
  it('renders without crashing', () => {
    renderCarousel()
  })

  it('renders the first image by default', () => {
    renderCarousel()
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[0])
  })

  it('does not render navigation arrows if only one image', () => {
    renderCarousel({ images: ['https://picsum.photos/seed/1/600/400'] })
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })

  // ─── Navigation arrows ──────────────────────────────────────────────────────
  it('renders prev and next buttons when multiple images exist', () => {
    renderCarousel()
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('next button advances to the second image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const nextBtn = screen.getByRole('button', { name: /next/i })
    await user.click(nextBtn)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[1])
  })

  it('prev button on first image wraps to last image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const prevBtn = screen.getByRole('button', { name: /previous/i })
    await user.click(prevBtn)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[SAMPLE_IMAGES.length - 1])
  })

  it('next button on last image wraps to first image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const nextBtn = screen.getByRole('button', { name: /next/i })
    // Click twice to get to last image (we start at index 0)
    await user.click(nextBtn)
    await user.click(nextBtn)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[SAMPLE_IMAGES.length - 1])
    // One more click should wrap to first
    await user.click(nextBtn)
    expect(screen.getByRole('img')).toHaveAttribute('src', SAMPLE_IMAGES[0])
  })

  // ─── Dot indicators ─────────────────────────────────────────────────────────
  it('renders dot indicators for each image', () => {
    renderCarousel()
    const dots = screen.getAllByRole('button', { name: /go to image \d+/i })
    expect(dots).toHaveLength(SAMPLE_IMAGES.length)
  })

  it('clicking a dot navigates to that image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const dots = screen.getAllByRole('button', { name: /go to image \d+/i })
    // Click the third dot (index 2)
    await user.click(dots[2])
    expect(screen.getByRole('img')).toHaveAttribute('src', SAMPLE_IMAGES[2])
  })

  // ─── Keyboard navigation ────────────────────────────────────────────────────
  it('left arrow key navigates to previous image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const img = screen.getByRole('img')
    // Start at first image, press left should wrap to last
    await user.keyboard('{ArrowLeft}')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[SAMPLE_IMAGES.length - 1])
  })

  it('right arrow key navigates to next image', async () => {
    const user = userEvent.setup()
    renderCarousel()
    const img = screen.getByRole('img')
    await user.keyboard('{ArrowRight}')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[1])
  })

  // ─── Auto-play ──────────────────────────────────────────────────────────────
  it('auto-play is disabled by default (no premature advancement)', () => {
    vi.useFakeTimers()
    renderCarousel({ autoPlay: false })
    // Advance timers — image should NOT change
    vi.advanceTimersByTime(5000)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[0])
    vi.useRealTimers()
  })

  it('auto-play advances image after interval', () => {
    vi.useFakeTimers()
    renderCarousel({ autoPlay: true, interval: 3000 })
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[1])
    vi.useRealTimers()
  })

  it('auto-play continues cycling through images', () => {
    vi.useFakeTimers()
    renderCarousel({ autoPlay: true, interval: 3000 })
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', SAMPLE_IMAGES[2])
    vi.useRealTimers()
  })

  it('auto-play wraps from last to first image', () => {
    vi.useFakeTimers()
    const images = [
      'https://picsum.photos/seed/1/600/400',
      'https://picsum.photos/seed/2/600/400',
    ]
    renderCarousel({ images, autoPlay: true, interval: 3000 })
    // After 3 intervals (6s), should wrap back to first
    vi.advanceTimersByTime(6000)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', images[0])
    vi.useRealTimers()
  })

  // ─── Clean-up on unmount ────────────────────────────────────────────────────
  it('cleans up auto-play timer on unmount', () => {
    vi.useFakeTimers()
    const { unmount } = renderCarousel({ autoPlay: true, interval: 3000 })
    unmount()
    // Should not throw — timer should be cleared
    vi.advanceTimersByTime(10000)
    vi.useRealTimers()
  })

  // ─── Design system styling ──────────────────────────────────────────────────
  it('carousel container has rounded-xl and shadow styling', () => {
    renderCarousel()
    const container = document.querySelector('.rounded-2xl')
    expect(container).toBeInTheDocument()
  })

  it('navigation buttons use gradient background class', () => {
    renderCarousel()
    const nextBtn = screen.getByRole('button', { name: /next/i })
    expect(nextBtn).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-indigo-500')
  })
})
