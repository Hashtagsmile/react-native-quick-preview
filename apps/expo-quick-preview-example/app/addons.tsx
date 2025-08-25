import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import { useRouter } from 'expo-router'
import { QuickPreviewPressable } from 'react-native-quick-preview'  // ✅   

// Bring your demo data (adjust the path to your repo’s location)
import { posts, type Item } from '../data/examples'

const { width: screenW } = Dimensions.get('window')
const PAD = 16
const GAP = 6
const COLS = 3
const TILE = Math.floor((screenW - PAD * 2 - GAP * (COLS - 1)) / COLS)

export default function Addons() {
  const router = useRouter()

  const goToDetails = (id: string) => {
    // Use your real route; this is just a placeholder
    router.push({ pathname: '/detail', params: { id } })
  }

  // Keep preview content light: no flex:1/minHeight
  const renderPreview = (x: Item) => (
    <View style={{ backgroundColor: '#fff' }}>
      {!!x.image && (
        <Image source={{ uri: x.image }} style={{ width: '100%', aspectRatio: 1 }} />
      )}
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#111' }}>{x.title}</Text>
        {!!x.subtitle && (
          <Text style={{ marginTop: 4, color: '#6c757d' }}>{x.subtitle}</Text>
        )}
      </View>
    </View>
  )

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Addons</Text>
      <Text style={styles.subtitle}>
        Long-press any tile to open a QuickPreview with a subtle press-down animation and haptics.
        Tap to navigate as usual.
      </Text>

      <View style={styles.grid}>
        {posts.slice(0, 12).map((p) => (
          <QuickPreviewPressable
            key={p.id}
            onPress={() => goToDetails(p.id)}                     // tap → navigate
            renderPreview={() => renderPreview(p)}                // long-press → preview
            previewOptions={{ variant: 'popover', accessibilityLabel: 'Quick look preview' }}
            delay={350}
            scale={0.98}
            haptics="medium"                                      // uses expo-haptics if present
            style={{ borderRadius: 8, overflow: 'hidden' }}       // keeps rounded corners while scaling
            accessibilityLabel={`Preview ${p.title}`}
            accessible={true}
            testID={`preview-${p.id}`}
          >
            <View style={styles.tile}>
              {p.image ? (
                <Image source={{ uri: p.image }} style={styles.img} />
              ) : (
                <View style={[styles.img, styles.fallback]}>
                  <Text style={styles.fallbackText}>No image</Text>
                </View>
              )}
            </View>
          </QuickPreviewPressable>
        ))}
      </View>

      <View style={{ height: 28 }} />

      <Text style={styles.sectionTitle}>What this demonstrates</Text>
      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Press-down affordance on touch</Text>
        <Text style={styles.bullet}>• Haptics on long-press start (iOS/Android)</Text>
        <Text style={styles.bullet}>• Long-press → preview, tap → navigate</Text>
        <Text style={styles.bullet}>• Works with static API under the hood</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: PAD,
    paddingBottom: 48,
    backgroundColor: '#fff',
  },
  h1: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  subtitle: {
    marginTop: 6,
    color: '#6c757d',
  },
  grid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  tile: {
    width: TILE,
    height: TILE,
    backgroundColor: '#eee',
  },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
  fallbackText: { color: '#999', fontSize: 12 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  bullets: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
  },
  bullet: { color: '#333', marginBottom: 4 },
})
