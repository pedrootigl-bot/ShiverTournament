import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { SectionEdgeGradients } from './SectionEdgeGradients'

const legalLinks = [
  { href: '/termos-de-uso', label: 'Termos de uso' },
  { href: '/politica-de-privacidade', label: 'Política de privacidade' },
] as const

export function Footer() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 })
  const inview = isInView ? 'is-inview' : ''

  return (
    <footer ref={ref} className="relative overflow-x-clip bg-[#040a12]">
      <SectionEdgeGradients top bottom={false} color="#050d16" />
      <div
        className={`reveal relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-8 text-center sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-7 lg:text-left ${inview}`}
      >
        <div className="flex min-w-0 flex-col items-center gap-3 sm:gap-4 lg:items-start">
          <Link
            to="/#topo"
            className="brand-logo shrink-0"
            aria-label="Ir para o início"
          >
            <img
              src="/brand/shiver-logo.png"
              alt="Shiver Broker"
              className="h-12 w-auto max-w-[12rem] object-contain sm:h-14 sm:max-w-[14rem] md:h-16 lg:h-20"
            />
          </Link>
          <p className="max-w-xs font-sans text-sm text-[#8a9bb0]">
            Trading com mais oportunidades.
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5"
          aria-label="Links legais"
        >
          {legalLinks.map((link) => (
            <Link key={link.label} to={link.href} className="footer-legal-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="font-display text-[1.15rem] uppercase leading-[1.05] tracking-[0.08em] text-[#4DA3FF] sm:text-[1.35rem] lg:text-right lg:text-[1.45rem]">
          Traders
          <br />
          movem
          <br />
          grandes
          <br />
          histórias.
        </p>
      </div>
    </footer>
  )
}
