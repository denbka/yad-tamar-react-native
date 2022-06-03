import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { FlatList } from 'react-native'
import { createStyles } from '../profile.styles'
import { FamilyCard } from './family_card.component'

export const FamiliesList: FC<FamiliesListProps> = ({ data, onRemoveFamily, onNavigateToFamily }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <FlatList
      data={data}
      style={styles.list}
      renderItem={({ item }) => (
        <FamilyCard {...item} onRemoveFamily={onRemoveFamily} onNavigateToFamily={onNavigateToFamily} />
      )}
    />
  )
}

type FamiliesListProps = {
  data: IFamily[]
  onRemoveFamily: (familyId: number) => void
  onNavigateToFamily: (familyId: number) => void
}
