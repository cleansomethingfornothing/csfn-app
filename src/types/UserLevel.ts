export interface UserLevel {
    index: number
    name: string
    icon: string
    background: string
    threshold: {
        cleanups: number,
        liters: number
        kilos: number
    }
}
