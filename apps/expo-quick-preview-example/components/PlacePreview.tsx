import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, radius, spacing } from '../theme'

// Maps-style place peek: photo, name, rating, price, Directions / Save.
export function PlacePreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.photo} />}
      <View style={styles.body}>
        <Text style={styles.name}>{item.title}</Text>
        {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

        <View style={styles.row}>
          {item.rating !== undefined && (
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#f5a623" />
              <Text style={styles.ratingText}>
                {item.rating}
                {item.reviews ? ` (${item.reviews.toLocaleString()})` : ''}
              </Text>
            </View>
          )}
          {!!item.price && <Text style={styles.price}>{item.price}</Text>}
        </View>

        <View style={styles.actions}>
          <View style={styles.directions}>
            <Ionicons name="navigate" size={15} color={colors.codeText} />
            <Text style={styles.directionsText}>Directions</Text>
          </View>
          <View style={styles.save}>
            <Ionicons name="bookmark-outline" size={18} color={colors.text} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  photo: { width: '100%', aspectRatio: 16 / 10, backgroundColor: colors.tileBg },
  body: { padding: spacing.lg, gap: 4 },
  name: { fontSize: 18, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: 2 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  price: { fontSize: 13, fontWeight: '700', color: colors.text },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  directions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  directionsText: { color: colors.codeText, fontWeight: '700', fontSize: 15 },
  save: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
