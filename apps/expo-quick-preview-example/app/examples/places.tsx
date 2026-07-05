// Places — a map with pins. Long-press a pin to peek the place (rating, price,
// Directions), tap to open it. Airbnb / Google-Maps style.
//
// This is a styled map canvas with custom pins — deliberately NOT react-native-maps:
// a native map needs an Android API key (breaks the "no native build" story) and
// would fight gesture-handler for the long-press. Custom pins keep it cross-platform.
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
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

// Hand-placed pin positions (percent of the map canvas).
const POSITIONS = [
  { left: '16%', top: '24%' },
  { left: '64%', top: '18%' },
  { left: '32%', top: '56%' },
  { left: '72%', top: '62%' },
] as const

const shortPrice = (p?: number | string) =>
  p === undefined ? '' : typeof p === 'string' ? p.replace(/^from\s+/i, '') : `$${p}`

export default function Places() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Places" hint="Long-press a pin" />

      <View style={styles.map}>
        {/* Faux map scenery */}
        <View style={styles.water} />
        <View style={styles.park} />
        <View style={[styles.road, { top: '34%', transform: [{ rotate: '7deg' }] }]} />
        <View style={[styles.road, { top: '68%', transform: [{ rotate: '-5deg' }] }]} />
        <View style={[styles.roadV, { left: '46%' }]} />

        {/* Current location */}
        <View style={[styles.me, { left: '48%', top: '80%' }]}>
          <View style={styles.meDot} />
        </View>

        {/* Pins */}
        {destinations.slice(0, POSITIONS.length).map((place, i) => (
          <QuickPreviewPressable
            key={place.id}
            onPress={() => router.push({ pathname: '/detail', params: { id: place.id } })}
            renderPreview={() => <PeekWrapper id={place.id} item={place} />}
            previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${place.title}` }}
            onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            style={[styles.pin, POSITIONS[i]]}
            testID={`pin-${place.id}`}
          >
            <View style={styles.pinPill}>
              <Ionicons name="star" size={11} color="#f5a623" />
              <Text style={styles.pinText}>{shortPrice(place.price)}</Text>
            </View>
            <View style={styles.pinPointer} />
          </QuickPreviewPressable>
        ))}
      </View>
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
  map: { flex: 1, backgroundColor: '#e7ece3', overflow: 'hidden' },

  water: {
    position: 'absolute',
    right: -60,
    top: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#cfe3ef',
  },
  park: {
    position: 'absolute',
    left: -30,
    bottom: 40,
    width: 200,
    height: 160,
    borderRadius: 90,
    backgroundColor: '#d3e6c6',
  },
  road: { position: 'absolute', left: '-10%', width: '120%', height: 10, backgroundColor: '#fbfbfb' },
  roadV: { position: 'absolute', top: '-10%', height: '120%', width: 10, backgroundColor: '#fbfbfb' },

  me: { position: 'absolute', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 },
  meDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.accent, borderWidth: 3, borderColor: '#fff' },

  pin: { position: 'absolute', alignItems: 'center' },
  pinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  pinText: { fontSize: 13, fontWeight: '800', color: colors.text },
  pinPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.surface,
    marginTop: -1,
  },
})
