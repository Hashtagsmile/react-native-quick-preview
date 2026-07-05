// Feed — an Instagram-style Explore grid. This is where quick preview earns its
// keep: a dense grid of thumbnails where you long-press one to peek the full post
// without leaving the grid, then tap the peek to open it.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { posts, type Item } from '../../data/examples'
import { PostPreview } from '../../components/PostPreview'
import { colors, spacing } from '../../theme'

const { width } = Dimensions.get('window')
const GAP = 2
const TILE = (width - GAP * 2) / 3

export default function Feed() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>Feed</Text>
        <View style={styles.hintPill}>
          <Ionicons name="finger-print-outline" size={13} color={colors.accent} />
          <Text style={styles.hintPillText}>Long-press a photo to peek</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {posts.map((post) => (
            <QuickPreviewPressable
              key={post.id}
              onPress={() => router.push({ pathname: '/detail', params: { id: post.id } })}
              renderPreview={() => <PeekWrapper id={post.id} item={post} />}
              previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${post.username}'s post` }}
              onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
              style={styles.tile}
              testID={`post-${post.id}`}
            >
              {!!post.image && <Image source={{ uri: post.image }} style={styles.tileImage} />}
            </QuickPreviewPressable>
          ))}
        </View>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

// The peek content: a gesture-handler Pressable so tapping the peek closes it
// and opens the full post.
function PeekWrapper({ id, item }: { id: string; item: Item }) {
  const router = useRouter()
  return (
    <Pressable
      style={{ alignSelf: 'stretch' }}
      onPress={() => {
        QuickPreview.close()
        router.push({ pathname: '/detail', params: { id } })
      }}
    >
      <PostPreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  brand: { fontSize: 24, fontWeight: '800', color: colors.text },
  hintPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.panel,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  hintPillText: { fontSize: 12, fontWeight: '600', color: colors.accent },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  tile: { width: TILE, height: TILE },
  tileImage: { width: '100%', height: '100%', backgroundColor: colors.tileBg },
})
