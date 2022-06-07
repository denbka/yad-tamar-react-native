import { normalizeText, ScreenHeight } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
  const { isRtl } = useLocale()
  const { colors } = theme

  return StyleSheet.create({
    container: {
      backgroundColor: colors.blue,
      flex: 1,
      paddingHorizontal: 40,
      height: ScreenHeight,
    },
    switch_container: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: colors.darkBlue,
      marginVertical: 7,
      padding: 10,
      borderRadius: 6,
    },
    switch_item: {
      flex: 1,
    },
    switch_button: {
      borderRadius: 9,
    },
    switch_item_first: {
      marginRight: 15,
    },
    progress_container: {
      backgroundColor: colors.darkBlue,
      padding: 10,
      borderRadius: 6,
      position: 'relative',
      alignItems: isRtl ? 'flex-end' : 'flex-start',
    },
    progress_text_container: {
      fontSize: normalizeText(11),
      color: '#fff',
      flexDirection: 'row',
    },
    progress_text: {
      color: colors.orange,
      marginRight: 5,
    },
    progress_prompt: {
      color: '#fff',
    },
    progress_bar_wrapper: {
      width: '100%',
      height: 7,
      marginTop: 5,
      backgroundColor: colors.softBlue,
      borderRadius: 6,
      overflow: 'hidden',
    },
    progress_bar: {
      backgroundColor: colors.orange,
      width: '50%',
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      height: '100%',
    },
    list: {},
    list_container: {
      flexDirection: 'row',
      flex: 1,
      width: '200%',
    },
    card: {
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      borderRadius: 6,
      marginTop: 30,
    },
    card_title: {
      fontSize: normalizeText(13),
      color: '#fff',
    },
    card_title_wrapper: {
      width: 'auto',
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    card_title_container: {
      backgroundColor: colors.lightBlue,
      width: '100%',
      padding: 12,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    card_body: {
      backgroundColor: '#fff',
      padding: 10,
      paddingVertical: 15,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      position: 'relative',
    },
    card_body_desciprtion: {
      backgroundColor: colors.green,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: normalizeText(9),
      flex: 1,
      marginRight: isRtl ? 0 : 5,
      marginLeft: isRtl ? 5 : 0,
      borderRadius: 6,
      justifyContent: 'space-between',
    },

    card_body_desciprtion_text: {
      color: '#000',
      marginBottom: 10,
      fontSize: normalizeText(11),
    },
    card_body_desciprtion_deadline: {
      color: '#4F4F4F',
      textAlign: 'right',
      fontSize: normalizeText(11),
    },
    card_body_volunteer: {
      backgroundColor: colors.green,
      paddingVertical: 20,
      paddingHorizontal: 10,
      flex: 0.4,
      borderRadius: 6,
    },
    card_body_free: {
      backgroundColor: colors.green,
    },
    card_body_belonged: {
      backgroundColor: colors.lightBlue,
    },
    card_body_volunteer_first_status: {
      color: '#000',
      fontSize: normalizeText(11),
    },
    card_body_volunteer_second_status: {
      color: '#000',
      fontSize: normalizeText(11),
    },
    button_create: {
      marginBottom: 10,
    },
    button_volunteers: {
      flexDirection: isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginBottom: -3,
    },
    button_volunteers_text: {
      color: colors.orange,
      fontSize: normalizeText(13),
      fontWeight: 'bold',
    },
    medal: {
      marginRight: isRtl ? 0 : 10,
      marginLeft: isRtl ? 10 : 0,
    },
    // switch_button: {
    //   paddingVertical: 5,
    // },
  })
}
