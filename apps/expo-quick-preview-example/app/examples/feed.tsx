// Social feed — an Instagram-style Explore grid. Long-press a thumbnail to peek
// the full post, tap the peek to open it. The grid is where the peek earns its
// keep: a thumbnail tells you little, the peek gives you the whole post.
import React from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { posts, type Item } from '../../data/examples'
import { PostPreview } from '../../components/PostPreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, spacing } from '../../theme'

const { width } = Dimensions.get('window')
const GAP = 2
const TILE = (width - GAP * 2) / 3

export default function Feed() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Feed" hint="Long-press a photo" />
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  tile: { width: TILE, height: TILE },
  tileImage: { width: '100%', height: '100%', backgroundColor: colors.tileBg },
})
