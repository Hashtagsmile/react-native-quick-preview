// Social feed — an Instagram-style Explore grid. Long-press a thumbnail to peek
// the full post, tap the peek to open it. The grid is where the peek earns its
// keep: a thumbnail tells you little, the peek gives you the whole post. The
// peek grows out of the tapped tile and carries a context menu — on iOS and
// Android alike.
import React from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, Share } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import * as Clipboard from 'expo-clipboard'
import { QuickPreviewPressable } from 'react-native-quick-preview'
import { posts } from '../../data/examples'
import { PostPreview } from '../../components/PostPreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, spacing } from '../../theme'

const { width } = Dimensions.get('window')
const GAP = 2
// Floor: three exact thirds can sum past the row width after layout rounding,
// which wraps the third tile onto the next line.
const TILE = Math.floor((width - GAP * 2) / 3)

export default function Feed() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Feed" hint="Long-press a photo" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {posts.map((post) => {
            const open = () => router.push({ pathname: '/detail', params: { id: post.id } })
            return (
              <QuickPreviewPressable
                key={post.id}
                onPress={open}
                renderPreview={() => <PostPreview item={post} />}
                onPreviewPress={open}
                previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${post.username}'s post` }}
                actions={[
                  { title: 'Open post', onPress: open },
                  { title: 'Share', onPress: () => Share.share({ message: `Check out ${post.username}'s post` }) },
                  { title: 'Copy link', onPress: () => Clipboard.setStringAsync(`https://example.com/p/${post.id}`) },
                  { title: 'Report', destructive: true, onPress: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning) },
                ]}
                onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                style={styles.tile}
                testID={`post-${post.id}`}
              >
                {!!post.image && <Image source={{ uri: post.image }} style={styles.tileImage} />}
              </QuickPreviewPressable>
            )
          })}
        </View>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  tile: { width: TILE, height: TILE },
  tileImage: { width: '100%', height: '100%', backgroundColor: colors.tileBg },
})
