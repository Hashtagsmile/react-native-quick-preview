// Examples — a gallery of real-world screens, each demonstrating quick preview
// in a different context. Tap a card to open the full example. New use cases are
// added here, so the tab bar never grows.
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, type Href } from 'expo-router'
import { colors, radius, spacing, type as t } from '../../theme'

type Example = {
  route: Href
  icon: keyof typeof Ionicons.glyphMap
  title: string
  desc: string
}

const EXAMPLES: Example[] = [
  { route: '/examples/feed', icon: 'grid', title: 'Social Feed', desc: 'Explore grid → popover peek of a post' },
  { route: '/examples/shop', icon: 'bag-handle', title: 'Shopping', desc: 'Product grid → bottom-sheet quick-view' },
  { route: '/examples/music', icon: 'musical-notes', title: 'Music', desc: 'Track list → peek with Play' },
  { route: '/examples/chat', icon: 'chatbubbles', title: 'Messages', desc: 'Long-press a shared link → peek its destination' },
  { route: '/examples/places', icon: 'map', title: 'Places', desc: 'Long-press a map pin → place peek' },
  { route: '/examples/people', icon: 'people', title: 'Team', desc: 'Directory → profile peek with quick actions' },
]

export default function Examples() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={t.h1}>Quick Preview</Text>
        <Text style={styles.subtitle}>
          Long-press to peek, tap to open. The same library, in the apps you already know.
        </Text>

        {EXAMPLES.map((ex) => (
          <Pressable
            key={ex.title}
            onPress={() => router.push(ex.route)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            testID={`example-${ex.title}`}
          >
            <View style={styles.iconTile}>
              <Ionicons name={ex.icon} size={22} color={colors.accent} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{ex.title}</Text>
              <Text style={styles.cardDesc}>{ex.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#c7c7cc" />
          </Pressable>
        ))}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  subtitle: { ...t.muted, marginTop: spacing.sm, marginBottom: spacing.lg, lineHeight: 19 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardPressed: { backgroundColor: '#ededf0' },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardDesc: { fontSize: 13, color: colors.textMuted, marginTop: 2, lineHeight: 18 },
})
