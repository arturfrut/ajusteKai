import { Instagram, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ThankYouCard = () => {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 rounded-lg p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Heart className="h-8 w-8 text-primary fill-primary" />
        
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            ¿Te sirvió esta herramienta?
          </h3>
          <p className="text-muted-foreground text-sm">
            Agradeceríamos que nos sigas en Instagram <strong>@marketingkai.ok</strong>
            <br />
            Nos encanta recibir mensajes lindos 💜
          </p>
        </div>

        <a 
          href="https://instagram.com/marketingkai.ok" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto gap-2">
            <Instagram className="h-4 w-4" />
            Seguir @marketingkai.ok
          </Button>
        </a>
      </div>
    </div>
  )
}