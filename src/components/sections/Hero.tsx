export const Hero = () => {
  return (
    <div className='container mx-auto px-4 py-8 mb-8'>
      <div className='max-w-2xl mx-auto '>
        {/* Título con logo */}
        <div className='flex items-center gap-4 mb-4 justify-center'>
          <div className='h-12 w-12 bg-gradient-primary rounded-xl flex ' />
          <h1 className='text-4xl font-bold text-foreground'>Ajuste Kai</h1>
        </div>

        {/* Subtítulo */}
        <p className='text-lg text-muted-foreground flex justify-center'>
          Calculá cuánto deberías cobrar hoy en base a datos reales del mercado
          argentino
        </p>
      </div>
    </div>
  )
}
