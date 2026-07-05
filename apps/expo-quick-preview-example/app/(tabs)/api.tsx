// API — a documentation-style reference: setup, every way to present a preview,
// each with copy-pasteable code and a live "Run it" demo.
import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import {
  useQuickPreview,
  QuickPreview,
  QuickPreviewComponent,
  QuickPreviewPressable,
  QuickPreviewScrollView,
} from 'react-native-quick-preview'
import { products, articles, type Item } from '../../data/examples'
import { ProductPreview } from '../../components/ProductPreview'
import { CodeBlock } from '../../components/CodeBlock'
import { colors, radius, spacing, type as t } from '../../theme'

const SETUP = `import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PreviewProvider } from 'react-native-quick-preview'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreviewProvider>
        <YourApp />
      </PreviewProvider>
    </GestureHandlerRootView>
  )
}`

const PRESSABLE = `import { QuickPreviewPressable } from 'react-native-quick-preview'

<QuickPreviewPressable
  onPress={() => router.push(\`/product/\${id}\`)}
  renderPreview={() => <ProductPreview product={product} />}
  previewOptions={{ variant: 'sheet' }}
>
  <Thumbnail source={product.image} />
</QuickPreviewPressable>`

const HOOK = `import { useQuickPreview } from 'react-native-quick-preview'

function Card({ product }) {
  const { present } = useQuickPreview()

  return (
    <Pressable
      onLongPress={() =>
        present(<ProductPreview product={product} />, { variant: 'sheet' })
      }
    >
      <Thumbnail source={product.image} />
    </Pressable>
  )
}`

const STATIC = `import { QuickPreview } from 'react-native-quick-preview'

// Call from anywhere — even outside React.
QuickPreview.present(<Card />, { variant: 'popover' })
QuickPreview.update({ size: { maxHeight: 480 } })
QuickPreview.close()`

const COMPONENT = `import { QuickPreviewComponent } from 'react-native-quick-preview'

const [visible, setVisible] = useState(false)

<QuickPreviewComponent
  visible={visible}
  onClose={() => setVisible(false)}
  variant="sheet"
>
  <Card />
</QuickPreviewComponent>`

const SCROLL = `import { QuickPreviewScrollView } from 'react-native-quick-preview'

present(
  <QuickPreviewScrollView>
    <LongArticle />
  </QuickPreviewScrollView>,
  { variant: 'sheet', size: { maxHeight: 520 } }
)`

function RunButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.run} onPress={onPress}>
      <Ionicons name="play" size={15} color={colors.codeText} />
      <Text style={styles.runText}>Run this example</Text>
    </Pressable>
  )
}

function Section({
  step,
  title,
  description,
  code,
  footer,
}: {
  step: string
  title: string
  description?: React.ReactNode
  code: string
  footer?: React.ReactNode
}) {
  return (
    <View style={styles.section}>
      <View style={styles.stepRow}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>{step}</Text>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {description}
      <CodeBlock code={code} />
      {footer}
    </View>
  )
}

export default function API() {
  const { present, close } = useQuickPreview()
  const [visible, setVisible] = useState(false)

  const demo = useCallback(
    (item: Item, onClose: () => void) => (
      <Pressable style={{ alignSelf: 'stretch' }} onPress={onClose}>
        <ProductPreview item={item} />
      </Pressable>
    ),
    []
  )

  const runHook = useCallback(() => present(demo(products[0], close), { variant: 'sheet' }), [present, close, demo])
  const runStatic = useCallback(
    () => QuickPreview.present(demo(products[1], QuickPreview.close), { variant: 'popover' }),
    [demo]
  )
  const runScroll = useCallback(() => {
    const article = articles[0]
    present(
      <QuickPreviewScrollView style={{ maxHeight: 460 }}>
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <Text style={styles.scrollTitle}>{article.title}</Text>
          {Array.from({ length: 8 }).map((_, i) => (
            <Text key={i} style={styles.scrollBody}>
              {article.description} Scroll this content; drag from the top edge to dismiss.
            </Text>
          ))}
        </View>
      </QuickPreviewScrollView>,
      { variant: 'sheet', size: { maxHeight: 520 } }
    )
  }, [present])

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={t.h1}>API</Text>
        <Text style={styles.intro}>
          Mount the provider once, then present a preview any way you like. Long-press or tap the
          demos to dismiss them.
        </Text>

        <Section
          step="1"
          title="Set up once"
          description={
            <Text style={styles.body}>
              Wrap your app in <Text style={styles.mono}>GestureHandlerRootView</Text> and{' '}
              <Text style={styles.mono}>PreviewProvider</Text>. That's the only global setup.
            </Text>
          }
          code={SETUP}
        />

        <Text style={styles.groupLabel}>Ways to present</Text>

        <Section
          step="2"
          title="QuickPreviewPressable"
          description={
            <Text style={styles.body}>
              The drop-in wrapper used across every Examples screen: long-press to peek, tap to open.
            </Text>
          }
          code={PRESSABLE}
          footer={
            <View style={styles.inlineDemo}>
              <QuickPreviewPressable
                onPress={() => undefined}
                renderPreview={() => demo(products[2], QuickPreview.close)}
                previewOptions={{ variant: 'popover' }}
                style={styles.demoTile}
              >
                <Ionicons name="finger-print" size={18} color={colors.accent} />
                <Text style={styles.demoTileText}>Long-press me</Text>
              </QuickPreviewPressable>
            </View>
          }
        />

        <Section
          step="3"
          title="useQuickPreview()"
          description={<Text style={styles.body}>The hook, for when you're already inside a component.</Text>}
          code={HOOK}
          footer={<RunButton onPress={runHook} />}
        />

        <Section
          step="4"
          title="QuickPreview (static)"
          description={
            <Text style={styles.body}>
              A static handle with the same methods — callable from services or anywhere outside React.
            </Text>
          }
          code={STATIC}
          footer={<RunButton onPress={runStatic} />}
        />

        <Section
          step="5"
          title="QuickPreviewComponent"
          description={<Text style={styles.body}>The controlled, headless component when you own the state.</Text>}
          code={COMPONENT}
          footer={<RunButton onPress={() => setVisible(true)} />}
        />

        <Section
          step="6"
          title="QuickPreviewScrollView"
          description={
            <Text style={styles.body}>
              Wrap long content so scrolling and swipe-to-dismiss don't fight each other.
            </Text>
          }
          code={SCROLL}
          footer={<RunButton onPress={runScroll} />}
        />

        <Text style={styles.groupLabel}>present(node, options)</Text>
        <View style={styles.optionsCard}>
          {OPTIONS.map((o) => (
            <View key={o.name} style={styles.optionRow}>
              <Text style={styles.optionName}>{o.name}</Text>
              <Text style={styles.optionDesc}>{o.desc}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {visible && (
        <QuickPreviewComponent visible={visible} onClose={() => setVisible(false)} variant="sheet">
          <Pressable style={{ alignSelf: 'stretch' }} onPress={() => setVisible(false)}>
            <ProductPreview item={products[3]} />
          </Pressable>
        </QuickPreviewComponent>
      )}
    </SafeAreaView>
  )
}

const OPTIONS: { name: string; desc: string }[] = [
  { name: 'variant', desc: "'popover' (centered) or 'sheet' (bottom). Default 'popover'." },
  { name: 'size', desc: "'auto', a number (max height), or { maxHeight, maxWidth }." },
  { name: 'dismissOnBackdropPress', desc: 'Tap outside to close. Default true.' },
  { name: 'dismissOnPanDown', desc: 'Swipe the sheet down to close. Default true.' },
  { name: 'onOpenStart / onOpenEnd', desc: 'Open animation lifecycle callbacks.' },
  { name: 'onCloseStart / onCloseEnd', desc: 'Close animation lifecycle callbacks.' },
]

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  intro: { ...t.muted, marginTop: spacing.sm, marginBottom: spacing.lg, lineHeight: 20 },

  groupLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },

  section: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: { color: colors.codeText, fontSize: 13, fontWeight: '800' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  body: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  mono: { fontFamily: 'monospace', fontSize: 13, color: colors.text },

  run: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  runText: { color: colors.codeText, fontWeight: '700', fontSize: 15 },

  inlineDemo: { alignItems: 'flex-start' },
  demoTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  demoTileText: { fontSize: 14, fontWeight: '700', color: colors.text },

  scrollTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  scrollBody: { fontSize: 14, color: colors.text, lineHeight: 21 },

  optionsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  optionRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 3 },
  optionName: { fontFamily: 'monospace', fontSize: 13, fontWeight: '700', color: colors.accent },
  optionDesc: { fontSize: 13, color: colors.textMuted, lineHeight: 18 },
})
