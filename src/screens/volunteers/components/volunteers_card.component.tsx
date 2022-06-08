import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import DeleteIcon from '@assets/delete.svg'
import { createStyles } from '../volunteers.styles'
import MedalIcon from '@assets/medal.svg'

export const VolunteersListCard: FC<IVolunteer> = ({ title }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.card}>
      <View style={styles.card_title_container}>
        <MedalIcon style={styles.medal} />
        <Text style={styles.card__title}>{title}</Text>
      </View>
      <Pressable>
        <DeleteIcon />
      </Pressable>
    </View>
  )
}
