# Otimização mobile e conexões lentas

**Data:** 2026-09-23  
**Objetivo:** reduzir peso e trabalho no dispositivo sem alterar o layout visual.

## Mudanças

1. **Hero** — o MP4 carrega em mobile e desktop **somente** com conexão boa (não Save-Data, não 2G/3G, downlink ≥ ~1.5 Mbps). Caso contrário (ou `prefers-reduced-motion`), usa só o poster JPG.
2. **Imagens** — script `npm run optimize:assets` redimensiona/compress avatares (128px), prêmios (máx. 720px) e fundos JPG.
3. **Lazy load** — imagens below-the-fold com `loading="lazy"` + `decoding="async"`; dimensões explícitas para estabilizar layout.
4. **Fontes** — saem do `@import` no CSS (bloqueante); `preconnect` + stylesheet no `index.html`; preload do poster do hero.
5. **Lenis** — desligado no mobile / touch / conexão fraca.
6. **Rotas legais** — `React.lazy` para termos e privacidade (fora do bundle inicial).
7. **Animações contínuas** — pulse de CTA/prêmios desligado em viewport &lt; 768px.

## Comandos

```bash
npm run optimize:assets
npm run build
```
