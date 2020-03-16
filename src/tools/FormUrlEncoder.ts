export default class FormUrlEncoder {
  public static encode(obj: { [key: string]: any }): string {
    return Object.entries(obj).map(([key, value]) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')
  }
}
