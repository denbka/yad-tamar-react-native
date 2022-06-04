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
      paddingHorizontal: 40,
      paddingTop: 20,
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
      fontSize: 22,
      color: '#fff',
    },
    phone_title: {
      fontSize: 18,
      color: '#fff',
      marginTop: 42,
      marginBottom: 13,
    },
    phone_input: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.softBlue,
      color: '#fff',
      fontSize: 14,
    },
    list: {
      marginTop: 10,
    },
    list__title: {
      marginTop: 25,
      fontSize: 22,
      color: '#fff',
    },
    card: {
      width: '100%',
      backgroundColor: colors.darkBlue,
      marginBottom: 6.5,
      borderRadius: 8,
      paddingVertical: 13,
      paddingHorizontal: 30,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card__content: {},
    card__title: {
      color: '#fff',
      fontSize: 17,
    },
    card__members: {
      color: '#fff',
    },
    button_add: {
      marginTop: 22,
    },
    button_create: {
      marginTop: 100,
      marginBottom: 50,
    },
  })
}
