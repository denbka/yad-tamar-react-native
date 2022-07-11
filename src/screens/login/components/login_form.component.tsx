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
  const initialValues: ILoginForm = useMemo(
    () => ({
      cell_phone: '',
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
            onChangeText={handleChange('cell_phone')}
            onBlur={handleBlur('cell_phone')}
            value={values.cell_phone}
            placeholder={strings.username}
            returnKeyType="next"
            style={[styles.text, !errors.cell_phone ? null : styles.errorInput]}
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
  onSubmit: (values: ILoginForm) => void
}
