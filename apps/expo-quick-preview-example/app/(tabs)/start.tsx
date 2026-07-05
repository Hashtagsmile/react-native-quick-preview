// Start — the pitch, plus the IMPERATIVE demonstration (useQuickPreview().present).
// The declarative wrapper (QuickPreviewPressable) lives on the Components tab;
// showing the same effect two ways is the teaching moment, not a duplicate.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { useQuickPreview } from 'react-native-quick-preview'
import { gallery, type Item } from '../../data/examples'
import { PreviewCard } from '../../components/PreviewCard'
import { PreviewTile } from '../../components/PreviewTile'
import { colors, radius, spacing, type as t } from '../../theme'

export default function Start() {
  const { present, close } = useQuickPreview()
  const router = useRouter()
  const hero = gallery[0]

  const open = (item: Item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    present(
      <Pressable
        onPress={() => {
          close()
          router.push({ pathname: '/detail', params: { id: item.id } })
        }}
      >
        <PreviewCard item={item} />
      </Pressable>,
      { variant: 'popover' }
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={t.h1}>Quick Preview</Text>
        <Text style={styles.tagline}>
          Long-press anything to peek. Tap the preview to open. Swipe or tap outside to dismiss.
        </Text>

        <Text style={styles.label}>Try it — long-press the card</Text>
        <Pressable style={styles.hero} onLongPress={() => open(hero)} delayLongPress={300}>
          {!!hero.image && <Image source={{ uri: hero.image }} style={styles.heroImage} />}
          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{hero.title}</Text>
            {!!hero.subtitle && <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>}
            <View style={styles.hint}>
              <Ionicons name="finger-print-outline" size={14} color={colors.accent} />
              <Text style={styles.hintText}>Hold to preview</Text>
            </View>
          </View>
        </Pressable>
        <Text style={styles.pointer}>
          This uses the <Text style={styles.mono}>useQuickPreview()</Text> hook. The same effect
          with a drop-in wrapper is on the Components tab.
        </Text>

        <Text style={[styles.label, { marginTop: spacing.xl }]}>A preview can be any content</Text>
        <View style={styles.grid}>
          {gallery.map((item) => (
            <Pressable
              key={item.id}
              onLongPress={() => open(item)}
              delayLongPress={300}
              style={styles.tile}
            >
              <PreviewTile item={item} size={TILE} />
            </Pressable>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const TILE_GAP = spacing.sm
const TILE = 104

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },

  tagline: { ...t.muted, marginTop: spacing.sm, marginBottom: spacing.xl, lineHeight: 19 },

  label: { ...t.title, marginBottom: spacing.md },

  hero: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  heroImage: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.tileBg },
  heroBody: { padding: spacing.lg },
  heroTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  heroSubtitle: { ...t.muted, marginTop: 2 },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  hintText: { fontSize: 13, fontWeight: '600', color: colors.accent },

  pointer: { ...t.muted, marginTop: spacing.md, lineHeight: 19 },
  mono: { fontFamily: 'monospace', color: colors.text },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  tile: { borderRadius: radius.md, overflow: 'hidden' },
})
