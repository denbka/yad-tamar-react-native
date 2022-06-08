import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { TextInput } from '@shared-components/text_input'
import { createStyles } from '../login.styles'
import { useLocale } from '@hooks'

export const LoginForm: FC = ({ onSubmit }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { strings } = useLocale()
  return (
    <View>
      <TextInput placeholder={strings.email} style={styles.text} />
      <TextInput placeholder={strings.password} style={styles.text} />
      <Button style={styles.button} variant="inline" onPress={onSubmit}>
        {strings.login}
      </Button>
    </View>
  )
}
