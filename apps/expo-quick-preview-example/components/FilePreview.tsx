import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item, FileType } from '../data/examples'
import { colors, radius, spacing } from '../theme'

export const FILE_ICON: Record<FileType, keyof typeof Ionicons.glyphMap> = {
  pdf: 'document-text',
  image: 'image',
  doc: 'document',
  sheet: 'grid',
}
export const FILE_TINT: Record<FileType, string> = {
  pdf: '#e5484d',
  image: '#30a46c',
  doc: '#3e63dd',
  sheet: '#2e7d32',
}

// Quick Look style file peek: an image for image files, a document page for docs.
export function FilePreview({ item }: { item: Item }) {
  if (item.fileType === 'image') {
    return (
      <View style={styles.card}>
        {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <View style={styles.imageFooter}>
          <Text style={styles.name} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.meta}>
            {item.fileSize} · {item.modified}
          </Text>
        </View>
      </View>
    )
  }

  const type = item.fileType ?? 'doc'
  const docTitle = item.title.replace(/\.[^.]+$/, '')
  return (
    <View style={styles.card}>
      <View style={styles.docHeader}>
        <View style={[styles.badge, { backgroundColor: FILE_TINT[type] }]}>
          <Ionicons name={FILE_ICON[type]} size={18} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.meta}>
            {(type === 'sheet' ? 'Spreadsheet' : type.toUpperCase())} · {item.fileSize} · {item.modified}
          </Text>
        </View>
      </View>

      <View style={styles.page}>
        <Text style={styles.docTitle}>{docTitle}</Text>
        {[item.description, item.description, item.description].filter(Boolean).map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { alignSelf: 'stretch', backgroundColor: colors.surface },

  image: { width: '100%', aspectRatio: 4 / 3, backgroundColor: colors.tileBg },
  imageFooter: { padding: spacing.md, gap: 2 },

  docHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  badge: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },

  page: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md },
  docTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  paragraph: { fontSize: 14, color: colors.text, lineHeight: 21 },
})
