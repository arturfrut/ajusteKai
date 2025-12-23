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
const estimateDolarIncrease = (
  startDate: string, 
  monthlyRate: number, 
  targetDate?: string
): number => {
  const start = new Date(startDate)
  const end = targetDate ? new Date(targetDate) : new Date()
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
  
  return (Math.pow(1 + monthlyRate, months) - 1) * 100
}

// Calcular aumento del dólar blue
export const calculateDolarBlueIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number | null> => {
  try {
    // Si hay targetDate (fecha futura), usar estimación directa
    if (targetDate) {
      return estimateDolarIncrease(startDate, 0.035, targetDate)
    }
    
    // Si no hay targetDate, calcular desde startDate hasta hoy con valor real
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
    return estimateDolarIncrease(startDate, 0.035, targetDate)
  }
}

// Calcular aumento del dólar oficial
export const calculateDolarOficialIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number | null> => {
  try {
    // Si hay targetDate (fecha futura), usar estimación directa
    if (targetDate) {
      return estimateDolarIncrease(startDate, 0.03, targetDate)
    }
    
    // Si no hay targetDate, calcular desde startDate hasta hoy con valor real
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
    return estimateDolarIncrease(startDate, 0.03, targetDate)
  }
}