import { useEffect, useRef, useState, type AnimationEvent } from 'react'
import { SectionEdgeGradients } from './SectionEdgeGradients'

const prizes = [
  {
    place: 2,
    src: '/premios/2-lugar.png',
    alt: '2º Lugar — R$10 mil reais',
    widthClass: 'basis-0 grow-[0.95]',
  },
  {
    place: 1,
    src: '/premios/1-lugar.png',
    alt: '1º Lugar — Viagem internacional all inclusive para 2 pessoas',
    widthClass: 'basis-0 grow',
  },
  {
    place: 3,
    src: '/premios/3-lugar.png',
    alt: '3º Lugar — R$4 mil reais',
    widthClass: 'basis-0 grow-[0.9]',
  },
] as const

export function Premios() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [pulsingPlaces, setPulsingPlaces] = useState<number[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  function handleEnterEnd(event: AnimationEvent<HTMLElement>, place: number) {
    if (event.animationName !== 'prize-enter') return

    setPulsingPlaces((current) =>
      current.includes(place) ? current : [...current, place],
    )
  }

  return (
    <section
      ref={sectionRef}
      id="premios"
      className="relative scroll-mt-24 overflow-x-clip px-4 pb-14 pt-10 sm:scroll-mt-28 sm:px-6 sm:pb-20 sm:pt-14"
    >
      <img
        src="/premios/section-bg.jpg"
        alt=""
        width={1400}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,13,22,0.72) 0%, rgba(5,13,22,0.45) 40%, rgba(5,13,22,0.78) 100%)',
        }}
        aria-hidden="true"
      />
      <SectionEdgeGradients color="#050d16" />

      <div className="relative z-20 mx-auto max-w-6xl text-center">
        <p
          className={`reveal mb-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#7eb6ff] sm:text-sm ${
            isVisible ? 'is-inview' : ''
          }`}
        >
          Top 3 traders
        </p>
        <h2
          className={`reveal reveal-delay-1 font-display text-[clamp(2.15rem,8vw,4.5rem)] uppercase leading-none tracking-[0.02em] text-white ${
            isVisible ? 'is-inview' : ''
          }`}
        >
          Prêmios incríveis
        </h2>
      </div>

      <div className="relative z-20 mx-auto mt-4 w-full max-w-5xl px-1 pt-5 sm:mt-8 sm:px-2 sm:pt-6 md:mt-10 md:pt-8">
        <div className="flex w-full -translate-y-2 items-end justify-center gap-1 sm:-translate-y-3 sm:gap-3 md:-translate-y-4 md:gap-5 lg:-translate-y-5">
          {prizes.map((prize) => (
            <article
              key={prize.place}
              data-place={prize.place}
              onAnimationEnd={(event) => handleEnterEnd(event, prize.place)}
              className={`prize-card flex min-w-0 max-w-[11rem] flex-col items-center sm:max-w-[15rem] md:max-w-[18rem] ${prize.widthClass} ${
                prize.place === 1 ? '-translate-y-1 sm:-translate-y-2' : ''
              } ${isVisible ? 'is-visible' : ''} ${pulsingPlaces.includes(prize.place) ? 'is-pulsing' : ''}`}
            >
              <img
                src={prize.src}
                alt={prize.alt}
                width={560}
                height={747}
                loading="lazy"
                decoding="async"
                className="h-auto w-full origin-bottom bg-transparent object-contain"
              />
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-2 w-full max-w-3xl sm:-mt-4 md:-mt-10 lg:-mt-12">
        <div className="flex items-start gap-3 rounded-2xl border border-[#3d5a80]/70 bg-[#0b1a2e]/95 px-3.5 py-3.5 sm:items-center sm:gap-4 sm:rounded-full sm:px-6 sm:py-4">
          <svg
            className="mt-0.5 h-6 w-6 shrink-0 text-[#e8c547] sm:mt-0 sm:h-7 sm:w-7"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7 4h10v2h2.5a1.5 1.5 0 0 1 1.5 1.5V9a4.5 4.5 0 0 1-4.05 4.48A5.002 5.002 0 0 1 13 16.9V18h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-1.1a5.002 5.002 0 0 1-4.45-3.42A4.5 4.5 0 0 1 2.5 9V7.5A1.5 1.5 0 0 1 4 6h3V4Zm0 4H4.5V9a2.5 2.5 0 0 0 2.2 2.48A4.98 4.98 0 0 1 7 8Zm10 0a4.98 4.98 0 0 1 .3 3.48A2.5 2.5 0 0 0 19.5 9V8H17Z" />
          </svg>
          <p className="min-w-0 text-left text-sm leading-snug text-[#9eb4cc] sm:text-[0.95rem]">
            Demais traders concorrem a{' '}
            <strong className="font-bold text-white">R$10 Mil</strong> em prêmios
            divididos no final da campanha.
          </p>
        </div>
      </div>
    </section>
  )
}
