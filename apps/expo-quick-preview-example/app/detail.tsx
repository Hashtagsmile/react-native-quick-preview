import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';  
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getItemById } from '../data/examples';

const { width: screenWidth } = Dimensions.get('window');

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundItem = getItemById(id);
      setItem(foundItem || null);
      setLoading(false);
    }
  }, [id]);

  const formatPrice = (price?: number | string) => {
    if (price === undefined) return '$0.00';
    return typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  };

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  const getCategoryIcon = (item: any) => {
    if (item.id.startsWith('prod_')) return 'bag-outline';
    if (item.id.startsWith('article_')) return 'newspaper-outline';
    if (item.id.startsWith('dest_')) return 'airplane-outline';
    if (item.id.startsWith('recipe_')) return 'restaurant-outline';
    if (item.id.startsWith('book_')) return 'book-outline';
    return 'cube-outline';
  };

  const getCategoryName = (item: any) => {
    if (item.id.startsWith('prod_')) return 'Product';
    if (item.id.startsWith('article_')) return 'Article';
    if (item.id.startsWith('dest_')) return 'Destination';
    if (item.id.startsWith('recipe_')) return 'Recipe';
    if (item.id.startsWith('book_')) return 'Book';
    return 'Item';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#dc3545" />
          <Text style={styles.errorTitle}>Item Not Found</Text>
          <Text style={styles.errorText}>The requested item could not be found.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#212529" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Ionicons name={getCategoryIcon(item)} size={20} color="#0095f6" />
            <Text style={styles.categoryText}>{getCategoryName(item)}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#212529" />
          </TouchableOpacity>
        </View>

        {/* Main Image */}  
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.mainImage} />
        ) : null}

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Basic Info */}
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
          
          {/* Rating and Reviews */}
          {(item.rating || item.reviews) && (
            <View style={styles.ratingContainer}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#ffbb33" />
                <Text style={styles.ratingText}>{formatRating(item.rating)}</Text>
                {item.reviews && (
                  <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
                )}
              </View>
            </View>
          )}

          {/* Price */}
          {item.price && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price:</Text>
              <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
            </View>
          )}

          {/* Description */}
          {item.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsContainer}>
                {item.tags.map((tag: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Metadata */}
          {item.metadata && Object.keys(item.metadata).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>
              <View style={styles.metadataContainer}>
                {Object.entries(item.metadata).map(([key, value]) => (
                  <View key={key} style={styles.metadataRow}>
                    <Text style={styles.metadataKey}>{key}:</Text>
                    <Text style={styles.metadataValue}>{value as string}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="share-outline" size={20} color="#0095f6" />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0095f6',
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  mainImage: {
    width: screenWidth,
    height: screenWidth * 0.75,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 16,
    lineHeight: 24,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  reviewsText: {
    fontSize: 14,
    color: '#6c757d',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0095f6',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  metadataContainer: {
    gap: 8,
  },
  metadataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  metadataKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    width: 100,
  },
  metadataValue: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0095f6',
    padding: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0095f6',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0095f6',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0095f6',
  },
});
