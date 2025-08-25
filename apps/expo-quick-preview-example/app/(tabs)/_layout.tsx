import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0095f6',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#dbdbdb', height: 60 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="api"
        options={{
          title: 'API',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'code' : 'code-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="examples"
        options={{
          title: 'Basic',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'layers' : 'layers-outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="new-version"
        options={{
          title: 'New Version',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'newspaper' : 'newspaper-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
