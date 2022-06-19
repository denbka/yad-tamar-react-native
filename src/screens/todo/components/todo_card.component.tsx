import { useTheme } from '@react-navigation/native'
import { Text } from '@shared-components/text'
import { DateTime } from 'luxon'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import Animated, { DerivedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'

export const TodoCard: FC<TodoCardProps> = ({ data, type, sectionValue, activeSectionValue }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const variant = styles[`card_body_${type}`]
  console.log(data)
  const parsedDate = useMemo(() => {
    console.log(data.date)
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

  return (
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
          <Text bold style={styles.card_body_volunteer_first_status}>
            Free
          </Text>
          <Text style={styles.card_body_volunteer_second_status}>to take</Text>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

type TodoCardProps = {
  data: ITask
  sectionValue: number
  activeSectionValue: DerivedValue<number>
}
