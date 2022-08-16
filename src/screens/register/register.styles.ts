import { normalizeText } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { Platform, StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    title: {
      fontSize: normalizeText(16),
      color: '#fff',
      textAlign: 'left',
    },
    image_title: {
      width: 41,
      height: 41,
    },
    enola: {
      color: colors.orange,
    },
    text: {
      fontSize: normalizeText(12),
    },
    image: {
      width: '100%',
      flex: Platform.OS === 'ios' ? 1.5 : 2,
    },
    title_container_reverse: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: normalizeText(10),
      paddingTop: normalizeText(20),
      paddingHorizontal: normalizeText(20),
    },
    title_container: {
      flex: 1,
      paddingHorizontal: normalizeText(20),
    },
    button: {
      color: '#000',
      marginTop: 8,
    },
    errorInput: {
      borderColor: 'red',
      borderWidth: 1,
    },
  })
}
