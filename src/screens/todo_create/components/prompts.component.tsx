import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from '@shared-components/button'
import { createStyles } from '../todo_create.styles'

const prompts = ['קח ילדים מבית הספר', 'ללכת לשוק', 'קניות', 'תנקה את הבית']

export const Prompts: React.FC<PromptsProps> = ({ onChange }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.prompt_container}>
      {prompts.map((prompt) => (
        <View key={prompt} style={[styles.prompt_item]}>
          <Button fontSize={16} textStyle={styles.prompt_text_style} onPress={() => onChange(prompt)}>
            {prompt}
          </Button>
        </View>
      ))}
    </View>
  )
}

type PromptsProps = {
  onChange: (text: string) => void
}
