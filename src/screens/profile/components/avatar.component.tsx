import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { View } from 'react-native'
import { createStyles } from '../profile.styles'

export const Avatar: FC<AvatarProps> = ({ children }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return <View style={styles.avatar}>{children}</View>
}

type AvatarProps = {
  children: React.ReactNode
}
