import { ScreenWidth } from '@freakycoder/react-native-helpers'
import { useTheme } from '@react-navigation/native'
import { Text } from '@shared-components/text'
import React, { FC } from 'react'
import { FlatList, View } from 'react-native'
import Animated, { DerivedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { createStyles } from '../todo.styles'
import { TodoCard } from './todo_card.component'

export const TodoList: FC<TodoListProps> = ({ week, todo, activeSectionValue, onDelete }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

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
      {!Array.isArray(week) ? (
        <View style={styles.list}>
          <Text>{week}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={week}
          style={styles.list}
          renderItem={({ item }) => (
            <TodoCard
              data={item}
              onDelete={onDelete}
              sectionValue={SectionValue.WEEK}
              activeSectionValue={activeSectionValue}
            />
          )}
        />
      )}
      <View style={{ width: 20 }} />
      {!Array.isArray(todo) ? (
        <View style={styles.list}>
          <Text>{todo}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={todo}
          style={styles.list}
          renderItem={({ item }) => (
            <TodoCard
              onDelete={onDelete}
              data={item}
              sectionValue={SectionValue.TODO}
              activeSectionValue={activeSectionValue}
            />
          )}
        />
      )}
    </Animated.View>
  )
}

type TodoListProps = {
  week: string | ITodo[]
  todo: string | ITodo[]
  onDelete: (task_id: number) => void
  activeSectionValue: DerivedValue<number>
}

enum SectionValue {
  'WEEK' = 0,
  'TODO' = 1,
}
