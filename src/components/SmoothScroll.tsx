import { useEffect, useState, type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

/** Scroll suave leve; desliga com prefers-reduced-motion. */
export function SmoothScroll({ children }: { children?: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (!enabled) return <>{children ?? null}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.05,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
