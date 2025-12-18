import { ComparisonChart } from "../charts/ComparisonChart"

interface ReferenceBreakdown {
  label: string
  percentage: number
  value: number
  selected: boolean
  loading?: boolean
}

interface ResultCardProps {
  currentValue: number
  newValue: number
  percentageIncrease: number
  breakdown: ReferenceBreakdown[]
}

export const ResultCard = ({ 
  currentValue, 
  newValue, 
  percentageIncrease,
  breakdown 
}: ResultCardProps) => {
  return (
    <div className="bg-gradient-primary rounded-lg p-8 text-white shadow-soft">
      <div className="space-y-6">
        {/* Resultado principal */}
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2">Por promedio deberías cobrar hoy</p>
          <p className="text-5xl md:text-6xl font-bold">
            ${newValue.toLocaleString('es-AR')}
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-sm opacity-90">Valor anterior</p>
            <p className="text-2xl font-semibold">${currentValue.toLocaleString('es-AR')}</p>
          </div>
          
          <div className="h-12 w-px bg-white/30" />
          
          <div>
            <p className="text-sm opacity-90">Aumento por promedio</p>
            <p className="text-2xl font-semibold">+{percentageIncrease.toFixed(1)}%</p>
          </div>
        </div>

        {/* Gráfico de comparación */}
        <ComparisonChart currentValue={currentValue} newValue={newValue} />

        {/* Desglose por referencia */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-sm opacity-90 mb-4 text-center">Detalle por referencia</p>
          <div className="space-y-2">
            {breakdown.map((item, index) => {
              const itemValue = currentValue * (1 + item.percentage / 100)
              return (
                <div 
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg bg-white/10 transition-opacity ${
                    !item.selected ? 'opacity-40' : ''
                  }`}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      +{item.percentage.toFixed(1)}% / ${Math.round(itemValue).toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}