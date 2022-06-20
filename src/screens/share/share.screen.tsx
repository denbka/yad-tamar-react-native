import React from 'react'
import { Pressable, Share, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation, useQuery } from 'react-query'
import { familyApi, volunteerApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './share.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'
import { IconPeoples, IconVolunteer } from '@shared-components/icons'

interface ShareScreenProps {}

export const ShareScreen: React.FC<ShareScreenProps> = ({ route }) => {
  const { familyId: family_id, volunteers, familyToken } = route.params

  const { strings } = useLocale()
  const { mutateAsync: sendSMS } = useMutation(volunteerApi.sendSMS)
  const theme = useTheme()
  const styles = createStyles(theme)

  const handleShareToVolunteers = async () => {
    try {
      if (!volunteers?.length) return
      await Promise.all(
        volunteers.map(({ name, cell_phone }) =>
          sendSMS({
            to: cell_phone,
            message: strings.to_volunteer_message(
              `http://192.168.0.104:5500/index.html?token=${familyToken}&family_id=${family_id}`, // TODO: change prod link
            ),
          }),
        ),
      )
      NavigationService.goBack()
    } catch (e) {
      console.log('ERORRORORR', e)
    }
  }

  const handleShareToFamily = async () => {
    if (!familyToken) return
    Share.share({
      message: strings.to_family_message(`yadtamar://register?token=${familyToken}`),
      title: 'Share app',
    })
  }

  const handleCloseForm = () => {
    NavigationService.goBack()
  }

  return (
    <Modal onClose={handleCloseForm} style={{ width: '70%', minHeight: 300 }}>
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
