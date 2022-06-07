import { normalizeText } from '@freakycoder/react-native-helpers'
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
      paddingHorizontal: normalizeText(30),
      paddingTop: normalizeText(16),
    },
    input_title_container: {
      flexDirection: isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: normalizeText(12),
    },
    input_title: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
      fontSize: normalizeText(16),
      color: '#fff',
    },
    section_title: {
      fontSize: normalizeText(16),
      color: '#fff',
      marginBottom: 13,
    },
    input_comments: {
      backgroundColor: 'transparent',
      borderColor: colors.softBlue,
      paddingVertical: 0,
      paddingHorizontal: 0,
      color: '#fff',
      fontSize: normalizeText(11),
    },
    card: {
      width: '100%',
      backgroundColor: colors.darkBlue,
      marginBottom: 6.5,
      borderRadius: 8,
      paddingVertical: 13,
      paddingHorizontal: normalizeText(25),
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card__content: {},
    card__title: {
      color: '#fff',
      fontSize: normalizeText(13),
    },
    card__members: {
      color: '#fff',
    },
    button_create: {
      marginTop: normalizeText(80),
      marginBottom: normalizeText(40),
    },
    prompt_container: {
      flexDirection: isRtl ? 'row-reverse' : 'row',
      flexWrap: 'wrap',
    },
    prompt_item: {
      alignSelf: 'flex-start',
      marginRight: 12,
      marginBottom: 12,
    },
    prompt_text_style: {
      marginVertical: -5,
      paddingHorizontal: normalizeText(18),
    },
    datepicker_container: {},
    datepicker: {
      backgroundColor: colors.darkBlue,
      paddingVertical: 7,
      paddingHorizontal: 27,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      borderRadius: 7,
    },
    datepicker_item: {
      fontSize: normalizeText(14),
      color: '#fff',
    },
    datepicker_prompts: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      position: 'relative',
    },
    datepicker_prompts_item_container: {
      borderRadius: 7,
      marginRight: 15,
      paddingVertical: 10,
      paddingHorizontal: 7,
      backgroundColor: colors.darkBlue,
      flex: 1,
    },
    datepicker_prompts_item_container_last: {
      marginRight: 0,
    },
    datepicker_prompts_item: {
      fontSize: normalizeText(11),
      color: '#fff',
      textAlign: 'center',
    },
  })
}
