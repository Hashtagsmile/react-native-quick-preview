// Feed — an Instagram-style social feed. Long-press a photo to peek the post,
// tap the peek (or the photo) to open the full post. This is the "why you'd
// want this" screen: a real feed where quick preview feels native.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { posts, type Item } from '../../data/examples'
import { PostPreview } from '../../components/PostPreview'
import { colors, spacing, type as t } from '../../theme'

export default function Feed() {
  const router = useRouter()
  const goDetail = (id: string) => router.push({ pathname: '/detail', params: { id } })

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
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.header}>
              {!!post.avatar && <Image source={{ uri: post.avatar }} style={styles.avatar} />}
              <View>
                <Text style={styles.username}>{post.username}</Text>
                {!!post.subtitle && <Text style={styles.place}>{post.subtitle}</Text>}
              </View>
            </View>

            <QuickPreviewPressable
              onPress={() => goDetail(post.id)}
              renderPreview={() => <PeekWrapper id={post.id} item={post} />}
              previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${post.username}'s post` }}
              onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
              testID={`post-${post.id}`}
            >
              {!!post.image && <Image source={{ uri: post.image }} style={styles.photo} />}
            </QuickPreviewPressable>

            <View style={styles.actions}>
              <Ionicons name="heart-outline" size={26} color={colors.text} />
              <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
              <Ionicons name="paper-plane-outline" size={24} color={colors.text} />
            </View>

            <View style={styles.meta}>
              <Text style={styles.likes}>{(post.likes ?? 0).toLocaleString()} likes</Text>
              {!!post.description && (
                <Text style={styles.caption} numberOfLines={2}>
                  <Text style={styles.captionUser}>{post.username} </Text>
                  {post.description}
                </Text>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

// The peek content: a Pressable (gesture-handler) so a tap inside the preview
// closes it and opens the full post.
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
    paddingBottom: spacing.sm,
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

  post: { marginBottom: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.tileBg },
  username: { fontSize: 14, fontWeight: '700', color: colors.text },
  place: { fontSize: 12, color: colors.textMuted },

  photo: { width: '100%', aspectRatio: 1, backgroundColor: colors.tileBg },

  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  meta: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: 3 },
  likes: { fontSize: 14, fontWeight: '700', color: colors.text },
  caption: { fontSize: 14, color: colors.text, lineHeight: 19 },
  captionUser: { fontWeight: '700' },
})
