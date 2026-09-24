import { PARTICIPATE_URL } from '../constants'
import { useInView } from '../hooks/useInView'
import { publicUrl } from '../lib/publicUrl'
import { SectionEdgeGradients } from './SectionEdgeGradients'

export function CtaBanner() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.2 })
  const inview = isInView ? 'is-inview' : ''

  return (
    <section
      ref={ref}
      className="relative overflow-x-clip bg-[#07111d] px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:pb-24"
    >
      <SectionEdgeGradients top bottom color="#050d16" />

      <div className={`reveal relative z-10 mx-auto max-w-5xl ${inview}`}>
        <div
          className="flex flex-col items-center gap-4 overflow-hidden rounded-2xl border px-4 py-5 sm:gap-5 sm:px-6 sm:py-6 md:flex-row md:gap-6 md:px-7"
          style={{
            borderColor: '#4DA3FF',
            backgroundColor: 'rgba(8, 16, 28, 0.95)',
            boxShadow: '0 0 16px rgba(77, 163, 255, 0.2)',
          }}
        >
          <a
            href="#topo"
            className="brand-logo shrink-0"
            aria-label="Ir para o início"
          >
            <img
              src={publicUrl('/brand/shiver-logo.png')}
              alt="Shiver Broker"
              width={224}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto max-w-[12rem] object-contain sm:h-14 sm:max-w-[14rem] md:h-16 lg:h-20"
            />
          </a>
          <p className="min-w-0 flex-1 text-center font-sans text-sm font-semibold leading-snug text-white sm:text-base md:text-left md:text-lg">
            Entre agora, suba no ranking e conquiste
            <br className="hidden sm:block" />{' '}
            seu lugar entre os grandes tubarões da Shiver.
          </p>

          <a
            href={PARTICIPATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-idle-pulse hover-lift inline-flex w-full max-w-xs shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4DA3FF] px-5 py-3 font-sans text-xs font-bold uppercase tracking-wide text-[#07111d] transition-colors duration-200 hover:bg-[#6bb4ff] sm:w-auto sm:text-sm"
          >
            Quero participar
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
