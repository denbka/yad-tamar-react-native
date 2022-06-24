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
      flexDirection: isRtl ? 'row-reverse' : 'row',
      width: '100%',
      paddingVertical: normalizeText(15),
      paddingHorizontal: normalizeText(29),
      borderRadius: 5,
      alignItems: 'center',
    },
    item_text: {
      marginLeft: isRtl ? 0 : normalizeText(29),
      marginRight: isRtl ? normalizeText(29) : 0,
      fontSize: normalizeText(12),
    },
  })
}
