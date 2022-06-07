import { ScreenWidth } from '@freakycoder/react-native-helpers'
import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import Animated, { DerivedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'
import { TodoCard } from './todo_card.component'

export const TodoList: FC<TodoListProps> = ({ data, activeSectionValue }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            activeSectionValue.value,
            [SectionValue.WEEK, SectionValue.TODO],
            [0, -ScreenWidth + 70],
          ),
        },
      ],
    }),
    [activeSectionValue],
  )

  return (
    <Animated.View style={[animatedStyles, styles.list_container]}>
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <TodoCard {...item} sectionValue={SectionValue.WEEK} activeSectionValue={activeSectionValue} />
        )}
      />
      <View style={{ width: 20 }} />
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <TodoCard {...item} sectionValue={SectionValue.TODO} activeSectionValue={activeSectionValue} />
        )}
      />
    </Animated.View>
  )
}

type TodoListProps = {
  data: any[]
  activeSectionValue: DerivedValue<number>
}

enum SectionValue {
  'WEEK' = 0,
  'TODO' = 1,
}
