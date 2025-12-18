export interface SeriesDataPoint {
  date: string // YYYY-MM-DD
  value: number
}

const normalizeMonthlyDate = (date: string): string => {
  const d = new Date(date)

  // siempre primer día del mes
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}-01`
}

const today = new Date()
const todayMonthly = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, '0')}-01`

const clampStartDate = (date: string): string => {
  const normalized = normalizeMonthlyDate(date)
  return normalized > todayMonthly ? todayMonthly : normalized
}

const getSeriesData = async (
  seriesId: string,
  startDate: string
): Promise<SeriesDataPoint[]> => {
  try {
    const safeStartDate = clampStartDate(startDate)

    const response = await fetch(
      `https://apis.datos.gob.ar/series/api/series` +
        `?ids=${seriesId}` +
        `&start_date=${safeStartDate}` +
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


const calculateAccumulatedIncrease = (
  data: SeriesDataPoint[]
): number => {
  if (data.length < 2) return 0

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const first = sorted[0].value
  const last = sorted[sorted.length - 1].value

  return ((last / first) - 1) * 100
}

const projectFutureIncrease = (
  data: SeriesDataPoint[],
  targetDate: string
): number => {
  if (data.length < 2) return 0

  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const firstDate = new Date(sorted[0].date)
  const lastDate = new Date(sorted[sorted.length - 1].date)
  const target = new Date(targetDate)

  const totalIncrease = calculateAccumulatedIncrease(sorted)
  const monthsElapsed =
    (lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
    (lastDate.getMonth() - firstDate.getMonth())

  if (monthsElapsed <= 0) return totalIncrease

  const monthlyAvg = totalIncrease / monthsElapsed

  const futureMonths =
    (target.getFullYear() - lastDate.getFullYear()) * 12 +
    (target.getMonth() - lastDate.getMonth())

  return totalIncrease + monthlyAvg * futureMonths
}


const ALQUILERES_SERIES_ID = '169.1_ICCPN_0_M_38'
const CANASTA_SERIES_ID = '444.1_CANASTA_batotPampeana_0_0_26_47'
const IPC_SERIES_ID = '148.3_INIVELNAL_DICI_M_26'





export const calculateIPCIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  const data = await getSeriesData(IPC_SERIES_ID, startDate)
  return targetDate
    ? projectFutureIncrease(data, targetDate)
    : calculateAccumulatedIncrease(data)
}

export const calculateCanastaBasicaIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  const data = await getSeriesData(CANASTA_SERIES_ID, startDate)
  return targetDate
    ? projectFutureIncrease(data, targetDate)
    : calculateAccumulatedIncrease(data)
}

export const calculateAlquileresIncrease = async (
  startDate: string,
  targetDate?: string
): Promise<number> => {
  const data = await getSeriesData(ALQUILERES_SERIES_ID, startDate)
  return targetDate
    ? projectFutureIncrease(data, targetDate)
    : calculateAccumulatedIncrease(data)
}
