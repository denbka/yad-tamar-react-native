import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { StyleSheet } from 'react-native'

export const createStyles = () => {
  const { isRtl } = useLocale()

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 25,
      paddingVertical: 40,
      justifyContent: 'center',
    },
    body: {},
    item: {
      width: '100%',
      flexDirection: isRtl ? 'row-reverse ' : 'row',
      paddingVertical: normalizeText(15),
      paddingHorizontal: normalizeText(29),
      borderRadius: 5,
      alignItems: 'center',
    },
    item_text: {
      marginLeft: normalizeText(29),
      fontSize: normalizeText(12),
    },
  })
}
