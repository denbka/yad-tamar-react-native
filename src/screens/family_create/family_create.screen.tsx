import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { Formik } from 'formik'

import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { createStyles } from './family_create.styles'
import { Header } from '@shared-components/header'
import { useMutation, useQueryClient } from 'react-query'
import { familyApi } from '@api'
import { useLocale } from '@hooks'
import { SCREENS } from '@shared-constants'
import Toast from 'react-native-toast-message'

export const FamilyCreateScreen: React.FC = () => {
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  const { mutate: addFamily } = useMutation(familyApi.post)
  const theme = useTheme()
  const styles = createStyles(theme)

  const initialValues: IFamilyForm = {
    last_name: '',
    cell_phone: '',
    user_name: '',
  }

  const handleSubmit = (values: IFamilyForm) => {
    const formData = { ...values, user_name: values.cell_phone }
    addFamily(formData, {
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: strings.success,
          text2: strings.success_create_family,
        })
        queryClient.invalidateQueries(familyApi.queryKey)
        NavigationService.navigate(SCREENS.PROFILE)
      },
      onError: (error) => {
        console.log(error?.response?.status, 'its error')
      },
    })
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Header>{strings.profile}</Header>
          <View style={styles.body}>
            <TextInput
              onChangeText={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
              value={values.last_name}
              style={styles.phone_input}
              placeholder={strings.name_the_family}
              placeholderTextColor="#fff"
            />
            <TextInput
              onChangeText={handleChange('cell_phone')}
              onBlur={handleBlur('cell_phone')}
              keyboardType="numeric"
              value={values.cell_phone}
              style={styles.phone_input}
              placeholderTextColor="#fff"
              placeholder={strings.phone_number}
            />
            <Button style={styles.button_create} onPress={handleSubmit} variant="inline">
              {strings.create}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  )
}
