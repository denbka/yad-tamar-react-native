import { normalizeText } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    text: {
      fontWeight: 'bold',
    },
    whiteShadow: {
      width: '100%',
    },
    button: {
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      width: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.blue,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
      position: 'relative',
      height: 55,
    },
    inset_shadow_container: {
      overflow: 'hidden',
      width: '100%',
      borderRadius: 14,
      height: '100%',
      paddingVertical: 27,
      top: 0,
      left: 0,
      position: 'absolute',
    },
    inset_shadow_top: {
      position: 'absolute',
      backgroundColor: '#fff',
      alignSelf: 'center',
      height: 5,
      width: '100%',
      top: -7,
      shadowColor: '#fff',
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.24,
    },
    white: {},
    green: {
      backgroundColor: colors.green,
    },
    inline: {
      backgroundColor: colors.blue,
    },
    flat: {
      backgroundColor: colors.darkBlue,
    },
    orange: {
      backgroundColor: colors.darkBlue,
      borderColor: colors.orange,
      shadowOpacity: 0,
    },
  })
}
