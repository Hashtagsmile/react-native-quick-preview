// Places — a Maps-style list of destinations. Long-press a card for a bottom-sheet
// place peek (rating, price, Directions), tap to open the full place.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { destinations, type Item } from '../../data/examples'
import { PlacePreview } from '../../components/PlacePreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, radius, spacing } from '../../theme'

export default function Places() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Places" hint="Long-press a place" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {destinations.map((place) => (
          <QuickPreviewPressable
            key={place.id}
            onPress={() => router.push({ pathname: '/detail', params: { id: place.id } })}
            renderPreview={() => <PeekWrapper id={place.id} item={place} />}
            previewOptions={{ variant: 'sheet', accessibilityLabel: `Quick view ${place.title}` }}
            onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            style={styles.card}
            testID={`place-${place.id}`}
          >
            {!!place.image && <Image source={{ uri: place.image }} style={styles.image} />}
            <View style={styles.body}>
              <Text style={styles.name}>{place.title}</Text>
              <View style={styles.metaRow}>
                {place.rating !== undefined && (
                  <View style={styles.rating}>
                    <Ionicons name="star" size={13} color="#f5a623" />
                    <Text style={styles.metaText}>{place.rating}</Text>
                  </View>
                )}
                {!!place.subtitle && <Text style={styles.metaText}>· {place.subtitle}</Text>}
                {!!place.price && <Text style={styles.price}>{place.price}</Text>}
              </View>
            </View>
          </QuickPreviewPressable>
        ))}
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
      <PlacePreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 140, backgroundColor: colors.tileBg },
  body: { padding: spacing.md, gap: 4 },
  name: { fontSize: 16, fontWeight: '800', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  price: { fontSize: 13, color: colors.text, fontWeight: '700', marginLeft: 'auto' },
})
