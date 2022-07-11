import 'intl'
import 'intl/locale-data/jsonp/en-ZA'
import 'intl/locale-data/jsonp/he-IL'

import React from 'react'
import { StatusBar, useColorScheme, LogBox } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { addEventListener, NetInfoState } from '@react-native-community/netinfo'
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query'
import Toast from 'react-native-toast-message'

import Navigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LocaleProvider, ModalProvider } from '@hooks'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

LogBox.ignoreAllLogs()

onlineManager.setEventListener((setOnline) => {
  return addEventListener((state: NetInfoState) => {
    setOnline(state?.isConnected ?? false)
  })
})

const queryClient = new QueryClient()

const App = () => {
  const scheme = useColorScheme()
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content')

    setTimeout(() => {
      SplashScreen.hide()
    }, 750)
  }, [scheme])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <LocaleProvider>
            <ModalProvider>
              <SafeAreaView
                edges={['top']}
                style={{
                  flex: 1,
                  position: 'relative',
                  backgroundColor: '#fff',
                }}
              >
                <Navigation />
              </SafeAreaView>
            </ModalProvider>
            <Toast />
          </LocaleProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
