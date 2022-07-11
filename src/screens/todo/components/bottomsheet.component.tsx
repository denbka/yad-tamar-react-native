import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import { View } from 'react-native'
import { Bottomsheet as NativeBottomsheet } from '@shared-components/bottomsheet'
import { useLocale } from '@hooks'
import { Text } from '@shared-components/text'
import ShareIcon from '@assets/share.svg'
import { createStyles } from '../todo.styles'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { IconAdd, IconPeoples } from '@shared-components/icons'

export const Bottomsheet: FC<BottomsheetProps> = ({ onAdd, onShare, onVolunteers }) => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)
  const tapOnMyVolunteers = Gesture.Tap().onEnd(() => runOnJS(onVolunteers)())
  const tapOnAdd = Gesture.Tap().onEnd(() => runOnJS(onAdd)())
  const tapOnShare = Gesture.Tap().onEnd(() => runOnJS(onShare)())
  return (
    <NativeBottomsheet style={styles.bottomsheet}>
      <GestureDetector gesture={tapOnMyVolunteers}>
        <View style={styles.bottomsheet_item}>
          <IconPeoples />
          <Text style={styles.bottomsheet_item_text}>{strings.my_volunteers}</Text>
        </View>
      </GestureDetector>
      <GestureDetector gesture={tapOnAdd}>
        <View style={[styles.bottomsheet_item]}>
          <View style={styles.bottomsheet_add}>
            <View style={styles.bottomsheet_add_icon}>
              <IconAdd />
            </View>
          </View>
          <Text style={[styles.bottomsheet_item_text, styles.add_text]}>{strings.create_task}</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={tapOnShare}>
        <View style={styles.bottomsheet_item}>
          <View style={styles.share_icon}>
            <ShareIcon />
          </View>
          <Text style={[styles.bottomsheet_item_text, styles.share_text]}>{strings.share}</Text>
        </View>
      </GestureDetector>
    </NativeBottomsheet>
  )
}

type BottomsheetProps = {
  onShare: () => void
  onAdd: () => void
  onVolunteers: () => void
}
