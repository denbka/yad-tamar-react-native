import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Formik } from 'formik'
import * as NavigationService from 'react-navigation-helpers'

import { volunteerApi } from '@api'
import { Button } from '@shared-components/button'
import { Header } from '@shared-components/header'

import { VolunteersList } from './components'
import { createStyles } from './volunteers.styles'
import { Text } from '@shared-components/text'
import { useLocale } from '@hooks'
import { localStrings } from '@locales'

interface VolunteersScreenProps {}

export const VolunteersScreen: React.FC<VolunteersScreenProps> = ({ route }) => {
  const family_id = route.params.familyId
  const queryClient = useQueryClient()

  const { data } = useQuery(volunteerApi.queryKey, () => volunteerApi.get(family_id))
  console.log(data)
  const { mutate: removeVolunteer } = useMutation(volunteerApi.remove)

  const theme = useTheme()
  const { strings } = useLocale()

  const styles = createStyles(theme)

  const [values] = useState<ITask>({
    task_name: '',
    comments: '',
    date: new Date(),
  })

  const handleSubmit = () => {
    NavigationService.navigate('volunteers_create', { family_id })
  }

  const handleDeleteVolunteer = (volunteer_id: number) => {
    removeVolunteer(volunteer_id, {
      onSuccess: () => {
        queryClient.invalidateQueries(volunteerApi.queryKey)
      },
    })
  }

  return (
    <Formik enableReinitialize initialValues={values} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Header>{localStrings.back}</Header>
          <View style={styles.body}>
            <Text style={styles.section_title} bold>
              {strings.volunteers}
            </Text>
            {Array.isArray(data) ? (
              <VolunteersList data={data} onDeleteVolunteer={handleDeleteVolunteer} />
            ) : (
              <Text>{data}</Text>
            )}
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              {strings.volunteer_create}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  )
}
