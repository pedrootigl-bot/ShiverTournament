/** Prefixa paths públicos com o base do Vite (ex.: /torneioshiver/). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\/+/, '')
  return `${base}${clean}`
}
