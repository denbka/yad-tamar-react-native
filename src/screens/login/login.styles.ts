import { ScreenWidth } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      marginTop: 'auto',
      flex: 1,
      position: 'relative',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 31,
      color: '#fff',
    },
    enola: {
      color: colors.orange,
    },
    text: {
      color: colors.orange,
      fontSize: 18,
    },
    image: {
      width: '100%',
      height: 'auto',
      marginTop: 'auto',
      transform: [{ translateX: ScreenWidth * 0.03 }],
      paddingHorizontal: 48,
    },
    titleContainer: {
      paddingHorizontal: 48,
      marginTop: 100,
    },
    button: {
      color: '#000',
      marginTop: 8,
    },
  })
}
