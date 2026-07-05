import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import type { Item } from '../data/examples'
import { colors, spacing } from '../theme'

// The one preview-content card used everywhere a preview is presented
// (Start hero + gallery, Components grid + playground, API sample).
// Self-sizing: no flex:1, no tall minHeight — the preview container sizes to it.
export function PreviewCard({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        {!!item.description && (
          <Text style={styles.desc} numberOfLines={3}>
            {item.description}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Fill the preview container (popover ~92% width / full-width sheet) so the
  // image spans the whole card instead of leaving a gap on the right.
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  image: { width: '100%', aspectRatio: 16 / 10, backgroundColor: colors.tileBg },
  body: { padding: spacing.lg },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  desc: { fontSize: 14, color: colors.text, marginTop: spacing.sm, lineHeight: 20 },
})
