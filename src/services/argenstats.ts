const API_KEY = 'as_prod_SDBdQuXyw45AehYHV4GXHpPApnpNSbDi'
const BASE_URL = 'https://argenstats.com/api/v1'

interface IPCHistoricalData {
  date: string
  values: {
    monthly: number
    yearly: number
    accumulated: number
  }
  index: number
}

interface CERHistoricalData {
  date: string
  value: number
  variations: {
    daily: number
    monthly: number
    yearly: number
    accumulated: number
  }
}

// Calcular aumento acumulado de IPC
const calculateIPCIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  try {
    const endDate = targetDate || new Date().toISOString().split('T')[0]
    
    const response = await fetch(
      `${BASE_URL}/inflation?view=historical&from=${startDate}&to=${endDate}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    )

    if (!response.ok) return 0

    const json = await response.json()
    
    if (!json.success || !json.data || json.data.length === 0) return 0

    const data: IPCHistoricalData[] = json.data
    
    // Ordenar por fecha
    const sorted = data.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    if (sorted.length < 2) return sorted[0]?.values.accumulated || 0

    const firstIndex = sorted[0].index
    const lastIndex = sorted[sorted.length - 1].index

    // Calcular aumento porcentual
    return ((lastIndex / firstIndex) - 1) * 100

  } catch (error) {
    console.error('Error calculating IPC increase:', error)
    return 0
  }
}

// Calcular aumento acumulado de CER
const calculateCERIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  try {
    const endDate = targetDate || new Date().toISOString().split('T')[0]
    
    const response = await fetch(
      `${BASE_URL}/cer?view=historical&from=${startDate}&to=${endDate}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    )

    if (!response.ok) return 0

    const json = await response.json()
    
    if (!json.success || !json.data || json.data.length === 0) return 0

    const data: CERHistoricalData[] = json.data
    
    // Ordenar por fecha
    const sorted = data.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    if (sorted.length < 2) return sorted[0]?.variations.accumulated || 0

    const firstValue = sorted[0].value
    const lastValue = sorted[sorted.length - 1].value

    // Calcular aumento porcentual
    return ((lastValue / firstValue) - 1) * 100

  } catch (error) {
    console.error('Error calculating CER increase:', error)
    return 0
  }
}

export { calculateIPCIncrease, calculateCERIncrease }