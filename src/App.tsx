import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ComoParticipar } from './components/ComoParticipar'
import { CtaBanner } from './components/CtaBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Premios } from './components/Premios'
import { Ranking } from './components/Ranking'

const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((module) => ({
    default: module.PrivacyPolicyPage,
  })),
)

const TermsOfUsePage = lazy(() =>
  import('./pages/TermsOfUsePage').then((module) => ({
    default: module.TermsOfUsePage,
  })),
)

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <Premios />
        <ComoParticipar />
        <Ranking />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[#07111d] font-sans text-sm text-white/70">
      Carregando…
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
