import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 6,
      color: '#000',
      paddingVertical: 16,
      paddingHorizontal: 27,
      fontSize: 20,
    },
    prompt: {
      color: colors.softBlue,
    },
  })
}
