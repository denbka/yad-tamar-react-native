import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { isRtl } = useLocale()
  const { colors } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    body: {
      paddingHorizontal: normalizeText(30),
      paddingTop: 10,
      flex: 1,
    },
    input_title_container: {
      flexDirection: isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input_title: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
      fontSize: normalizeText(16),
      color: '#fff',
    },
    phone_title: {
      fontSize: normalizeText(16),
      color: '#fff',
      marginTop: normalizeText(25),
      marginBottom: normalizeText(3),
    },
    phone_input: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.softBlue,
      color: '#fff',
      fontSize: normalizeText(11),
    },
    button_create: {
      marginTop: 'auto',
      marginBottom: normalizeText(35),
    },
  })
}
