import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PreviewProvider } from 'react-native-quick-preview'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreviewProvider>
        <StatusBar style="auto" />
        {/* Header-less: the tab screens and each example screen render their own header. */}
        <Stack screenOptions={{ headerShown: false }} />
      </PreviewProvider>
    </GestureHandlerRootView>
  )
}
