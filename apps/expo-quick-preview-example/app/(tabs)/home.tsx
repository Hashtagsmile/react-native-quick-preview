import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuickPreview } from 'react-native-quick-preview';
// Optional: if you want haptics on long-press (requires expo-haptics installed)
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const { present } = useQuickPreview();

  const testItem = {
    title: 'QuickPreview Demo',
    description:
      'This is a minimal preview showing how to render any custom content inside the QuickPreview card.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop',
    price: 99.99,
  };

  const openWithHaptics = async () => {
    // Optional haptics
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    
    // Show preview using the new API
    present(
      <View style={{ backgroundColor: '#fff' }}>
        {testItem.image ? (
          <Image source={{ uri: testItem.image }} style={{ width: '100%', aspectRatio: 16 / 9 }} />
        ) : null}

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>{testItem.title}</Text>
          <Text style={{ color: '#666', marginVertical: 6 }} numberOfLines={3}>
            {testItem.description}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#0095f6' }}>
            ${testItem.price.toFixed(2)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 12,
            borderTopWidth: 1,
            borderTopColor: '#eee',
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ fontWeight: '600', color: '#0095f6' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>,
      {
        variant: 'popover',
        dismissOnBackdropPress: true,
        accessibilityLabel: 'QuickPreview demo content'
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/QuickLookLogo.png')} style={styles.logo} />
      </View>

      <Text style={styles.subtitle}>
        Long-press the button to preview. Swipe to close, or tap actions inside.
      </Text>

      <TouchableOpacity
        style={styles.cta}
        onLongPress={openWithHaptics}
        delayLongPress={450}
        activeOpacity={0.9}
      >
        <Text style={styles.ctaText}>Long-press to QuickPreview</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  subtitle: { fontSize: 14, color: '#6c757d', marginBottom: 16, textAlign: 'center' },
  cta: { backgroundColor: '#0095f6', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  ctaText: { color: '#fff', fontWeight: '600' },
  logo: { width: 100, height: 100, marginBottom: 16 },
  logoContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
});
