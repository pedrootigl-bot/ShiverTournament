import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const inputDir = path.join(root, 'src', 'assets', 'premios')
const outputDir = path.join(root, 'public', 'premios')

const files = [
  { input: '1-lugar.jpg', output: '1-lugar.png' },
  { input: '2-lugar.jpg', output: '2-lugar.png' },
  { input: '3-lugar.jpg', output: '3-lugar.png' },
]

function isNearBlack(r, g, b, threshold = 36) {
  return r <= threshold && g <= threshold && b <= threshold
}

function removeOuterBlack(pixels, width, height) {
  const visited = new Uint8Array(width * height)
  const queue = []

  const enqueue = (x, y) => {
    const idx = y * width + x
    if (visited[idx]) return
    const i = idx * 4
    if (!isNearBlack(pixels[i], pixels[i + 1], pixels[i + 2])) return
    visited[idx] = 1
    queue.push(idx)
  }

  // Seed from all border pixels
  for (let x = 0; x < width; x++) {
    enqueue(x, 0)
    enqueue(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y)
    enqueue(width - 1, y)
  }

  while (queue.length > 0) {
    const idx = queue.pop()
    const x = idx % width
    const y = (idx / width) | 0
    const i = idx * 4
    pixels[i + 3] = 0

    if (x > 0) enqueue(x - 1, y)
    if (x < width - 1) enqueue(x + 1, y)
    if (y > 0) enqueue(x, y - 1)
    if (y < height - 1) enqueue(x, y + 1)
  }

  // Soften hard edges left by the flood fill
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4
      if (pixels[i + 3] === 0) continue

      let transparentNeighbors = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          const ni = ((y + dy) * width + (x + dx)) * 4
          if (pixels[ni + 3] === 0) transparentNeighbors++
        }
      }

      if (transparentNeighbors >= 3 && isNearBlack(pixels[i], pixels[i + 1], pixels[i + 2], 55)) {
        pixels[i + 3] = Math.max(0, 255 - transparentNeighbors * 40)
      }
    }
  }
}

fs.mkdirSync(outputDir, { recursive: true })

for (const file of files) {
  const inputPath = path.join(inputDir, file.input)
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = Buffer.from(data)
  removeOuterBlack(pixels, info.width, info.height)

  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(path.join(outputDir, file.output))

  console.log(`Processed ${file.output}`)
}
