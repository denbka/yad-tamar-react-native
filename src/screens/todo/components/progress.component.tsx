import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { createStyles } from '../todo.styles'
import { useLocale } from '@hooks'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

export const Progress: FC<ProgressProps> = ({ value }) => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)

  const animatedProgress = useAnimatedStyle(
    () => ({
      width: value,
    }),
    [value],
  )

  return (
    <View style={styles.progress_container}>
      <View style={styles.progress_text_container}>
        <Text style={styles.progress_text}>{value}%</Text>
        <Text style={styles.progress_prompt}>{strings.completed}</Text>
      </View>
      <View style={styles.progress_bar_wrapper}>
        <Animated.View style={[styles.progress_bar, animatedProgress]} />
      </View>
    </View>
  )
}

type ProgressProps = {
  value: number
}
