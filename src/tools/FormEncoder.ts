export default class FormEncoder {
    public static encodeUrl(obj: { [key: string]: any }): string {
        return Object.entries(obj).map(([key, value]) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')
    }

    public static encodeData(obj: { [key: string]: any }) {
        const data = new FormData()
        Object.entries(obj).forEach(([key, value]) => {
            data.append(key, value)
        })
        return data
    }
}
