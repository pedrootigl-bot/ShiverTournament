import { useCallback, useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { SectionEdgeGradients } from './SectionEdgeGradients'

const COUPON_CODE = 'TORNEIOSHARK'

function IconCoins() {
  return (
    <svg className="h-10 w-10 text-[#3aa0ff]" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="36" rx="14" ry="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 36V28c0-2.8 6.3-5 14-5s14 2.2 14 5v8" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="28" rx="14" ry="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 28V20c0-2.8 6.3-5 14-5s14 2.2 14 5v8" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="20" rx="14" ry="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 20V14c0-2.8 6.3-5 14-5s14 2.2 14 5v6" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="14" rx="14" ry="5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg className="h-10 w-10 text-[#3aa0ff]" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 6 10 12v12c0 10.5 6.4 17.2 14 20 7.6-2.8 14-9.5 14-20V12L24 6Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="m18 24 5 5 8-10"
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChart() {
  return (
    <svg className="h-10 w-10 text-[#3aa0ff]" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 40V20h8v20H8Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="2" />
      <path d="M20 40V12h8v28h-8Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" />
      <path d="M32 40V8h8v32h-8Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconTarget() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#3aa0ff]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
      <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function CouponButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const timeoutId = window.setTimeout(() => {
      setCopied(false)
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [copied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(COUPON_CODE)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`coupon-btn mt-3 inline-flex min-h-[1.85rem] min-w-[9.5rem] cursor-pointer items-center justify-center gap-1.5 rounded-md border px-3 py-1 text-xs font-bold tracking-wide transition-all duration-300 ease-out ${
        copied
          ? 'coupon-btn--copied border-[#3dcf7a] bg-[#3dcf7a] text-[#07111d]'
          : 'border-[#3aa0ff] bg-transparent text-[#3aa0ff] hover:bg-[#3aa0ff]/10'
      }`}
      aria-label={copied ? 'Cupom copiado' : `Copiar cupom ${COUPON_CODE}`}
      aria-live="polite"
    >
      {copied ? (
        <>
          <svg
            className="coupon-btn__check h-3.5 w-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8.5 6.5 11.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Cupom copiado!</span>
        </>
      ) : (
        <span>{COUPON_CODE}</span>
      )}
    </button>
  )
}


const steps = [
  {
    number: 1,
    icon: <IconCoins />,
    content: (
      <>
        <p className="text-left text-sm leading-snug text-white sm:text-[0.95rem]">
          Deposite R$200 ou mais com o cupom
        </p>
        <CouponButton />
      </>
    ),
  },
  {
    number: 2,
    icon: <IconShield />,
    content: (
      <p className="text-left text-sm leading-snug text-white sm:text-[0.95rem]">
        Receba <strong className="font-bold">1 negociação protegida</strong> de
        até <strong className="font-bold">R$70</strong>
      </p>
    ),
  },
  {
    number: 3,
    icon: <IconChart />,
    content: (
      <p className="text-left text-sm leading-snug text-white sm:text-[0.95rem]">
        A cada negociação na corretora, com saldo real, você ganha{' '}
        <strong className="font-bold">20 pontos</strong>
      </p>
    ),
  },
] as const

type StepItem = (typeof steps)[number]

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : false,
  )

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    function update() {
      setIsMdUp(media.matches)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMdUp
}

function ParticiparStep({
  step,
  index,
  sectionInView,
  unlocked,
  onRevealed,
}: {
  step: StepItem
  index: number
  sectionInView: boolean
  unlocked: boolean
  onRevealed: (index: number) => void
}) {
  const isMdUp = useIsMdUp()
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.35,
    rootMargin: '0px 0px -18% 0px',
  })

  const delayClass =
    index === 0
      ? 'reveal-delay-2'
      : index === 1
        ? 'reveal-delay-3'
        : 'reveal-delay-4'

  const show = isMdUp ? sectionInView : unlocked && isInView

  useEffect(() => {
    if (show) onRevealed(index)
  }, [show, index, onRevealed])

  return (
    <div
      ref={ref}
      className={`reveal h-full ${isMdUp ? delayClass : ''} ${show ? 'is-inview' : ''}`}
    >
      <article className="hover-lift relative flex h-full min-h-[9.5rem] flex-col justify-center rounded-2xl border border-[#2a5a9a]/80 bg-[#0b1a2e] px-4 pb-6 pt-10 sm:min-h-[10.5rem] sm:px-5">
        <span className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3aa0ff] text-sm font-extrabold text-[#07111d]">
          {step.number}
        </span>

        <div className="flex flex-1 items-center gap-3 sm:gap-4">
          <div className="flex shrink-0 items-center justify-center [&_svg]:h-9 [&_svg]:w-9 sm:[&_svg]:h-10 sm:[&_svg]:w-10">
            {step.icon}
          </div>

          <div
            className="h-12 w-px shrink-0 self-stretch bg-[#3aa0ff]/45 sm:h-14"
            aria-hidden="true"
          />

          <div className="min-w-0 flex-1">{step.content}</div>
        </div>
      </article>
    </div>
  )
}

export function ComoParticipar() {
  const { ref, isInView } = useInView<HTMLElement>()
  const inview = isInView ? 'is-inview' : ''
  const isMdUp = useIsMdUp()
  const [revealedCount, setRevealedCount] = useState(0)

  const handleStepRevealed = useCallback((index: number) => {
    setRevealedCount((current) => Math.max(current, index + 1))
  }, [])

  const tipVisible = isMdUp ? isInView : revealedCount >= steps.length

  return (
    <section
      ref={ref}
      id="como-participar"
      className="relative scroll-mt-24 overflow-x-clip bg-[#07111d] px-4 py-14 sm:scroll-mt-28 sm:px-6 sm:py-24"
    >
      <SectionEdgeGradients color="#050d16" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p
          className={`reveal mb-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#6aa8ff] sm:text-sm ${inview}`}
        >
          Como participar
        </p>
        <h2
          className={`reveal reveal-delay-1 font-display text-[clamp(2.25rem,6vw,4rem)] uppercase leading-none tracking-[0.02em] text-white ${inview}`}
        >
          Em 3 passos simples
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-10 grid max-w-5xl items-stretch gap-8 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
        {steps.map((step, index) => (
          <ParticiparStep
            key={step.number}
            step={step}
            index={index}
            sectionInView={isInView}
            unlocked={index === 0 || revealedCount >= index}
            onRevealed={handleStepRevealed}
          />
        ))}
      </div>

      <div
        className={`reveal ${isMdUp ? 'reveal-delay-5' : ''} relative z-10 mx-auto mt-10 flex max-w-3xl items-start justify-center gap-2.5 px-1 sm:mt-12 sm:items-center ${
          tipVisible ? 'is-inview' : ''
        }`}
      >
        <IconTarget />
        <p className="text-left text-sm leading-snug text-[#8eb4e0] sm:text-center sm:text-[0.95rem]">
          Acumule pontos e prove que você é um dos traders de elite da Shiver.
        </p>
      </div>
    </section>
  )
}
