import { localStrings } from '@locales'
import React, { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react'

const rtlLanguages = ['he-IL']

type ModalContext = {
  isRtl: boolean
  currentLocale: string
  strings: typeof localStrings
  toggleLanguage: () => void
}
type LocaleProviderProps = {
  children: ReactNode
}

const context = createContext<ModalContext>({
  isRtl: false,
  currentLocale: 'he-IL',
  strings: localStrings,
  toggleLanguage: () => {},
})

export const useLocale = () => useContext(context)

export const LocaleProvider: FC<LocaleProviderProps> = ({ children }) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)
  const [currentLocale, setCurrentLocale] = useState(localStrings.getLanguage())

  const isRtl = useMemo(() => rtlLanguages.includes(currentLocale), [currentLocale])
  const strings = useMemo(() => localStrings, [currentLocale])
  console.log(isRtl)
  const toggleLanguage = () => {
    const availableLanguages = localStrings.getAvailableLanguages()
    localStrings.setLanguage(availableLanguages[currentLanguageIndex])
    setCurrentLocale(availableLanguages[currentLanguageIndex])
    setCurrentLanguageIndex(currentLanguageIndex >= availableLanguages.length - 1 ? 0 : currentLanguageIndex + 1)
  }

  return <context.Provider value={{ isRtl, currentLocale, strings, toggleLanguage }}>{children}</context.Provider>
}
