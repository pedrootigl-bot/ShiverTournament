import { useInView } from '../hooks/useInView'
import { SectionEdgeGradients } from './SectionEdgeGradients'

const legalLinks = [
  { href: '#', label: 'Termos de uso' },
  { href: '#', label: 'Política de privacidade' },
  { href: '#', label: 'Suporte' },
] as const

const socialLinks = [
  {
    href: '#',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.9-6.4L5.5 22H2.7l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3.5 9.5h3V21h-3V9.5zM9.5 9.5h2.9v1.6h.04c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V21h-3v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-3V9.5z" />
      </svg>
    ),
  },
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
          <a href="/" className="shrink-0" aria-label="Shiver Broker">
            <img
              src="/brand/shiver-logo.png"
              alt="Shiver Broker"
              className="h-12 w-auto max-w-[12rem] object-contain sm:h-14 sm:max-w-[14rem] md:h-16 lg:h-20"
            />
          </a>
          <p className="max-w-xs font-sans text-sm text-[#8a9bb0]">
            Trading com mais oportunidades.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 sm:gap-6 lg:flex-row lg:gap-7">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5"
            aria-label="Links legais"
          >
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-[#9aabbf] transition-colors duration-200 hover:text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white transition-opacity duration-200 hover:opacity-70"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

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
