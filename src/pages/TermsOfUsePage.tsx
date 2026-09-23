import { LegalBlocks, LegalDocumentLayout } from '../components/LegalDocumentLayout'
import termsRaw from '../content/terms-of-use.txt?raw'
import { parseLegalText } from '../lib/parseLegalText'

const blocks = parseLegalText(termsRaw)

export function TermsOfUsePage() {
  return (
    <LegalDocumentLayout
      title="General Terms and Conditions"
      subtitle="Sun Wave LLC · Shiver Broker · shiverbroker.com"
    >
      <LegalBlocks blocks={blocks} />
    </LegalDocumentLayout>
  )
}
