import { ComoParticipar } from './components/ComoParticipar'
import { CtaBanner } from './components/CtaBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Premios } from './components/Premios'
import { Ranking } from './components/Ranking'

function App() {
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

export default App
