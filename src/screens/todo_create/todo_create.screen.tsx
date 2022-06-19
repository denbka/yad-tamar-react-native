import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Formik } from 'formik'
import * as NavigationService from 'react-navigation-helpers'

import { authApi, taskApi } from '@api'
import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { Header } from '@shared-components/header'
import { Divider } from '@shared-components/divider'
import DeleteIcon from '@assets/delete.svg'

import { createStyles } from './todo_create.styles'
import { DatePicker, Prompts } from './components'
import { Text } from '@shared-components/text'
import { useLocale } from '@hooks'
import { DateTime } from 'luxon'

interface TodoCreateScreenProps {}

export const TodoCreateScreen: React.FC<TodoCreateScreenProps> = () => {
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  const { mutate: addTask } = useMutation(taskApi.post)
  const { data: userData } = useQuery('user', authApi.getUserData)
  console.log(userData)
  const theme = useTheme()
  const styles = createStyles(theme)
  const [form, setForm] = useState<ITodo>({
    task_name: '',
    comments: '',
    date: new Date(),
    was_completed: false,
    community_id: 45,
    helper_id: userData?.user_id,
  })

  const onSubmit = (data: ITodo) => {
    console.log(data, 'todo-form')
    addTask(
      {
        ...data,
        date: DateTime.fromJSDate(data.date).toUnixInteger(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(taskApi.queryKey)
          NavigationService.goBack()
        },
      },
    )
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
          <Header>{strings.create_new_task}</Header>
          <ScrollView bounces={false} style={styles.body}>
            <View style={styles.input_title_container}>
              <TextInput
                onChangeText={handleChange('task_name')}
                onBlur={handleBlur('task_name')}
                value={values.task_name}
                style={styles.input_title}
                placeholder={strings.name_the_task}
                placeholderTextColor="#fff"
              />
              <DeleteIcon />
            </View>
            <Prompts onChange={handleChangePrompt} />
            <Divider style={{ marginBottom: 15, marginTop: 25 }} />
            <View>
              <Text style={styles.section_title}>{strings.time}</Text>
              <DatePicker date={values.date} onChange={handleChangeDate} />
            </View>
            <Divider style={{ marginBottom: 15, marginTop: 25 }} />
            <View>
              <Text style={styles.section_title}>{strings.details}</Text>
              <TextInput
                onChangeText={handleChange('comments')}
                onBlur={handleBlur('comments')}
                value={values.comments}
                style={styles.input_comments}
                textarea
                placeholderTextColor="#fff"
                placeholder={strings.details_placeholder}
              />
            </View>
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              {strings.create_task}
            </Button>
          </ScrollView>
        </View>
      )}
    </Formik>
  )
}
