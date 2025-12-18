import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TheProblem } from '@/components/sections/TheProblem'
import { WhyWeBuilt } from '@/components/sections/WhyWeBuilt'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { CalculatorForm } from '@/components/calculator/CalculatorForm'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Sección 1: Calculadora */}
      <section id="calculadora" className="min-h-screen pt-20 bg-gradient-hero flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                ¿Cuánto deberías cobrar hoy?
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculá tu aumento en base a referencias concretas del mercado argentino
              </p>
            </div>

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