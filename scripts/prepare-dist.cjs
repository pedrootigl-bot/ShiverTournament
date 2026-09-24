const fs = require('fs')
const path = require('path')

const rawBase = (process.env.BASE_PATH ?? '').trim()
const BASE_PATH =
  !rawBase || rawBase === '/'
    ? ''
    : `/${rawBase.replace(/^\/+|\/+$/g, '')}`
const REWRITE_BASE = BASE_PATH ? `${BASE_PATH}/` : '/'

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

const root = process.cwd()
const distDir = path.join(root, 'dist')
const previewRoot = path.join(root, '.preview-static')
const previewSite = path.join(
  previewRoot,
  BASE_PATH ? BASE_PATH.replace(/^\//, '') : 'site',
)

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('dist/index.html não encontrado. Rode `vite build` antes.')
  process.exit(1)
}

const htaccess = `# Hostinger / Apache — ShiverTournament
# Envie o CONTEÚDO de dist/ para ${BASE_PATH ? `public_html${BASE_PATH}/` : 'public_html/'}

DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${REWRITE_BASE}

  # Arquivo/pasta existente: serve direto
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # SPA fallback (rotas /termos-de-uso, /politica-de-privacidade, etc.)
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
  ExpiresByType image/mp4 "access plus 7 days"
  ExpiresByType video/mp4 "access plus 7 days"
  ExpiresByType font/woff2 "access plus 30 days"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(html)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
`

fs.writeFileSync(path.join(distDir, '.htaccess'), htaccess, 'utf8')

const indexPhp = BASE_PATH
  ? `<?php
header('Location: ${BASE_PATH}/', true, 302);
exit;
`
  : `<?php
// Fallback Hostinger — serve a SPA
readfile(__DIR__ . '/index.html');
`

fs.writeFileSync(path.join(distDir, 'index.php'), indexPhp, 'utf8')

const required = ['index.html', '.htaccess', 'assets']
for (const rel of required) {
  if (!fs.existsSync(path.join(distDir, rel))) {
    console.error(`Obrigatório ausente em dist/: ${rel}`)
    process.exit(1)
  }
}

const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
if (BASE_PATH) {
  const expected = `${BASE_PATH}/assets/`
  if (!html.includes(expected) && !html.includes(`"${BASE_PATH}/`)) {
    console.warn(
      `AVISO: HTML pode estar sem base ${BASE_PATH}/ — confira BASE_PATH no build.`,
    )
  }
}

fs.rmSync(previewRoot, { recursive: true, force: true })
fs.mkdirSync(previewSite, { recursive: true })
copyDir(distDir, previewSite)

const uploadTarget = BASE_PATH
  ? `public_html${BASE_PATH}/`
  : 'public_html/'
const previewUrl = BASE_PATH
  ? `http://localhost:4173${BASE_PATH}/`
  : 'http://localhost:4173/site/'

console.log('Deploy estático pronto em dist/')
console.log(`Hostinger: envie o CONTEÚDO de dist/ para ${uploadTarget}`)
console.log(`Preview: npm run preview:static → ${previewUrl}`)
