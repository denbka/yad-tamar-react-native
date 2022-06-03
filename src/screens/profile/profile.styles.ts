import { ScreenWidth } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    header: {
      backgroundColor: colors.darkBlue,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 40,
    },
    avatar: {
      width: 85,
      height: 85,
      borderRadius: 99999,
      backgroundColor: 'white',
      marginRight: 20,
    },
    name: {
      color: '#fff',
      fontSize: 24,
    },
    role: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: 16,
      marginVertical: 2,
    },
    job: {
      color: colors.orange,
      fontSize: 16,
    },
    button_create: {
      width: ScreenWidth - 160,
      marginLeft: 80,
      marginTop: 30,
    },
    title: {
      paddingHorizontal: 40,
      marginVertical: 30,
      fontSize: 22,
      color: '#fff',
      fontWeight: 'bold',
    },
    list: {
      paddingHorizontal: 40,
    },
    card: {
      backgroundColor: colors.darkBlue,
      marginBottom: 6.5,
      borderRadius: 8,
      padding: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card__content: {},
    card__title: {
      color: colors.orange,
      fontSize: 22,
      fontWeight: 'bold',
    },
    card__members: {
      color: '#fff',
    },
  })
}
