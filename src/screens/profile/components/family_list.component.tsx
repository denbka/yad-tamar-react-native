import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { View } from 'react-native'
import { createStyles } from '../profile.styles'
import { FamilyCard } from './family_card.component'

export const FamiliesList: FC<FamiliesListProps> = ({ data, onRemoveFamily, onNavigateToFamily }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.list}>
      {data.map((item) => (
        <FamilyCard
          key={item.family_id}
          {...item}
          onRemoveFamily={onRemoveFamily}
          onNavigateToFamily={onNavigateToFamily}
        />
      ))}
    </View>
  )
}

type FamiliesListProps = {
  data: IFamily[]
  onRemoveFamily: (familyId: number) => void
  onNavigateToFamily: (familyId: number) => void
}
