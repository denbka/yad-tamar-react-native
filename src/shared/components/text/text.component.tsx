import React, { FC, ReactNode } from 'react'
import { StyleProp, Text as NativeText, TextStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { createStyles } from './text.styles'

export const Text: FC<TextProps> = ({ children, style, ...styleProps }) => {
  const theme = useTheme()
  const styles = createStyles(theme, styleProps)

  return <NativeText style={[styles.initial, style]}>{children}</NativeText>
}

type TextProps = {
  children: ReactNode
  style?: StyleProp<TextStyle>
} & TextProp

export type TextProp = {
  bold?: boolean
}
