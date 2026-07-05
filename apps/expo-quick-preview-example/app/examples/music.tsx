// Music — a Spotify/Apple-Music-style track list. Long-press a row to peek the
// track (artwork, artist, Play), tap to open it. A list, not a grid — the peek
// works the same on any layout.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { tracks, type Item } from '../../data/examples'
import { TrackPreview } from '../../components/TrackPreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, radius, spacing } from '../../theme'

export default function Music() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Music" hint="Long-press a track" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {tracks.map((track) => (
          <QuickPreviewPressable
            key={track.id}
            onPress={() => router.push({ pathname: '/detail', params: { id: track.id } })}
            renderPreview={() => <PeekWrapper id={track.id} item={track} />}
            previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${track.title}` }}
            onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            style={styles.row}
            testID={`track-${track.id}`}
          >
            {!!track.image && <Image source={{ uri: track.image }} style={styles.art} />}
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {track.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {track.artist}
              </Text>
            </View>
            <Text style={styles.duration}>{track.duration}</Text>
            <Ionicons name="play-circle" size={30} color={colors.accent} />
          </QuickPreviewPressable>
        ))}
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
      <TrackPreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  art: { width: 52, height: 52, borderRadius: radius.sm, backgroundColor: colors.tileBg },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: colors.text },
  artist: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  duration: { fontSize: 13, color: colors.textMuted },
})
