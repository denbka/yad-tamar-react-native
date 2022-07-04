import React, { FC, useEffect, useMemo, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './todo.styles'
import { View } from 'react-native'
import { Bottomsheet, Progress, TodoList, TodoSwitch } from './components'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { Header } from '@shared-components/header'
import * as NavigationService from 'react-navigation-helpers'
import { SCREENS } from '@shared-constants'
import { Text } from '@shared-components/text'
import { taskApi, volunteerApi } from '@api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from '@services/request'
import { DateTime } from 'luxon'
import { localStrings } from '@locales'
import Toast from 'react-native-toast-message'

const currentWeekLastTime = DateTime.now().endOf('week').toMillis()

// const toWeek = (task: ITodo) =>
//   DateTime.fromSeconds(Number(task.date) ?? 0)
//     .minus({ milliseconds: currentWeekLastTime })
//     .toMillis() < 0
// const toTodo = (task: ITodo) =>
//   DateTime.fromSeconds(Number(task.date) ?? 0)
//     .minus({ milliseconds: currentWeekLastTime })
//     .toMillis() > 0

export const TodoScreen: FC<TodoScreenProps> = ({ route }) => {
  const familyId = route.params.familyId
  const queryClient = useQueryClient()
  const { data } = useQuery(taskApi.queryKey, () => taskApi.get(familyId))
  const { data: volunteers } = useQuery(volunteerApi.queryKey, () => volunteerApi.get(familyId))
  const { data: progressData } = useQuery('progress', () => taskApi.getProgress(familyId))
  console.log(`Progress" `, progressData)
  const { week, todo } = useMemo(
    () => ({
      week: data?.filter ? data?.filter((todo) => todo.time_type !== 'no_time') : 'nothing',
      todo: data?.filter ? data?.filter((todo) => todo.time_type === 'no_time') : 'nothing',
    }),
    [data],
  )

  const { mutate: onDelete } = useMutation(taskApi.queryKey, taskApi.remove)

  const [familyToken, setFamilyToken] = useState(null)

  useEffect(() => {
    request.get<IFamily>(`families/${familyId}`).then((response) => {
      setFamilyToken(response.data?.token)
    })
  }, [familyId])

  const theme = useTheme()
  const styles = createStyles(theme)
  const activeSection = useSharedValue<SwitchValue>('week')
  const handleSetActiveSection = (value: SwitchValue) => {
    activeSection.value = value
  }

  const activeSectionValue = useDerivedValue(() => {
    return withTiming(activeSection.value === 'week' ? 0 : 1, { duration: 300 })
  }, [activeSection])

  const handleShare = () => {
    NavigationService.navigate(SCREENS.CHOOSE_ACTION, { familyId, volunteers, familyToken })
  }

  const handleDeleteTask = (task_id: number) => {
    onDelete(task_id, {
      onSuccess: () => {
        queryClient.invalidateQueries(taskApi.queryKey)
        Toast.show({
          type: 'success',
          text1: localStrings.success,
          text2: localStrings.delete_success,
        })
      },
    })
  }

  return (
    <>
      <Header>{localStrings.back}</Header>
      <View style={styles.container}>
        <TodoSwitch onChange={handleSetActiveSection} activeSection={activeSection} />
        <Progress value={Number(progressData) || 0} />
        {Array.isArray(data) ? (
          <TodoList onDelete={handleDeleteTask} activeSectionValue={activeSectionValue} week={week} todo={todo} />
        ) : (
          <Text style={{ textAlign: 'center' }}>{data}</Text>
        )}
      </View>
      <Bottomsheet
        onShare={handleShare}
        onVolunteers={() => NavigationService.push(SCREENS.VOLUNTEERS, { familyId })}
        onAdd={() => NavigationService.push(SCREENS.TODO_CREATE, { familyId })}
      />
    </>
  )
}

type TodoScreenProps = {}
