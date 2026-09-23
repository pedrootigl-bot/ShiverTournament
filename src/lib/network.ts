type NetworkConnection = {
  saveData?: boolean
  effectiveType?: string
  downlink?: number
  addEventListener?: (type: string, listener: () => void) => void
  removeEventListener?: (type: string, listener: () => void) => void
}

function getConnection(): NetworkConnection | undefined {
  if (typeof navigator === 'undefined') return undefined
  return (navigator as Navigator & { connection?: NetworkConnection }).connection
}

/** True quando a conexão é boa o bastante para mídia pesada (ex.: vídeo do hero). */
export function hasGoodConnection(): boolean {
  if (typeof window === 'undefined') return false

  const connection = getConnection()

  // Sem Network Information API (ex.: Safari) → permite vídeo; o usuário em Wi‑Fi comum se beneficia.
  if (!connection) return true

  if (connection.saveData) return false

  const type = connection.effectiveType
  if (type === 'slow-2g' || type === '2g' || type === '3g') return false

  // downlink em Mbps; valores baixos = rede fraca mesmo em "4g"
  if (typeof connection.downlink === 'number' && connection.downlink > 0 && connection.downlink < 1.5) {
    return false
  }

  return true
}

/** Evita mídia pesada com reduced-motion ou conexão ruim (mobile incluso). */
export function shouldAvoidHeavyMedia(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  return !hasGoodConnection()
}

/** Lenis/scroll suave só em desktop com conexão ok. */
export function shouldEnableSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  if (!hasGoodConnection()) return false
  return true
}
