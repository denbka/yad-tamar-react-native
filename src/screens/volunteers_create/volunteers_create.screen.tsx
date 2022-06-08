import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { Formik } from 'formik'
import Contacts from 'react-native-contacts'
import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { useMutation, useQueryClient } from 'react-query'
import { familyApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './volunteers_create.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'

interface VolunteersCreateScreenProps {}

export const VolunteersCreateScreen: React.FC<VolunteersCreateScreenProps> = () => {
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  //  const { data } = useQuery<IFamily[]>(queryKey, familyApi.get)
  const { mutate: addFamily } = useMutation(familyApi.post)
  const theme = useTheme()
  const styles = createStyles(theme)

  const handleSubmit = async ({ name_of_family }: Pick<IFamily, 'name_of_family'>) => {
    const contacts = await Contacts.getAll()
    console.log(contacts)
  }

  const initialValues: IFamily = { name_of_family: '' }

  const handleCloseForm = () => {
    NavigationService.goBack()
  }

  return (
    <Modal onClose={handleCloseForm}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text style={styles.title} bold>
              {strings.modal_add_volunteer}
            </Text>
            <View style={styles.body}>
              <Text style={styles.input_title}>{strings.name}</Text>
              <TextInput
                onChangeText={handleChange('name_of_family')}
                onBlur={handleBlur('name_of_family')}
                value={values.name_of_family}
                style={styles.input}
                placeholderTextColor="#fff"
              />

              <Button style={styles.button_create} onPress={handleSubmit} variant="green">
                {strings.add_contacts}
              </Button>
              {/* <DeleteIcon /> */}
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  )
}
