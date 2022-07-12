import { useTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { createStyles } from '../profile.styles'
import DeleteIcon from '@assets/delete.svg'
import { useLocale } from '@hooks'

export const FamilyCard: FC<FamilyCardProps> = ({ onRemoveFamily, onNavigateToFamily, ...data }) => {
  const { strings } = useLocale()
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Pressable onPress={() => onNavigateToFamily(data.family_id)}>
      <View style={styles.card}>
        <View style={styles.card__content}>
          <Text style={styles.card__title}>{data?.last_name ?? data?.name}</Text>
          <Text style={styles.card__members}>
            {data?.volunteersCount ?? data?.volunteers?.length} {strings.members_count}
          </Text>
        </View>
        <Pressable onPress={() => onRemoveFamily(data.family_id)}>
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
