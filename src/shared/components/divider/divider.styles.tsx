import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.softBlue,
    },
  })
}
