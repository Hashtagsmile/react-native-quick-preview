import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            title: 'QuickLook Showcase'
          }} 
        />
        <Stack.Screen 
          name="detail" 
          options={{ 
            headerShown: false,
            title: 'Item Details'
          }} 
        />
      </Stack>
    </>
  );
}
