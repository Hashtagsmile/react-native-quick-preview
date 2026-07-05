// Components — the declarative wrappers you drop into JSX, plus the option matrix.
// A: QuickPreviewPressable grid  ·  B: QuickPreviewScrollView  ·  C: options + lifecycle playground.
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import {
  useQuickPreview,
  QuickPreview,
  QuickPreviewPressable,
  QuickPreviewScrollView,
  type QuickPreviewVariant,
  type QuickPreviewSize,
} from 'react-native-quick-preview'
import { posts, gallery, allItems, type Item } from '../../data/examples'
import { PreviewCard } from '../../components/PreviewCard'
import { PreviewTile } from '../../components/PreviewTile'
import { colors, radius, spacing, type as t } from '../../theme'

const article = allItems.find((i) => i.kind === 'article') ?? gallery[0]

export default function Components() {
  const { present } = useQuickPreview()
  const router = useRouter()

  // ── Section A: QuickPreviewPressable grid ──────────────────────────────
  const gridItems = posts.slice(0, 6)

  // ── Section C: options playground state ────────────────────────────────
  const [variant, setVariant] = useState<QuickPreviewVariant>('popover')
  const [sizeMode, setSizeMode] = useState<'auto' | 'number' | 'maxWidth'>('auto')
  const [panDown, setPanDown] = useState(true)
  const [backdrop, setBackdrop] = useState(true)
  const [log, setLog] = useState<string[]>([])

  const size: QuickPreviewSize =
    sizeMode === 'number' ? 420 : sizeMode === 'maxWidth' ? { maxWidth: 260 } : 'auto'

  const presentPlayground = () => {
    setLog([])
    const stamp = (label: string) => setLog((l) => [...l, label])
    present(<PreviewCard item={gallery[1]} />, {
      variant,
      size,
      dismissOnBackdropPress: backdrop,
      // dismissOnPanDown only applies to the sheet variant.
      dismissOnPanDown: variant === 'sheet' ? panDown : undefined,
      onOpenStart: () => stamp('onOpenStart'),
      onOpenEnd: () => stamp('onOpenEnd'),
      onCloseStart: () => stamp('onCloseStart'),
      onCloseEnd: () => stamp('onCloseEnd'),
    })
  }

  // ── Section B: scrollable preview ──────────────────────────────────────
  const presentScrollable = () => {
    present(
      <QuickPreviewScrollView style={{ maxHeight: 460 }}>
        {!!article.image && <Image source={{ uri: article.image }} style={styles.longImage} />}
        <View style={{ padding: spacing.lg }}>
          <Text style={styles.longTitle}>{article.title}</Text>
          {Array.from({ length: 8 }).map((_, i) => (
            <Text key={i} style={styles.longParagraph}>
              {article.description ??
                'Scrollable preview content. Drag to scroll; drag from the top to dismiss.'}
            </Text>
          ))}
        </View>
      </QuickPreviewScrollView>,
      { variant: 'sheet', size: { maxHeight: 520 } }
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={t.h1}>Components</Text>
        <Text style={styles.subtitle}>Drop-in wrappers and the full option surface.</Text>

        {/* Section A */}
        <Text style={styles.sectionTitle}>QuickPreviewPressable</Text>
        <Text style={styles.sectionHint}>
          Long-press a tile to peek, tap the preview to open, or tap outside to dismiss. The last
          tile is <Text style={styles.mono}>disabled</Text>.
        </Text>
        <View style={styles.grid}>
          {gridItems.map((p, i) => {
            const disabled = i === gridItems.length - 1
            return (
              <QuickPreviewPressable
                key={p.id}
                disabled={disabled}
                onPress={() => router.push({ pathname: '/detail', params: { id: p.id } })}
                renderPreview={() => (
                  <Pressable
                    onPress={() => {
                      QuickPreview.close()
                      router.push({ pathname: '/detail', params: { id: p.id } })
                    }}
                  >
                    <PreviewCard item={p} />
                  </Pressable>
                )}
                previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${p.title}` }}
                onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                style={[styles.tile, disabled && styles.tileDisabled]}
                testID={`tile-${p.id}`}
              >
                <PreviewTile item={p} size={TILE} />
              </QuickPreviewPressable>
            )
          })}
        </View>

        {/* Section B */}
        <Text style={styles.sectionTitle}>QuickPreviewScrollView</Text>
        <Text style={styles.sectionHint}>
          Scrollable content inside a sheet — scrolling and swipe-to-dismiss don't fight.
        </Text>
        <Pressable style={styles.button} onPress={presentScrollable}>
          <Ionicons name="reader-outline" size={18} color={colors.codeText} />
          <Text style={styles.buttonText}>Present a scrollable sheet</Text>
        </Pressable>

        {/* Section C */}
        <Text style={styles.sectionTitle}>Options playground</Text>
        <Text style={styles.sectionHint}>Every option on `present`, live.</Text>

        <View style={styles.panel}>
          <Control label="variant">
            <Segmented
              options={['popover', 'sheet']}
              value={variant}
              onChange={(v) => setVariant(v as QuickPreviewVariant)}
            />
          </Control>
          <Control label="size">
            <Segmented
              options={['auto', 'number', 'maxWidth']}
              value={sizeMode}
              onChange={(v) => setSizeMode(v as typeof sizeMode)}
            />
          </Control>
          <Control label="dismissOnBackdropPress">
            <Switch value={backdrop} onValueChange={setBackdrop} />
          </Control>
          <Control label="dismissOnPanDown (sheet only)">
            <Switch value={panDown} onValueChange={setPanDown} disabled={variant !== 'sheet'} />
          </Control>

          <Pressable style={[styles.button, styles.buttonAccent]} onPress={presentPlayground}>
            <Ionicons name="play" size={18} color={colors.codeText} />
            <Text style={styles.buttonText}>Present with these options</Text>
          </Pressable>

          <Text style={styles.logLabel}>Lifecycle callbacks</Text>
          <View style={styles.logBox}>
            {log.length === 0 ? (
              <Text style={styles.logEmpty}>Present a preview to see callbacks fire…</Text>
            ) : (
              log.map((line, i) => (
                <Text key={i} style={styles.logLine}>
                  → {line}
                </Text>
              ))
            )}
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.control}>
      <Text style={styles.controlLabel}>{label}</Text>
      {children}
    </View>
  )
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <View style={styles.segmented}>
      {options.map((opt) => {
        const active = opt === value
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{opt}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const TILE_GAP = spacing.sm
const TILE = 104

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  subtitle: { ...t.muted, marginTop: spacing.sm, marginBottom: spacing.sm },

  sectionTitle: { ...t.title, marginTop: spacing.xl, marginBottom: spacing.xs },
  sectionHint: { ...t.muted, marginBottom: spacing.md, lineHeight: 19 },
  mono: { fontFamily: 'monospace', color: colors.text, fontSize: 12 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  tile: { borderRadius: radius.md, overflow: 'hidden' },
  tileDisabled: { opacity: 0.35 },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.text,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  buttonAccent: { backgroundColor: colors.accent, marginTop: spacing.md },
  buttonText: { color: colors.codeText, fontWeight: '700', fontSize: 15 },

  panel: {
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  control: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  controlLabel: { fontSize: 13, color: colors.text, flexShrink: 1 },

  segmented: { flexDirection: 'row', backgroundColor: colors.border, borderRadius: radius.sm, padding: 2 },
  segment: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: radius.sm - 2 },
  segmentActive: { backgroundColor: colors.surface },
  segmentText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  segmentTextActive: { color: colors.text },

  logLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginTop: spacing.xs },
  logBox: { backgroundColor: colors.code, borderRadius: radius.sm, padding: spacing.md, minHeight: 68 },
  logEmpty: { color: '#8e8e93', fontSize: 12, fontFamily: 'monospace' },
  logLine: { color: colors.codeText, fontSize: 12, fontFamily: 'monospace', lineHeight: 18 },

  longImage: { width: '100%', aspectRatio: 16 / 10, backgroundColor: colors.tileBg },
  longTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  longParagraph: { fontSize: 14, color: colors.text, marginTop: spacing.md, lineHeight: 20 },
})
