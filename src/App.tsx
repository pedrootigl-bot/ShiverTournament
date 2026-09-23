import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ComoParticipar } from './components/ComoParticipar'
import { CtaBanner } from './components/CtaBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Premios } from './components/Premios'
import { Ranking } from './components/Ranking'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsOfUsePage } from './pages/TermsOfUsePage'

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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
      </Routes>
    </>
  )
}

export default App
