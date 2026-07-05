import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, spacing } from '../theme'

// Instagram-style peek: header, image, likes, caption, and a "tap to open" hint.
export function PostPreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {!!item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
        <Text style={styles.username}>{item.username}</Text>
        {!!item.subtitle && (
          <>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.place}>{item.subtitle}</Text>
          </>
        )}
      </View>

      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}

      <View style={styles.body}>
        <View style={styles.stats}>
          <Ionicons name="heart" size={18} color={colors.danger} />
          <Text style={styles.likes}>{(item.likes ?? 0).toLocaleString()} likes</Text>
        </View>
        {!!item.description && (
          <Text style={styles.caption} numberOfLines={2}>
            <Text style={styles.captionUser}>{item.username} </Text>
            {item.description}
          </Text>
        )}
        <View style={styles.cta}>
          <Ionicons name="open-outline" size={14} color={colors.accent} />
          <Text style={styles.ctaText}>Tap to open post</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.tileBg },
  username: { fontSize: 14, fontWeight: '700', color: colors.text },
  dot: { color: colors.textMuted },
  place: { fontSize: 13, color: colors.textMuted },
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.tileBg },
  body: { padding: spacing.md, gap: 6 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  likes: { fontSize: 13, fontWeight: '700', color: colors.text },
  caption: { fontSize: 14, color: colors.text, lineHeight: 19 },
  captionUser: { fontWeight: '700' },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  ctaText: { fontSize: 13, fontWeight: '600', color: colors.accent },
})
