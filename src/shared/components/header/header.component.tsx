import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import * as NavigationService from 'react-navigation-helpers'
import BackIcon from '@assets/back.svg'
import { createStyles } from './header.styles'

export const Header: FC<HeaderProps> = ({ children }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const handlePushBack = () => {
    NavigationService.goBack()
  }

  return (
    <Pressable onPress={handlePushBack}>
      <View style={styles.header}>
        <BackIcon />
        <Text style={styles.header_text}>{children}</Text>
      </View>
    </Pressable>
  )
}

type HeaderProps = {
  children: React.ReactNode
}
