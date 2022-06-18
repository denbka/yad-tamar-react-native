import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Formik } from 'formik'
import * as NavigationService from 'react-navigation-helpers'

import { taskApi, volunteerApi } from '@api'
import { Button } from '@shared-components/button'
import { Header } from '@shared-components/header'

import { VolunteersList } from './components'
import { createStyles } from './volunteers.styles'
import { Text } from '@shared-components/text'
import { useModal } from '@hooks'
import { Modal } from '@shared-components/modal'
import { VolunteersForm } from './components/volunteers_form'
import { useLocale } from '@hooks'

interface VolunteersScreenProps {}

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

export const VolunteersScreen: React.FC<VolunteersScreenProps> = ({ route }) => {
  const queryClient = useQueryClient()
  const family_id = route.params.familyId
  const { data } = useQuery<ITask[]>(taskApi.queryKey, () => volunteerApi.get(family_id))
  console.log(data)
  const modal = useModal()

  const { mutate: addTask } = useMutation(taskApi.post)
  const theme = useTheme()
  const { strings } = useLocale()
  const styles = createStyles(theme)
  const [values] = useState<TodoForm>({
    task_name: '',
    comments: '',
    date: new Date(),
  })

  const handleSubmit = (data: TodoForm) => {
    // modal.show(VolunteersForm)
    NavigationService.navigate('volunteers_create', { family_id })
  }

  return (
    <Formik enableReinitialize initialValues={values} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Header>Smith family</Header>
          <View style={styles.body}>
            <Text style={styles.section_title} bold>
              {strings.volunteers}
            </Text>
            {Array.isArray(data) ? <VolunteersList data={data} /> : <Text>{data}</Text>}
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              {strings.create}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  )
}
