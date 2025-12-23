import { useState, useEffect } from 'react'
import { ReferenceItem } from './ReferenceItem'
import { Label } from '@/components/ui/label'

interface ReferencesListProps {
  onSelectionChange: (selected: string[]) => void
}

export const ReferencesList = ({ onSelectionChange }: ReferencesListProps) => {
  const [selectedRefs, setSelectedRefs] = useState<string[]>([
    'ipc',
    'cer',
    'dolar-blue'
  ])
  const references = [
    {
      id: 'ipc',
      label: 'IPC INDEC',
      frequency: 'monthly' as const
    },
    {
      id: 'cer',
      label: 'CER (Alquileres)',
      frequency: 'daily' as const
    },
    {
      id: 'dolar-blue',
      label: 'Dólar Blue',
      frequency: 'daily' as const
    },
    {
      id: 'dolar-oficial',
      label: 'Dólar Oficial',
      frequency: 'daily' as const
    }
  ]

  const toggleReference = (id: string) => {
    setSelectedRefs(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    )
  }

  // Notificar cambios al padre
  useEffect(() => {
    onSelectionChange(selectedRefs)
  }, [selectedRefs, onSelectionChange])

  return (
    <div className="space-y-3">
      <Label>Referencias para calcular el aumento</Label>
      <div className="space-y-3">
        {references.map(ref => (
          <ReferenceItem
            key={ref.id}
            id={ref.id}
            label={ref.label}
            frequency={ref.frequency}
            loading={false}
            checked={selectedRefs.includes(ref.id)}
            onToggle={() => toggleReference(ref.id)}
          />
        ))}
      </div>

      {/* Leyenda de colores */}
      <div className="flex gap-4 text-xs text-muted-foreground justify-center pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/20" />
          <span>Datos mensuales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent/20" />
          <span>Datos diarios</span>
        </div>
      </div>
    </div>
  )
}