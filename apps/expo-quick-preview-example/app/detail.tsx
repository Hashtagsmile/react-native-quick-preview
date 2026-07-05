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

const money = (p?: number | string) =>
  p === undefined ? undefined : typeof p === 'number' ? `$${p.toFixed(2)}` : p

function Stars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons
          key={n}
          name={n <= Math.round(rating) ? 'star' : 'star-outline'}
          size={15}
          color="#f5a623"
        />
      ))}
    </View>
  )
}

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
  const isProduct = item.kind === 'product'
  const isPost = item.kind === 'post'
  const price = money(item.price)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
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

        {isPost && (
          <View style={styles.postAuthor}>
            {!!item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
            <View>
              <Text style={styles.username}>{item.username}</Text>
              {!!item.subtitle && <Text style={styles.place}>{item.subtitle}</Text>}
            </View>
          </View>
        )}

        {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}

        <View style={styles.content}>
          {isPost ? (
            <>
              <View style={styles.likeRow}>
                <Ionicons name="heart" size={22} color={colors.danger} />
                <Text style={styles.likes}>{(item.likes ?? 0).toLocaleString()} likes</Text>
              </View>
              {!!item.description && (
                <Text style={styles.caption}>
                  <Text style={styles.captionUser}>{item.username} </Text>
                  {item.description}
                </Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.title}>{item.title}</Text>
              {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}

              {item.rating !== undefined && (
                <View style={styles.ratingRow}>
                  <Stars rating={item.rating} />
                  <Text style={styles.ratingText}>
                    {item.rating.toFixed(1)}
                    {item.reviews ? ` · ${item.reviews.toLocaleString()} reviews` : ''}
                  </Text>
                </View>
              )}

              {!!price && <Text style={styles.price}>{price}</Text>}

              {!!item.description && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{isProduct ? 'About this item' : 'Description'}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              )}
            </>
          )}

          {!!item.tags?.length && (
            <View style={styles.tags}>
              {item.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {isProduct && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="cart-outline" size={20} color={colors.accent} />
              <Text style={styles.secondaryButtonText}>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Buy now</Text>
            </TouchableOpacity>
          </View>
        )}
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

  postAuthor: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.tileBg },
  username: { fontSize: 15, fontWeight: '700', color: colors.text },
  place: { fontSize: 13, color: colors.textMuted },

  image: { width: screenWidth, height: screenWidth * 0.85, backgroundColor: colors.tileBg },

  content: { padding: spacing.xl, gap: spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, lineHeight: 30 },
  subtitle: { fontSize: 15, color: colors.textMuted },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  ratingText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },

  price: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: spacing.xs },

  section: { marginTop: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
  description: { fontSize: 15, color: colors.text, lineHeight: 23 },

  likeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  likes: { fontSize: 15, fontWeight: '700', color: colors.text },
  caption: { fontSize: 15, color: colors.text, lineHeight: 22, marginTop: spacing.sm },
  captionUser: { fontWeight: '700' },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  tag: { backgroundColor: colors.panel, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16 },
  tagText: { fontSize: 13, color: colors.text, fontWeight: '500' },

  actions: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.xl },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  secondaryButtonText: { fontSize: 15, fontWeight: '700', color: colors.accent },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
  },
  primaryButtonText: { fontSize: 15, fontWeight: '700', color: colors.codeText },
})
