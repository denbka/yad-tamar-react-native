import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { createStyles } from '../profile.styles'

export const Avatar: FC = () => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return <View style={styles.avatar}></View>
}
