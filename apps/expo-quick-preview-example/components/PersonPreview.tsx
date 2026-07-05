import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, radius, spacing } from '../theme'

// Directory peek: avatar, name, role, bio, and Message / Call quick actions —
// the "actions inside a peek" pattern.
export function PersonPreview({ item }: { item: Item }) {
  return (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.avatar} />}
      <Text style={styles.name}>{item.title}</Text>
      {!!item.subtitle && <Text style={styles.role}>{item.subtitle}</Text>}
      {!!item.description && (
        <Text style={styles.bio} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.actions}>
        <View style={styles.primary}>
          <Ionicons name="chatbubble" size={16} color={colors.codeText} />
          <Text style={styles.primaryText}>Message</Text>
        </View>
        <View style={styles.secondary}>
          <Ionicons name="call" size={16} color={colors.accent} />
          <Text style={styles.secondaryText}>Call</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface, alignItems: 'center', padding: spacing.xl },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.tileBg },
  name: { fontSize: 19, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  role: { fontSize: 14, color: colors.accent, fontWeight: '600', marginTop: 2 },
  bio: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20, marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, alignSelf: 'stretch' },
  primary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  primaryText: { color: colors.codeText, fontWeight: '700', fontSize: 15 },
  secondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingVertical: spacing.md,
  },
  secondaryText: { color: colors.accent, fontWeight: '700', fontSize: 15 },
})
