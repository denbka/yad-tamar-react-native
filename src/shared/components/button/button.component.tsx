import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, View, ColorValue, StyleProp, ViewStyle } from 'react-native'
import { createStyles } from './button.styles'
import Animated, {
  DerivedValue,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
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
  ...props
}) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const buttonVariant = useDerivedValue(() => {
    console.log(typeof variant)
    return typeof variant === 'object' ? variant.value : variant
  }, [variant])
  const animatedShadowStyles = useAnimatedStyle(() => {
    const withShadowVariant = !notShadowVariables.includes(buttonVariant.value)

    return {
      opacity: withTiming(withShadowVariant ? 1 : 0),
    }
  }, [variant])

  const tapGestureHandler = Gesture.Tap().onEnd((event) => props.onPress && runOnJS(props.onPress)(event))

  return (
    <GestureDetector gesture={tapGestureHandler}>
      <Animated.View
        {...props}
        style={[styles.button, styles[typeof variant === 'object' ? variant.value : variant], style]}
      >
        <Animated.View style={[styles.inset_shadow_container, animatedShadowStyles]}>
          <View style={styles.inset_shadow_top} />
        </Animated.View>
        <Text style={[{ color: textColor ?? '#fff', fontSize: fontSize ?? normalizeText(13) }, styles.text, textStyle]}>
          {children}
        </Text>
      </Animated.View>
    </GestureDetector>
  )
}

type ButtonVariant = 'white' | 'green' | 'inline' | 'orange' | 'flat'

type ButtonProps = {
  children: React.ReactNode
  variant?: SharedValue<ButtonVariant> | DerivedValue<ButtonVariant> | ButtonVariant
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<ViewStyle>
  textColor?: ColorValue
  fontSize?: number
  onPress?: (event?: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void
}