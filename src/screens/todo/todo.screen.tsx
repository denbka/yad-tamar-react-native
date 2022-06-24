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
import { taskApi, volunteerApi } from '@api'
import { useQuery } from 'react-query'
import { request } from '@services/request'

export const TodoScreen: FC<TodoScreenProps> = ({ route }) => {
  const familyId = route.params.familyId
  const { data } = useQuery(taskApi.queryKey, () => taskApi.get(familyId))
  const { data: volunteers } = useQuery(volunteerApi.queryKey, () => volunteerApi.get(familyId))
  const { data: progressData } = useQuery(taskApi.queryKey, () => taskApi.getProgress(familyId))

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

  return (
    <>
      <Header>Back</Header>
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
