import { useInView } from '../hooks/useInView'
import { publicUrl } from '../lib/publicUrl'
import { SectionEdgeGradients } from './SectionEdgeGradients'

type Place = 1 | 2 | 3

type RankCard = {
  place: Place
  name: string
  points: string
  avatar: string
}

const ranking: RankCard[] = [
  { place: 2, name: 'Lucas Ribeiro', points: '45.300 pts', avatar: publicUrl('/avatars/lucas.png') },
  { place: 1, name: 'Pedro Mendes', points: '48.520 pts', avatar: publicUrl('/avatars/pedro.png') },
  { place: 3, name: 'Amanda Silva', points: '41.980 pts', avatar: publicUrl('/avatars/amanda.png') },
]

const rankingByPlace = [...ranking].sort((a, b) => a.place - b.place)

const otherPositions = [
  { place: 4, name: 'Rafael Teixeira', points: '38.740', avatar: publicUrl('/avatars/rafael.png') },
  { place: 5, name: 'Camila Vieira', points: '36.210', avatar: publicUrl('/avatars/camila.png') },
  { place: 6, name: 'Bruno Klein', points: '34.890', avatar: publicUrl('/avatars/bruno.png') },
  { place: 7, name: 'Fernanda Lopes', points: '32.450', avatar: publicUrl('/avatars/fernanda.png') },
  { place: 8, name: 'Diego Nogueira', points: '30.120', avatar: publicUrl('/avatars/diego.png') },
  { place: 9, name: 'Juliana Prado', points: '28.670', avatar: publicUrl('/avatars/juliana.png') },
  { place: 10, name: 'Marcos Henrique', points: '26.340', avatar: publicUrl('/avatars/marcos.png') },
] as const

/** Imagem de destaque ao lado da tabela */
const rankingSideImage: string | null = publicUrl('/ranking/tubaroes.jpg')

const placeTheme: Record<
  Place,
  {
    border: string
    glow: string
    badgeBg: string
    badgeText: string
    points: string
  }
> = {
  1: {
    border: '#E8C547',
    glow: '0 0 12px rgba(232, 197, 71, 0.35)',
    badgeBg: 'linear-gradient(145deg, #FFE08A 0%, #E8C547 50%, #B8921F 100%)',
    badgeText: '#1A1405',
    points: '#E8C547',
  },
  2: {
    border: '#4DA3FF',
    glow: '0 0 12px rgba(77, 163, 255, 0.3)',
    badgeBg: 'linear-gradient(145deg, #F0F4F8 0%, #C8D0DA 50%, #9AA8B8 100%)',
    badgeText: '#1A222C',
    points: '#4DA3FF',
  },
  3: {
    border: '#CD7F32',
    glow: '0 0 12px rgba(205, 127, 50, 0.3)',
    badgeBg: 'linear-gradient(145deg, #E8A45C 0%, #CD7F32 50%, #8A4E18 100%)',
    badgeText: '#1F1208',
    points: '#CD7F32',
  },
}

function CrownIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9A0" />
          <stop offset="55%" stopColor="#E8C547" />
          <stop offset="100%" stopColor="#B8921F" />
        </linearGradient>
      </defs>
      <path
        d="M3.5 17.5 5 8.5l4.2 3.6L12 5.5l2.8 6.6L19 8.5l1.5 9H3.5Z"
        fill="url(#crownGrad)"
      />
      <path d="M4 19.5h16v1.5H4z" fill="url(#crownGrad)" />
      <circle cx="5" cy="8" r="1.35" fill="#FFE9A0" />
      <circle cx="12" cy="5" r="1.35" fill="#FFE9A0" />
      <circle cx="19" cy="8" r="1.35" fill="#FFE9A0" />
    </svg>
  )
}

function TopRankCard({
  trader,
  elevated = false,
  showCrown = false,
}: {
  trader: RankCard
  elevated?: boolean
  showCrown?: boolean
}) {
  const theme = placeTheme[trader.place]

  return (
    <article className={`relative w-full ${elevated ? '-translate-y-3' : ''}`}>
      {showCrown && (
        <div
          className="absolute left-1/2 z-30 -translate-x-1/2"
          style={{ top: '-1.35rem' }}
        >
          <CrownIcon />
        </div>
      )}

      <div
        className="relative flex items-center gap-3 rounded-xl border px-3.5 py-3.5 sm:rounded-2xl sm:px-4 sm:py-3.5"
        style={{
          borderColor: theme.border,
          boxShadow: theme.glow,
          backgroundColor: 'rgba(10, 18, 32, 0.92)',
        }}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
          style={{
            backgroundImage: theme.badgeBg,
            color: theme.badgeText,
            boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
          }}
        >
          {trader.place}
        </span>

        <img
          src={trader.avatar}
          alt={`Foto de ${trader.name}`}
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          className="h-11 w-11 shrink-0 rounded-full object-cover"
          style={{
            boxShadow: `0 0 0 2px ${theme.border}55`,
          }}
        />

        <div className="min-w-0 flex-1 text-left">
          <h3 className="truncate font-sans text-sm font-semibold text-white sm:text-base">
            {trader.name}
          </h3>
          <p
            className="mt-0.5 font-sans text-base font-bold tabular-nums sm:text-lg"
            style={{ color: theme.points }}
          >
            {trader.points}
          </p>
        </div>
      </div>
    </article>
  )
}

export function Ranking() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.12 })
  const { ref: tableRef, isInView: tableInView } = useInView<HTMLDivElement>({
    threshold: 0.28,
    rootMargin: '0px 0px -12% 0px',
  })
  const { ref: asideRef, isInView: asideInView } = useInView<HTMLElement>({
    threshold: 0.28,
    rootMargin: '0px 0px -12% 0px',
  })
  const inview = isInView ? 'is-inview' : ''
  const tableVisible = tableInView ? 'is-inview' : ''
  const asideVisible = asideInView ? 'is-inview' : ''

  return (
    <section
      ref={ref}
      id="ranking"
      className="relative scroll-mt-24 overflow-x-clip px-4 pb-6 pt-14 sm:scroll-mt-28 sm:px-6 sm:pb-8 sm:pt-24"
    >
      <img
        src={publicUrl('/ranking/section-bg.jpg')}
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
            'linear-gradient(180deg, rgba(5,13,22,0.78) 0%, rgba(5,13,22,0.55) 45%, rgba(5,13,22,0.82) 100%)',
        }}
        aria-hidden="true"
      />
      <SectionEdgeGradients color="#050d16" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p
          className={`reveal reveal-y-strong mb-2 font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#6aa8ff] sm:text-sm ${inview}`}
        >
          Competição real
        </p>
        <h2
          className={`reveal reveal-y-strong reveal-delay-1 font-display text-[clamp(2.15rem,8vw,4rem)] uppercase leading-none tracking-[0.02em] text-white ${inview}`}
        >
          Ranking dos tubarões
        </h2>
      </div>

      {/* Pódio horizontal — apenas tablet/desktop */}
      <div className="relative z-10 mx-auto mt-14 hidden max-w-4xl items-end justify-center gap-3 pt-10 md:flex md:gap-4">
        {ranking.map((trader) => {
          const delayClass =
            trader.place === 2
              ? 'reveal-delay-2'
              : trader.place === 1
                ? 'reveal-delay-3'
                : 'reveal-delay-4'

          return (
            <div
              key={trader.place}
              className={`reveal reveal-y-strong w-[33%] max-w-[300px] ${delayClass} ${inview} ${
                trader.place === 1
                  ? 'order-2'
                  : trader.place === 2
                    ? 'order-1'
                    : 'order-3'
              }`}
            >
              <TopRankCard
                trader={trader}
                elevated={trader.place === 1}
                showCrown={trader.place === 1}
              />
            </div>
          )
        })}
      </div>

      {/* Separação sutil entre pódio e demais posições — só desktop/tablet */}
      <div
        className="relative z-10 mx-auto mt-10 hidden max-w-4xl px-2 md:block md:mt-14"
        aria-hidden="true"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2a5a9a]/55 to-transparent" />
        <div className="mx-auto mt-0 h-8 w-full max-w-xs bg-gradient-to-b from-[#4DA3FF]/08 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-5xl sm:mt-10 md:mt-2">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5">
          <div
            ref={tableRef}
            className={`reveal-left min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#2a4a6e]/60 bg-[#0a1220] shadow-[0_16px_40px_rgba(0,0,0,0.4)] ${tableVisible}`}
          >
            <div className="px-3 pt-4 pb-2.5 sm:px-6 sm:pt-5 sm:pb-3">
              <h3 className="font-sans text-base font-bold text-white sm:text-lg">
                <span className="md:hidden">Ranking completo</span>
                <span className="hidden md:inline">Demais posições</span>
              </h3>
            </div>

            <div
              className="items-center gap-2 px-3 pb-2 sm:px-6 sm:pb-2.5"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(2.5rem,0.7fr) minmax(0,2.8fr) minmax(3.5rem,1fr)',
                width: '100%',
              }}
            >
              <span className="font-sans text-[0.65rem] font-medium text-[#7a93b0] sm:text-xs">
                Posição
              </span>
              <span className="font-sans text-[0.65rem] font-medium text-[#7a93b0] sm:text-xs">
                Trader
              </span>
              <span className="text-right font-sans text-[0.65rem] font-medium text-[#7a93b0] sm:text-xs">
                Pontos
              </span>
            </div>

            <ul>
              {rankingByPlace.map((trader) => {
                const theme = placeTheme[trader.place]
                const pointsLabel = trader.points.replace(/\s*pts$/i, '')

                return (
                  <li
                    key={trader.place}
                    className="grid items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 md:hidden sm:px-6 sm:py-3"
                    style={{
                      gridTemplateColumns:
                        'minmax(2.5rem,0.7fr) minmax(0,2.8fr) minmax(3.5rem,1fr)',
                      borderLeft: `3px solid ${theme.border}`,
                      backgroundColor: `${theme.border}12`,
                    }}
                  >
                    <span
                      className="font-sans text-sm font-bold"
                      style={{ color: theme.points }}
                    >
                      {trader.place}
                    </span>

                    <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                      <img
                        src={trader.avatar}
                        alt={`Foto de ${trader.name}`}
                        width={32}
                        height={32}
                        className="h-7 w-7 shrink-0 rounded-full object-cover sm:h-8 sm:w-8"
                        style={{ boxShadow: `0 0 0 2px ${theme.border}` }}
                        loading="lazy"
                      />
                      <span
                        className="truncate font-sans text-xs font-semibold sm:text-sm"
                        style={{ color: theme.points }}
                      >
                        {trader.name}
                      </span>
                    </div>

                    <span
                      className="text-right font-sans text-xs font-bold tabular-nums sm:text-sm"
                      style={{ color: theme.points }}
                    >
                      {pointsLabel}
                    </span>
                  </li>
                )
              })}

              {otherPositions.map((trader, index) => (
                <li
                  key={trader.place}
                  className="grid items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3"
                  style={{
                    gridTemplateColumns: 'minmax(2.5rem,0.7fr) minmax(0,2.8fr) minmax(3.5rem,1fr)',
                    borderBottom:
                      index !== otherPositions.length - 1
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                  }}
                >
                  <span className="font-sans text-sm font-medium text-white">
                    {trader.place}
                  </span>

                  <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                    <img
                      src={trader.avatar}
                      alt={`Foto de ${trader.name}`}
                      width={32}
                      height={32}
                      className="h-7 w-7 shrink-0 rounded-full object-cover sm:h-8 sm:w-8"
                      style={{ boxShadow: '0 0 0 2px rgba(61,110,168,0.5)' }}
                      loading="lazy"
                    />
                    <span className="truncate font-sans text-xs font-medium text-white sm:text-sm">
                      {trader.name}
                    </span>
                  </div>

                  <span className="text-right font-sans text-xs font-medium tabular-nums text-white sm:text-sm">
                    {trader.points}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            ref={asideRef}
            className={`reveal-right relative hidden min-h-[200px] w-full overflow-hidden rounded-2xl border border-[#2a4a6e]/60 bg-[#0a1220] shadow-[0_16px_40px_rgba(0,0,0,0.4)] lg:block lg:min-h-0 lg:w-[38%] lg:max-w-sm lg:shrink-0 ${asideVisible}`}
          >
            {rankingSideImage ? (
              <img
                src={rankingSideImage}
                alt="Destaque do ranking"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1a2c] px-6 text-center">
                <p className="font-sans text-sm font-medium text-[#7a93b0]">
                  Imagem em breve
                </p>
                <p className="mt-1 font-sans text-xs text-[#7a93b0]/70">
                  Espaço reservado para o destaque
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 right-4 z-10 max-w-[9rem] text-right sm:bottom-5 sm:right-5 sm:max-w-[9.5rem]">
              <p className="font-display text-[1.05rem] uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-[1.3rem]">
                Grandes
                <br />
                Traders
                <br />
                Constroem
                <br />
                Um futuro
                <br />
                Extraordinário
              </p>
              <div className="ml-auto mt-2.5 h-[3px] w-12 rounded-full bg-[#4DA3FF]" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
