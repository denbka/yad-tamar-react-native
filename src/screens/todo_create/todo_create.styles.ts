import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
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
      flexDirection: 'row',
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
    section_title: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 13,
    },
    input_comments: {
      backgroundColor: 'transparent',
      borderColor: colors.softBlue,
      paddingVertical: 0,
      paddingHorizontal: 0,
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
      flexDirection: 'row',
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
    prompt_container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    prompt_item: {
      alignSelf: 'flex-start',
      marginRight: 12,
      marginBottom: 12,
    },
    prompt_text_style: {
      marginVertical: -5,
      paddingHorizontal: 24,
    },
    datepicker_container: {},
    datepicker: {
      backgroundColor: colors.darkBlue,
      paddingVertical: 7,
      paddingHorizontal: 27,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 7,
    },
    datepicker_item: {
      fontSize: 20,
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
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
  })
}
