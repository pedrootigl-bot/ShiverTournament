import type { LegalBlock } from '../components/LegalDocumentLayout'

/** Converte texto legal com marcadores ## / ### em blocos tipados. */
export function parseLegalText(raw: string): LegalBlock[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const blocks: LegalBlock[] = []
  let paragraph: string[] = []

  function flushParagraph() {
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim()
    paragraph = []
    if (text) blocks.push({ type: 'p', text })
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      continue
    }

    if (line.startsWith('## ')) {
      flushParagraph()
      blocks.push({ type: 'h2', text: line.slice(3).trim() })
      continue
    }

    if (line.startsWith('### ') || line.startsWith('#### ')) {
      flushParagraph()
      const text = line.startsWith('#### ') ? line.slice(5).trim() : line.slice(4).trim()
      blocks.push({ type: 'h3', text })
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  return blocks
}
