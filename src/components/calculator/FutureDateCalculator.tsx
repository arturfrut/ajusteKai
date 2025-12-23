import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar, Loader2 } from 'lucide-react'

interface FutureDateCalculatorProps {
  currentValue: number
  selectedRefs: string[]
  referenceLabels: Record<string, string>
  apiFetchers: Record<string, (startDate: string, targetDate?: string) => Promise<number | null>>
}

export const FutureDateCalculator = ({ 
  currentValue, 
  selectedRefs,
  referenceLabels,
  apiFetchers
}: FutureDateCalculatorProps) => {
  const [targetDate, setTargetDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [futureData, setFutureData] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)

  const handleCalculate = async () => {
    if (!targetDate) return
    
    setLoading(true)
    setFutureData({})
    setShowResult(true)
    
    const today = new Date().toISOString().split('T')[0]
    
    // Calcular para cada referencia
    for (const refId of selectedRefs) {
      try {
        const fetcher = apiFetchers[refId]
        const percentage = await fetcher(today, targetDate)
        
        if (percentage !== null) {
          setFutureData(prev => ({
            ...prev,
            [refId]: percentage
          }))
        }
      } catch (error) {
        console.error(`Error calculating future for ${refId}:`, error)
      }
    }
    
    setLoading(false)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Calcular promedio
  const loadedPercentages = Object.values(futureData)
  const avgPercentage =
    loadedPercentages.length > 0
      ? loadedPercentages.reduce((a, b) => a + b, 0) / loadedPercentages.length
      : 0

  const futureValue = currentValue * (1 + avgPercentage / 100)

  return (
    <div className="bg-secondary rounded-lg p-6 border border-border">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Ponerse al día
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Calculá cuánto deberías cobrar en una fecha futura para mantenerte al día con la inflación
      </p>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="target-date">¿Para qué fecha querés estar al día?</Label>
          <Input
            id="target-date"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            min={getMinDate()}
            className="mt-2"
          />
        </div>
        <Button 
          onClick={handleCalculate}
          disabled={!targetDate || loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Calculando...
            </>
          ) : (
            'Calcular'
          )}
        </Button>
      </div>

      {showResult && (
        <div className="mt-6 space-y-4">
          {/* Resultado principal */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Para esa fecha deberías cobrar</p>
            <p className="text-3xl font-bold text-primary">
              ${Math.round(futureValue).toLocaleString('es-AR')}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Aumento necesario: +{avgPercentage.toFixed(1)}%
            </p>
          </div>

          {/* Desglose por referencia */}
          {Object.keys(futureData).length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">Detalle por referencia</p>
              {selectedRefs.map((refId) => {
                const percentage = futureData[refId]
                const isLoading = loading && percentage === undefined
                const refValue = currentValue * (1 + (percentage || 0) / 100)
                
                return (
                  <div
                    key={refId}
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <span className="text-sm font-medium">{referenceLabels[refId]}</span>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : percentage !== undefined ? (
                      <div className="text-right">
                        <span className="text-sm font-semibold text-primary">
                          +{percentage.toFixed(1)}% / ${Math.round(refValue).toLocaleString('es-AR')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin datos</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}