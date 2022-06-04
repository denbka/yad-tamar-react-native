import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme
  const { isRtl } = useLocale()

  return StyleSheet.create({
    initial: {
      textAlign: isRtl ? 'right' : 'left',
      color: '#fff',
    },
  })
}
