import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { TextInput } from '@shared-components/text_input'
import { createStyles } from '../login.styles'

export const LoginForm: FC = ({ onSubmit }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View>
      <TextInput placeholder="e-mail" style={styles.text} />
      <TextInput placeholder="password" style={styles.text} />
      <Button style={styles.button} variant="inline" onPress={onSubmit}>
        Login
      </Button>
    </View>
  )
}
