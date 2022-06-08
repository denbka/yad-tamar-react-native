import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme
  const { isRtl } = useLocale()
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    body: {
      paddingHorizontal: 40,
      paddingTop: 20,
      flex: 1,
      height: 'auto',
    },
    section_title: {
      fontSize: normalizeText(16),
      color: '#fff',
      marginBottom: 13,
      marginTop: 50,
    },
    list: {
      marginTop: 10,
    },
    list__title: {
      marginTop: 25,
      fontSize: normalizeText(16),
      color: '#fff',
    },
    card: {
      width: '100%',
      backgroundColor: colors.darkBlue,
      marginBottom: 6.5,
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
    card_title_container: {
      flexDirection: isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    medal: {
      marginRight: isRtl ? 0 : 15,
      marginLeft: isRtl ? 15 : 0,
    },
  })
}
