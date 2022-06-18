import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { View } from 'react-native'
import { createStyles } from '../todo.styles'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Text } from '@shared-components/text'

export const TodoSwitch: FC<TodoSwitchProps> = ({ activeSection, onChange }) => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)

  const switches: SwitchItem[] = useMemo(
    () => [
      { type: 'week', title: strings.week },
      { type: 'todo', title: strings.todo_list },
    ],
    [strings],
  )

  return (
    <View style={styles.switch_container}>
      {switches.map((switch_item) => (
        <TodoSwitchButton {...switch_item} activeSection={activeSection} onChange={onChange} />
      ))}
    </View>
  )
}

const TodoSwitchButton: FC<TodoSwitchButtonProps> = ({ type, title, activeSection, onChange }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const activeSectionValue = useDerivedValue(() => {
    return withTiming(activeSection.value === type ? 1 : 0, { duration: 300 })
  }, [activeSection])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(activeSectionValue.value, [0, 1], [0, 0.24]),
      backgroundColor: interpolateColor(activeSectionValue.value, [0, 1], [theme.colors.darkBlue, theme.colors.blue]),
    }
  }, [activeSectionValue])

  const tapGestureHandler = Gesture.Tap().onEnd(() => runOnJS(onChange)(type))

  return (
    <View style={[styles.switch_item, styles.switch_item_first]}>
      <GestureDetector gesture={tapGestureHandler}>
        <Animated.View style={[styles.switch_button_content, animatedStyles]}>
          {/* <Animated.View style={[styles.inset_shadow_container, animatedShadowStyles]}>
            <View style={styles.inset_shadow_top} />
          </Animated.View> */}
          <Text style={[{ color: '#fff', fontSize: normalizeText(12) }, styles.switch_button_content_text]}>
            {title}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

type SwitchItem = {
  type: SwitchValue
  title: string
}

type TodoSwitchButtonProps = TodoSwitchProps & SwitchItem

type TodoSwitchProps = {
  activeSection: SharedValue<string>
  onChange: (value: SwitchValue) => void
}
