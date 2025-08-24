import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickPreview } from 'react-native-quick-preview';
import { destinations, Item } from '../../data/examples';

export const TravelExample: React.FC = () => {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState<Item | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickPreview = (destination: Item) => {
    console.log('Long press detected for destination:', destination.id);
    setSelectedDestination(destination);
    setVisible(true);
  };

  const closeQuickPreview = () => {
    setVisible(false);
    setSelectedDestination(null);
  };

  const handleBookTrip = (destination: Item) => {
    console.log(`Booking trip to ${destination.id}`);
    closeQuickPreview();
    router.push(`/detail?id=${destination.id}`);
  };

  const handleAddToWishlist = (destination: Item) => {
    console.log(`Added ${destination.id} to wishlist`);
  };

  const handleShareDestination = (destination: Item) => {
    console.log(`Sharing destination ${destination.id}`);
  };

  const formatPrice = (price?: number | string) =>
    price === undefined ? '$0' : typeof price === 'number' ? `$${price.toFixed(0)}` : price;

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {destinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={styles.destinationCard}
            onLongPress={() => openQuickPreview(destination)}
            delayLongPress={500}
          >
            {destination.image ? (
              <Image source={{ uri: destination.image }} style={styles.destinationImage} />
            ) : (
              <View style={[styles.destinationImage, styles.imageFallback]}>
                <Ionicons name="image" size={18} color="#999" />
                <Text style={styles.fallbackText}>No image</Text>
              </View>
            )}

            <View style={styles.destinationInfo}>
              <Text style={styles.destinationTitle} numberOfLines={2}>{destination.title}</Text>
              {!!destination.subtitle && (
                <Text style={styles.destinationSubtitle}>{destination.subtitle}</Text>
              )}
              <View style={styles.destinationMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#ffbb33" />
                    <Text style={styles.ratingText}>{formatRating(destination.likes)}</Text>
                  <Text style={styles.reviewsText}>({destination.views ?? 0})</Text>
                </View>
                {!!destination.price && (
                  <Text style={styles.priceText}>From {formatPrice(destination.price)}</Text>
                )}
              </View>
            </View>

            <View style={styles.longPressHint}>
              <Ionicons name="hand-left" size={12} color="#999" />
              <Text style={styles.hintText}>Long press</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedDestination && (
        <QuickPreview
          visible={visible}
          onClose={closeQuickPreview}
          enableSwipeToClose
          closeOnBackdropPress
          testID="qp-destination"
          accessibilityLabel="Destination quick preview"
        >
          <View style={styles.quickPreviewContent}>
            {selectedDestination.image && (
              <Image source={{ uri: selectedDestination.image }} style={styles.quickPreviewImage} />
            )}

            <View style={styles.quickPreviewInfo}>
              <Text style={styles.quickPreviewTitle}>{selectedDestination.title}</Text>
              {!!selectedDestination.subtitle && (
                <Text style={styles.quickPreviewSubtitle} numberOfLines={2}>
                  {selectedDestination.subtitle}
                </Text>
              )}
              {!!selectedDestination.description && (
                <Text style={styles.quickPreviewDescription} numberOfLines={4}>
                  {selectedDestination.description}
                </Text>
              )}

              <View style={styles.quickPreviewMeta}>
                <View style={styles.quickPreviewRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickPreviewRatingText}>
                    {formatRating(selectedDestination.likes)} ({selectedDestination.views ?? 0} views)
                  </Text>
                </View>
                {!!selectedDestination.price && (
                  <Text style={styles.quickPreviewPrice}>From {formatPrice(selectedDestination.price)}</Text>
                )}
              </View>

              {!!selectedDestination.tags?.length && (
                <View style={styles.quickPreviewTags}>
                  {selectedDestination.tags?.slice(0, 3).map((tag: string, idx: number) => (
                    <View key={`${tag}-${idx}`} style={styles.quickPreviewTag}>
                      <Text style={styles.quickPreviewTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.quickPreviewActions}>
              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleBookTrip(selectedDestination)}
              >
                <Ionicons name="airplane-outline" size={20} color="#0095f6" />
                <Text style={styles.quickPreviewActionText}>Book Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleAddToWishlist(selectedDestination)}
              >
                <Ionicons name="heart-outline" size={20} color="#ff4444" />
                <Text style={styles.quickPreviewActionText}>Wishlist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleShareDestination(selectedDestination)}
              >
                <Ionicons name="share-outline" size={20} color="#00c851" />
                <Text style={styles.quickPreviewActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </QuickPreview>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  scrollView: { paddingHorizontal: 20 },
  
  // Card styles
  destinationCard: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  destinationImage: { width: '100%', height: 140, resizeMode: 'cover' },
  imageFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f5' },
  fallbackText: { fontSize: 12, color: '#999' },
  destinationInfo: { padding: 12 },
  destinationTitle: { fontSize: 16, fontWeight: '600', color: '#212529', marginBottom: 4 },
  destinationSubtitle: { fontSize: 14, color: '#6c757d', marginBottom: 8 },
  destinationMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  
  // Meta info
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 12, fontWeight: '500', color: '#212529' },
  reviewsText: { fontSize: 11, color: '#6c757d' },
  priceText: { fontSize: 14, fontWeight: 'bold', color: '#0095f6' },
  
  // Long press hint
  longPressHint: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 4,
  },
  hintText: { fontSize: 10, color: '#fff', fontWeight: '500' },
  
  // QuickPreview styles
  quickPreviewContent: { backgroundColor: '#fff' },
  quickPreviewImage: { width: '100%', aspectRatio: 16 / 9, resizeMode: 'cover' },
  quickPreviewInfo: { padding: 16 },
  quickPreviewTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  quickPreviewSubtitle: { fontSize: 16, color: '#666', marginBottom: 12 },
  quickPreviewDescription: { fontSize: 14, color: '#666', marginBottom: 12 },
  quickPreviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
    quickPreviewRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickPreviewRatingText: { fontSize: 14, color: '#212529' },
  quickPreviewPrice: { fontSize: 18, fontWeight: '800', color: '#0095f6' },
  
  // Tags
  quickPreviewTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickPreviewTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quickPreviewTagText: { fontSize: 12, color: '#6c757d' },
  
  // Actions
  quickPreviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  quickPreviewActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  quickPreviewActionText: { fontSize: 12, fontWeight: '600' },
});
