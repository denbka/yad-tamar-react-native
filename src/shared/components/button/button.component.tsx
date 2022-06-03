import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, View, Pressable, GestureResponderEvent, ColorValue, StyleProp, ViewStyle } from 'react-native'
import { createStyles } from './button.styles'

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
  const buttonStyle = styles[variant]

  const isShadowInset = variant !== 'orange'

  const handlePress = (event: GestureResponderEvent) => {
    props.onPress && props.onPress(event)
  }
  return (
    <Pressable onPress={handlePress}>
      <View {...props} style={[styles.button, buttonStyle, style]}>
        {isShadowInset && (
          <View style={[styles.inset_shadow_container]}>
            <View style={styles.inset_shadow_top} />
          </View>
        )}
        <Text style={[styles.text, { color: textColor ?? '#fff', fontSize: fontSize ?? 18 }, textStyle]}>
          {children}
        </Text>
      </View>
    </Pressable>
  )
}

type ButtonProps = {
  children: React.ReactNode
  variant?: 'white' | 'green' | 'inline' | 'orange'
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<ViewStyle>
  textColor?: ColorValue
  fontSize?: number
  onPress?: (event: GestureResponderEvent) => void
}
