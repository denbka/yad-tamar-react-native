import React, { FC, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { createStyles } from '../todo.styles'

export const Progress: FC = () => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.progress_container}>
      <View style={styles.progress_text_container}>
        <Text style={styles.progress_text}>65%</Text>
        <Text style={styles.progress_prompt}>completed</Text>
      </View>
      <View style={styles.progress_bar_wrapper}>
        <View style={styles.progress_bar} />
      </View>
    </View>
  )
}

// type ProgressProps = {}
