import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, radius, spacing } from '../theme'

const money = (p?: number | string) =>
  p === undefined ? '' : typeof p === 'number' ? `$${p.toFixed(0)}` : p

// E-commerce peek: image, name, price, rating, and a clear "view details" CTA.
export function ProductPreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {item.title}
        </Text>
        {!!item.subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        )}

        <View style={styles.row}>
          <Text style={styles.price}>{money(item.price)}</Text>
          {item.rating !== undefined && (
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#f5a623" />
              <Text style={styles.ratingText}>
                {item.rating}
                {item.reviews ? ` (${item.reviews.toLocaleString()})` : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaText}>View details</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.codeText} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  image: { width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.tileBg },
  body: { padding: spacing.lg, gap: 6 },
  name: { fontSize: 17, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  price: { fontSize: 20, fontWeight: '800', color: colors.text },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  ctaText: { fontSize: 15, fontWeight: '700', color: colors.codeText },
})
