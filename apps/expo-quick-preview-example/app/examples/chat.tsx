// Chat — a messages thread with shared links. Long-press a shared link to peek
// its destination, tap to open it. This is exactly what Expo Router's
// Link.Preview does — but that's iOS-only; here it works on both platforms and
// isn't tied to the router.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { products, destinations, articles, type Item } from '../../data/examples'
import { LinkPreview } from '../../components/LinkPreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, radius, spacing } from '../../theme'

type Msg = { from: 'me' | 'them'; text?: string; share?: Item }

const thread: Msg[] = [
  { from: 'them', text: 'These are the headphones I was telling you about' },
  { from: 'them', share: products[0] },
  { from: 'me', text: 'Oh those look great 🔥' },
  { from: 'me', text: 'Also — trip idea for the spring:' },
  { from: 'me', share: destinations[0] },
  { from: 'them', text: 'Santorini?? yes please' },
  { from: 'them', text: 'Read this before we book anything' },
  { from: 'them', share: articles[0] },
]

const domainFor = (item: Item) =>
  item.kind === 'product' ? 'shop.example.com' : item.kind === 'destination' ? 'maps.example.com' : 'blog.example.com'

export default function Chat() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Messages" hint="Long-press a link" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {thread.map((msg, i) => {
          const mine = msg.from === 'me'
          if (msg.text) {
            return (
              <View key={i} style={[styles.bubbleRow, mine ? styles.right : styles.left]}>
                <View style={[styles.textBubble, mine ? styles.mine : styles.theirs]}>
                  <Text style={[styles.text, mine && styles.textMine]}>{msg.text}</Text>
                </View>
              </View>
            )
          }
          const item = msg.share!
          return (
            <View key={i} style={[styles.bubbleRow, mine ? styles.right : styles.left]}>
              <QuickPreviewPressable
                onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
                renderPreview={() => <PeekWrapper id={item.id} item={item} />}
                previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${item.title}` }}
                onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                style={styles.linkCard}
                testID={`share-${item.id}`}
              >
                {!!item.image && <Image source={{ uri: item.image }} style={styles.linkThumb} />}
                <View style={styles.linkInfo}>
                  <Text style={styles.linkDomain}>{domainFor(item)}</Text>
                  <Text style={styles.linkTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </QuickPreviewPressable>
            </View>
          )
        })}
      </ScrollView>

      <View style={styles.inputBar}>
        <View style={styles.input}>
          <Text style={styles.inputPlaceholder}>Message…</Text>
        </View>
        <Ionicons name="arrow-up-circle" size={32} color={colors.accent} />
      </View>
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
      <LinkPreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },

  bubbleRow: { flexDirection: 'row' },
  left: { justifyContent: 'flex-start' },
  right: { justifyContent: 'flex-end' },

  textBubble: { maxWidth: '78%', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 18 },
  theirs: { backgroundColor: colors.panel, borderBottomLeftRadius: 4 },
  mine: { backgroundColor: colors.accent, borderBottomRightRadius: 4 },
  text: { fontSize: 15, color: colors.text, lineHeight: 20 },
  textMine: { color: colors.codeText },

  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '82%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  linkThumb: { width: 64, height: 64, backgroundColor: colors.tileBg },
  linkInfo: { flex: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 2 },
  linkDomain: { fontSize: 11, color: colors.textMuted },
  linkTitle: { fontSize: 14, fontWeight: '700', color: colors.text },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputPlaceholder: { fontSize: 15, color: colors.textMuted },
})
