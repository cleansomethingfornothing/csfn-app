export default function language(): string {
  if (window.navigator.languages) {
    return window.navigator.languages[0]
  } else {
    return (window.navigator as any).userLanguage || window.navigator.language
  }
}
