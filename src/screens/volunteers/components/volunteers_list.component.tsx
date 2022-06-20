import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { createStyles } from '../volunteers.styles'
import { VolunteersListCard } from './volunteers_card.component'

export const VolunteersList: FC<VolunteersListProps> = ({ data, onDeleteVolunteer }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      style={styles.list}
      renderItem={({ item }) => <VolunteersListCard {...item} onDeleteVolunteer={onDeleteVolunteer} />}
    />
  )
}

type VolunteersListProps = {
  data: IVolunteer[]
  onDeleteVolunteer: (volunteer_id: number) => void
}
