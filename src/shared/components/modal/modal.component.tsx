import { Portal } from '@gorhom/portal'
import { useModal } from '@hooks'
import { useTheme } from '@react-navigation/native'
import React, { FC, ReactNode, useMemo } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { createStyles } from './modal.styles'

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const modal = useModal()

  const tapGestureHandler = Gesture.Tap().onEnd(() => (onClose ? runOnJS(onClose)() : runOnJS(modal.hide)()))
  const tapGestureHandlerContent = Gesture.Tap().onEnd(() => {})

  return (
    <Portal>
      <GestureDetector gesture={tapGestureHandler}>
        <View style={styles.overlay}>
          <GestureDetector gesture={tapGestureHandlerContent}>
            <View style={styles.content}>{children}</View>
          </GestureDetector>
        </View>
      </GestureDetector>
    </Portal>
  )
}

type ModalProps = {
  children: ReactNode
  onClose: () => void
}
