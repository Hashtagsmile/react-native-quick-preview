import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getItemById, type Item, type ItemKind } from '../data/examples'
import { colors, radius, spacing } from '../theme'

const { width: screenWidth } = Dimensions.get('window')

const KIND: Record<ItemKind, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  post: { icon: 'image-outline', label: 'Post' },
  product: { icon: 'bag-outline', label: 'Product' },
  article: { icon: 'newspaper-outline', label: 'Article' },
  destination: { icon: 'airplane-outline', label: 'Destination' },
  track: { icon: 'musical-notes-outline', label: 'Track' },
  profile: { icon: 'person-outline', label: 'Profile' },
}

const formatPrice = (price?: number | string) =>
  price === undefined ? undefined : typeof price === 'number' ? `$${price.toFixed(2)}` : price

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const item: Item | null = id ? getItemById(id) : null

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={colors.danger} />
          <Text style={styles.errorTitle}>Item not found</Text>
          <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
            <Text style={styles.backLinkText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const kind = KIND[item.kind]
  const price = formatPrice(item.price)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.kindChip}>
            <Ionicons name={kind.icon} size={18} color={colors.accent} />
            <Text style={styles.kindText}>{kind.label}</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

          {!!price && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceText}>{price}</Text>
            </View>
          )}

          {!!item.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}

          {!!item.tags?.length && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tags}>
                {item.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="heart-outline" size={20} color={colors.codeText} />
            <Text style={styles.primaryButtonText}>Add to favorites</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl, gap: spacing.md },
  errorTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  backLink: { marginTop: spacing.sm },
  backLinkText: { fontSize: 16, fontWeight: '600', color: colors.accent },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconButton: { padding: spacing.sm },
  kindChip: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  kindText: { fontSize: 14, fontWeight: '600', color: colors.accent },

  image: { width: screenWidth, height: screenWidth * 0.7, backgroundColor: colors.tileBg },

  content: { padding: spacing.xl },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, lineHeight: 32 },
  subtitle: { fontSize: 17, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 24 },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  priceLabel: { fontSize: 14, color: colors.textMuted },
  priceText: { fontSize: 18, fontWeight: '800', color: colors.accent },

  section: { marginTop: spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  description: { fontSize: 16, color: colors.text, lineHeight: 24 },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: { backgroundColor: colors.panel, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16 },
  tagText: { fontSize: 14, color: colors.text, fontWeight: '500' },

  actions: { padding: spacing.xl, paddingTop: 0 },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
  },
  primaryButtonText: { fontSize: 16, fontWeight: '700', color: colors.codeText },
})
