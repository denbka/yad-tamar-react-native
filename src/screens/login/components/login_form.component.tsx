import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { TextInput } from '@shared-components/text_input'
import { createStyles } from '../login.styles'
import { localStrings } from '@locales'

export const LoginForm: FC = ({ onSubmit }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View>
      <TextInput placeholder={localStrings.email} style={styles.text} />
      <TextInput placeholder={localStrings.password} style={styles.text} />
      <Button style={styles.button} variant="inline" onPress={onSubmit}>
        {localStrings.login}
      </Button>
    </View>
  )
}
