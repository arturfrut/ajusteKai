import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ReferencesList } from './ReferencesList'
import { ResultCard } from './ResultCard'
import { AlertCircle } from 'lucide-react'
import { FutureDateCalculator } from './FutureDateCalculator'
import { ThankYouCard } from '../sections/ThankYouCard'
import { calculateDolarBlueIncrease, calculateDolarOficialIncrease } from '@/services/dolarApi'
import { calculateCERIncrease, calculateIPCIncrease } from '@/services/indecApi'

// Mapeo de referencias a sus funciones de API
const API_FETCHERS: Record<string, (startDate: string) => Promise<number | null>> = {
  'ipc': calculateIPCIncrease,
  'cer': calculateCERIncrease,
  'dolar-blue': calculateDolarBlueIncrease,
  'dolar-oficial': calculateDolarOficialIncrease
}

const REFERENCE_LABELS: Record<string, string> = {
  'ipc': 'IPC INDEC',
  'cer': 'CER (Alquileres)',
  'dolar-blue': 'Dólar Blue',
  'dolar-oficial': 'Dólar Oficial'
}

export const CalculatorForm = () => {
  const [currentValue, setCurrentValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [selectedRefs, setSelectedRefs] = useState<string[]>([])
  const [loadingData, setLoadingData] = useState<Record<string, boolean>>({})
  const [loadedData, setLoadedData] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{
    value?: string
    date?: string
    refs?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar todos los campos
    const newErrors: typeof errors = {}

    if (!currentValue || parseFloat(currentValue) <= 0) {
      newErrors.value = 'Ingresá el valor actual de tu servicio'
    }

    if (!startDate) {
      newErrors.date = 'Seleccioná desde cuándo no aumentás'
    }

    if (selectedRefs.length === 0) {
      newErrors.refs = 'Seleccioná al menos una referencia para calcular'
    }

    // Si hay errores, mostrarlos y no continuar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Limpiar errores
    setErrors({})
    setShowResult(true)
    setLoadedData({})

    // Marcar todas como loading
    const loadingState: Record<string, boolean> = {}
    selectedRefs.forEach(id => (loadingState[id] = true))
    setLoadingData(loadingState)

    // Llamar a las APIs reales
    selectedRefs.forEach(async (refId) => {
      try {
        const fetcher = API_FETCHERS[refId]
        const percentage = await fetcher(startDate)
        
        if (percentage !== null) {
          setLoadedData(prev => ({
            ...prev,
            [refId]: percentage
          }))
        }
        
        setLoadingData(prev => ({
          ...prev,
          [refId]: false
        }))
      } catch (error) {
        console.error(`Error loading ${refId}:`, error)
        setLoadingData(prev => ({
          ...prev,
          [refId]: false
        }))
      }
    })

    // Scroll suave al resultado
    setTimeout(() => {
      document
        .getElementById('result')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  // Calcular resultado con datos disponibles
  const loadedPercentages = Object.values(loadedData)
  const avgPercentage =
    loadedPercentages.length > 0
      ? loadedPercentages.reduce((a, b) => a + b, 0) / loadedPercentages.length
      : 0

  const value = parseFloat(currentValue) || 0
  const newValue = value * (1 + avgPercentage / 100)

  // Crear breakdown para ResultCard
  const breakdown = selectedRefs.map(refId => ({
    label: REFERENCE_LABELS[refId],
    percentage: loadedData[refId] || 0,
    value: value * (1 + (loadedData[refId] || 0) / 100),
    selected: true,
    loading: loadingData[refId] || false
  }))

  return (
    <div className='space-y-8'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Valor actual */}
        <div>
          <Label htmlFor='current-value'>Valor actual de tu servicio</Label>
          <div className='relative mt-2'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
              $
            </span>
            <Input
              id='current-value'
              type='number'
              placeholder='15000'
              value={currentValue}
              onChange={e => {
                setCurrentValue(e.target.value)
                if (errors.value)
                  setErrors(prev => ({ ...prev, value: undefined }))
              }}
              className={`pl-8 ${errors.value ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.value && (
            <div className='flex items-center gap-2 mt-2 text-destructive text-sm'>
              <AlertCircle className='h-4 w-4 flex-shrink-0' />
              <span>{errors.value}</span>
            </div>
          )}
        </div>

        {/* Fecha desde que no aumenta */}
        <div>
          <Label htmlFor='start-date'>¿Desde cuándo no aumentás?</Label>
          <Input
            id='start-date'
            type='date'
            value={startDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => {
              setStartDate(e.target.value)
              if (errors.date) setErrors(prev => ({ ...prev, date: undefined }))
            }}
            className={`mt-2 ${errors.date ? 'border-destructive' : ''}`}
          />
          {errors.date && (
            <div className='flex items-center gap-2 mt-2 text-destructive text-sm'>
              <AlertCircle className='h-4 w-4 flex-shrink-0' />
              <span>{errors.date}</span>
            </div>
          )}
        </div>

        {/* Referencias */}
        <div>
          <ReferencesList
            onSelectionChange={refs => {
              setSelectedRefs(refs)
              if (errors.refs && refs.length > 0)
                setErrors(prev => ({ ...prev, refs: undefined }))
            }}
          />
          {errors.refs && (
            <div className='flex items-center gap-2 mt-3 text-destructive text-sm bg-destructive/10 border border-destructive/30 rounded-lg p-3'>
              <AlertCircle className='h-4 w-4 flex-shrink-0' />
              <span>{errors.refs}</span>
            </div>
          )}
        </div>

        {/* Botón calcular */}
        <Button type='submit' className='w-full'>
          Calcular aumento
        </Button>
      </form>

      {/* Resultado */}
      {showResult && (
        <div id='result' className='space-y-6'>
          <ResultCard
            currentValue={value}
            newValue={Math.round(newValue)}
            percentageIncrease={avgPercentage}
            breakdown={breakdown}
          />

          {/* Calculador de fecha futura */}
<FutureDateCalculator 
  currentValue={Math.round(newValue)}
  selectedRefs={selectedRefs}
  referenceLabels={REFERENCE_LABELS}
  apiFetchers={API_FETCHERS}
/>          
          {/* Thank you card */}
          <ThankYouCard />
        </div>
      )}
    </div>
  )
}