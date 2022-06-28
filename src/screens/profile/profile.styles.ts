import { normalizeText, ScreenHeight, ScreenWidth } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { isRtl } = useLocale()
  const { colors } = theme
  return StyleSheet.create({
    container: {
      minHeight: ScreenHeight,
      backgroundColor: colors.blue,
    },
    header: {
      backgroundColor: colors.darkBlue,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingVertical: normalizeText(20),
      paddingHorizontal: normalizeText(30),
    },
    avatar: {
      width: normalizeText(70),
      height: normalizeText(70),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 99999,
      backgroundColor: 'white',
      marginRight: isRtl ? 0 : 20,
      marginLeft: isRtl ? 20 : 0,
    },
    name: {
      color: '#fff',
      fontSize: normalizeText(16),
      textAlign: isRtl ? 'right' : 'left',
    },
    role: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: normalizeText(11),
      marginVertical: 2,
      textAlign: isRtl ? 'right' : 'left',
    },
    job: {
      color: colors.orange,
      fontSize: normalizeText(11),
      textAlign: isRtl ? 'right' : 'left',
    },
    title: {
      paddingVertical: normalizeText(20),
      paddingHorizontal: normalizeText(30),
      fontSize: normalizeText(16),
      color: '#fff',
      fontWeight: 'bold',
    },
    list: {
      flex: 1,
      paddingHorizontal: normalizeText(30),
      marginBottom: normalizeText(40),
    },
    card: {
      backgroundColor: colors.darkBlue,
      marginBottom: 6.5,
      borderRadius: 8,
      padding: 25,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card__title: {
      color: colors.orange,
      fontSize: normalizeText(16),
      fontWeight: 'bold',
    },
    card__members: {
      color: '#fff',
      textAlign: isRtl ? 'right' : 'left',
    },
    settings: {
      padding: 40,
    },
    settings_title: {
      fontSize: normalizeText(15),
      marginBottom: normalizeText(15),
    },
    settings_item: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
  })
}
