import { normalizeText } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      paddingHorizontal: 40,
      paddingTop: 20,
    },
    body: {},
    title: {
      color: colors.darkBlue,
      fontSize: normalizeText(17),
      textAlign: 'center',
    },
    input_title: {
      color: '#000',
      fontSize: normalizeText(15),
    },
    input: {
      backgroundColor: colors.softBlue,
      paddingHorizontal: 15,
      paddingVertical: 0,
      fontSize: normalizeText(17),
      height: 46,
      color: '#000',
    },
    phone_title: {
      fontSize: normalizeText(15),
      color: '#000',
      marginTop: 42,
      marginBottom: 13,
    },
    button_create: {
      marginTop: 15,
      marginBottom: 50,
      backgroundColor: colors.darkBlue,
    },
  })
}
