export const TheProblem = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          El problema
        </h2>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            En Argentina, la inflación hace que los precios pierdan sentido cada mes. 
            Como trabajador independiente o pyme, <strong className="text-foreground">no sabés cuánto aumentar ni cuándo hacerlo</strong>.
          </p>
          
          <p>
            Aumentar "de onda" o por intuición hace que pierdas plata sin darte cuenta. 
            Esperar demasiado te deja atrás. Aumentar mucho de golpe espanta clientes.
          </p>
          
          <p>
            <strong className="text-primary">No tenés referencias claras</strong> porque cada rubro es diferente, 
            y compararte con otros no siempre tiene sentido.
          </p>

          <div className="bg-secondary/50 border-l-4 border-primary p-6 rounded-r-lg mt-8">
            <p className="text-foreground font-semibold">
              Esta herramienta te da datos concretos del mercado argentino para que tomes decisiones informadas sobre tus precios.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}