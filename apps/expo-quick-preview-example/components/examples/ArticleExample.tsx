import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { QuickPreviewComponent } from 'react-native-quick-preview';
import { articles, Item } from '../../data/examples';

export const ArticleExample: React.FC = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<Item | null>(null);
  const [visible, setVisible] = useState(false);

  const openQuickPreview = (article: Item) => { 
    setSelectedArticle(article);
    setVisible(true);
  };

  const closeQuickPreview = () => {
    setVisible(false);
    setSelectedArticle(null);
  };

  const handleReadArticle = (article: Item) => {
    closeQuickPreview();
    router.push(`/detail?id=${article.id}`);
  };

  const handleShareArticle = (article: Item) => {
    console.log(`Sharing article ${article.id}`);
    Share.share({ message: article.title })
  };

  const formatRating = (rating?: number) => `${rating ?? 0}/5`;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onLongPress={() => openQuickPreview(article)}  
            delayLongPress={500}
          >
            {article.image ? (
              <Image source={{ uri: article.image }} style={styles.articleImage} />
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
                  <Text style={styles.ratingText}>{formatRating(article.likes)}</Text>
                  <Text style={styles.reviewsText}>({article.views ?? 0})</Text>
                </View>
                {!!article.username && (
                  <Text style={styles.authorText}>By {article.username}</Text>
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
        <QuickPreviewComponent
          visible={visible}
          onClose={closeQuickPreview}
          accessibilityLabel="Article quick preview"    
        >
          <View style={styles.quickPreviewContent}>
            {selectedArticle.image ? (
              <Image source={{ uri: selectedArticle.image }} style={styles.quickPreviewImage} />
            ) : null}

            <View style={styles.quickPreviewInfo}>
              <Text style={styles.quickPreviewTitle}>{selectedArticle.title}</Text>

              {!!selectedArticle.subtitle && (
                <Text style={styles.quickPreviewSubtitle} numberOfLines={2}>
                  {selectedArticle.subtitle}
                </Text>
              )}

              {!!selectedArticle.description && (
                <Text style={styles.quickPreviewDescription} numberOfLines={4}>
                  {selectedArticle.description}
                </Text>
              )}

              <View style={styles.quickPreviewMeta}>
                <View style={styles.quickPreviewRating}>
                  <Ionicons name="star" size={16} color="#ffbb33" />
                  <Text style={styles.quickPreviewRatingText}>
                    {formatRating(selectedArticle.likes)} ({selectedArticle.views ?? 0} views)
                  </Text>
                </View>
                {!!selectedArticle.username && (
                  <Text style={styles.quickPreviewAuthor}>By {selectedArticle.username}</Text>
                )}
              </View>

              {!!selectedArticle.tags?.length && (
                <View style={styles.quickPreviewTags}>
                  {selectedArticle.tags?.slice(0, 3).map((tag: string, index: number) => (
                    <View key={`${tag}-${index}`} style={styles.quickPreviewTag}>
                      <Text style={styles.quickPreviewTagText}>#{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.quickPreviewActions}>
              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleReadArticle(selectedArticle)}
              >
                <Ionicons name="book-outline" size={20} color="#0095f6" />
                <Text style={styles.quickPreviewActionText}>Read Article</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickPreviewActionButton}
                onPress={() => handleShareArticle(selectedArticle)}
              >
                <Ionicons name="share-outline" size={20} color="#00c851" />
                <Text style={styles.quickPreviewActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </QuickPreviewComponent> 
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

  // QuickPreview content
    quickPreviewContent: { backgroundColor: '#fff' },
  quickPreviewImage: { width: '100%', aspectRatio: 16 / 9, resizeMode: 'cover' },
  quickPreviewInfo: { padding: 16 },
  quickPreviewTitle: { fontSize: 22, fontWeight: '700', color: '#212529', marginBottom: 8 },
  quickPreviewSubtitle: { fontSize: 16, color: '#666', lineHeight: 22, marginBottom: 12 },
  quickPreviewDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  quickPreviewMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  quickPreviewRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quickPreviewRatingText: { fontSize: 14, color: '#212529' },
  quickPreviewAuthor: { fontSize: 14, color: '#6c757d', fontStyle: 'italic' },
  quickPreviewTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickPreviewTag: { backgroundColor: '#f8f9fa', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  quickPreviewTagText: { fontSize: 12, color: '#6c757d' },
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
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  quickPreviewActionText: { fontSize: 14, fontWeight: '600' },
});
