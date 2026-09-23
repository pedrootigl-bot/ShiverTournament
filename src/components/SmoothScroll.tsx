import { useEffect, useState, type ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import { shouldEnableSmoothScroll } from '../lib/network'
import 'lenis/dist/lenis.css'

/** Scroll suave só em desktop com conexão ok; desliga no mobile. */
export function SmoothScroll({ children }: { children?: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(shouldEnableSmoothScroll())
    sync()

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)

    type NetworkConnection = EventTarget & {
      addEventListener: (type: string, listener: () => void) => void
      removeEventListener: (type: string, listener: () => void) => void
    }

    const connection = (
      navigator as Navigator & { connection?: NetworkConnection }
    ).connection

    connection?.addEventListener('change', sync)

    return () => {
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
      connection?.removeEventListener('change', sync)
    }
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
