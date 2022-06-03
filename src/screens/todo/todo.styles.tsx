import { ScreenHeight } from '@freakycoder/react-native-helpers'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: ExtendedTheme) => {
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
      paddingVertical: 6,
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
    },
    progress_text_container: {
      fontSize: 14,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card_body: {
      backgroundColor: '#fff',
      padding: 10,
      paddingVertical: 15,
      flexDirection: 'row',
      position: 'relative',
    },
    card_body_desciprtion: {
      backgroundColor: colors.green,
      paddingVertical: 20,
      paddingHorizontal: 10,
      flex: 1,
      marginRight: 5,
      borderRadius: 6,
    },
    card_body_volunteer: {
      backgroundColor: colors.green,
      paddingVertical: 20,
      paddingHorizontal: 10,
      flex: 1,
      borderRadius: 6,
    },
    card_body_free: {
      backgroundColor: colors.green,
    },
    card_body_belonged: {
      backgroundColor: colors.lightBlue,
    },
    button_create: {
      marginBottom: 10,
    },
    medal: {
      marginRight: 10,
    },
    // switch_button: {
    //   paddingVertical: 5,
    // },
  })
}
