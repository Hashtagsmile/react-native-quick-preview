import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, radius, spacing } from '../theme'

// Music peek: large artwork, title, artist, and a Play / Add control row.
// (Display-only — tapping the peek opens the track; the CTAs signal the action.)
export function TrackPreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.art} />}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.artist}
          {item.duration ? ` · ${item.duration}` : ''}
        </Text>

        <View style={styles.controls}>
          <View style={styles.play}>
            <Ionicons name="play" size={18} color={colors.codeText} />
            <Text style={styles.playText}>Play</Text>
          </View>
          <View style={styles.add}>
            <Ionicons name="add" size={20} color={colors.text} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  art: { width: '100%', aspectRatio: 1, backgroundColor: colors.tileBg },
  body: { padding: spacing.lg, gap: 4 },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  meta: { fontSize: 14, color: colors.textMuted },
  controls: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  play: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  playText: { color: colors.codeText, fontWeight: '700', fontSize: 15 },
  add: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
