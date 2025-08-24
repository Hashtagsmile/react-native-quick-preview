import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickLook } from '../../../../packages/react-native-quick-preview/dist';
import { travelDestinations, ExampleItem } from '../../data/exampleData';

export const TravelExample: React.FC = () => {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState<ExampleItem | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickLook = (destination: ExampleItem) => {
    console.log('Long press detected for destination:', destination.id);
    setSelectedDestination(destination);
    setVisible(true);
  };

  const closeQuickLook = () => {
    setVisible(false);
    setSelectedDestination(null);
  };

  const handleBookTrip = (destination: ExampleItem) => {
    console.log(`Booking trip to ${destination.id}`);
    closeQuickLook();
    router.push(`/detail?id=${destination.id}`);
  };

  const handleAddToWishlist = (destination: ExampleItem) => {
    console.log(`Added ${destination.id} to wishlist`);
  };

  const handleShareDestination = (destination: ExampleItem) => {
    console.log(`Sharing destination ${destination.id}`);
  };

  const formatPrice = (price?: number | string) =>
    price === undefined ? '$0' : typeof price === 'number' ? `$${price.toFixed(0)}` : price;

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {travelDestinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={styles.destinationCard}
            onLongPress={() => openQuickLook(destination)}
            delayLongPress={500}
          >
            {destination.images?.[0] ? (
              <Image source={{ uri: destination.images[0] }} style={styles.destinationImage} />
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
                  <Text style={styles.ratingText}>{formatRating(destination.rating)}</Text>
                  <Text style={styles.reviewsText}>({destination.reviews ?? 0})</Text>
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
        <QuickLook
          visible={visible}
          onClose={closeQuickLook}
          onPressCard={() => handleBookTrip(selectedDestination)}
          enableSwipeToClose
          closeOnBackdropPress
          testID="ql-destination"
          accessibilityLabel="Destination quick look"
        >
          <View style={styles.quickLookContent}>
            {selectedDestination.images?.[0] && (
              <Image source={{ uri: selectedDestination.images[0] }} style={styles.quickLookImage} />
            )}

            <View style={styles.quickLookInfo}>
              <Text style={styles.quickLookTitle}>{selectedDestination.title}</Text>
              {!!selectedDestination.subtitle && (
                <Text style={styles.quickLookSubtitle} numberOfLines={2}>
                  {selectedDestination.subtitle}
                </Text>
              )}
              {!!selectedDestination.description && (
                <Text style={styles.quickLookDescription} numberOfLines={4}>
                  {selectedDestination.description}
                </Text>
              )}

              <View style={styles.quickLookMeta}>
                <View style={styles.quickLookRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickLookRatingText}>
                    {formatRating(selectedDestination.rating)} ({selectedDestination.reviews ?? 0} reviews)
                  </Text>
                </View>
                {!!selectedDestination.price && (
                  <Text style={styles.quickLookPrice}>From {formatPrice(selectedDestination.price)}</Text>
                )}
              </View>

              {!!selectedDestination.tags?.length && (
                <View style={styles.quickLookTags}>
                  {selectedDestination.tags.slice(0, 3).map((tag, idx) => (
                    <View key={`${tag}-${idx}`} style={styles.quickLookTag}>
                      <Text style={styles.quickLookTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.quickLookActions}>
              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleBookTrip(selectedDestination)}
              >
                <Ionicons name="airplane-outline" size={20} color="#0095f6" />
                <Text style={styles.quickLookActionText}>Book Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleAddToWishlist(selectedDestination)}
              >
                <Ionicons name="heart-outline" size={20} color="#ff4444" />
                <Text style={styles.quickLookActionText}>Wishlist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleShareDestination(selectedDestination)}
              >
                <Ionicons name="share-outline" size={20} color="#00c851" />
                <Text style={styles.quickLookActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </QuickLook>
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
  
  // QuickLook styles
  quickLookContent: { backgroundColor: '#fff' },
  quickLookImage: { width: '100%', aspectRatio: 16 / 9, resizeMode: 'cover' },
  quickLookInfo: { padding: 16 },
  quickLookTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  quickLookSubtitle: { fontSize: 16, color: '#666', marginBottom: 12 },
  quickLookDescription: { fontSize: 14, color: '#666', marginBottom: 12 },
  quickLookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickLookRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickLookRatingText: { fontSize: 14, color: '#212529' },
  quickLookPrice: { fontSize: 18, fontWeight: '800', color: '#0095f6' },
  
  // Tags
  quickLookTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickLookTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quickLookTagText: { fontSize: 12, color: '#6c757d' },
  
  // Actions
  quickLookActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  quickLookActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  quickLookActionText: { fontSize: 12, fontWeight: '600' },
});
