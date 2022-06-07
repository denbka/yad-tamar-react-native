import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './todo.styles'
import { View } from 'react-native'
import { Progress, TodoList, TodoSwitch } from './components'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { Button } from '@shared-components/button'
import MedalIcon from '@assets/medal.svg'
import { Header } from '@shared-components/header'
import * as NavigationService from 'react-navigation-helpers'
import { SCREENS } from '@shared-constants'
import { Bottomsheet } from '@shared-components/bottomsheet'
import { Text } from '@shared-components/text'

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

export const TodoScreen: FC<TodoScreenProps> = ({ params }) => {
  console.log(params)
  // const { data } = useQuery<IFamily[]>(taskApi.queryKey, taskApi.get)
  // const { mutate: removeTask } = useMutation((id: number) => taskApi.remove(id))
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const activeSection = useSharedValue<SwitchValue>('week')
  const handleSetActiveSection = (value: SwitchValue) => {
    activeSection.value = value
  }

  const activeSectionValue = useDerivedValue(() => {
    return withTiming(activeSection.value === 'week' ? 0 : 1, { duration: 300 })
  }, [activeSection])

  return (
    <>
      <Header>Smith family</Header>
      <View style={styles.container}>
        <TodoSwitch onChange={handleSetActiveSection} activeSection={activeSection} />
        <Progress />
        <TodoList activeSectionValue={activeSectionValue} data={data} />
      </View>
      <Bottomsheet>
        <Button
          onPress={() => NavigationService.push(SCREENS.TODO_CREATE)}
          style={styles.button_create}
          variant="inline"
        >
          Create task
        </Button>
        <Button
          onPress={() => NavigationService.push(SCREENS.VOLUNTEERS)}
          variant="orange"
          textColor={theme.colors.orange}
        >
          <View style={styles.button_volunteers}>
            <MedalIcon style={styles.medal} />
            <Text style={styles.button_volunteers_text}>My volunteers</Text>
          </View>
        </Button>
      </Bottomsheet>
    </>
  )
}

type TodoScreenProps = {}
