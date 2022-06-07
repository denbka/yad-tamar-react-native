import React from 'react'
import { useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'

import { SCREENS } from '@shared-constants'
import { LightTheme, DarkTheme } from '@theme/themes'

import { ProfileScreen } from '@screens/profile'
import { LoginScreen } from '@screens/login'
import { FamilyCreateScreen } from '@screens/family_create'
import { TodoScreen } from '@screens/todo'
import { TodoCreateScreen } from '@screens/todo_create'
import { VolunteersScreen } from '@screens/volunteers'
import { VolunteersCreateScreen } from '@screens/volunteers_create'

const Stack = createStackNavigator()

const Navigation = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'

  React.useEffect((): any => {
    return () => (isReadyRef.current = false)
  }, [])
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.AUTH} component={LoginScreen} />
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
