import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { createStyles } from '../volunteers.styles'
import { VolunteersListCard } from './volunteers_card.component'

export const VolunteersList: FC<VolunteersListProps> = ({ data }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      style={styles.list}
      renderItem={({ item }) => <VolunteersListCard {...item} />}
    />
  )
}

type VolunteersListProps = {
  data: IVolunteer[]
}
