import { ScreenHeight, ScreenWidth } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme
  //   ScreenHeight
  //   ScreenWidth
  return StyleSheet.create({
    overlay: {
      width: ScreenWidth,
      height: ScreenHeight,
      top: 0,
      left: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      width: '90%',
      minHeight: 300,
      backgroundColor: '#fff',
      overflow: 'hidden',
      borderRadius: 16,
    },
  })
}
