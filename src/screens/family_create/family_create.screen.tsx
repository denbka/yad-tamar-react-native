import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
import { useLocale } from '@hooks'

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

interface FamilyCreateScreenProps {}

export const FamilyCreateScreen: React.FC<FamilyCreateScreenProps> = () => {
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  //  const { data } = useQuery<IFamily[]>(queryKey, familyApi.get)
  const { mutate: addFamily } = useMutation(familyApi.post)
  const theme = useTheme()
  const styles = createStyles(theme)

  const [initialValues, setInitialValues] = useState<IFamilyForm>({
    first_name: '',
    cell_phone: '',
  })

  const handleSubmit = () => {
    addFamily(initialValues, {
      onSuccess: () => {
        queryClient.invalidateQueries(familyApi.queryKey)
        NavigationService.goBack()
      },
    })
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Header>{strings.create_family}</Header>
          <KeyboardAwareScrollView bounces={false} style={styles.body}>
            <View>
              <View style={styles.input_title_container}>
                <TextInput
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  style={styles.input_title}
                  placeholder={strings.name_the_family}
                  placeholderTextColor="#fff"
                  prompt={strings?.prompt_the_family ?? ''}
                />
                <DeleteIcon />
              </View>
              <View>
                <Text style={styles.phone_title}>{strings.phone_number}</Text>
                <TextInput
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="numeric"
                  value={values.phone}
                  style={styles.phone_input}
                  placeholderTextColor="#fff"
                />
              </View>
              <Divider style={{ marginTop: 60 }} />
              <Text style={styles.list__title}>{strings.volunteers}</Text>
              <VolunteersList data={data} />
              <Button style={styles.button_add} variant="green">
                {strings.add_volunteer}
              </Button>
              <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
                {strings.create}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </View>
      )}
    </Formik>
  )
}
