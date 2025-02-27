import { View, Text } from 'react-native'
import React from 'react'
import RootNavigation from './src/navigation'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import store from './src/store'

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
    </Provider>
  )
}