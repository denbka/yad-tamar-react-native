import React from 'react'
import { Share, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation } from 'react-query'
import { volunteerApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './share.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'
import { runOnJS } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { IconPeoples, IconVolunteer } from '@shared-components/icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ShareScreenProps {}

export const ShareScreen: React.FC<ShareScreenProps> = ({ route }) => {
  const family_id = route.params.familyId
  const { strings } = useLocale()
  const { mutateAsync: sendSMS } = useMutation(volunteerApi.sendSMS)
  const theme = useTheme()
  const styles = createStyles(theme)

  const handleShareToVolunteers = async () => {
    const volunteers = []
    const token = await AsyncStorage.getItem('token')
    try {
      await Promise.all(
        volunteers.map(({ name, phone }) =>
          sendSMS({
            to: phone,
            message: strings.to_volunteer_message(
              `http://192.168.0.104:5500/index.html?token=${token}&family_id=${family_id}`,
            ),
          }),
        ),
      )
    } catch (e) {
      console.log(e)
    }
  }

  const handleShareToFamily = async () => {
    const token = await AsyncStorage.getItem('token')
    Share.share({
      message: `http://192.168.0.104:5500/index.html?token=${token}&family_id=${family_id}`,
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
            <Text style={styles.item_text}>{strings.share_with_family}</Text>
          </View>
        </GestureDetector>
        <GestureDetector gesture={tapOnShareToVolunteers}>
          <View style={[styles.item, { backgroundColor: theme.colors.softBlue }]}>
            <IconVolunteer />
            <Text style={styles.item_text}>{strings.share_with_volunteer}</Text>
          </View>
        </GestureDetector>
      </View>
    </Modal>
  )
}
