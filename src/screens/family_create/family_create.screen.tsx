import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { Formik } from 'formik'

/**
 * ? Local Imports
 */
import { TextInput } from '@shared-components/text_input'
import { VolunteersList } from './components'
import { Button } from '@shared-components/button'
import DeleteIcon from '@assets/delete.svg'
import { createStyles } from './family_create.styles'
import { Header } from '@shared-components/header'
import { useMutation, useQueryClient } from 'react-query'
import { familyApi } from '@api'
import { Divider } from '@shared-components/divider'
import { Text } from '@shared-components/text'

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

interface FamilyCreateScreenProps {}

export const FamilyCreateScreen: React.FC<FamilyCreateScreenProps> = () => {
  const queryClient = useQueryClient()
  //  const { data } = useQuery<IFamily[]>(queryKey, familyApi.get)
  const { mutate: addFamily } = useMutation(familyApi.post)
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const handleSubmit = ({ name_of_family }: Pick<IFamily, 'name_of_family'>) => {
    addFamily(
      { name_of_family },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(familyApi.queryKey)
          NavigationService.goBack()
        },
      },
    )
  }

  const initialValues: IFamily = { name_of_family: '' }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Header>Create family</Header>
          <ScrollView bounces={false} style={styles.body}>
            <View style={styles.input_title_container}>
              <TextInput
                onChangeText={handleChange('name_of_family')}
                onBlur={handleBlur('name_of_family')}
                value={values.name_of_family}
                style={styles.input_title}
                placeholder="Name the family..."
                placeholderTextColor="#fff"
                prompt="for example: Smith"
              />
              <DeleteIcon />
            </View>
            <View>
              <Text style={styles.phone_title}>phone number</Text>
              <TextInput
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                value={values.phone}
                style={styles.phone_input}
                placeholderTextColor="#fff"
                placeholder="Name the family..."
              />
            </View>
            <Divider style={{ marginTop: 60 }} />
            <Text style={styles.list__title}>Volunteers</Text>
            <VolunteersList data={data} />
            <Button style={styles.button_add} variant="green">
              Add volunteer
            </Button>
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              Create
            </Button>
          </ScrollView>
        </View>
      )}
    </Formik>
  )
}
