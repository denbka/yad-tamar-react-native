import { useTheme } from '@react-navigation/native'
import { Text } from '@shared-components/text'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import Animated, { DerivedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'

export const TodoCard: FC<TodoCardProps> = ({
  day_of_week,
  description,
  deadline,
  type,
  sectionValue,
  activeSectionValue,
}) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const variant = styles[`card_body_${type}`]

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
        <Text style={styles.card_title}>{day_of_week}</Text>
        <Text style={styles.card_title}>Oct 22</Text>
      </Animated.View>
      <Animated.View style={styles.card_body}>
        <Animated.View style={[styles.card_body_desciprtion, variant]}>
          <Text style={styles.card_body_desciprtion_deadline}>{deadline}</Text>
          <Text style={styles.card_body_desciprtion_text}>{description}</Text>
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
  data: IFamily
  sectionValue: number
  activeSectionValue: DerivedValue<number>
}
