import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickLook } from 'react-native-quicklook';

export default function HomeScreen() {
  const router = useRouter();
  const [testVisible, setTestVisible] = useState(false);

  const testItem = {
    id: 'test_001',
    title: 'Test Product',
    subtitle: 'This is a test',
    description:
      'This is a test description to see if the QuickLook component is working properly.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    ],
    price: 99.99,
    rating: 4.5,
    reviews: 123,
    tags: ['test', 'demo'],
    metadata: { Test: 'Value' },
  };

  const openQuickLook = () => setTestVisible(true);
  const closeQuickLook = () => setTestVisible(false);

  const firstImg = testItem.images?.[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QuickLook</Text>
          <Text style={styles.headerSubtitle}>React Native QuickLook Component</Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Features</Text>
          <View style={styles.featuresList}>
            {[
              'Universal content support',
              'Beautiful animations',
              'Fully customizable',
              'TypeScript support',
              'Light/Dark themes',
              'Flexible wrapper mode',
            ].map((label) => (
              <View key={label} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#00c851" />
                <Text style={styles.featureText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Usage Modes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Usage Modes</Text>

          <View style={styles.modeCard}>
            <View style={styles.modeHeader}>
              <Ionicons name="cube-outline" size={24} color="#0095f6" />
              <Text style={styles.modeTitle}>Wrapper Mode</Text>
            </View>
            <Text style={styles.modeDescription}>
              Wrap any content with QuickLook functionality. Perfect for custom layouts and unique
              designs.
            </Text>
            <View style={styles.modeExample}>
              <Text style={styles.codeText}>
                {'<QuickLook visible={visible} onClose={onClose}>\n  <YourCustomContent />\n</QuickLook>'}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Get Started</Text>

          <TouchableOpacity style={styles.navCard} onPress={() => console.log('View Examples')}>
            <View style={styles.navCardContent}>
              <Ionicons name="layers" size={32} color="#0095f6" />
              <View style={styles.navCardText}>
                <Text style={styles.navCardTitle}>View Examples</Text>
                <Text style={styles.navCardSubtitle}>See QuickLook in action</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navCard} onPress={() => console.log('Documentation')}>
            <View style={styles.navCardContent}>
              <Ionicons name="document-text" size={32} color="#00c851" />
              <View style={styles.navCardText}>
                <Text style={styles.navCardTitle}>Documentation</Text>
                <Text style={styles.navCardSubtitle}>API reference & guides</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Test Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Test QuickLook</Text>
          <TouchableOpacity
            style={styles.testButton}
            onPress={() => {
              console.log('Test button pressed');
              openQuickLook();
            }}
          >
            <Text style={styles.testButtonText}>Test QuickLook Modal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Test QuickLook */}
      <QuickLook
        visible={testVisible}
        onClose={() => {
          console.log('Test QuickLook closing');
          closeQuickLook();
        }}
        onPressCard={() => {
          console.log('Test QuickLook card pressed');
          closeQuickLook();
          router.push('/detail?id=test_001');
        }}
        enableSwipeToClose
        closeOnBackdropPress
        testID="ql-home-test"
        accessibilityLabel="Quick look preview"
      >
        <View style={{ backgroundColor: '#fff'}}>
          {firstImg ? (
            <Image source={{ uri: firstImg }} style={{ width: '100%', aspectRatio: 1 }} />
          ) : null}

          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>{testItem.title}</Text>
            {!!testItem.description && (
              <Text style={{ color: '#666', marginVertical: 6 }} numberOfLines={3}>
                {testItem.description}
              </Text>
            )}
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0095f6' }}>
              $
              {typeof testItem.price === 'number'
                ? testItem.price.toFixed(2)
                : String(testItem.price)}
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
            <TouchableOpacity onPress={() => console.log('Add to cart')}>
              <Text>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeQuickLook}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </QuickLook>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollView: { flex: 1 },

  // Header
  header: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#212529', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#6c757d', textAlign: 'center' },

  // Sections
  section: { margin: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#212529', marginBottom: 16 },

  // Features
  featuresList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureText: { fontSize: 16, color: '#495057', marginLeft: 12 },

  // Mode Cards
  modeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  modeTitle: { fontSize: 18, fontWeight: '600', color: '#212529', marginLeft: 12 },
  modeDescription: { fontSize: 14, color: '#6c757d', lineHeight: 20, marginBottom: 16 },
  modeExample: { backgroundColor: '#f8f9fa', borderRadius: 8, padding: 12 },
  codeText: { fontSize: 12, fontFamily: 'monospace', color: '#495057' },

  // Nav Cards
  navCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navCardContent: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  navCardText: { flex: 1, marginLeft: 16 },
  navCardTitle: { fontSize: 16, fontWeight: '600', color: '#212529', marginBottom: 4 },
  navCardSubtitle: { fontSize: 14, color: '#6c757d' },

  // Test button
  testButton: {
    backgroundColor: '#0095f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
