import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Text, View } from 'react-native'
import Animated, { DerivedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'

export const TodoCard: FC<TodoCardProps> = ({ day_of_week, description, type, sectionValue, activeSectionValue }) => {
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
      <Animated.Text style={styles.card_title_container}>
        <Text style={styles.card_title}>{day_of_week}</Text>
      </Animated.Text>
      <Animated.View style={styles.card_body}>
        <Animated.View style={[styles.card_body_desciprtion, variant]}>
          <Text>{description}</Text>
        </Animated.View>
        <View style={[styles.card_body_volunteer, variant]}>
          <Text>Free</Text>
          <Text>to take</Text>
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
