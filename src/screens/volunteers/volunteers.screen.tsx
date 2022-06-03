import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { Formik } from 'formik'
import * as NavigationService from 'react-navigation-helpers'

import { taskApi } from '@api'
import { Button } from '@shared-components/button'
import { Header } from '@shared-components/header'

import { VolunteersList } from './components'
import { createStyles } from './volunteers.styles'

interface VolunteersScreenProps {}

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

export const VolunteersScreen: React.FC<VolunteersScreenProps> = () => {
  const queryClient = useQueryClient()
  const { mutate: addTask } = useMutation(taskApi.post)
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const [values] = useState<TodoForm>({
    task_name: '',
    comments: '',
    date: new Date(),
  })

  const handleSubmit = (data: TodoForm) => {
    addTask(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(taskApi.queryKey)
        NavigationService.goBack()
      },
    })
  }

  return (
    <Formik enableReinitialize initialValues={values} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Header>Smith family</Header>
          <View style={styles.body}>
            <VolunteersList data={data} />
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              Create
            </Button>
          </View>
        </View>
      )}
    </Formik>
  )
}
