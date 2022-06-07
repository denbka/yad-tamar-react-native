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
import { Text } from '@shared-components/text'
import { useModal } from '@hooks'
import { Modal } from '@shared-components/modal'
import { VolunteersForm } from './components/volunteers_form'

interface VolunteersScreenProps {}

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

export const VolunteersScreen: React.FC<VolunteersScreenProps> = () => {
  const queryClient = useQueryClient()
  const modal = useModal()

  const { mutate: addTask } = useMutation(taskApi.post)
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const [values] = useState<TodoForm>({
    task_name: '',
    comments: '',
    date: new Date(),
  })

  const handleSubmit = (data: TodoForm) => {
    // modal.show(VolunteersForm)
    NavigationService.navigate('volunteers_create') //TODO: MODAL scren
    console.log('321')
  }

  return (
    <Formik enableReinitialize initialValues={values} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Header>Smith family</Header>
          <View style={styles.body}>
            <Text style={styles.section_title} bold>
              My volunteers
            </Text>
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
