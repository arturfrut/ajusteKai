import { Button } from '@/components/ui/button'
import { Instagram, ExternalLink } from 'lucide-react'

export const WhoWeAre = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Quiénes somos
        </h2>
        
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Somos <strong className="text-primary">Marketing Kai</strong>, 
            una agencia digital enfocada en acompañar a emprendedores y pymes argentinas 
            en su transformación digital.
          </p>
          
          <p>
            No solo hacemos marketing: ayudamos a nuestros clientes a implementar tecnología 
            que realmente les sirva, desde herramientas SaaS hasta automatizaciones con IA 
            y desarrollo de software a medida.
          </p>

          <div className="bg-gradient-primary rounded-lg p-8 mt-8">
            <p className="text-white text-xl font-medium mb-6">
              ¿Querés trabajar con nosotros o simplemente charlar sobre tu proyecto?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://marketingkai.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button 
                  variant="secondary" 
                  className="w-full rounded-full"
                  size="lg"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visitar marketingkai.com
                </Button>
              </a>
              
              <a 
                href="https://instagram.com/marketingkai.ok" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button 
                  variant="secondary" 
                  className="w-full rounded-full"
                  size="lg"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Seguinos en Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}