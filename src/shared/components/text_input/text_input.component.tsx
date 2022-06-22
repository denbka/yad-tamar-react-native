import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { Text, TextInput as NativeInput, TextInputProps, View } from 'react-native'
import { createStyles } from './text_input.styles'

export const TextInput: FC<InputProps> = ({ style, prompt, textarea, ...props }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <NativeInput
        multiline={textarea}
        placeholderTextColor={theme.colors.gray}
        style={[styles.input, style]}
        {...props}
      />
      {prompt && <Text style={styles.prompt}>{prompt}</Text>}
    </View>
  )
}

type InputProps = { prompt?: string; textarea?: boolean } & TextInputProps
