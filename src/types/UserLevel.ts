export interface UserLevel {
  index: number
  name: string
  icon: string
  background: string
  backgroundClass: string,
  threshold: {
    cleanups: number,
    liters: number
    kilos: number
  }
}
