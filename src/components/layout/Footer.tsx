import { Heart, Instagram } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className='bg-secondary/30 py-8'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4'>
          <div className='flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent'>
            <div className='h-10 w-10 bg-gradient-primary rounded-lg' />
            Ajuste Kai
          </div>

          <p className='text-muted-foreground'>
            Calculá tu aumento con datos reales del mercado argentino
          </p>

          <a 
            href="https://instagram.com/marketingkai.ok" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={18} />
            @marketingkai.ok
          </a>

          <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
            <span>Hecho con</span>
            <Heart className='text-primary fill-primary' size={16} />
            <span>por</span>
            <a 
              href="https://marketingkai.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Marketing KAI
            </a>
          </div>

          <div className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Ajuste Kai. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}