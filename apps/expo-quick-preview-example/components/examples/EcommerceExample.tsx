import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickLook } from '../../../../packages/react-native-quick-preview/dist';
import { ecommerceProducts, ExampleItem } from '../../data/exampleData';

export const EcommerceExample: React.FC = () => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<ExampleItem | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickLook = (product: ExampleItem) => {
    console.log('Long press detected for product:', product.id);
    setSelectedProduct(product);
    setVisible(true);
  };

  const closeQuickLook = () => {
    setVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: ExampleItem) => {
    console.log(`Added product ${product.id} to cart`);
    closeQuickLook();
  };

  const handleOpenProduct = (product: ExampleItem) => {
    console.log(`Opening product ${product.id}`);
    closeQuickLook();
    router.push(`/detail?id=${product.id}`);
  };

  const formatPrice = (price?: number | string) =>
    price === undefined ? '$0.00' : typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {ecommerceProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onLongPress={() => openQuickLook(product)}
            delayLongPress={500}
          >
            {product.images?.[0] ? (
              <Image source={{ uri: product.images[0] }} style={styles.productImage} />
            ) : (
              <View style={[styles.productImage, styles.imageFallback]}>
                <Ionicons name="image" size={18} color="#999" />
                <Text style={styles.fallbackText}>No image</Text>
              </View>
            )}

            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
              {!!product.subtitle && <Text style={styles.productSubtitle}>{product.subtitle}</Text>}
              <View style={styles.productMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#ffbb33" />
                  <Text style={styles.ratingText}>{formatRating(product.rating)}</Text>
                  <Text style={styles.reviewsText}>({product.reviews ?? 0})</Text>
                </View>
                <Text style={styles.priceText}>{formatPrice(product.price)}</Text>
              </View>
            </View>

            <View style={styles.longPressHint}>
              <Ionicons name="hand-left" size={12} color="#999" />
              <Text style={styles.longPressHintText}>Long press</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedProduct && (
        <QuickLook
          visible={visible}
          onClose={closeQuickLook}
          onPressCard={() => handleOpenProduct(selectedProduct)}
          enableSwipeToClose
          closeOnBackdropPress
          testID="ql-product"
          accessibilityLabel="Product quick look"
        >
          <View style={styles.quickLookContent}>
            {selectedProduct.images?.[0] && (
              <Image source={{ uri: selectedProduct.images[0] }} style={styles.quickLookImage} />
            )}

            <View style={styles.quickLookInfo}>
              <Text style={styles.quickLookTitle}>{selectedProduct.title}</Text>
              {!!selectedProduct.description && (
                <Text style={styles.quickLookSubtitle} numberOfLines={3}>
                  {selectedProduct.description}
                </Text>
              )}
              <View style={styles.quickLookMeta}>
                <View style={styles.quickLookRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickLookRatingText}>
                    {formatRating(selectedProduct.rating)} ({selectedProduct.reviews ?? 0} reviews)
                  </Text>
                </View>
                <Text style={styles.quickLookPrice}>{formatPrice(selectedProduct.price)}</Text>
              </View>

              {!!selectedProduct.tags?.length && (
                <View style={styles.quickLookTags}>
                  {selectedProduct.tags.slice(0, 3).map((tag, idx) => (
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
                onPress={() => handleAddToCart(selectedProduct)}
              >
                <Ionicons name="cart-outline" size={20} color="#0095f6" />
                <Text style={styles.quickLookActionText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleOpenProduct(selectedProduct)}
              >
                <Ionicons name="open-outline" size={20} color="#00c851" />
                <Text style={styles.quickLookActionText}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.quickLookHint}>
              <Ionicons name="hand-left" size={12} color="#999" />
              <Text style={styles.hintText}>Tap anywhere to view full details</Text>
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
  productCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: { width: '100%', height: 150, resizeMode: 'cover' },
  imageFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f5' },
  fallbackText: { fontSize: 12, color: '#999' },
  productInfo: { padding: 12 },
  productTitle: { fontSize: 14, fontWeight: '600', color: '#212529', marginBottom: 4 },
  productSubtitle: { fontSize: 12, color: '#6c757d', marginBottom: 8 },
  productMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 12, fontWeight: '500', color: '#212529' },
  reviewsText: { fontSize: 11, color: '#6c757d' },
  priceText: { fontSize: 14, fontWeight: 'bold', color: '#0095f6' },
  longPressHint: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 4 },
  longPressHintText: { fontSize: 10, color: '#fff', fontWeight: '500' },
  quickLookContent: { backgroundColor: '#fff' },
  quickLookImage: { width: '100%', aspectRatio: 1, resizeMode: 'cover' },
  quickLookInfo: { padding: 16 },
  quickLookTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  quickLookSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  quickLookMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quickLookRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickLookRatingText: { fontSize: 14, color: '#212529' },
  quickLookPrice: { fontSize: 20, fontWeight: '800', color: '#0095f6' },
  quickLookTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickLookTag: { backgroundColor: '#f8f9fa', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  quickLookTagText: { fontSize: 12, color: '#6c757d' },
  quickLookActions: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  quickLookActionButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 8, backgroundColor: '#f8f9fa' },
  quickLookActionText: { fontSize: 14, fontWeight: '600' },
  quickLookHint: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 8, backgroundColor: '#f8f9fa', borderTopWidth: 1, borderTopColor: '#eee' },
  hintText: { fontSize: 12, color: '#999', fontStyle: 'italic' },
});
