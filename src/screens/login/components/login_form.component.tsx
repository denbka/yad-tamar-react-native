import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import { useTheme } from '@react-navigation/native'

import { useLocale } from '@hooks'
import { Button } from '@shared-components/button'
import { TextInput } from '@shared-components/text_input'
import { loginSchema } from '@validation_schemes'
import { createStyles } from '../login.styles'

export const LoginForm: FC<LoginFormProps> = ({ isLoading, onSubmit }) => {
  const theme = useTheme()
  const initialValues: ICredentials = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  )

  const styles = createStyles(theme)
  const { strings } = useLocale()
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder={strings.email}
            keyboardType="email-address"
            returnKeyType="next"
            style={[styles.text, !errors.email ? null : styles.errorInput]}
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder={strings.password}
            style={[styles.text, !errors.password ? null : styles.errorInput]}
          />
          <Button loading={isLoading} style={styles.button} variant="inline" onPress={handleSubmit}>
            {strings.login}
          </Button>
        </View>
      )}
    </Formik>
  )
}

type LoginFormProps = {
  isLoading: boolean
  onSubmit: (values: ICredentials) => void
}
