// Files — a "Quick Look" file browser (the library's namesake). Long-press a
// file to peek it without opening: images peek as a popover, documents peek as a
// scrollable sheet (QuickPreviewScrollView). Tap the peek to open the file.
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable, QuickPreviewScrollView } from 'react-native-quick-preview'
import { files, type Item } from '../../data/examples'
import { FilePreview, FILE_ICON, FILE_TINT } from '../../components/FilePreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, radius, spacing } from '../../theme'

export default function Files() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Files" hint="Long-press a file" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {files.map((file) => {
          const type = file.fileType ?? 'doc'
          const isImage = type === 'image'
          return (
            <QuickPreviewPressable
              key={file.id}
              onPress={() => router.push({ pathname: '/detail', params: { id: file.id } })}
              renderPreview={() => <PeekWrapper id={file.id} item={file} isImage={isImage} />}
              // Images peek centered; documents peek as a scrollable bottom sheet.
              previewOptions={
                isImage
                  ? { variant: 'popover', accessibilityLabel: `Preview ${file.title}` }
                  : { variant: 'sheet', size: { maxHeight: 520 }, accessibilityLabel: `Preview ${file.title}` }
              }
              onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
              style={styles.row}
              testID={`file-${file.id}`}
            >
              <View style={[styles.badge, { backgroundColor: FILE_TINT[type] }]}>
                <Ionicons name={FILE_ICON[type]} size={18} color="#fff" />
              </View>
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {file.title}
                </Text>
                <Text style={styles.meta}>
                  {file.fileSize} · {file.modified}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c7c7cc" />
            </QuickPreviewPressable>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

function PeekWrapper({ id, item, isImage }: { id: string; item: Item; isImage: boolean }) {
  const router = useRouter()
  const open = () => {
    QuickPreview.close()
    router.push({ pathname: '/detail', params: { id } })
  }
  // Documents can be long — wrap in QuickPreviewScrollView so scrolling and
  // swipe-to-dismiss don't fight. Images stay a simple tappable card.
  if (isImage) {
    return (
      <Pressable style={{ alignSelf: 'stretch' }} onPress={open}>
        <FilePreview item={item} />
      </Pressable>
    )
  }
  return (
    <QuickPreviewScrollView style={{ maxHeight: 460 }}>
      <Pressable style={{ alignSelf: 'stretch' }} onPress={open}>
        <FilePreview item={item} />
      </Pressable>
    </QuickPreviewScrollView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  badge: { width: 40, height: 40, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
})
