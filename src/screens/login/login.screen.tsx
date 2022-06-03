import React, { FC, useMemo } from 'react'
import { Keyboard, KeyboardAvoidingView, Pressable, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './login.styles'
import LinearGradient from 'react-native-linear-gradient'
import { LoginForm } from './components/login_form.component'
import Picture from '@assets/login.svg'
import * as NavigationService from 'react-navigation-helpers'
import { SCREENS } from '@shared-constants'
import { Bottomsheet } from '@shared-components/bottomsheet'
import { useMutation } from 'react-query'
import { authApi } from '@api'

export const LoginScreen: FC<LoginScreenProps> = () => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  const { mutate: login } = useMutation((form: ILoginForm) => authApi.login(form))

  const handleSubmitForm = () => {
    login(
      {
        emailAddress: 'pavel@gmail.com',
        password: 'abc123',
      },
      {
        onSettled: () => {
          NavigationService.push(SCREENS.PROFILE)
        },
      },
    )
  }
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <LinearGradient colors={theme.colors.loginGradient} style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome to</Text>
              <Text style={[styles.title, styles.enola]}>
                Enola <Text style={styles.title}>!</Text>
              </Text>
            </View>
            <Picture style={styles.image} />
          </View>
        </LinearGradient>
        <Bottomsheet>
          <LoginForm onSubmit={handleSubmitForm} />
        </Bottomsheet>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

type LoginScreenProps = {}
