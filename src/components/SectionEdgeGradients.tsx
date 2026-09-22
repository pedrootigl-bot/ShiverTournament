type SectionEdgeGradientsProps = {
  top?: boolean
  bottom?: boolean
  /** Cor sólida da transição (section vizinha) */
  color?: string
  className?: string
}

export function SectionEdgeGradients({
  top = true,
  bottom = true,
  color = '#050d16',
  className = '',
}: SectionEdgeGradientsProps) {
  return (
    <>
      {top && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-[15] h-20 sm:h-28 ${className}`}
          style={{
            background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
      {bottom && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-20 sm:h-28 ${className}`}
          style={{
            background: `linear-gradient(0deg, ${color} 0%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
