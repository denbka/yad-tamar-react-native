import React, { ReactNode, useMemo } from 'react'
import type { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './bottomsheet.styles'

export const Bottomsheet: FC<BottomsheetProps> = ({ children, style }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return <View style={[styles.bottomsheet, style]}>{children}</View>
}

type BottomsheetProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
