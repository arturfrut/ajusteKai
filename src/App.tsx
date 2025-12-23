import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TheProblem } from '@/components/sections/TheProblem'
import { WhyWeBuilt } from '@/components/sections/WhyWeBuilt'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { CalculatorForm } from '@/components/calculator/CalculatorForm'
import { Hero } from './components/sections/Hero'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero + Calculadora = Una pantalla */}
      <section id="calculadora" className="min-h-screen bg-gradient-hero pt-20">
        <Hero />
        
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-card border border-border">
              <CalculatorForm />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema */}
      <section id="problema" className="py-20 bg-background">
        <TheProblem />
      </section>

      {/* Sección 3: Por qué hicimos esto */}
      <section id="porque" className="py-20 bg-secondary">
        <WhyWeBuilt />
      </section>

      {/* Sección 4: Quiénes somos */}
      <section id="nosotros" className="py-20 bg-background">
        <WhoWeAre />
      </section>

      <Footer />
    </div>
  )
}

export default App