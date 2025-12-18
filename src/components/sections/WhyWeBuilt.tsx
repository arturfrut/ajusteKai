export const WhyWeBuilt = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Por qué hicimos esta app
        </h2>
        
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            En <strong className="text-primary">Marketing Kai</strong> trabajamos ayudando a emprendedores y pymes argentinas 
            a resolver problemas reales con tecnología simple.
          </p>
          
          <p>
            Vimos que muchos de nuestros clientes (profesores de yoga, diseñadores, consultores) 
            <strong className="text-foreground"> no sabían cuándo ni cuánto aumentar</strong>. 
            Algunos perdían plata por meses sin darse cuenta.
          </p>

          <p>
            Creemos que la tecnología debe ser accesible y útil, no complicada. 
            Por eso creamos esta herramienta <strong className="text-primary">100% gratuita</strong>.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 mt-8 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Nuestra filosofía
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Resolver problemas reales de pymes argentinas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Usar herramientas simples y gratuitas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Acompañar en el uso de SaaS y automatización con IA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Crear software a medida cuando tiene sentido</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}