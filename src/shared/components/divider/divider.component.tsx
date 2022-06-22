import React, { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './divider.styles'

export const Divider: FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  return <View style={[styles.divider, style]} />
}
