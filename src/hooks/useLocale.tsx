import { localStrings } from '@locales'

const rtlLanguages = ['il']

export const useLocale = (): UseLocale => {
  const locale = localStrings.getLanguage() as 'il' | 'ru'
  const isRtl = rtlLanguages.includes(locale)

  return {
    locale,
    isRtl,
  }
}

type UseLocale = {
  locale: string
  isRtl: boolean
}
