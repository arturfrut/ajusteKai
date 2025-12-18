import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface ComparisonChartProps {
  currentValue: number
  newValue: number
}

export const ComparisonChart = ({
  currentValue,
  newValue
}: ComparisonChartProps) => {
  const data = [
    {
      name: 'Valor anterior',
      value: currentValue,
      color: 'hsl(var(--muted-foreground))'
    },
    {
      name: 'Valor sugerido',
      value: newValue,
      color: 'hsl(var(--primary))'
    }
  ]

  return (
    <div className='bg-white/10 rounded-lg p-4'>
      <p className='text-sm text-white/90 mb-4 text-center'>
        Comparación visual
      </p>
      <ResponsiveContainer width='100%' height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
          <XAxis dataKey='name' tick={{ fill: 'white', fontSize: 12 }} />
          <YAxis
            tick={{ fill: 'white', fontSize: 12 }}
            tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number | undefined) =>
              value ? `$${value.toLocaleString('es-AR')}` : '$0'
            }
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Bar dataKey='value' radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
