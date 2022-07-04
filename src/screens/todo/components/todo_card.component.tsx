import { localStrings } from '@locales'
import { useTheme } from '@react-navigation/native'
import { Text } from '@shared-components/text'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import Animated, { DerivedValue, interpolate, runOnJS, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
}

export const TodoCard: FC<TodoCardProps> = ({ data, type, sectionValue, activeSectionValue, onDelete }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const variant = styles[`card_body_${type}`]
  const parsedDate = useMemo(() => {
    const dt = DateTime.fromSeconds(Number(data.date) ?? 0)
    if (!dt) return
    return {
      time: dt.toLocaleString(DateTime.TIME_SIMPLE),
      date: dt.toLocaleString(DateTime.DATE_MED),
    }
  }, [data])

  const hiddenBodyStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        activeSectionValue.value,
        [0, 1],
        [sectionValue === 0 ? 1 : 0.3, sectionValue === 0 ? 0.3 : 1],
      ),
    }),
    [activeSectionValue, sectionValue],
  )

  const longTap = Gesture.LongPress().onStart(() => {
    console.log(123132)
    runOnJS(ReactNativeHapticFeedback.trigger)('impactMedium', options)
    runOnJS(onDelete)(data.task_id)
  })

  return (
    <GestureDetector gesture={longTap}>
      <Animated.View style={[styles.card, hiddenBodyStyle]}>
        <Animated.View style={styles.card_title_container}>
          <Text style={styles.card_title}>{parsedDate?.time}</Text>
          <Text style={styles.card_title}>{parsedDate?.date}</Text>
        </Animated.View>
        <Animated.View style={styles.card_body}>
          <Animated.View style={[styles.card_body_desciprtion, variant]}>
            {/* <Text style={styles.card_body_desciprtion_deadline}>{data.task_name}</Text> */}
            <Text style={styles.card_body_desciprtion_text}>{data.task_name}</Text>
          </Animated.View>
          <View style={[styles.card_body_volunteer, variant]}>
            {data.was_completed ? (
              <Text style={styles.card_body_volunteer_second_status}>{localStrings.task_completed}</Text>
            ) : (
              <>
                <Text bold style={styles.card_body_volunteer_first_status}>
                  {data.helper_id ? data.helper_id : localStrings.free}
                </Text>
                <Text style={styles.card_body_volunteer_second_status}>
                  {data.helper_id ? localStrings.will_do_this : localStrings.to_take}
                </Text>
              </>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}

type TodoCardProps = {
  data: ITask
  sectionValue: number
  activeSectionValue: DerivedValue<number>
  onDelete: (task_id: number) => void
}
