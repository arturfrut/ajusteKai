interface SeriesDataPoint {
  date: string // YYYY-MM-DD
  value: number
}

const getSeriesData = async (
  seriesId: string,
  startDate: string
): Promise<SeriesDataPoint[]> => {
  try {
    const response = await fetch(
      `https://apis.datos.gob.ar/series/api/series` +
        `?ids=${seriesId}` +
        `&start_date=${startDate}` +
        `&limit=5000` +
        `&format=json`
    )

    if (!response.ok) {
      console.error('HTTP error', response.status)
      return []
    }

    const json = await response.json()

    if (!json.data || json.data.length === 0) return []

    return json.data.map((item: [string, number]) => ({
      date: item[0],
      value: item[1]
    }))
  } catch (err) {
    console.error('Fetch error:', err)
    return []
  }
}

const calculateAccumulatedIncrease = (data: SeriesDataPoint[]): number => {
  if (data.length < 2) return 0

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const first = sorted[0].value
  const last = sorted[sorted.length - 1].value

  return ((last / first) - 1) * 100
}

// Calcular tasa mensual promedio de los últimos N meses
const calculateMonthlyAverageRate = (data: SeriesDataPoint[], lastNMonths: number = 6): number => {
  if (data.length < 2) return 0

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Tomar solo los últimos N meses
  const recentData = sorted.slice(-lastNMonths)
  
  if (recentData.length < 2) return 0

  const first = recentData[0].value
  const last = recentData[recentData.length - 1].value
  const monthsElapsed = recentData.length - 1

  // Calcular tasa de crecimiento total y dividir por meses
  const totalGrowth = (last / first) - 1
  const monthlyRate = Math.pow(1 + totalGrowth, 1 / monthsElapsed) - 1

  return monthlyRate
}

// Proyectar inflación futura basándose en tendencia reciente
const projectFutureInflation = async (targetDate: string): Promise<number> => {
  try {
    // Obtener datos de los últimos 12 meses
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 12)
    
    const startDateStr = startDate.toISOString().split('T')[0]
    const data = await getSeriesData(IPC_SERIES_ID, startDateStr)

    if (data.length < 2) {
      // Fallback: usar tasa estimada del 3% mensual
      const today = new Date()
      const target = new Date(targetDate)
      const monthsDiff = Math.round(
        (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)
      )
      return (Math.pow(1.03, monthsDiff) - 1) * 100
    }

    // Calcular tasa mensual promedio de los últimos 6 meses
    const monthlyRate = calculateMonthlyAverageRate(data, 6)

    // Calcular meses desde hoy hasta la fecha objetivo
    const today = new Date()
    const target = new Date(targetDate)
    const monthsToFuture = Math.round(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)
    )

    if (monthsToFuture <= 0) return 0

    // Proyectar usando tasa mensual promedio
    return (Math.pow(1 + monthlyRate, monthsToFuture) - 1) * 100

  } catch (error) {
    console.error('Error projecting future inflation:', error)
    // Fallback: 3% mensual
    const today = new Date()
    const target = new Date(targetDate)
    const monthsDiff = Math.round(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
    return (Math.pow(1.03, monthsDiff) - 1) * 100
  }
}

const IPC_SERIES_ID = '148.3_INIVELNAL_DICI_M_26'

export const calculateIPCIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  // Si hay targetDate y es una fecha futura, proyectar
  if (targetDate) {
    const today = new Date()
    const target = new Date(targetDate)
    
    if (target > today) {
      // Fecha futura: proyectar inflación
      return await projectFutureInflation(targetDate)
    }
  }

  // Fecha pasada o sin targetDate: calcular histórico
  const data = await getSeriesData(IPC_SERIES_ID, startDate)
  return calculateAccumulatedIncrease(data)
}


const CER_SERIES_ID = '94.2_CD_D_0_0_10'

export const calculateCERIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  // Si hay targetDate y es una fecha futura, proyectar
  if (targetDate) {
    const today = new Date()
    const target = new Date(targetDate)
    
    if (target > today) {
      // Para CER futuro, usar proyección del IPC (CER sigue inflación)
      return await projectFutureInflation(targetDate)
    }
  }

  // Fecha pasada o sin targetDate: calcular histórico
  const data = await getSeriesData(CER_SERIES_ID, startDate)
  return calculateAccumulatedIncrease(data)
}