import React, { useEffect, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import RNPickerSelect from 'react-native-picker-select'

import { authApi, familyApi, volunteerApi } from '@api'
import { SCREENS } from '@shared-constants'
import { Button } from '@shared-components/button'
import { createStyles } from './profile.styles'
import { Avatar, FamiliesList } from './components'
import { Text } from '@shared-components/text'
import { useLocale } from '@hooks'
import { localStrings } from '@locales'

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { toggleLanguage, strings, currentLocale } = useLocale()
  const availableLanguages = useMemo(
    () => localStrings.getAvailableLanguages().map((item) => ({ label: item, value: item })),
    [],
  )
  const queryClient = useQueryClient()
  const { data } = useQuery<IFamily[]>(familyApi.queryKey, familyApi.get)
  const { mutate: removeFamily } = useMutation((id: number) => familyApi.remove(id))
  // const { data: userData } = useQuery<AxiosResponse<IUserShort>>('user', authApi.getUserData)
  // console.log(userData)
  // const { data: userInfo } = useQuery<IUser>('users', () => volunteerApi.getById(userData?.data?.user_id), {
  //   enabled: !!userData?.data,
  // })
  const theme = useTheme()
  const styles = createStyles(theme)
  const handlePushToFamilyCreate = () => {
    console.log('SCREENS.FAMILY_CREATE')
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

  console.log(availableLanguages)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar />
        <View>
          {/* <Text style={styles.name}>{userInfo?.mail}</Text> */}
          <Text style={styles.role}>coordinator</Text>
          <Text style={styles.job}>Volunteer Society</Text>
        </View>
      </View>
      <Button onPress={handlePushToFamilyCreate} variant="inline" style={styles.button_create}>
        {strings.create_family}
      </Button>
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
      <View style={styles.settings}>
        <Text style={styles.settings_title}>Settings</Text>
        <Pressable onPress={toggleLanguage} style={{ marginBottom: 15 }}>
          <Text style={styles.settings_item}>Language: {currentLocale}</Text>
        </Pressable>
        <Text style={styles.settings_item}>Logout</Text>
      </View>
    </View>
  )
}

type ProfileScreenProps = {}
