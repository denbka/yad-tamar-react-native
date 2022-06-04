import React, { FC, ReactNode, useMemo } from 'react'
import { StyleProp, Text as NativeText, TextStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { createStyles } from './text.styles'

export const Text: FC<TextProps> = ({ children, style }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return <NativeText style={[styles.initial, style]}>{children}</NativeText>
}

type TextProps = {
  children: ReactNode
  style: StyleProp<TextStyle>
}
