import React, { useMemo } from 'react'
import { Image, Pressable, ScrollView, View } from 'react-native'
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

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { strings } = useLocale()
  // const availableLanguages = useMemo(
  //   () => localStrings.getAvailableLanguages().map((item) => ({ label: item, value: item })),
  //   [],
  // )
  const queryClient = useQueryClient()
  const { data: userInfo } = useQuery('user', authApi.getUserData)
  const { data } = useQuery(familyApi.queryKey, () => familyApi.get(userInfo?.role, userInfo?.family_id), {
    enabled: !!userInfo?.role,
  })
  const { mutate: removeFamily } = useMutation((id: number) => familyApi.remove(id))
  const theme = useTheme()
  const styles = createStyles(theme)

  const handlePushToFamilyCreate = () => {
    NavigationService.navigate(SCREENS.FAMILY_CREATE)
  }

  const handleNavigateToFamily = (familyId: number) => {
    NavigationService.push(SCREENS.TODO, { familyId: familyId ?? userInfo?.family_id })
  }

  const handleRemoveFamily = (id: number) => {
    removeFamily(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(familyApi.queryKey)
      },
    })
  }

  console.log(data)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar>
          <Image source={require('@assets/logo.png')} />
        </Avatar>
        <View>
          <Text style={styles.name}>{userInfo?.last_name}</Text>
          <Text style={styles.role}>{userInfo?.role?.includes('coord') ? strings.coordinator : strings.main}</Text>
          <Text style={styles.job}>{strings.profile_prompt}</Text>
        </View>
      </View>
      {userInfo?.role?.includes('coord') && (
        <View style={styles.settings}>
          {/* <Pressable onPress={toggleLanguage} style={{ marginBottom: 15 }}>
          <Text style={styles.settings_item}>
            {strings.language}: {currentLocale}
          </Text>
        </Pressable> */}

          <Button onPress={handlePushToFamilyCreate} variant="inline" style={styles.button_create}>
            {strings.create_family}
          </Button>
        </View>
      )}

      <Text style={styles.title}>{strings.my_families}</Text>
      {Array.isArray(data) ? (
        <FamiliesList
          data={data ?? []}
          onNavigateToFamily={handleNavigateToFamily}
          onRemoveFamily={handleRemoveFamily}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>{data}</Text>
      )}
    </ScrollView>
  )
}

type ProfileScreenProps = {}
