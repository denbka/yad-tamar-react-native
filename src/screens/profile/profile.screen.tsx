import React, { useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { familyApi } from '@api'
import { SCREENS } from '@shared-constants'
import { Button } from '@shared-components/button'
import { createStyles } from './profile.styles'
import { Avatar, FamiliesList } from './components'
import { Text } from '@shared-components/text'
import { useLocale } from '@hooks'

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { toggleLanguage, strings } = useLocale()
  const queryClient = useQueryClient()
  const { data } = useQuery<IFamily[]>(familyApi.queryKey, familyApi.get)
  const { mutate: removeFamily } = useMutation((id: number) => familyApi.remove(id))
  const theme = useTheme()
  const styles = createStyles(theme)
  const handlePushToFamilyCreate = () => {
    NavigationService.push(SCREENS.FAMILY_CREATE)
  }

  const handleNavigateToFamily = (familyId: number) => {
    NavigationService.push(SCREENS.TODO, { familyId })
  }

  const handleRemoveFamily = (id: number) => {
    removeFamily(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(familyApi.queryKey)
      },
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={toggleLanguage}>
          <Avatar />
        </Pressable>
        <View>
          <Text style={styles.name}>Peter Jackson</Text>
          <Text style={styles.role}>coordinator</Text>
          <Text style={styles.job}>Volunteer Society</Text>
        </View>
      </View>
      <Button onPress={handlePushToFamilyCreate} variant="inline" style={styles.button_create}>
        {strings.create_family}
      </Button>
      <Text style={styles.title}>{strings.my_families}</Text>
      <FamiliesList data={data ?? []} onNavigateToFamily={handleNavigateToFamily} onRemoveFamily={handleRemoveFamily} />
    </View>
  )
}

type ProfileScreenProps = {}
