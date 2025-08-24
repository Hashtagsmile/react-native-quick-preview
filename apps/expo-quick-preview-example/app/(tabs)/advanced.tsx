import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { QuickPreview } from 'react-native-quick-preview';

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  price?: number | string;
  description?: string;
};

export default function AdvancedScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [note, setNote] = useState('');

  const samples: Item[] = useMemo(
    () => [
      {
        id: 'article_42',
        title: 'Crafting delightful previews',
        subtitle: 'UX motion & microinteractions',
        image:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format&fit=crop',
        description:
          'Best practices for quick previews: gestures, motion, and progressive disclosure.',
      },
      {
        id: 'dest_9',
        title: 'Kyoto, Japan',
        subtitle: 'Temples, tea and tranquility',
        image:
          'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1400&q=80&auto=format&fit=crop',
        price: 'From $999',
        description:
          'Historic districts, serene gardens, and stunning seasonal colors.',
      },
    ],
    []
  );

  const open = (x: Item) => {
    setItem(x);
    setVisible(true);
  };

  const openWithHaptics = async (x: Item) => {
    // If Quick Preview already haptics on open, remove this to avoid double feedback.
    try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}
    open(x);
  };

  const close = () => setVisible(false);

  const goToDetails = (id: string) => {
    close();
    router.push({ pathname: '/detail', params: { id } });
  };

  const priceText = (p?: number | string) =>
    typeof p === 'number' ? `$${p.toFixed(2)}` : p;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>Advanced Usage</Text>
        <Text style={styles.subtitle}>
          Custom backdrop, swipe threshold, dark theme, keyboard avoidance, and close reason hooks.
        </Text>

        <View style={styles.grid}>
          {samples.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => goToDetails(s.id)}     // tap → details
              onLongPress={() => openWithHaptics(s)} // long-press → QuickPreview (+ haptics)
              delayLongPress={450}
            >
              {s.image ? (
                <Image source={{ uri: s.image }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.fallback]}>
                  <Text style={styles.fallbackText}>No image</Text>
                </View>
              )}
              <View style={styles.body}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {s.title}
                </Text>
                {!!s.subtitle && (
                  <Text style={styles.cardSubtitle} numberOfLines={1}>
                    {s.subtitle}
                  </Text>
                )}
                {!!s.price && <Text style={styles.cardPrice}>{priceText(s.price)}</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <QuickPreview
          visible={visible}
          onClose={close}
          onOpen={() => {
            // Great place for analytics or an alternate haptic if you *don’t* do it on long-press.
            // Haptics.selectionAsync().catch(() => {});
          }}
          onClosed={(reason) => {
            // reason: 'backdrop' | 'swipe' | 'back_button' | 'programmatic'
            // Example: clear ephemeral state when user swipes it away.
            if (reason === 'swipe') setNote('');
          }}
          theme="dark"
          animationDuration={300}
          swipeThreshold={60}
          avoidKeyboard
          closeOnBackdropPress={false} // force explicit close (button) or swipe
          enableSwipeToClose    
          stylesOverride={{
            container: {
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: '#111', // dark card
            },
            // overlay / centerWrap are also override-able if needed
          }}
          renderBackdrop={(opacity) => (
            <Animated.View
              pointerEvents="none"
              style={[
                RNStyleSheet.absoluteFill,
                { backgroundColor: 'rgba(10,10,20,0.85)', opacity },
              ]}
            />
          )}
        >
          {!!item && (
            // IMPORTANT: no flex:1 here — let the card size itself.
            <View style={{ backgroundColor: '#111' }}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: '100%', aspectRatio: 16 / 9 }}
                />
              ) : null}

              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>
                  {item.title}
                </Text>
                {!!item.subtitle && (
                  <Text style={{ color: '#bbb', marginTop: 6 }}>{item.subtitle}</Text>
                )}
                {!!item.description && (
                  <Text style={{ color: '#ccc', marginTop: 10 }} numberOfLines={5}>
                    {item.description}
                  </Text>
                )}
                {!!item.price && (
                  <Text style={{ fontSize: 18, fontWeight: '900', color: '#46aef7', marginTop: 8 }}>
                    {priceText(item.price)}
                  </Text>
                )}

                {/* Keyboard avoidance demo */}
                <View style={{ marginTop: 16, gap: 6 }}>
                  <Text style={{ color: '#ddd' }}>Optional note (open the keyboard):</Text>
                  <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="Type here…"
                    placeholderTextColor="#888"
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: '#222',
                    }}
                    returnKeyType="done"
                  />
                </View>
              </View>

              <View style={styles.advActions}>
                <TouchableOpacity
                  style={[styles.advBtn, styles.advPrimary]}
                  onPress={() => item && goToDetails(item.id)}
                >
                  <Text style={styles.advPrimaryText}>
                    {item.id.startsWith('article') ? 'Read more' : 'Open details'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.advBtn, styles.advGhost]} onPress={close}>
                  <Text style={styles.advGhostText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </QuickPreview>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  screen: { padding: 16, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#111' },
  subtitle: { fontSize: 14, color: '#6c757d' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: { width: '100%', height: 120, resizeMode: 'cover' },
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f5' },
  fallbackText: { fontSize: 12, color: '#999' },
  body: { padding: 10, gap: 4 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#212529' },
  cardSubtitle: { fontSize: 12, color: '#6c757d' },
  cardPrice: { fontSize: 13, fontWeight: '700', color: '#46aef7' },

  advActions: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
    backgroundColor: '#111',
  },
  advBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advPrimary: { backgroundColor: '#46aef7' },
  advPrimaryText: { color: '#fff', fontWeight: '800' },
  advGhost: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#222' },
  advGhostText: { color: '#ddd', fontWeight: '700' },
});
