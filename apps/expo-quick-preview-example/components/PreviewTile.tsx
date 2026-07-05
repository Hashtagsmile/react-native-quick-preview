import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { Item } from '../data/examples'
import { colors, radius } from '../theme'

// The square image tile used inside QuickPreviewPressable grids
// (Start gallery + Components grid share this exact tile).
export function PreviewTile({ item, size = 108 }: { item: Item; size?: number }) {
  const box = { width: size, height: size }
  return item.image ? (
    <Image source={{ uri: item.image }} style={[styles.img, box]} />
  ) : (
    <View style={[styles.img, styles.fallback, box]}>
      <Ionicons name="image-outline" size={22} color={colors.textMuted} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: { borderRadius: radius.md, backgroundColor: colors.tileBg },
  fallback: { alignItems: 'center', justifyContent: 'center' },
})
