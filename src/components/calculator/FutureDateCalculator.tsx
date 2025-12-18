import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface FutureDateCalculatorProps {
  currentValue: number
}

export const FutureDateCalculator = ({ currentValue }: FutureDateCalculatorProps) => {
  const [targetDate, setTargetDate] = useState('')
  const [futureValue, setFutureValue] = useState<number | null>(null)

  const handleCalculate = () => {
    // Simulamos inflación mensual del 4% (después viene de API)
    const monthlyInflation = 0.04
    const today = new Date()
    const target = new Date(targetDate)
    const monthsDiff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30))
    
    if (monthsDiff <= 0) return
    
    const futureVal = currentValue * Math.pow(1 + monthlyInflation, monthsDiff)
    setFutureValue(Math.round(futureVal))
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

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
          disabled={!targetDate}
        >
          Calcular
        </Button>
      </div>

      {futureValue && (
        <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Para esa fecha deberías cobrar</p>
          <p className="text-3xl font-bold text-primary">
            ${futureValue.toLocaleString('es-AR')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Aumento necesario: +{(((futureValue - currentValue) / currentValue) * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  )
}