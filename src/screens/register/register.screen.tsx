import React, { FC } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Pressable, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useKeyboard } from '@react-native-community/hooks'
import { createStyles } from './register.styles'
import LinearGradient from 'react-native-linear-gradient'
import { RegisterForm } from './components/register_form.component'
import Picture from '@assets/login.svg'
import { Bottomsheet } from '@shared-components/bottomsheet'
import { useMutation, useQueryClient } from 'react-query'
import { authApi } from '@api'
import LogoEnolaWhite from '@assets/logo_enola_white.svg'
import { normalizeText } from '@freakycoder/react-native-helpers'
import { useLocale } from '@hooks'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

export const RegisterScreen: FC<RegisterScreenProps> = () => {
  const queryClient = useQueryClient()
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)
  const asyncStorage = useAsyncStorage('token')
  const { mutate: register, isLoading: isRegisterLoading } = useMutation((form: IRegisterForm) =>
    authApi.register(form),
  )
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

  const handleSubmitForm = (values: IRegisterForm) => {
    register(values, {
      onSuccess: async ({ token }) => {
        console.log(321312312321)
        await asyncStorage.setItem(token)
        queryClient.invalidateQueries('user')
      },
      onError: (error) => {
        console.log('error')
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Validation error',
        })
        console.log(error.response)
      },
    })
  }

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
            {/* <Animated.View style={[styles.image, animatedImage]}>
              <Picture height="100%" width="100%" />
            </Animated.View> */}
          </View>
        </LinearGradient>
        <Bottomsheet>
          <RegisterForm isLoading={isRegisterLoading} onSubmit={handleSubmitForm} />
        </Bottomsheet>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

type RegisterScreenProps = {}
