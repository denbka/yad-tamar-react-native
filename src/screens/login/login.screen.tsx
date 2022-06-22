import React, { FC } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Pressable, Text, View } from 'react-native'
import { Link, useTheme } from '@react-navigation/native'
import { useKeyboard } from '@react-native-community/hooks'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { normalizeText } from '@freakycoder/react-native-helpers'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { QueryClient, useMutation } from 'react-query'

import { useLocale } from '@hooks'
import { authApi } from '@api'
import Picture from '@assets/login.svg'
import { Bottomsheet } from '@shared-components/bottomsheet'
import LogoEnolaWhite from '@assets/logo_enola_white.svg'
import { LoginForm } from './components/login_form.component'
import { createStyles } from './login.styles'

export const LoginScreen: FC = () => {
  const asyncStorage = useAsyncStorage('token')
  const { mutate: login, isLoading } = useMutation((form: ICredentials) => authApi.login(form))

  const handleSubmitForm = (values: ICredentials) =>
    login(values, {
      onSuccess: ({ token }) => {
        const queryClient = new QueryClient()
        asyncStorage.setItem(token, () => {
          queryClient.invalidateQueries('user')
        })
      },
    })

  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)
  const keyboard = useKeyboard()

  const animatedScale = useDerivedValue(() => withTiming(keyboard.keyboardShown ? 0.8 : 1), [keyboard.keyboardShown])

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ scale: animatedScale.value }],
      opacity: interpolate(animatedScale.value, [0.8, 1], [0, 1]),
    }),
    [animatedScale],
  )

  const animatedImage = useAnimatedStyle(
    () => ({
      opacity: interpolate(animatedScale.value, [0.8, 1], [0, 1]),
    }),
    [animatedScale],
  )

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <LinearGradient colors={theme.colors.loginGradient} style={{ flex: 1 }}>
          <View style={styles.container}>
            <Animated.View style={[styles.title_container_reverse, animatedStyles]}>
              <Text style={styles.title}>{strings.login_title}</Text>
              <Image style={styles.image_title} source={require('@assets/logo.png')} />
            </Animated.View>
            <Animated.View style={[styles.title_container, animatedStyles]}>
              <Text style={styles.title}>{strings.welcome_text}</Text>
              <LogoEnolaWhite width={normalizeText(170)} />
            </Animated.View>
            <Animated.View style={[styles.image, animatedImage]}>
              <Picture height="100%" width="100%" />
            </Animated.View>
          </View>
        </LinearGradient>
        <Bottomsheet>
          <LoginForm onSubmit={handleSubmitForm} isLoading={isLoading} />
          <Link to="/register" style={styles.register_link}>
            <Text>{strings.to_register}</Text>
          </Link>
        </Bottomsheet>
      </Pressable>
    </KeyboardAvoidingView>
  )
}
