import React, { useMemo } from 'react'
import { ScrollView, Share, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { Formik } from 'formik'
import Contacts from 'react-native-contacts'
import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { useMutation, useQueryClient } from 'react-query'
import { familyApi, volunteerApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './share.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'
import { runOnJS } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { IconPeoples, IconVolunteer } from '@shared-components/icons'

interface ShareScreenProps {}

export const ShareScreen: React.FC<ShareScreenProps> = () => {
  const { strings } = useLocale()
  const { mutateAsync: sendSMS } = useMutation(volunteerApi.sendSMS)
  const theme = useTheme()
  const styles = createStyles(theme)

  const handleShareToVolunteers = async () => {
    const volunteers = []
    try {
      await Promise.all(volunteers.map(({ name, phone }) => sendSMS({ to: phone, message: 'Ля ля ля' })))
    } catch (e) {
      console.log(e)
    }
  }

  const handleShareToFamily = () => {
    Share.share({
      message: 'Переходи в Play store по ссылке yadtamar:// и скачивай приложение',
      title: 'Share app',
    })
  }

  const tapOnShareToVolunteers = Gesture.Tap().onEnd(() => runOnJS(handleShareToVolunteers)())
  const tapOnShareToFamily = Gesture.Tap().onEnd(() => runOnJS(handleShareToFamily)())

  const handleCloseForm = () => {
    NavigationService.goBack()
  }

  return (
    <Modal onClose={handleCloseForm} style={{ width: '70%', minHeight: 300 }}>
      <View style={styles.container}>
        <GestureDetector gesture={tapOnShareToFamily}>
          <View style={[styles.item, { backgroundColor: theme.colors.green, marginBottom: 17 }]}>
            <IconPeoples fill="#fff" />
            <Text style={styles.item_text}>Share with family</Text>
          </View>
        </GestureDetector>
        <GestureDetector gesture={tapOnShareToVolunteers}>
          <View style={[styles.item, { backgroundColor: theme.colors.softBlue }]}>
            <IconVolunteer />
            <Text style={styles.item_text}>Share with a volunteer</Text>
          </View>
        </GestureDetector>
      </View>
    </Modal>
  )
}
