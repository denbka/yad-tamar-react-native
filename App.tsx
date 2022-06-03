import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar, useColorScheme, LogBox, SafeAreaView } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { addEventListener, NetInfoState } from '@react-native-community/netinfo'
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query'

/**
 * ? Local Imports
 */
import Navigation from './src/navigation'
import { isAndroid } from '@freakycoder/react-native-helpers'

LogBox.ignoreAllLogs()

onlineManager.setEventListener((setOnline) => {
  return addEventListener((state: NetInfoState) => {
    setOnline(state?.isConnected ?? false)
  })
})

const queryClient = new QueryClient()

const App = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'
  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content')
    if (isAndroid) {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)')
      StatusBar.setTranslucent(true)
    }

    setTimeout(() => {
      SplashScreen.hide()
    }, 750)
  }, [scheme, isDarkMode])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#5678BC',
        }}
      >
        <Navigation />
      </SafeAreaView>
    </QueryClientProvider>
  )
}

export default App
