import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickLook } from '../../../../packages/react-native-quick-preview/dist';
import { newsArticles, ExampleItem } from '../../data/exampleData';

export const ArticleExample: React.FC = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<ExampleItem | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickLook = (article: ExampleItem) => {
    console.log('Long press detected for article:', article.id);
    setSelectedArticle(article);
    setVisible(true);
  };

  const closeQuickLook = () => {
    setVisible(false);
    setSelectedArticle(null);
  };

  const handleReadArticle = (article: ExampleItem) => {
    console.log(`Reading article ${article.id}`);
    closeQuickLook();
    router.push(`/detail?id=${article.id}`);
  };

  const handleShareArticle = (article: ExampleItem) => {
    console.log(`Sharing article ${article.id}`);
    // Share.share({ message: article.title, url: article.url })
  };

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {newsArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onLongPress={() => openQuickLook(article)}
            delayLongPress={500}
          >
            {article.images?.[0] ? (
              <Image source={{ uri: article.images[0] }} style={styles.articleImage} />
            ) : (
              <View style={[styles.articleImage, styles.imageFallback]}>
                <Ionicons name="image" size={18} color="#999" />
                <Text style={styles.fallbackText}>No image</Text>
              </View>
            )}

            <View style={styles.articleInfo}>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {article.title}
              </Text>
              {!!article.subtitle && (
                <Text style={styles.articleSubtitle} numberOfLines={2}>
                  {article.subtitle}
                </Text>
              )}
              <View style={styles.articleMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#ffbb33" />
                  <Text style={styles.ratingText}>{formatRating(article.rating)}</Text>
                  <Text style={styles.reviewsText}>({article.reviews ?? 0})</Text>
                </View>
                {!!article.metadata?.Author && (
                  <Text style={styles.authorText}>By {article.metadata.Author}</Text>
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

      {selectedArticle && (
        <QuickLook
          visible={visible}
          onClose={closeQuickLook}
          onPressCard={() => handleReadArticle(selectedArticle)}
          enableSwipeToClose
          closeOnBackdropPress
          animationDuration={220}
          testID="ql-article"
          accessibilityLabel="Article quick look"
        >
          <View style={styles.quickLookContent}>
            {selectedArticle.images?.[0] ? (
              <Image source={{ uri: selectedArticle.images[0] }} style={styles.quickLookImage} />
            ) : null}

            <View style={styles.quickLookInfo}>
              <Text style={styles.quickLookTitle}>{selectedArticle.title}</Text>

              {!!selectedArticle.subtitle && (
                <Text style={styles.quickLookSubtitle} numberOfLines={2}>
                  {selectedArticle.subtitle}
                </Text>
              )}

              {!!selectedArticle.description && (
                <Text style={styles.quickLookDescription} numberOfLines={4}>
                  {selectedArticle.description}
                </Text>
              )}

              <View style={styles.quickLookMeta}>
                <View style={styles.quickLookRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickLookRatingText}>
                    {formatRating(selectedArticle.rating)} ({selectedArticle.reviews ?? 0} reviews)
                  </Text>
                </View>
                {!!selectedArticle.metadata?.Author && (
                  <Text style={styles.quickLookAuthor}>By {selectedArticle.metadata.Author}</Text>
                )}
              </View>

              {!!selectedArticle.tags?.length && (
                <View style={styles.quickLookTags}>
                  {selectedArticle.tags.slice(0, 3).map((tag, index) => (
                    <View key={`${tag}-${index}`} style={styles.quickLookTag}>
                      <Text style={styles.quickLookTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.quickLookActions}>
              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleReadArticle(selectedArticle)}
              >
                <Ionicons name="book-outline" size={20} color="#0095f6" />
                <Text style={styles.quickLookActionText}>Read Article</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickLookActionButton}
                onPress={() => handleShareArticle(selectedArticle)}
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
  articleCard: {
    width: 280,
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
  articleImage: { width: '100%', height: 160, resizeMode: 'cover' },
  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#f1f3f5',
  },
  fallbackText: { fontSize: 12, color: '#999' },
  articleInfo: { padding: 12 },
  articleTitle: { fontSize: 16, fontWeight: '600', color: '#212529', marginBottom: 4, lineHeight: 20 },
  articleSubtitle: { fontSize: 14, color: '#6c757d', marginBottom: 8, lineHeight: 18 },
  articleMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 12, fontWeight: '500', color: '#212529' },
  reviewsText: { fontSize: 11, color: '#6c757d' },
  authorText: { fontSize: 11, color: '#6c757d', fontStyle: 'italic' },
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

  // QuickLook content
  quickLookContent: { backgroundColor: '#fff' },
  quickLookImage: { width: '100%', aspectRatio: 16 / 9, resizeMode: 'cover' },
  quickLookInfo: { padding: 16 },
  quickLookTitle: { fontSize: 22, fontWeight: '700', color: '#212529', marginBottom: 8 },
  quickLookSubtitle: { fontSize: 16, color: '#666', lineHeight: 22, marginBottom: 12 },
  quickLookDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  quickLookMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quickLookRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickLookRatingText: { fontSize: 14, color: '#212529' },
  quickLookAuthor: { fontSize: 14, color: '#6c757d', fontStyle: 'italic' },
  quickLookTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickLookTag: { backgroundColor: '#f8f9fa', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  quickLookTagText: { fontSize: 12, color: '#6c757d' },
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
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  quickLookActionText: { fontSize: 14, fontWeight: '600' },
});
