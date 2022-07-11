import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { colors } = theme
  const { isRtl } = useLocale()

  return StyleSheet.create({
    container: {
      marginVertical: normalizeText(8),
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 14,
      color: '#000',
      height: 55,
      paddingHorizontal: normalizeText(20),
      fontSize: normalizeText(13),
      textAlign: isRtl ? 'right' : 'left',
    },
    prompt: {
      color: colors.softBlue,
      fontSize: normalizeText(8),
      textAlign: isRtl ? 'right' : 'left',
    },
  })
}
