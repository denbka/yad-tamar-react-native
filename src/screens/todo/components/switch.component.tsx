import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { View } from 'react-native'
import { createStyles } from '../todo.styles'

export const TodoSwitch: FC<TodoSwitchProps> = ({ onChange }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.switch_container}>
      <View style={[styles.switch_item, styles.switch_item_first]}>
        <Button style={styles.switch_button} fontSize={16} variant="inline" onPress={() => onChange('week')}>
          Week
        </Button>
      </View>
      <View style={styles.switch_item}>
        <Button style={styles.switch_button} fontSize={16} variant="inline" onPress={() => onChange('todo')}>
          To do list
        </Button>
      </View>
    </View>
  )
}

type TodoSwitchProps = {
  onChange: (value: SwitchValue) => void
}
