import React, { FC, useMemo } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Pressable, Text, View } from 'react-native'
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
import LogoEnolaWhite from '@assets/logo_enola_white.svg'
import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'

export const LoginScreen: FC<LoginScreenProps> = () => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)
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
            <View style={styles.title_container_reverse}>
              <Text style={styles.title}>Yad Tamar</Text>
              <Image style={styles.image_title} source={require('@assets/logo.png')} />
            </View>
            <View style={styles.title_container}>
              <Text style={styles.title}>{strings.welcome_text}</Text>
              <LogoEnolaWhite width={normalizeText(170)} />
            </View>
            <View style={styles.image}>
              <Picture height="100%" width="100%" />
            </View>
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
