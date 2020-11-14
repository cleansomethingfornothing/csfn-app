export interface MonthStat {
    month: number
    year: number
    kilos: number
    liters: number
}

export default interface MonthStats {
    world: MonthStat[]
    country: MonthStat[]
}

