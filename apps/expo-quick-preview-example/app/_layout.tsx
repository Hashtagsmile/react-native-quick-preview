import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PreviewProvider } from 'react-native-quick-preview';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PreviewProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                title: 'QuickPreview Showcase'
              }}
            />
            <Stack.Screen
              name="detail"
              options={{
                headerShown: false,
                title: 'Item Details'
              }}
            />
            <Stack.Screen name="addons" options={{ headerShown: false, title: 'Addons Showcase' }} />
          </Stack>
        </PreviewProvider>
      </GestureHandlerRootView>
    </>
  );
}
