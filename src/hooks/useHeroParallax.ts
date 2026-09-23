import { useEffect, useRef } from 'react'

function canUseParallax(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (!window.matchMedia('(min-width: 768px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

/** Parallax leve no Y do fundo do hero (desktop + motion ok). */
export function useHeroParallax() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!canUseParallax()) return

    const section = sectionRef.current
    const media = imageRef.current
    if (!section || !media) return

    let frame = 0

    function update() {
      frame = 0
      if (!section || !media) return

      const rect = section.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.bottom < 0 || rect.top > viewH) return

      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH
      const offset = progress * 36
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`
    }

    function onScroll() {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
      media.style.transform = ''
    }
  }, [])

  return { sectionRef, imageRef }
}
