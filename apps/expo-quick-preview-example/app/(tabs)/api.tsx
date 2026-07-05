import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
// gesture-handler Pressable so buttons inside the preview overlay receive taps.
import { Pressable } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import {
  useQuickPreview,
  QuickPreviewComponent,
  QuickPreview,
  QuickPreviewScrollView,
} from 'react-native-quick-preview'
import { colors } from '../../theme'

function SampleCard({ onGo, onClose, onToggleVariant }: {
  onGo?: () => void
  onClose?: () => void
  onToggleVariant?: () => void
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: 'https://picsum.photos/600/400' }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Sample Card</Text>
        <Text style={styles.cardDescription}>
          This card is rendered inside QuickPreview. Try toggling variant or closing.
        </Text>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="heart" size={16} color="#ff6b6b" />
            <Text style={styles.cardMetaText}>1.2K likes</Text>
          </View>
          <View style={styles.rowRight}>
            {onToggleVariant ? (
              <Pressable
                onPress={onToggleVariant}
                style={[styles.chip, { marginRight: 8 }]}
                accessibilityRole="button"
                accessibilityLabel="Toggle variant"
              >
                <Text style={styles.chipText}>Toggle variant</Text>
              </Pressable>
            ) : null}
            {onGo ? (
              <Pressable
                onPress={onGo}
                style={styles.primary}
                accessibilityRole="button"
                accessibilityLabel="Go"
              >
                <Text style={styles.primaryText}>Go</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
        {onClose ? (
          <Pressable
            onPress={onClose}
            style={[styles.secondary, { marginTop: 10 }]}
            accessibilityRole="button"
            accessibilityLabel="Close preview"
          >
            <Text style={styles.secondaryText}>Close</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

export default function API() {
  const qp = useQuickPreview()
  const [headlessVisible, setHeadlessVisible] = useState(false)

  // Hook demo
  const openHookPreview = useCallback(() => {
    qp.present(
      <SampleCard
        onClose={qp.close}
        onToggleVariant={() => qp.update({ variant: 'sheet' })}
      />,
      { variant: 'sheet', dismissOnBackdropPress: true, dismissOnPanDown: true, accessibilityLabel: 'Quick preview' }
    )
  }, [qp])

  // Static demo
  const openStaticPreview = useCallback(() => {
    QuickPreview.present(
      <SampleCard
        onClose={QuickPreview.close}
        onToggleVariant={() => QuickPreview.update({ variant: 'sheet' })}
      />,
      { variant: 'popover', accessibilityLabel: 'Quick preview' }
    )
  }, [])

  // Scrollable content demo
  const openScrollable = useCallback(() => {
    qp.present(
      <QuickPreviewScrollView style={{ maxHeight: 460 }}>
        <Image source={{ uri: 'https://picsum.photos/600/400' }} style={styles.cardImage} />
        <View style={{ padding: 16 }}>
          <Text style={styles.cardTitle}>Scrollable preview</Text>
          {Array.from({ length: 8 }).map((_, i) => (
            <Text key={i} style={[styles.cardDescription, { marginTop: 10 }]}>
              Long content scrolls inside the preview; drag from the top to dismiss.
            </Text>
          ))}
        </View>
      </QuickPreviewScrollView>,
      { variant: 'sheet', size: { maxHeight: 520 }, accessibilityLabel: 'Scrollable preview' }
    )
  }, [qp])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>API</Text>

      {/* Imperative API (Hook) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Imperative API (Hook)</Text>
        <Text style={styles.sectionDescription}>
          Use the hook inside React components. Great when you're already in React context.
        </Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
{`import { useQuickPreview } from 'react-native-quick-preview'
const qp = useQuickPreview()
qp.present(<Card />, { variant: 'sheet', dismissOnBackdropPress: true })`}
          </Text>
        </View>

        <Pressable style={styles.demoButton} onPress={openHookPreview}>
          <Text style={styles.demoButtonText}>Run this example</Text>
        </Pressable>
      </View>

      {/* Static API */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Static API (Gorhom-style)</Text>
        <Text style={styles.sectionDescription}>
          Call from anywhere (event handlers, utilities, outside React). The Provider registers a global controller.
        </Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
{`import { QuickPreview } from 'react-native-quick-preview'
QuickPreview.present(<Card />, { variant: 'popover' })
// Later:
QuickPreview.update({ variant: 'sheet' })
QuickPreview.close()`}
          </Text>
        </View>

        <Pressable style={styles.demoButton} onPress={openStaticPreview}>
          <Text style={styles.demoButtonText}>Run this example</Text>
        </Pressable>
      </View>

      {/* Headless Component */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Headless Component</Text>
        <Text style={styles.sectionDescription}>
          Controlled component for simple cases or maximum control. You manage the state.
        </Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
{`import { QuickPreviewComponent } from 'react-native-quick-preview'
const [visible, setVisible] = useState(false)
<QuickPreviewComponent visible={visible} onClose={() => setVisible(false)} variant="sheet">
  <Card />
</QuickPreviewComponent>`}
          </Text>
        </View>

        <Pressable style={styles.demoButton} onPress={() => setHeadlessVisible(true)}>
          <Text style={styles.demoButtonText}>Run this example</Text>
        </Pressable>
      </View>

      {/* Scrollable content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Scrollable content</Text>
        <Text style={styles.sectionDescription}>
          Wrap long preview content in QuickPreviewScrollView so scrolling and swipe-to-dismiss
          don't fight each other.
        </Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
{`import { QuickPreviewScrollView } from 'react-native-quick-preview'
present(
  <QuickPreviewScrollView>{longContent}</QuickPreviewScrollView>,
  { variant: 'sheet', size: { maxHeight: 520 } }
)`}
          </Text>
        </View>

        <Pressable style={styles.demoButton} onPress={openScrollable}>
          <Text style={styles.demoButtonText}>Run this example</Text>
        </Pressable>
      </View>

      {/* Headless instance */}
      {headlessVisible && (
        <QuickPreviewComponent visible={headlessVisible} onClose={() => setHeadlessVisible(false)} variant="sheet">
          <SampleCard onClose={() => setHeadlessVisible(false)} />
        </QuickPreviewComponent>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 20 },
  section: {
    marginBottom: 20, backgroundColor: colors.panel, padding: 16, borderRadius: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  sectionDescription: { fontSize: 14, color: colors.textMuted, marginBottom: 14, lineHeight: 20 },
  codeBlock: { backgroundColor: colors.code, padding: 14, borderRadius: 8, marginBottom: 14 },
  codeText: { color: colors.codeText, fontSize: 12, fontFamily: 'monospace', lineHeight: 18 },
  demoButton: { backgroundColor: colors.accent, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  demoButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', maxWidth: 520, width: '92%' },
  cardImage: { width: '100%', height: 200, resizeMode: 'cover' },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  cardMetaText: { fontSize: 12, color: '#888', marginLeft: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  chip: { backgroundColor: '#eef2ff', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  chipText: { color: '#3730a3', fontWeight: '600' },
  primary: { backgroundColor: '#111827', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  primaryText: { color: 'white', fontWeight: '700' },
  secondary: { backgroundColor: '#e5e7eb', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  secondaryText: { color: '#111827', fontWeight: '700' },
})
