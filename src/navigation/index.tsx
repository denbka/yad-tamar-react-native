import React, { FC, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'
import qs, { ParsedQuery, ParsedUrl } from 'query-string'

import { SCREENS } from '@shared-constants'
import { LightTheme } from '@theme/themes'

import { ProfileScreen } from '@screens/profile'
import { LoginScreen } from '@screens/login'
import { FamilyCreateScreen } from '@screens/family_create'
import { TodoScreen } from '@screens/todo'
import { TodoCreateScreen } from '@screens/todo_create'
import { VolunteersScreen } from '@screens/volunteers'
import { VolunteersCreateScreen } from '@screens/volunteers_create'
import { RegisterScreen } from '@screens/register'
import { useQuery, useQueryClient } from 'react-query'
import { authApi } from '@api'
import { ShareScreen } from '@screens/share'
import { Linking } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

export const useLinkedParse = (cb: (params: ParsedQuery) => void): void => {
  const parsedUrl = (e: { url: string }) => {
    const { query }: ParsedUrl = qs.parseUrl(e.url)
    const parsed: ParsedQuery = { token: query?.token }
    if (!parsed?.token) return
    cb(parsed)
  }

  useEffect(() => {
    Linking.addEventListener('url', parsedUrl)
  })
}

const Navigation: FC = () => {
  const asyncStorage = useAsyncStorage('token')
  const queryClient = useQueryClient()
  const [isAuth, setAuth] = useState(false)

  useQuery('user', authApi.getUserData, {
    onSuccess: (result) => {
      console.log(result, 'authApi.getUserData')
      setAuth(JSON.stringify(result) === '{}' ? false : true)
    },
  })

  useLinkedParse(async ({ token }) => {
    if (!token) return
    await asyncStorage.setItem(token)
    queryClient.invalidateQueries('user')
  })

  navigationRef.isReady = () => true

  React.useEffect((): any => {
    // asyncStorage.removeItem()
    // asyncStorage.setItem(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDExLCJjZWxsX3Bob25lIjoiMjQ4NTg1NiIsImlhdCI6MTY1NzU1MTI5NywiZXhwIjoxOTcyOTExMjk3fQ.-KnOs2ZLpfiSL-O66Y9fFV_GNCM3rERFXkU66h5FoLM',
    // )
    return () => (isReadyRef.current = false)
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
      theme={LightTheme}
    >
      {!isAuth ? (
        <Stack.Navigator initialRouteName={SCREENS.LOGIN} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={SCREENS.PROFILE} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
          <Stack.Screen name={SCREENS.FAMILY_CREATE} component={FamilyCreateScreen} />
          <Stack.Screen name={SCREENS.TODO} component={TodoScreen} />
          <Stack.Screen name={SCREENS.TODO_CREATE} component={TodoCreateScreen} />
          <Stack.Screen name={SCREENS.VOLUNTEERS} component={VolunteersScreen} />
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              cardStyle: {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Stack.Screen name={SCREENS.VOLUNTEERS_CREATE} component={VolunteersCreateScreen} />
            <Stack.Screen name={SCREENS.CHOOSE_ACTION} component={ShareScreen} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default Navigation
