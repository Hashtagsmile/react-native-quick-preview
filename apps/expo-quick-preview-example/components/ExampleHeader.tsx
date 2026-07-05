import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { colors, spacing } from '../theme'

// Header for a pushed example screen: back button + title + optional hint pill.
export function ExampleHeader({ title, hint }: { title: string; hint?: string }) {
  const router = useRouter()
  return (
    <View style={styles.bar}>
      <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
        <Ionicons name="chevron-back" size={26} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
      {!!hint && (
        <View style={styles.pill}>
          <Ionicons name="finger-print-outline" size={12} color={colors.accent} />
          <Text style={styles.pillText}>{hint}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  back: { padding: 2 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  spacer: { flex: 1 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.panel,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  pillText: { fontSize: 12, fontWeight: '600', color: colors.accent },
})
