/**
 * Comprime e redimensiona assets públicos para mobile / conexões lentas.
 * Mantém caminhos e transparência; não altera layout.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')

async function optimizePng(filePath, { width, height, quality } = {}) {
  const before = fs.statSync(filePath).size
  let pipeline = sharp(filePath).rotate()
  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const pngOptions =
    quality != null
      ? { compressionLevel: 9, effort: 10, quality }
      : { compressionLevel: 9, palette: false, effort: 10 }
  const buffer = await pipeline.png(pngOptions).toBuffer()
  if (buffer.length < before) {
    const tmpPath = `${filePath}.tmp`
    fs.writeFileSync(tmpPath, buffer)
    fs.renameSync(tmpPath, filePath)
  }
  const after = fs.statSync(filePath).size
  console.log(
    `${path.relative(root, filePath)}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`,
  )
}

async function optimizeJpeg(filePath, { width, quality = 72 } = {}) {
  const before = fs.statSync(filePath).size
  let pipeline = sharp(filePath).rotate()
  if (width) {
    pipeline = pipeline.resize({
      width,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const buffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer()
  if (buffer.length < before) {
    const tmpPath = `${filePath}.tmp`
    fs.writeFileSync(tmpPath, buffer)
    fs.renameSync(tmpPath, filePath)
  }
  const after = fs.statSync(filePath).size
  console.log(
    `${path.relative(root, filePath)}: ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`,
  )
}

async function main() {
  const avatarsDir = path.join(publicDir, 'avatars')
  for (const name of fs.readdirSync(avatarsDir)) {
    if (!name.endsWith('.png')) continue
    await optimizePng(path.join(avatarsDir, name), { width: 128, height: 128 })
  }

  for (const name of ['1-lugar.png', '2-lugar.png', '3-lugar.png']) {
    await optimizePng(path.join(publicDir, 'premios', name), {
      width: 560,
      quality: 80,
    })
  }

  await optimizeJpeg(path.join(publicDir, 'premios', 'section-bg.jpg'), {
    width: 1400,
    quality: 70,
  })
  await optimizeJpeg(path.join(publicDir, 'ranking', 'section-bg.jpg'), {
    width: 1400,
    quality: 70,
  })
  await optimizeJpeg(path.join(publicDir, 'ranking', 'tubaroes.jpg'), {
    width: 900,
    quality: 72,
  })
  await optimizeJpeg(path.join(publicDir, 'hero', 'tubaroes-bg.jpg'), {
    width: 1600,
    quality: 74,
  })

  for (const name of ['shiver-logo.png', 'shiver-logo-trimmed.png']) {
    const file = path.join(publicDir, 'brand', name)
    if (fs.existsSync(file)) {
      await optimizePng(file, { width: 480 })
    }
  }

  console.log('Otimização concluída.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
