import React from 'react'
import { Pressable, Share, View } from 'react-native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation } from 'react-query'
import { useTheme } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { volunteerApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './share.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'
import { IconPeoples, IconVolunteer } from '@shared-components/icons'

export const ShareScreen: React.FC = ({ route }) => {
  const { family_id, name: last_name, volunteers, token, user_name, password } = route.params
  const theme = useTheme()
  const { strings } = useLocale()
  const { mutateAsync: sendSMS } = useMutation(volunteerApi.sendSMS)
  const styles = createStyles()

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: strings.success,
      text2: strings.toast_volunteer,
    })
  }

  const handleShareToVolunteers = async () => {
    try {
      if (!volunteers?.length) return
      await Promise.all(
        volunteers.map(({ cell_phone, user_id, user_token }) => {
          sendSMS({
            to: cell_phone,
            message: strings.to_volunteer_message(
              last_name,
              `https://tamar.project-babaev.ru?token=${user_token}&family_id=${family_id}&user_id=${user_id}`, // TODO: change prod link
            ),
          })
        }),
      )
      showToast()
      NavigationService.goBack()
    } catch (e) {
      console.log('ERORRORORR', e)
    }
  }

  const handleShareToFamily = async () => {
    Share.share({
      message: strings.to_family_message(
        'https://tamar.project-babaev.ru/app/app.html',
        last_name,
        user_name,
        password,
      ),
      title: 'Share app',
    })
  }

  const handleCloseForm = () => {
    NavigationService.goBack()
  }

  return (
    <Modal onClose={handleCloseForm} style={{ width: '80%', minHeight: 300 }}>
      <View style={styles.container}>
        <Pressable onPress={handleShareToFamily}>
          <View style={[styles.item, { backgroundColor: theme.colors.green, marginBottom: 17 }]}>
            <IconPeoples fill="#fff" />
            <Text style={styles.item_text}>{strings.share_with_family}</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleShareToVolunteers}>
          <View style={[styles.item, { backgroundColor: theme.colors.softBlue }]}>
            <IconVolunteer />
            <Text style={styles.item_text}>{strings.share_with_volunteer}</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  )
}
