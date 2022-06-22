import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import DeleteIcon from '@assets/delete.svg'
import { createStyles } from '../volunteers.styles'
import MedalIcon from '@assets/medal.svg'

export const VolunteersListCard: FC<VolunteerListCardProps> = ({ user_id, cell_phone, onDeleteVolunteer }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.card}>
      <View style={styles.card_title_container}>
        <MedalIcon style={styles.medal} />
        <Text style={styles.card__title}>{cell_phone}</Text>
      </View>
      <Pressable onPress={() => onDeleteVolunteer(user_id)}>
        <DeleteIcon />
      </Pressable>
    </View>
  )
}

type VolunteerListCardProps = IVolunteer & {
  onDeleteVolunteer: (volunteer_id: string) => void
}
