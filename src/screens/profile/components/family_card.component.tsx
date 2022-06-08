import { useTheme } from '@react-navigation/native'
import React, { FC, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { createStyles } from '../profile.styles'
import DeleteIcon from '@assets/delete.svg'
import { useLocale } from '@hooks'

export const FamilyCard: FC<FamilyCardProps> = ({
  family_id,
  name_of_family,
  volunteersCount,
  onRemoveFamily,
  onNavigateToFamily,
}) => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Pressable onPress={() => onNavigateToFamily(family_id)}>
      <View style={styles.card}>
        <View style={styles.card__content}>
          <Text style={styles.card__title}>{name_of_family}</Text>
          <Text style={styles.card__members}>
            {volunteersCount} {strings.members_count}
          </Text>
        </View>
        <Pressable onPress={() => onRemoveFamily(family_id)}>
          <DeleteIcon />
        </Pressable>
      </View>
    </Pressable>
  )
}

type FamilyCardProps = {
  onRemoveFamily: (familyId: number) => void
  onNavigateToFamily: (familyId: number) => void
} & IFamily
