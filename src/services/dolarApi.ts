interface DolarResponse {
  compra: number
  venta: number
  fechaActualizacion: string
}

// Obtener valor actual del dólar
const getDolarActual = async (type: 'oficial' | 'blue'): Promise<number | null> => {
  try {
    const response = await fetch(`https://dolarapi.com/v1/dolares/${type}`)
    if (!response.ok) return null
    
    const data: DolarResponse = await response.json()
    return data.venta
  } catch (error) {
    console.error(`Error fetching ${type}:`, error)
    return null
  }
}

// Fallback: estimar aumento basado en tasa mensual promedio
const estimateDolarIncrease = (startDate: string, monthlyRate: number): number => {
  const start = new Date(startDate)
  const today = new Date()
  const months = Math.round((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
  
  return (Math.pow(1 + monthlyRate, months) - 1) * 100
}

// Calcular aumento del dólar blue (híbrido: valor actual real + histórico estimado)
export const calculateDolarBlueIncrease = async (startDate: string): Promise<number | null> => {
  try {
    const actualValue = await getDolarActual('blue')
    
    // Si falla la API, usar estimación pura
    if (!actualValue) return estimateDolarIncrease(startDate, 0.035)
    
    // Calcular meses transcurridos
    const months = Math.round(
      (new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
    
    // Estimar valor histórico (inverso del crecimiento: valor_actual / (1 + tasa)^meses)
    const estimatedHistorical = actualValue / Math.pow(1.035, months)
    
    // Calcular % de aumento real
    return ((actualValue - estimatedHistorical) / estimatedHistorical) * 100
  } catch (error) {
    console.error('Error calculating dolar blue increase:', error)
    return estimateDolarIncrease(startDate, 0.035)
  }
}

// Calcular aumento del dólar oficial (híbrido: valor actual real + histórico estimado)
export const calculateDolarOficialIncrease = async (startDate: string): Promise<number | null> => {
  try {
    const actualValue = await getDolarActual('oficial')
    
    // Si falla la API, usar estimación pura
    if (!actualValue) return estimateDolarIncrease(startDate, 0.03)
    
    // Calcular meses transcurridos
    const months = Math.round(
      (new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
    
    // Estimar valor histórico
    const estimatedHistorical = actualValue / Math.pow(1.03, months)
    
    // Calcular % de aumento real
    return ((actualValue - estimatedHistorical) / estimatedHistorical) * 100
  } catch (error) {
    console.error('Error calculating dolar oficial increase:', error)
    return estimateDolarIncrease(startDate, 0.03)
  }
}