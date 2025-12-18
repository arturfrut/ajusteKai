import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

interface ReferenceItemProps {
  id: string
  label: string
  frequency: 'monthly' | 'daily'
  value?: number
  loading: boolean
  checked: boolean
  onToggle: () => void
}

export const ReferenceItem = ({
  id,
  label,
  frequency,
  value,
  loading,
  checked,
  onToggle
}: ReferenceItemProps) => {
  const bgColor = frequency === 'monthly' 
    ? 'bg-primary/5 border-primary/20' 
    : 'bg-accent/5 border-accent/20'
  
  const badgeVariant = frequency === 'monthly' ? 'default' : 'secondary'

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      checked ? bgColor : 'border-border bg-muted/30'
    }`}>
      <div className="flex items-start gap-3">
        <Checkbox 
          id={id}
          checked={checked}
          onCheckedChange={onToggle}
          disabled={loading}
          className="mt-1"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor={id} className="font-medium cursor-pointer">
              {label}
            </Label>
            <Badge variant={badgeVariant} className="text-xs">
              {frequency === 'monthly' ? 'Mensual' : 'Diario'}
            </Badge>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Cargando datos...</span>
            </div>
          )}
          
          {!loading && value !== undefined && (
            <div className="text-sm text-muted-foreground mt-1">
              <span className="font-semibold text-primary">+{value.toFixed(2)}%</span>
              {' de aumento'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}