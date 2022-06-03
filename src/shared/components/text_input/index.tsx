import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Text, TextInput as NativeInput, TextInputProps, View } from 'react-native'
import { createStyles } from './style'
import TextInputMask from 'react-native-text-input-mask'

export const TextInput: FC<InputProps> = ({ style, prompt, textarea, keyboardType, ...props }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  if (keyboardType === 'numeric') {
    return (
      <TextInputMask
        onChangeText={(formatted, extracted) => {
          console.log(formatted) // +1 (123) 456-78-90
          console.log(extracted) // 1234567890
        }}
        mask={'+1 ([000]) [000] [00] [00]'}
        style={[styles.input, style]}
        {...props}
      />
    )
  }

  return (
    <View style={styles.container}>
      <NativeInput multiline={textarea} style={[styles.input, style]} {...props} />
      {prompt && <Text style={styles.prompt}>{prompt}</Text>}
    </View>
  )
}

type InputProps = { prompt?: string; textarea?: boolean } & TextInputProps
