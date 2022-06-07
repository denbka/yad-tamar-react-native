import { normalizeText } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    bottomsheet: {
      bottom: 0,
      backgroundColor: colors.blue,
      paddingVertical: normalizeText(15),
      paddingHorizontal: normalizeText(40),
      position: 'relative',
    },
  })
}
