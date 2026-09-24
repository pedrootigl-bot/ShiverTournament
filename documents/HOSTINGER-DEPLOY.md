# Deploy Hostinger — ShiverTournament

Site estático (Vite + React). A pasta `dist/` sai pronta para upload, no mesmo padrão do ShiverPartner / Bull-ex.

## Produção atual

URL: `https://tradingsettings.com/torneioshiver/`

```powershell
$env:BASE_PATH="/torneioshiver"; npm run build
```

Envie o **conteúdo** de `dist/` para `public_html/torneioshiver/`.

## Gerar (raiz do domínio)

```bash
npm install
npm run build
```

## Upload (importante)

### Opção A — raiz do domínio

1. Abra `public_html/`
2. Envie o **conteúdo interno** de `dist/` (não a pasta `dist`)

### Opção B — subpasta `/torneioshiver/` (produção)

```powershell
$env:BASE_PATH="/torneioshiver"; npm run build
```

```bash
BASE_PATH=/torneioshiver npm run build
```

Envie o conteúdo de `dist/` para `public_html/torneioshiver/`.

```text
public_html/torneioshiver/
  index.html
  index.php
  .htaccess
  assets/
  brand/
  hero/
  ...
```

**Errado:** build sem `BASE_PATH` nessa URL → tela cinza (CSS/JS apontam para `/assets` na raiz)

## Preview

```bash
npm run preview:static
```

→ `http://localhost:4173/torneioshiver/` (com BASE_PATH)

## Erros comuns

| Sintoma | Causa |
|---|---|
| Tela cinza / sem CSS | Build sem `BASE_PATH=/torneioshiver` |
| 403 | Sem `index.html` / `.htaccess` |
| Refresh em rotas legais 404 | `.htaccess` não enviado |
