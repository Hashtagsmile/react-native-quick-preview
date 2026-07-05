// Showcase screen — purpose-built for recording demo GIFs.
// Each row triggers ONE flow of react-native-quick-preview using the real API,
// so you can record a clean, labeled clip per feature.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
// Use gesture-handler touchables: rows on-screen work either way, but content
// inside an open preview must use gesture-handler's Pressable to receive taps.
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import {
  useQuickPreview,
  QuickPreview,
  QuickPreviewPressable,
  QuickPreviewScrollView,
} from 'react-native-quick-preview'
import { posts, articles, type Item } from '../../data/examples'

// Compact preview content. Keep it self-sizing — no flex:1 / tall minHeight.
function PreviewCard({ item }: { item: Item }) {
  return (
    <View style={styles.preview}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.previewImage} />}
      <View style={styles.previewBody}>
        <Text style={styles.previewTitle}>{item.title}</Text>
        {!!item.subtitle && <Text style={styles.previewSubtitle}>{item.subtitle}</Text>}
        {!!item.description && (
          <Text style={styles.previewText} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    </View>
  )
}

// Long content to demonstrate QuickPreviewScrollView (scroll vs. swipe-to-dismiss).
function LongPreview({ item }: { item: Item }) {
  return (
    <QuickPreviewScrollView style={{ maxHeight: 460 }}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.previewImage} />}
      <View style={styles.previewBody}>
        <Text style={styles.previewTitle}>{item.title}</Text>
        {Array.from({ length: 8 }).map((_, i) => (
          <Text key={i} style={styles.previewParagraph}>
            {item.description ??
              'Scrollable preview content. Drag to scroll; drag from the top to dismiss.'}
          </Text>
        ))}
      </View>
    </QuickPreviewScrollView>
  )
}

export default function Showcase() {
  const { present } = useQuickPreview()
  const router = useRouter()

  const rows: { key: string; icon: keyof typeof Ionicons.glyphMap; title: string; desc: string; onPress: () => void }[] = [
    {
      key: 'popover',
      icon: 'albums-outline',
      title: 'Popover',
      desc: 'Centered card. Tap to present.',
      onPress: () => present(<PreviewCard item={posts[0]} />, { variant: 'popover' }),
    },
    {
      key: 'sheet',
      icon: 'grid-outline',
      title: 'Sheet',
      desc: 'Bottom sheet. Swipe down to dismiss.',
      onPress: () => present(<PreviewCard item={posts[1]} />, { variant: 'sheet' }),
    },
    {
      key: 'anywhere',
      icon: 'flash-outline',
      title: 'Present from anywhere',
      desc: 'Static QuickPreview.present() — no hook, no ref.',
      onPress: () => QuickPreview.present(<PreviewCard item={posts[2]} />, { variant: 'popover' }),
    },
    {
      key: 'scroll',
      icon: 'reader-outline',
      title: 'Scrollable preview',
      desc: 'QuickPreviewScrollView in a sized sheet.',
      onPress: () =>
        present(<LongPreview item={articles[0]} />, { variant: 'sheet', size: { maxHeight: 520 } }),
    },
  ]

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Showcase</Text>
        <Text style={styles.subtitle}>Each row is one flow — record a clip per feature.</Text>

        {rows.map((r) => (
          <Pressable
            key={r.key}
            onPress={r.onPress}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            accessibilityRole="button"
            accessibilityLabel={r.title}
            testID={`showcase-${r.key}`}
          >
            <Ionicons name={r.icon} size={22} color="#0095f6" style={styles.rowIcon} />
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>{r.title}</Text>
              <Text style={styles.rowDesc}>{r.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#c7c7cc" />
          </Pressable>
        ))}

        <Text style={styles.sectionLabel}>Long-press to peek · tap to open</Text>
        <Text style={styles.sectionHint}>
          The real-world pattern: long-press a tile to peek, tap the preview to open the
          detail screen, or tap outside to dismiss.
        </Text>
        <View style={styles.grid}>
          {posts.slice(0, 6).map((p) => (
            <QuickPreviewPressable
              key={p.id}
              onPress={() => router.push({ pathname: '/detail', params: { id: p.id } })}
              renderPreview={() => (
                <Pressable
                  onPress={() => {
                    QuickPreview.close()
                    router.push({ pathname: '/detail', params: { id: p.id } })
                  }}
                >
                  <PreviewCard item={p} />
                </Pressable>
              )}
              previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${p.title}` }}
              onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
              style={styles.tile}
              accessibilityLabel={`Preview ${p.title}`}
              testID={`tile-${p.id}`}
            >
              {p.image ? (
                <Image source={{ uri: p.image }} style={styles.tileImg} />
              ) : (
                <View style={[styles.tileImg, styles.tileFallback]}>
                  <Ionicons name="image-outline" size={22} color="#8e8e93" />
                </View>
              )}
            </QuickPreviewPressable>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const TILE_GAP = 6

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  h1: { fontSize: 28, fontWeight: '800', color: '#111' },
  subtitle: { fontSize: 14, color: '#6c757d', marginTop: 4, marginBottom: 16 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  rowPressed: { backgroundColor: '#ededf0' },
  rowIcon: { marginRight: 12 },
  rowTextWrap: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  rowDesc: { fontSize: 13, color: '#6c757d', marginTop: 2 },

  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#111', marginTop: 20 },
  sectionHint: { fontSize: 13, color: '#6c757d', marginTop: 2, marginBottom: 12 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  tile: { borderRadius: 10, overflow: 'hidden' },
  tileImg: { width: 108, height: 108, borderRadius: 10, backgroundColor: '#eee' },
  tileFallback: { alignItems: 'center', justifyContent: 'center' },

  // preview content
  preview: { backgroundColor: '#fff', width: 300 },
  previewImage: { width: '100%', aspectRatio: 16 / 10, backgroundColor: '#eee' },
  previewBody: { padding: 14 },
  previewTitle: { fontSize: 18, fontWeight: '800', color: '#111' },
  previewSubtitle: { fontSize: 13, color: '#8e8e93', marginTop: 2 },
  previewText: { fontSize: 14, color: '#3a3a3c', marginTop: 8 },
  previewParagraph: { fontSize: 14, color: '#3a3a3c', marginTop: 10, lineHeight: 20 },
})
