import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickPreviewComponent } from 'react-native-quick-preview';
import { products, Item } from '../../data/examples';

export default function EcommerceExample() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickPreview = (product: Item) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const closeQuickPreview = () => {
    setVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Item) => {
    console.log(`Added product ${product.id} to cart`);
    closeQuickPreview();
  };

  const handleOpenProduct = (product: Item) => {
    console.log(`Opening product ${product.id}`);
    closeQuickPreview();
    router.push(`/detail?id=${product.id}`);
  };

  const formatPrice = (price?: number | string) =>
    price === undefined ? '$0.00' : typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onLongPress={() => openQuickPreview(product)}
            delayLongPress={500}
          >
            {product.image ? (
              <Image source={{ uri: product.image }} style={styles.productImage} />
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
                  <Text style={styles.ratingText}>{formatRating(product.likes)}</Text>
                  <Text style={styles.reviewsText}>({product.views ?? 0})</Text>
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
        <QuickPreviewComponent
          visible={visible}
          onClose={closeQuickPreview}
          portal={true}
        >
          <View style={styles.quickPreviewContent}>
            {selectedProduct.image && (
              <Image source={{ uri: selectedProduct.image }} style={styles.quickPreviewImage} />
            )}

            <View style={styles.quickPreviewInfo}>
              <Text style={styles.quickPreviewTitle}>{selectedProduct.title}</Text>
              {!!selectedProduct.description && (
                <Text style={styles.quickPreviewSubtitle} numberOfLines={3}>
                  {selectedProduct.description}
                </Text>
              )}
              <View style={styles.quickPreviewMeta}>
                <View style={styles.quickPreviewRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickPreviewRatingText}>
                    {formatRating(selectedProduct.likes)} ({selectedProduct.views ?? 0} views)
                  </Text>
                </View>
                <Text style={styles.quickPreviewPrice}>{formatPrice(selectedProduct.price)}</Text>
              </View>

              {!!selectedProduct.tags?.length && (
                <View style={styles.quickPreviewTags}>
                  {selectedProduct.tags?.slice(0, 3).map((tag: string, idx: number) => (
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
                onPress={() => handleAddToCart(selectedProduct)}
              >
                <Ionicons name="cart-outline" size={20} color="#0095f6" />
                <Text style={styles.quickPreviewActionText}>Add to Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleOpenProduct(selectedProduct)}
              >
                <Ionicons name="open-outline" size={20} color="#00c851" />
                <Text style={styles.quickPreviewActionText}>View Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quickPreviewHint}>
              <Ionicons name="hand-left" size={12} color="#999" />
              <Text style={styles.hintText}>Tap anywhere to view full details</Text>
            </View>
          </View>
        </QuickPreviewComponent>
      )}
    </View>
  );
}

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
  quickPreviewContent: { backgroundColor: '#fff' },
  quickPreviewImage: { width: '100%', aspectRatio: 1, resizeMode: 'cover' },
  quickPreviewInfo: { padding: 16 },
  quickPreviewTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  quickPreviewSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  quickPreviewMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quickPreviewRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickPreviewRatingText: { fontSize: 14, color: '#212529' },
  quickPreviewPrice: { fontSize: 20, fontWeight: '800', color: '#0095f6' },
  quickPreviewTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickPreviewTag: { backgroundColor: '#f8f9fa', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  quickPreviewTagText: { fontSize: 12, color: '#6c757d' },
  quickPreviewActions: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  quickPreviewActionButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 8, backgroundColor: '#f8f9fa' },
  quickPreviewActionText: { fontSize: 14, fontWeight: '600' },
  quickPreviewHint: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 8, backgroundColor: '#f8f9fa', borderTopWidth: 1, borderTopColor: '#eee' },
  hintText: { fontSize: 12, color: '#999', fontStyle: 'italic' },
});
