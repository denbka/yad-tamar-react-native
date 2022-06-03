import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    header: {
      backgroundColor: colors.darkBlue,
      flexDirection: 'row',
      paddingVertical: 20,
      paddingHorizontal: 40,
    },
    header_text: {
      color: colors.softBlue,
      marginLeft: 16,
    },
  })
}
