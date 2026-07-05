// People — a team directory. Long-press a person to peek their profile with
// Message / Call quick actions, tap to open the full profile.
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { QuickPreview, QuickPreviewPressable } from 'react-native-quick-preview'
import { profiles, type Item } from '../../data/examples'
import { PersonPreview } from '../../components/PersonPreview'
import { ExampleHeader } from '../../components/ExampleHeader'
import { colors, spacing } from '../../theme'

export default function People() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ExampleHeader title="Team" hint="Long-press a person" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {profiles.map((person) => (
          <QuickPreviewPressable
            key={person.id}
            onPress={() => router.push({ pathname: '/detail', params: { id: person.id } })}
            renderPreview={() => <PeekWrapper id={person.id} item={person} />}
            previewOptions={{ variant: 'popover', accessibilityLabel: `Preview ${person.title}` }}
            onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            style={styles.row}
            testID={`person-${person.id}`}
          >
            {!!person.image && <Image source={{ uri: person.image }} style={styles.avatar} />}
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {person.title}
              </Text>
              <Text style={styles.role} numberOfLines={1}>
                {person.subtitle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#c7c7cc" />
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
      <PersonPreview item={item} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.tileBg },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.text },
  role: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
})
