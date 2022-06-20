import React, { FC, useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './todo.styles'
import { View } from 'react-native'
import { Bottomsheet, Progress, TodoList, TodoSwitch } from './components'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { Header } from '@shared-components/header'
import * as NavigationService from 'react-navigation-helpers'
import { SCREENS } from '@shared-constants'
import { Text } from '@shared-components/text'
import { familyApi, taskApi, volunteerApi } from '@api'
import { useQuery } from 'react-query'
import { useLocale } from '@hooks'
import { request } from '@services/request'

const data = [
  {
    id: 1,
    day_of_week: 'Monday',
    description: 'Take Dean from school',
    deadline: 'till 23 oct 2022',
    type: 'free',
  },
  {
    id: 2,
    day_of_week: 'Tuesday',
    description: 'Take Dean from school',
    deadline: 'till 23 oct 2022',
    type: 'belonged',
  },
  {
    id: 3,
    day_of_week: 'Wednesday',
    description: 'Take Dean from school',
    deadline: 'till 23 oct 2022',
    type: 'belonged',
  },
]

export const TodoScreen: FC<TodoScreenProps> = ({ route }) => {
  const familyId = route.params.familyId
  const { data } = useQuery(taskApi.queryKey, () => taskApi.get(familyId))
  const { data: volunteers } = useQuery(volunteerApi.queryKey, () => volunteerApi.get(familyId))
  // const { data: family } = useQuery(familyApi.queryKey, () => familyApi.getById(familyId))
  const { data: progressData } = useQuery(taskApi.queryKey, () => taskApi.getProgress(familyId))

  const [familyToken, setFamilyToken] = useState(null)

  useEffect(() => {
    request.get<IFamily>(`families/${familyId}`).then((response) => {
      setFamilyToken(response.data?.token)
    })
  }, [familyId])

  // const { mutate: removeTask } = useMutation((id: number) => taskApi.remove(id))
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

  return (
    <>
      <Header>Smith family</Header>
      <View style={styles.container}>
        <TodoSwitch onChange={handleSetActiveSection} activeSection={activeSection} />
        <Progress value={Number(progressData) || 0} />
        {Array.isArray(data) ? (
          <TodoList activeSectionValue={activeSectionValue} data={Array.isArray(data) ? data : []} />
        ) : (
          <Text>{data}</Text>
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
