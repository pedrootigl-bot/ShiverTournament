# Design: Animações da landing ShiverTournament

**Data:** 2026-09-22  
**Status:** Aprovado em conversa (opção C — marcante)  
**Escopo:** Landing Vite + React + TS + Tailwind (sem novas dependências)

## Objetivo

Dar presença e hierarquia ao scroll e às interações, sem ruído visual e sem bibliotecas de animação. Manter o padrão já existente em Prêmios (CSS keyframes + IntersectionObserver) e estendê-lo ao restante do site.

## Decisão de abordagem

| Opção | Descrição | Escolha |
|-------|-----------|---------|
| A | Só reveal on scroll | — |
| B | A + micro-hovers | — |
| C | B + stagger no hero, podium animado, parallax leve no fundo do hero | **Escolhida** |

**Stack:** CSS (`@keyframes` + classes utilitárias) + hook `useInView` baseado em `IntersectionObserver`. Sem Framer Motion / GSAP.

## Arquitetura

### 1. Hook `useInView`

- Arquivo: `src/hooks/useInView.ts`
- Observa um elemento; quando intersecta (threshold ~0.12–0.2), seta `isInView` e desconecta (anima uma vez)
- Retorna `{ ref, isInView }`
- Respeita `prefers-reduced-motion`: se reduzido, `isInView` inicia `true` (sem animação de entrada)

### 2. Classes CSS compartilhadas (`index.css`)

| Classe | Comportamento |
|--------|----------------|
| `.reveal` | Estado inicial: opacity 0, translateY(16–24px) |
| `.reveal.is-inview` | Anima para opacity 1, translateY(0) (~0.7–0.9s, easing suave) |
| `.reveal-delay-1` … `.reveal-delay-6` | `animation-delay` em passos de ~80–120ms |
| `.hover-lift` | Em hover/focus-visible: translateY(-2–4px) + sombra leve (transition) |
| `.cta-idle-pulse` | Pulse sutil de escala/sombra em idle nos CTAs principais (não nos cards de prêmio) |
| `.hero-parallax` | Transform no Y do BG ligado ao scroll (só via JS; ver abaixo) |

`@media (prefers-reduced-motion: reduce)`: desliga reveals, pulse, parallax e hover transforms; conteúdo permanece visível.

### 3. Parallax do hero

- Só no fundo (`tubaroes-bg.jpg`) do hero, desktop (`md+`)
- Listener de scroll (rAF) com deslocamento pequeno (ex.: 8–12% do scroll da section)
- Desligado em: mobile, `prefers-reduced-motion`, ou se o usuário não tem pointer fino
- Não usar `100vw` / propriedades que reintroduzam overflow horizontal

## Mapa por seção

### Header / Hero

1. Navbar: manter transitions atuais (menu, hamburger); sem mudança estrutural
2. Hero content stagger ao mount (ou quando a section hero está em view — na prática no load):
   - delay 0: eyebrow
   - 1: h1 (linhas podem compartilhar o mesmo delay ou +1 entre spans)
   - 2: período
   - 3: CTA “Participe agora” (+ `cta-idle-pulse` + `hover-lift`)
   - 4: subtítulo
   - 5–7: highlight cards em sequência
3. BG: parallax leve conforme acima

### Premios

- Manter `prize-enter` + `prize-pulse` atuais
- Opcional: reveal no título/eyebrow da section (sem atrasar os cards)

### ComoParticipar

- Título + steps: reveal com stagger por step
- Cards/steps: `hover-lift` leve

### Ranking

- Desktop podium: cada posição sobe/fades na ordem visual esquerda → direita (2º → 1º → 3º)
- Mobile tabela: fade da block / linhas top-3 sem overrides que quebrem `md:hidden`
- Não animar de forma que force `display` inline conflitante com utilitários Tailwind

### CtaBanner

- Reveal do bloco; CTA com `cta-idle-pulse` + `hover-lift`

### Footer

- Reveal suave do bloco (logo / slogan / links); hovers de link já existentes permanecem

## Fora de escopo

- Biblioteca externa de animação
- Scroll-jacking / scroll snap forçado
- Animações em loop agressivas no hero (além do pulse CTA e pulse já existente em prêmios)
- Alteração de copy, layout estrutural ou assets

## Critérios de sucesso

- Em desktop, ao scrollar a página, cada section principal “entra” de forma perceptível
- Hero tem stagger claro nos primeiros ~1–1.5s após load
- Ranking podium anima ao entrar na viewport
- Com `prefers-reduced-motion: reduce`, nenhuma animação de movimento; UI legível imediatamente
- Sem regressão de overflow-x / navbar / ranking mobile

## Implementação (alto nível)

1. Criar `useInView` + classes CSS
2. Aplicar no Hero (stagger + parallax)
3. Aplicar em ComoParticipar, Ranking, CtaBanner, Footer
4. Ajustar reduced-motion global
5. Verificar visualmente (dev) e overflow

## Riscos

| Risco | Mitigação |
|-------|-----------|
| Overflow por transform no BG | Parallax só em `transform` no img absoluto; container `overflow-x-hidden` |
| Conflito com animações de Prêmios | Não reaplicar `.reveal` nos `.prize-card` |
| Ranking `md:hidden` quebrado | Só classes de opacity/transform; sem `style={{ display }}` |
