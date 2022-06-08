import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { View } from 'react-native'
import { createStyles } from '../todo.styles'
import { SharedValue, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'

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
    return withTiming(activeSection.value === type ? 0 : 1, { duration: 300 })
  }, [activeSection])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      shadowOpacity: activeSectionValue.value === 0 ? 0 : 0.24,
    }
  }, [activeSectionValue])

  const animatedVariant = useDerivedValue(() => {
    return activeSectionValue.value === 0 ? 'flat' : 'inline'
  }, [activeSectionValue])

  return (
    <View style={[styles.switch_item, styles.switch_item_first]}>
      <Button
        style={[styles.switch_button, animatedStyles]}
        variant={animatedVariant}
        fontSize={normalizeText(12)}
        onPress={() => onChange(type)}
      >
        {title}
      </Button>
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
