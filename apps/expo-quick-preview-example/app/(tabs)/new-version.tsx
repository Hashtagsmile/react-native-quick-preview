import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions, Modal, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { posts } from '../../data/examples'
import { QuickPreview } from 'react-native-quick-preview'

const { width: screenW } = Dimensions.get('window')
const PAD_H = 16
const GRID_GAP = 4
const INST_COLS = 3
const POST_SIZE = Math.floor((screenW - PAD_H * 2 - GRID_GAP * (INST_COLS - 1)) / INST_COLS)

// Example component using the new QuickPreview package
export default function New() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [content, setContent] = React.useState<React.ReactNode>(null)

  // Simple mock implementation for testing (since package isn't built)
  const present = (node: React.ReactNode) => {
    setContent(node)
    setIsVisible(true)
  }

  const close = () => {
    setIsVisible(false)
    setContent(null)
  }

  // Instagram-style quick preview content
  const renderInstagramPreview = (post: typeof posts[0]) => (
    <View style={styles.instagramPreview}>
      {/* Header with avatar and username */}
      <View style={styles.instagramHeader}>
        {post.avatar && <Image source={{ uri: post.avatar }} style={styles.instagramAvatar} />}
        <Text style={styles.instagramUsername}>@{post.username}</Text>
      </View>
      
      {/* Main image */}
      {post.image && <Image source={{ uri: post.image }} style={styles.instagramImage} />}
      
      {/* Views overlay */}
      <View style={styles.instagramViewsChip}>
        <Ionicons name="eye" size={12} color="#fff" />
        <Text style={styles.instagramViewsText}>{post.views?.toLocaleString()} views</Text>
      </View>
      
      {/* Content */}
      <View style={styles.instagramContent}>
        <Text style={styles.instagramTitle}>{post.title}</Text>
        {post.subtitle && <Text style={styles.instagramSubtitle}>{post.subtitle}</Text>}
        {post.description && (
          <Text style={styles.instagramDescription}>{post.description}</Text>
        )}
        {post.tags && (
          <View style={styles.instagramTags}>
            {post.tags.map((tag, index) => (
              <Text key={index} style={styles.instagramTag}>#{tag}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  )

  // Handle long press with haptics
  const handleLongPress = async (post: typeof posts[0]) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    } catch {}
    
    // Use the static API (when package is built)
    // QuickPreview.present(renderInstagramPreview(post), {
    //   variant: 'popover',
    //   dismissOnBackdropPress: true,
    //   accessibilityLabel: 'Instagram post preview'
    // })
    
    // For now, use mock implementation
    present(renderInstagramPreview(post))
  }

  // Example content components for custom previews
  const ProductPreview = () => (
    <View style={styles.previewContent}>
      <Image 
        source={{ uri: 'https://picsum.photos/300/200' }} 
        style={styles.previewImage} 
      />
      <Text style={styles.previewTitle}>Amazing Product</Text>
      <Text style={styles.previewPrice}>$99.99</Text>
      <Text style={styles.previewDescription}>
        This is an amazing product that you'll love! Features include high quality, 
        durability, and excellent design.
      </Text>
    </View>
  )

  const ArticlePreview = () => (
    <View style={styles.previewContent}>
      <Text style={styles.previewTitle}>Breaking News</Text>
      <Text style={styles.previewSubtitle}>Technology • 2 hours ago</Text>
      <Text style={styles.previewDescription}>
        Latest developments in the tech world that will change everything. 
        Read more to discover what's happening.
      </Text>
    </View>
  )

  const ProfilePreview = () => (
    <View style={styles.previewContent}>
      <Image 
        source={{ uri: 'https://picsum.photos/100/100' }} 
        style={styles.profileImage} 
      />
      <Text style={styles.previewTitle}>John Doe</Text>
      <Text style={styles.previewSubtitle}>@johndoe • 1.2K followers</Text>
      <Text style={styles.previewDescription}>
        Software developer passionate about creating amazing user experiences.
      </Text>
    </View>
  )

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>QuickPreview Package Demo</Text>
        
        {/* Instagram Grid Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instagram-style Grid</Text>
          <Text style={styles.sectionDescription}>
            Long press on any grid item to see a quick preview, just like Instagram!
          </Text>
          
          <View style={styles.instagramGrid}>
            {posts.map((post) => (
              <Pressable
                key={post.id}
                style={styles.instagramTile}
                onLongPress={() => handleLongPress(post)}
                delayLongPress={450}
              >
                {post.image ? (
                  <Image source={{ uri: post.image }} style={styles.instagramGridImage} />
                ) : (
                  <View style={[styles.instagramGridImage, styles.fallback]}>
                    <Text style={styles.fallbackText}>No image</Text>
                  </View>
                )}
                <View style={styles.instagramGridPill}>
                  <Ionicons name="eye" size={12} color="#fff" />
                  <Text style={styles.instagramGridPillText}>
                    {post.views?.toLocaleString() || '0'}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        {/* Custom Content Previews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Content Previews</Text>
          <Text style={styles.sectionDescription}>
            Tap these buttons to see different types of content previews using the QuickPreview package.
          </Text>
          
          <Pressable 
            style={styles.button}
            onPress={() => {
              // QuickPreview.present(<ProductPreview />, { variant: 'popover' })
              present(<ProductPreview />)
            }}
          >
            <Text style={styles.buttonText}>Show Product Preview</Text>
          </Pressable>

          <Pressable 
            style={styles.button}
            onPress={() => {
              // QuickPreview.present(<ArticlePreview />, { variant: 'sheet' })
              present(<ArticlePreview />)
            }}
          >
            <Text style={styles.buttonText}>Show Article Preview</Text>
          </Pressable>

          <Pressable 
            style={styles.button}
            onPress={() => {
              // QuickPreview.present(<ProfilePreview />, { 
              //   variant: 'popover',
              //   accessibilityLabel: 'User profile preview'
              // })
              present(<ProfilePreview />)
            }}
          >
            <Text style={styles.buttonText}>Show Profile Preview</Text>
          </Pressable>
        </View>

        {/* Navigation Preview Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation Preview</Text>
          <Text style={styles.sectionDescription}>
            Long press to preview navigation destinations before going there.
          </Text>
          
          <Pressable 
            style={styles.button}
            onLongPress={() => {
              // QuickPreview.presentNavigation({
              //   route: '/profile/johndoe',
              //   title: 'John Doe Profile',
              //   description: 'View John Doe\'s complete profile with posts, followers, and more.',
              //   image: 'https://picsum.photos/300/200',
              //   metadata: {
              //     'Followers': '1.2K',
              //     'Posts': '45',
              //     'Following': '890'
              //   }
              // }, {
              //   onNavigate: (route, params) => {
              //     console.log('Navigating to:', route, params)
              //     // Your navigation logic here
              //   }
              // })
              Alert.alert('Navigation Preview', 'This would show a navigation preview with the new API!')
            }}
            delayLongPress={450}
          >
            <Text style={styles.buttonText}>Long press for Navigation Preview</Text>
          </Pressable>
        </View>

        {/* All Props Now Supported */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Props Now Supported</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✅ Custom content previews</Text>
            <Text style={styles.featureItem}>✅ Navigation previews</Text>
            <Text style={styles.featureItem}>✅ Popover and sheet variants</Text>
            <Text style={styles.featureItem}>✅ Size customization (auto, number, object)</Text>
            <Text style={styles.featureItem}>✅ dismissOnBackdropPress control</Text>
            <Text style={styles.featureItem}>✅ dismissOnPanDown control</Text>
            <Text style={styles.featureItem}>✅ Accessibility support (label, role)</Text>
            <Text style={styles.featureItem}>✅ Animation callbacks (onOpenStart, onOpenEnd, etc.)</Text>
            <Text style={styles.featureItem}>✅ Smooth animations with Reanimated</Text>
            <Text style={styles.featureItem}>✅ TypeScript support</Text>
            <Text style={styles.featureItem}>✅ Works with any navigation system</Text>
          </View>
        </View>

        {/* Usage Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use QuickPreview</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
{`// 1. Install the package
npm install react-native-quick-preview

// 2. Add required dependencies
npm install react-native-reanimated react-native-safe-area-context react-native-portalize react-native-gesture-handler

// 3. Wrap your app with PreviewProvider
import { PreviewProvider } from 'react-native-quick-preview'

<PreviewProvider>
  <YourApp />
</PreviewProvider>

// 4. Use the static API anywhere in your app
import { QuickPreview } from 'react-native-quick-preview'

// Show custom content preview
QuickPreview.present(<YourCustomContent />, {
  variant: 'popover', // or 'sheet'
  size: { maxWidth: 400, maxHeight: 600 }, // or number or 'auto'
  dismissOnBackdropPress: true,
  dismissOnPanDown: true,
  accessibilityLabel: 'Custom preview',
  accessibilityRole: 'dialog',
  onOpenStart: () => console.log('Opening...'),
  onOpenEnd: () => console.log('Opened!'),
  onCloseStart: () => console.log('Closing...'),
  onCloseEnd: () => console.log('Closed!')
})

// Show navigation preview
QuickPreview.presentNavigation({
  route: '/your-route',
  title: 'Page Title',
  description: 'Page description',
  image: 'https://example.com/image.jpg',
  metadata: { 'Key': 'Value' }
}, {
  onNavigate: (route, params) => {
    // Your navigation logic here
    router.push(route, params)
  }
})

// Close current preview
QuickPreview.close()

// Check if preview is open
if (QuickPreview.isOpen()) {
  // Do something
}`}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Simple Modal for Preview */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.modalOverlay} onPress={close}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            {content}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  previewContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 300,
    maxWidth: 400,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    alignSelf: 'center',
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  previewSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  previewPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  previewDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  codeBlock: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  codeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  featureList: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  featureItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
  },
  // Instagram Grid Styles
  instagramGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  instagramTile: {
    width: POST_SIZE,
    height: POST_SIZE,
    position: 'relative',
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 6,
  },
  instagramGridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  instagramGridPill: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramGridPillText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 4,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f5',
  },
  fallbackText: {
    fontSize: 12,
    color: '#999',
  },
  // Instagram Preview Styles
  instagramPreview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 300,
    maxWidth: 400,
  },
  instagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  instagramAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  instagramUsername: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  instagramImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  instagramViewsChip: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramViewsText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 4,
  },
  instagramContent: {
    padding: 16,
  },
  instagramTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  instagramSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  instagramDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  instagramTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  instagramTag: {
    fontSize: 12,
    color: '#0095f6',
    fontWeight: '500',
  },
})  