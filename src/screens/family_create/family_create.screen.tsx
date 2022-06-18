import React, { useState } from 'react'
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

const data = [
  { id: 1, title: 'Smith' },
  { id: 2, title: 'Johnson' },
] as IFamily[]

interface FamilyCreateScreenProps {}

export const FamilyCreateScreen: React.FC<FamilyCreateScreenProps> = () => {
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  const { mutate: addFamily } = useMutation(familyApi.post)
  const theme = useTheme()
  const styles = createStyles(theme)

  const initialValues: IFamilyForm = {
    name_of_family: '',
    cell_phone: '',
  }

  const handleSubmit = (values: IFamilyForm) => {
    console.log(values)
    addFamily(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(familyApi.queryKey)
        NavigationService.navigate(SCREENS.PROFILE)
      },
      onError: (error) => {
        console.log(error.response.status, 'its error')
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
              onChangeText={handleChange('name_of_family')}
              onBlur={handleBlur('name_of_family')}
              value={values.name_of_family}
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
              placeholder="Phone number"
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
