import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { Formik } from 'formik'
import * as NavigationService from 'react-navigation-helpers'

import { taskApi } from '@api'
import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { Header } from '@shared-components/header'
import { Divider } from '@shared-components/divider'
import DeleteIcon from '@assets/delete.svg'

import { createStyles } from './todo_create.styles'
import { DatePicker, Prompts } from './components'
import { Text } from '@shared-components/text'

interface TodoCreateScreenProps {}

export const TodoCreateScreen: React.FC<TodoCreateScreenProps> = () => {
  const queryClient = useQueryClient()
  const { mutate: addTask } = useMutation(taskApi.post)
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const [form, setForm] = useState<TodoForm>({
    task_name: '',
    comments: '',
    date: new Date(),
  })

  const onSubmit = (data: TodoForm) => {
    addTask(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(taskApi.queryKey)
        NavigationService.goBack()
      },
    })
  }

  const handleChangePrompt = (text: string) => {
    setForm({ ...form, task_name: text })
  }

  const handleChangeDate = (date: Date) => {
    setForm({ ...form, date })
  }

  return (
    <Formik enableReinitialize initialValues={form} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Header>Create a new task</Header>
          <ScrollView bounces={false} style={styles.body}>
            <View style={styles.input_title_container}>
              <TextInput
                onChangeText={handleChange('task_name')}
                onBlur={handleBlur('task_name')}
                value={values.task_name}
                style={styles.input_title}
                placeholder="Name the task..."
                placeholderTextColor="#fff"
              />
              <DeleteIcon />
            </View>
            <Prompts onChange={handleChangePrompt} />
            <Divider style={{ marginBottom: 15, marginTop: 25 }} />
            <View>
              <Text style={styles.section_title}>Time</Text>
              <DatePicker date={values.date} onChange={handleChangeDate} />
            </View>
            <Divider style={{ marginBottom: 15, marginTop: 25 }} />
            <View>
              <Text style={styles.section_title}>Details</Text>
              <TextInput
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                value={values.comments}
                style={styles.input_comments}
                textarea
                placeholderTextColor="#fff"
                placeholder="Start typing here..."
              />
            </View>
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              Create
            </Button>
          </ScrollView>
        </View>
      )}
    </Formik>
  )
}
