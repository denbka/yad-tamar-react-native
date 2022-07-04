import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import { useTheme } from '@react-navigation/native'

import { useLocale } from '@hooks'
import { Button } from '@shared-components/button'
import { TextInput } from '@shared-components/text_input'
import { registerSchema } from '@validation_schemes'
import { createStyles } from '../register.styles'

export const RegisterForm: FC<RegisterFormProps> = ({ isLoading, onSubmit }) => {
  const theme = useTheme()
  const initialValues: IRegisterForm = useMemo(
    () => ({
      cell_phone: '',
      last_name: '',
      role: 'coordinator',
    }),
    [],
  )

  const styles = createStyles(theme)
  const { strings } = useLocale()
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={registerSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            onChangeText={handleChange('cell_phone')}
            onBlur={handleBlur('cell_phone')}
            value={values.cell_phone}
            placeholder={strings.phone_number}
            keyboardType="phone-pad"
            returnKeyType="next"
            style={[styles.text, !errors.cell_phone ? null : styles.errorInput]}
          />
          <TextInput
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            value={values.last_name}
            placeholder={strings.last_name}
            style={[styles.text, !errors.last_name ? null : styles.errorInput]}
          />
          <Button loading={isLoading} style={styles.button} variant="inline" onPress={() => handleSubmit(values)}>
            {strings.register}
          </Button>
        </View>
      )}
    </Formik>
  )
}

type RegisterFormProps = {
  isLoading: boolean
  onSubmit: (values: IRegisterForm) => void
}
