import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, View, ColorValue, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import { createStyles } from './button.styles'
import Animated, { runOnJS, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import { normalizeText } from '@freakycoder/react-native-helpers'

const notShadowVariables = ['orange', 'flat']

export const Button: FC<ButtonProps> = ({
  children,
  textStyle,
  variant = 'green',
  textColor,
  fontSize,
  style,
  loading,
  ...props
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const animatedShadowStyles = useAnimatedStyle(() => {
    const withShadowVariant = !notShadowVariables.includes(variant)

    return {
      opacity: withTiming(withShadowVariant ? 1 : 0),
    }
  }, [variant])

  const tapGestureHandler = Gesture.Tap().onEnd((event) => {
    props.onPress && runOnJS(props.onPress)(event)
  })

  return (
    <GestureDetector gesture={tapGestureHandler}>
      <Animated.View {...props} style={[styles.button, styles[variant], style, loading ? styles.loading : null]}>
        <Animated.View style={[styles.inset_shadow_container, animatedShadowStyles]}>
          <View style={styles.inset_shadow_top} />
        </Animated.View>
        <Text style={[{ color: textColor ?? '#fff', fontSize: fontSize ?? normalizeText(13) }, styles.text, textStyle]}>
          {!loading ? children : <ActivityIndicator size="small" color="#fff" />}
        </Text>
      </Animated.View>
    </GestureDetector>
  )
}

type ButtonVariant = 'white' | 'green' | 'inline' | 'orange' | 'flat'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<ViewStyle>
  textColor?: ColorValue
  fontSize?: number
  loading?: boolean
  onPress?: (event?: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void
}
