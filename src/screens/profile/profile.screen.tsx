import React, { useMemo } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { authApi, familyApi } from '@api'
import { SCREENS } from '@shared-constants'
import { Button } from '@shared-components/button'
import { createStyles } from './profile.styles'
import { Avatar, FamiliesList } from './components'
import { Text } from '@shared-components/text'
import { useLocale } from '@hooks'
import { localStrings } from '@locales'
import { IconVolunteer } from '@shared-components/icons'

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { toggleLanguage, strings, currentLocale } = useLocale()
  const availableLanguages = useMemo(
    () => localStrings.getAvailableLanguages().map((item) => ({ label: item, value: item })),
    [],
  )
  const queryClient = useQueryClient()
  const { data: userInfo } = useQuery<IFamily[]>('user', authApi.getUserData)
  const { data } = useQuery<IFamily[]>(familyApi.queryKey, () => familyApi.get(userInfo?.role), {
    enabled: !!userInfo?.role,
  })

  const { mutate: removeFamily } = useMutation((id: number) => familyApi.remove(id))
  const theme = useTheme()
  const styles = createStyles(theme)
  const handlePushToFamilyCreate = () => {
    NavigationService.navigate(SCREENS.FAMILY_CREATE)
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar>
          <IconVolunteer fill={theme.colors.darkBlue} />
        </Avatar>
        <View>
          <Text style={styles.name}>{userInfo?.name}</Text>
          <Text style={styles.role}>{userInfo?.role === 'coordinator' ? 'coordinator' : 'helper'}</Text>
          {userInfo?.role === 'coordinator' && <Text style={styles.job}>Volunteer Society</Text>}
        </View>
      </View>
      <View style={styles.settings}>
        <Pressable onPress={toggleLanguage} style={{ marginBottom: 15 }}>
          <Text style={styles.settings_item}>
            {strings.language}: {currentLocale}
          </Text>
        </Pressable>
        <Button onPress={handlePushToFamilyCreate} variant="inline" style={styles.button_create}>
          {strings.create_family}
        </Button>
      </View>

      <Text style={styles.title}>{strings.my_families}</Text>
      {Array.isArray(data) ? (
        <FamiliesList
          data={data ?? []}
          onNavigateToFamily={handleNavigateToFamily}
          onRemoveFamily={handleRemoveFamily}
        />
      ) : (
        <Text>{data}</Text>
      )}
    </ScrollView>
  )
}

type ProfileScreenProps = {}
