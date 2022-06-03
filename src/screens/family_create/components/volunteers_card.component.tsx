import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { createStyles } from '../family_create.styles'
import DeleteIcon from '@assets/delete.svg'

export const VolunteersListCard: FC<VolunteersListCardProps> = ({ title }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.card}>
      <Text style={styles.card__title}>{title}</Text>
      <Pressable>
        <DeleteIcon />
      </Pressable>
    </View>
  )
}

type VolunteersListCardProps = {
  data: IFamily
}
