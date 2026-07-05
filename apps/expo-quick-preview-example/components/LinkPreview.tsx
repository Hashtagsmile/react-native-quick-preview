import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, spacing } from '../theme'

// Chat link peek: the destination of a shared link. This is exactly what
// Expo Router's Link.Preview does — but iOS-only. Here it's cross-platform.
const domainFor = (item: Item) =>
  item.kind === 'product'
    ? 'shop.example.com'
    : item.kind === 'destination'
      ? 'maps.example.com'
      : 'blog.example.com'

export function LinkPreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.body}>
        <View style={styles.domainRow}>
          <Ionicons name="globe-outline" size={13} color={colors.textMuted} />
          <Text style={styles.domain}>{domainFor(item)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {!!item.description && (
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.cta}>
          <Ionicons name="open-outline" size={14} color={colors.accent} />
          <Text style={styles.ctaText}>Open link</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  image: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.tileBg },
  body: { padding: spacing.lg, gap: 5 },
  domainRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  domain: { fontSize: 12, color: colors.textMuted, textTransform: 'lowercase' },
  title: { fontSize: 17, fontWeight: '800', color: colors.text },
  desc: { fontSize: 14, color: colors.textMuted, lineHeight: 19 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  ctaText: { fontSize: 13, fontWeight: '600', color: colors.accent },
})
