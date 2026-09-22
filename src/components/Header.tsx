import { useEffect, useId, useState } from 'react'
import { useHeroParallax } from '../hooks/useHeroParallax'
import { useInView } from '../hooks/useInView'
import { SectionEdgeGradients } from './SectionEdgeGradients'

const navLinks = [
  { href: '#premios', label: 'Prêmios' },
  { href: '#como-participar', label: 'Como participar' },
  { href: '#ranking', label: 'Ranking' },
] as const

const highlightCards = [
  {
    title: 'R$200+',
    subtitle: 'para entrar',
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
        <ellipse cx="14" cy="26" rx="8" ry="3.2" fill="#4DA3FF" opacity="0.35" />
        <ellipse cx="14" cy="23.5" rx="8" ry="3.2" stroke="#4DA3FF" strokeWidth="1.6" />
        <ellipse cx="14" cy="20.5" rx="8" ry="3.2" stroke="#4DA3FF" strokeWidth="1.6" />
        <ellipse cx="14" cy="17.5" rx="8" ry="3.2" fill="#4DA3FF" opacity="0.2" />
        <ellipse cx="14" cy="17.5" rx="8" ry="3.2" stroke="#4DA3FF" strokeWidth="1.6" />
        <ellipse cx="26" cy="22" rx="7" ry="2.8" fill="#4DA3FF" opacity="0.35" />
        <ellipse cx="26" cy="19.8" rx="7" ry="2.8" stroke="#4DA3FF" strokeWidth="1.6" />
        <ellipse cx="26" cy="17.2" rx="7" ry="2.8" stroke="#4DA3FF" strokeWidth="1.6" />
        <ellipse cx="26" cy="14.6" rx="7" ry="2.8" fill="#4DA3FF" opacity="0.2" />
        <ellipse cx="26" cy="14.6" rx="7" ry="2.8" stroke="#4DA3FF" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: 'Negociação protegida',
    subtitle: (
      <>
        até <span className="font-bold">R$70</span>
      </>
    ),
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
        <path
          d="M20 6.5l11 4.2v8.6c0 6.4-4.2 11.4-11 13.2-6.8-1.8-11-6.8-11-13.2v-8.6L20 6.5z"
          stroke="#4DA3FF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 20.2l3.6 3.6 7.4-7.4"
          stroke="#4DA3FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: '20 pontos',
    subtitle: 'por meta de negociação',
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
        <rect x="8" y="22" width="6" height="10" rx="1.2" fill="#4DA3FF" />
        <rect x="17" y="15" width="6" height="17" rx="1.2" fill="#4DA3FF" />
        <rect x="26" y="9" width="6" height="23" rx="1.2" fill="#4DA3FF" />
      </svg>
    ),
  },
] as const

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const { ref: heroRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const { ref: highlightsRef, isInView: highlightsInView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px',
  })
  const { sectionRef, imageRef } = useHeroParallax()
  const inview = isInView ? 'is-inview' : ''
  const highlightsVisible = highlightsInView ? 'is-inview' : ''

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function setHeroSectionRef(node: HTMLDivElement | null) {
    heroRef.current = node
    sectionRef.current = node
  }

  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 overflow-x-clip border-b border-white/15 bg-[#07111d]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-3 sm:h-[4.5rem] sm:gap-4 sm:px-6 md:h-20 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-4">
          <a
            href="/"
            className="min-w-0 max-w-[42%] shrink md:max-w-none md:justify-self-start"
            aria-label="Shiver Broker"
          >
            <img
              src="/brand/shiver-logo.png"
              alt="Shiver Broker"
              className="h-9 w-auto max-w-full object-contain object-left sm:h-10 sm:max-w-[11rem] md:h-12 lg:h-14"
            />
          </a>

          <nav
            className="hidden items-center justify-center gap-1 md:flex md:gap-1 lg:gap-2"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 font-sans text-sm font-semibold tracking-wide text-white/90 transition-colors duration-200 hover:bg-white/5 hover:text-[#4DA3FF] lg:px-4 lg:text-[0.95rem]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0 md:justify-self-end sm:gap-2">
            <a
              href="#como-participar"
              className="inline-flex items-center justify-center rounded-lg bg-[#4DA3FF] px-3 py-2 text-[0.7rem] font-bold uppercase tracking-wide text-[#07111d] transition-colors duration-200 hover:bg-[#6bb4ff] sm:px-5 sm:py-2 sm:text-sm"
            >
              Participar
            </a>

            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10 sm:h-10 sm:w-10 md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative block h-3.5 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                    menuOpen ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ease-out ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
                    menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id={menuId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="overflow-hidden">
            <div
              className={`border-t border-white/10 bg-[#050d16] px-4 pb-5 pt-4 transition-all duration-300 ease-out sm:px-6 ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-2 opacity-0'
              }`}
            >
              <nav className="mx-auto flex max-w-6xl flex-col" aria-label="Menu mobile">
                <p
                  className={`mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7eb6ff] transition-all duration-300 ${
                    menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? '40ms' : '0ms' }}
                >
                  Navegação
                </p>

                <ul className="flex flex-col divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  {navLinks.map((link, index) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        tabIndex={menuOpen ? 0 : -1}
                        style={{ transitionDelay: menuOpen ? `${70 + index * 50}ms` : '0ms' }}
                        className={`group flex items-center gap-4 px-4 py-4 transition-all duration-300 hover:bg-white/[0.05] ${
                          menuOpen
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-2 opacity-0'
                        }`}
                      >
                        <span className="font-sans text-xs font-bold tabular-nums text-[#4DA3FF]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0 flex-1 font-display text-[1.65rem] uppercase leading-none tracking-[0.04em] text-white transition-colors group-hover:text-[#4DA3FF]">
                          {link.label}
                        </span>
                        <svg
                          className="h-4 w-4 shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:text-[#4DA3FF]"
                          viewBox="0 0 16 16"
                          fill="none"
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
                    </li>
                  ))}
                </ul>

                <div
                  style={{ transitionDelay: menuOpen ? '240ms' : '0ms' }}
                  className={`mt-4 transition-all duration-300 ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-1 opacity-0'
                  }`}
                >
                  <a
                    href="#como-participar"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4DA3FF] px-4 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#07111d] transition-colors hover:bg-[#6bb4ff]"
                  >
                    Participar agora
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
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
                  <p className="mt-3 text-center font-sans text-xs text-white/45">
                    Trading real • Grandes conquistas
                  </p>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 sm:h-[4.5rem] md:h-20" aria-hidden="true" />

      <div
        ref={setHeroSectionRef}
        className="relative isolate min-h-[calc(100dvh-4rem)] overflow-x-clip sm:min-h-0"
      >
        <img
          ref={imageRef}
          src="/hero/tubaroes-bg.jpg"
          alt=""
          className="hero-parallax absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,17,29,0.55) 0%, rgba(7,17,29,0.35) 45%, rgba(7,17,29,0.7) 100%)',
          }}
          aria-hidden="true"
        />
        <SectionEdgeGradients top={false} bottom color="#050d16" />

        <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-16 text-center sm:min-h-0 sm:block sm:px-6 sm:pb-20 sm:pt-20 md:pb-24 md:pt-28">
          <p
            className={`reveal mb-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#7eb6ff] sm:mb-6 sm:text-xs sm:tracking-[0.22em] md:text-sm ${inview}`}
          >
            Trading real • Grandes conquistas
          </p>
          <h1
            className={`reveal reveal-delay-1 break-words font-display text-[clamp(2.65rem,12.5vw,6.5rem)] uppercase leading-[0.92] tracking-[0.02em] text-white ${inview}`}
          >
            <span className="block">O torneio dos</span>
            <span className="block text-[#4DA3FF]">Grandes tubarões</span>
            <span className="block">Começou</span>
          </h1>
          <div className="mt-8 flex w-full flex-col items-center gap-5 sm:mt-10 sm:gap-5">
            <p
              className={`reveal reveal-delay-2 inline-flex items-center justify-center gap-1.5 font-sans text-sm font-medium text-[#8ec5ff] sm:text-sm md:text-base ${inview}`}
            >
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="3.5"
                  width="12"
                  height="10.5"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 7h12M5.5 2v3M10.5 2v3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Período : 08 a 28 de outubro
            </p>
            <div className={`reveal reveal-delay-3 ${inview}`}>
              <a
                href="#como-participar"
                className="cta-idle-pulse hover-lift inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#4DA3FF] px-7 py-3.5 font-sans text-base font-semibold uppercase tracking-wide text-[#07111d] transition-colors duration-200 hover:bg-[#6bb4ff] sm:w-auto sm:px-6 sm:py-3 sm:text-sm"
              >
                Participe agora
                <svg
                  className="h-5 w-5 sm:h-4 sm:w-4"
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
          <p
            className={`reveal reveal-delay-4 mx-auto mt-7 max-w-lg px-1 font-sans text-base font-normal leading-relaxed text-white/75 sm:mt-7 sm:text-[0.95rem] ${inview}`}
          >
            Prove que você é um dos melhores tubarões da Shiver e conquiste o seu
            lugar no topo!
          </p>

          <div
            ref={highlightsRef}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3.5 sm:mt-12 sm:grid-cols-3 sm:gap-4 md:mt-14 md:gap-5"
          >
            {highlightCards.map((card, index) => (
              <div
                key={card.title}
                className={`reveal ${
                  index === 0
                    ? 'reveal-delay-1'
                    : index === 1
                      ? 'reveal-delay-2'
                      : 'reveal-delay-3'
                } ${highlightsVisible}`}
              >
                <div className="hover-lift flex items-center gap-3.5 rounded-xl border border-[#4DA3FF]/45 bg-[#07111d]/75 px-4 py-3.5 text-left backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-3.5">
                  <div className="flex shrink-0 items-center justify-center text-[#4DA3FF]">
                    {card.icon}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="font-sans text-[0.95rem] font-bold text-[#7eb6ff] sm:text-[0.95rem]">
                      {card.title}
                    </p>
                    <p className="mt-0.5 font-sans text-sm text-[#7eb6ff]/85 sm:text-sm">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
