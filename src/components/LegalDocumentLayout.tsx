import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { publicUrl } from '../lib/publicUrl'
import { Footer } from './Footer'

type LegalDocumentLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function LegalDocumentLayout({ title, subtitle, children }: LegalDocumentLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#050d16]">
      <header className="sticky top-0 z-50 border-b border-white/15 bg-[#07111d]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 md:h-20">
          <Link to="/#topo" className="brand-logo" aria-label="Voltar ao início">
            <img
              src={publicUrl('/brand/shiver-logo.png')}
              alt="Shiver Broker"
              className="h-9 w-auto max-w-[11rem] object-contain sm:h-10 md:h-12"
            />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-white/90 transition-colors hover:border-[#4DA3FF]/50 hover:text-[#4DA3FF] sm:text-sm"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="legal-page mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#7eb6ff]">
          Legal
        </p>
        <h1 className="font-display text-[clamp(2.4rem,8vw,3.75rem)] uppercase leading-none tracking-[0.04em] text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#9aabbf] sm:text-base">
          {subtitle}
        </p>
        <div className="legal-body mt-10 space-y-5">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

type LegalBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={`${block.type}-${index}`}
                className="!mt-10 scroll-mt-28 font-display text-[1.55rem] uppercase tracking-[0.06em] text-[#4DA3FF] first:!mt-0 sm:text-[1.75rem]"
              >
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={`${block.type}-${index}`}
                className="!mt-7 scroll-mt-28 font-display text-[1.2rem] uppercase tracking-[0.05em] text-[#7eb6ff] sm:text-[1.35rem]"
              >
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={`${block.type}-${index}`} className="legal-copy">
                {block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={`${block.type}-${index}`} className="legal-list">
                {block.items.map((item) => (
                  <li key={item.slice(0, 64)}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={`${block.type}-${index}`} className="legal-list legal-list--ordered">
                {block.items.map((item) => (
                  <li key={item.slice(0, 64)}>{item}</li>
                ))}
              </ol>
            )
          default: {
            const _exhaustive: never = block
            return _exhaustive
          }
        }
      })}
    </>
  )
}

export type { LegalBlock }
