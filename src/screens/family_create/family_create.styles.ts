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
    list: {
      marginTop: normalizeText(7),
    },
    list__title: {
      marginTop: normalizeText(20),
      fontSize: normalizeText(16),
      color: '#fff',
    },
    card: {
      width: '100%',
      backgroundColor: colors.darkBlue,
      marginBottom: normalizeText(4),
      borderRadius: 8,
      paddingVertical: normalizeText(10),
      paddingHorizontal: normalizeText(24),
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card__content: {},
    card__title: {
      color: '#fff',
      fontSize: normalizeText(12),
    },
    card__members: {
      color: '#fff',
    },
    button_add: {
      marginTop: normalizeText(16),
    },
    button_create: {
      marginTop: 'auto',
      marginBottom: normalizeText(35),
    },
  })
}
