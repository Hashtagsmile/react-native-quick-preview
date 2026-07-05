// Shop — an e-commerce store grid. Long-press a product for a bottom-sheet
// quick-view (price, rating, CTA), then tap through to the full product page.
// Same library, a different variant (sheet) and a different real-world context.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { products, type Item } from '../../data/examples'
import { ProductPreview } from '../../components/ProductPreview'
import { colors, radius, spacing } from '../../theme'

const { width } = Dimensions.get('window')
const COL_GAP = spacing.md
const CARD_W = (width - spacing.lg * 2 - COL_GAP) / 2

const money = (p?: number | string) =>
  p === undefined ? '' : typeof p === 'number' ? `$${p.toFixed(0)}` : p

export default function Shop() {
  const router = useRouter()
  const goDetail = (id: string) => router.push({ pathname: '/detail', params: { id } })

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>Shop</Text>
        <View style={styles.hintPill}>
          <Ionicons name="finger-print-outline" size={13} color={colors.accent} />
          <Text style={styles.hintPillText}>Long-press to quick view</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {products.map((product) => (
            <QuickPreviewPressable
              key={product.id}
              onPress={() => goDetail(product.id)}
              renderPreview={() => <PeekWrapper id={product.id} item={product} />}
              previewOptions={{ variant: 'sheet', accessibilityLabel: `Quick view ${product.title}` }}
              onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
              style={styles.card}
              testID={`product-${product.id}`}
            >
              {!!product.image && <Image source={{ uri: product.image }} style={styles.cardImage} />}
              <View style={styles.cardBody}>
                <Text style={styles.name} numberOfLines={1}>
                  {product.title}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{money(product.price)}</Text>
                  {product.rating !== undefined && (
                    <View style={styles.rating}>
                      <Ionicons name="star" size={12} color="#f5a623" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                  )}
                </View>
              </View>
            </QuickPreviewPressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function PeekWrapper({ id, item }: { id: string; item: Item }) {
  const router = useRouter()
  return (
    <Pressable
      style={{ alignSelf: 'stretch' }}
      onPress={() => {
        QuickPreview.close()
        router.push({ pathname: '/detail', params: { id } })
      }}
    >
      <ProductPreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  brand: { fontSize: 24, fontWeight: '800', color: colors.text },
  hintPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.panel,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  hintPillText: { fontSize: 12, fontWeight: '600', color: colors.accent },

  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: COL_GAP },
  card: {
    width: CARD_W,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: COL_GAP,
  },
  cardImage: { width: '100%', aspectRatio: 1, backgroundColor: colors.tileBg },
  cardBody: { padding: spacing.md, gap: 4 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '800', color: colors.text },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
})
