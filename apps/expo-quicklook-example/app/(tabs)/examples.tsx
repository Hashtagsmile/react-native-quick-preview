import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EcommerceExample } from '../../components/examples/EcommerceExample';
import { ArticleExample } from '../../components/examples/ArticleExample';
import { TravelExample } from '../../components/examples/TravelExample';

export default function ExamplesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Examples</Text>
          <Text style={styles.headerSubtitle}>
            See QuickLook in action with different content types
          </Text>
        </View>

        {/* E-commerce Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛍️ E-commerce Products</Text>
          <Text style={styles.sectionDescription}>
            Long press on any product card to see a quick preview
          </Text>
          <EcommerceExample />
        </View>

        {/* Article Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📰 News Articles</Text>
          <Text style={styles.sectionDescription}>
            Long press on any article card to see a quick preview
          </Text>
          <ArticleExample />
        </View>

        {/* Travel Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✈️ Travel Destinations</Text>
          <Text style={styles.sectionDescription}>
            Long press on any destination card to see a quick preview
          </Text>
          <TravelExample />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
});
