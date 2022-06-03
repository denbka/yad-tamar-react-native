import React, { useMemo } from 'react'
import type { FC } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { createStyles } from './bottomsheet.styles'

export const Bottomsheet: FC = ({ children }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return <View style={styles.bottomsheet}>{children}</View>
}

// type BottomsheetProps = {}
