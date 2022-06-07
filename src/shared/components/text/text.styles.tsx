import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { TextProp } from './text.component'

export const createStyles = (theme: ExtendedTheme, { bold }: TextProp) => {
  const { colors } = theme
  const { isRtl } = useLocale()

  return StyleSheet.create({
    initial: {
      textAlign: isRtl ? 'right' : 'left',
      color: '#fff',
      fontWeight: bold ? 'bold' : '400',
    },
  })
}
