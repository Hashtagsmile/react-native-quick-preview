# React Native Quick Preview

A beautiful, customizable quick preview modal component for React Native with navigation preview support.

## Features

- 🚀 **Navigation Previews**: Preview destinations before navigating
- 🎨 **Multiple Variants**: Popover and sheet presentations
- ⚡ **Smooth Animations**: Powered by React Native Reanimated
- ♿ **Accessibility**: Full accessibility support
- 📱 **Cross-Platform**: Works on iOS and Android
- 🔧 **TypeScript**: Full TypeScript support
- 🎯 **Flexible**: Works with any navigation system

## Installation

```bashs
npm install react-native-quick-preview
```

### Required Dependencies

```bash
npm install  react-native-safe-area-context
```

## Quick Start

### 1. Wrap your app with PreviewProvider

```tsx
import { PreviewProvider } from 'react-native-quick-preview'

export default function App() {
  return (
    <PreviewProvider>
      <YourApp />
    </PreviewProvider>
  )
}
```

### 2. Use the hook in any component

```tsx
import { useQuickPreview } from 'react-native-quick-preview'

function MyComponent() {
  const { present, presentNavigation } = useQuickPreview()
  
  // Your component logic
}
```

## Navigation Previews

The navigation preview feature allows users to preview destinations before navigating, similar to Instagram's long-press preview.

### Basic Usage

```tsx
import { useQuickPreview } from 'react-native-quick-preview'
import { useRouter } from 'expo-router' // or your navigation system

function MyComponent() {
  const { presentNavigation } = useQuickPreview()
  const router = useRouter()

  const handleNavigate = (route: string, params?: Record<string, any>) => {
    // Your navigation logic
    router.push(route, params)
  }

  const navigationPreview = {
    route: '/profile/johndoe',
    title: 'John Doe Profile',
    description: 'View John Doe\'s complete profile with posts, followers, and more.',
    image: 'https://example.com/profile.jpg',
    metadata: {
      'Followers': '1.2K',
      'Posts': '45',
      'Following': '890'
    }
  }

  return (
    <Pressable 
      onLongPress={() => presentNavigation(navigationPreview, {
        onNavigate: handleNavigate,
        variant: 'popover'
      })}
      onPress={() => router.push('/profile/johndoe')}
    >
      <Text>View Profile</Text>
    </Pressable>
  )
}
```

### Navigation Preview Data Structure

```tsx
type NavigationPreview = {
  route: string                    // The route to navigate to
  params?: Record<string, any>     // Optional route parameters
  title?: string                   // Preview title
  description?: string             // Preview description
  image?: string                   // Preview image URL
  metadata?: Record<string, any>   // Additional metadata to display
}
```

### Advanced Navigation Preview

```tsx
// E-commerce product preview
const productPreview = {
  route: '/product/123',
  title: 'Premium Headphones',
  description: 'High-quality wireless headphones with noise cancellation.',
  image: 'https://example.com/headphones.jpg',
  metadata: {
    'Price': '$299',
    'Rating': '4.8/5',
    'Reviews': '1.2K',
    'Availability': 'In Stock'
  }
}

// Article preview
const articlePreview = {
  route: '/article/breaking-news',
  title: 'Breaking News Article',
  description: 'Read the full article about the latest developments.',
  image: 'https://example.com/article.jpg',
  metadata: {
    'Author': 'Jane Smith',
    'Read time': '5 min',
    'Category': 'Technology',
    'Published': '2 hours ago'
  }
}

// User profile preview
const profilePreview = {
  route: '/profile/johndoe',
  title: 'John Doe',
  description: 'Software developer passionate about creating amazing user experiences.',
  image: 'https://example.com/avatar.jpg',
  metadata: {
    'Followers': '1.2K',
    'Posts': '45',
    'Following': '890',
    'Location': 'San Francisco'
  }
}
```

## Custom Content Previews

You can also show custom content previews:

```tsx
import { useQuickPreview } from 'react-native-quick-preview'

function MyComponent() {
  const { present } = useQuickPreview()

  const CustomPreview = () => (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Custom Content</Text>
      <Text>This is your custom preview content!</Text>
    </View>
  )

  return (
    <Pressable onPress={() => present(<CustomPreview />, { variant: 'popover' })}>
      <Text>Show Custom Preview</Text>
    </Pressable>
  )
}
```

## API Reference

### useQuickPreview Hook

```tsx
const { present, presentNavigation, close, update, isOpen } = useQuickPreview()
```

#### Methods

- `present(node, options?)` - Show custom content preview
- `presentNavigation(navigation, options?)` - Show navigation preview
- `close()` - Close the current preview
- `update(options)` - Update preview options
- `isOpen()` - Check if preview is currently open

### QuickPreviewOptions

```tsx
type QuickPreviewOptions = {
  variant?: 'popover' | 'sheet'           // Presentation variant
  size?: 'auto' | number | { maxHeight?: number; maxWidth?: number }
  dismissOnBackdropPress?: boolean        // Default: true
  dismissOnPanDown?: boolean              // Default: true
  accessibilityLabel?: string
  onOpenStart?: () => void
  onOpenEnd?: () => void
  onCloseStart?: () => void
  onCloseEnd?: () => void
  onNavigate?: (route: string, params?: Record<string, any>) => void
}
```

### NavigationPreview

```tsx
type NavigationPreview = {
  route: string
  params?: Record<string, any>
  title?: string
  description?: string
  image?: string
  metadata?: Record<string, any>
}
```

## Examples

### E-commerce App

```tsx
// Product grid with preview
function ProductGrid() {
  const { presentNavigation } = useQuickPreview()
  const router = useRouter()

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => presentNavigation({
            route: `/product/${item.id}`,
            title: item.name,
            description: item.description,
            image: item.image,
            metadata: {
              'Price': item.price,
              'Rating': item.rating,
              'Reviews': item.reviewCount
            }
          }, {
            onNavigate: (route) => router.push(route)
          })}
          onPress={() => router.push(`/product/${item.id}`)}
        >
          <ProductCard product={item} />
        </Pressable>
      )}
    />
  )
}
```

### Social Media App

```tsx
// User list with profile previews
function UserList() {
  const { presentNavigation } = useQuickPreview()
  const router = useRouter()

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => presentNavigation({
            route: `/profile/${item.username}`,
            title: item.displayName,
            description: item.bio,
            image: item.avatar,
            metadata: {
              'Followers': item.followerCount,
              'Posts': item.postCount,
              'Following': item.followingCount
            }
          }, {
            onNavigate: (route) => router.push(route)
          })}
          onPress={() => router.push(`/profile/${item.username}`)}
        >
          <UserCard user={item} />
        </Pressable>
      )}
    />
  )
}
```

### News App

```tsx
// Article list with previews
function ArticleList() {
  const { presentNavigation } = useQuickPreview()
  const router = useRouter()

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => presentNavigation({
            route: `/article/${item.slug}`,
            title: item.title,
            description: item.excerpt,
            image: item.featuredImage,
            metadata: {
              'Author': item.author,
              'Read time': item.readTime,
              'Category': item.category,
              'Published': item.publishedAt
            }
          }, {
            onNavigate: (route) => router.push(route)
          })}
          onPress={() => router.push(`/article/${item.slug}`)}
        >
          <ArticleCard article={item} />
        </Pressable>
      )}
    />
  )
}
```

## Customization

### Custom Preview Component

```tsx
const CustomNavigationPreview = ({ navigation, onNavigate, onClose }) => (
  <View style={styles.customPreview}>
    <Image source={{ uri: navigation.image }} style={styles.image} />
    <Text style={styles.title}>{navigation.title}</Text>
    <Text style={styles.description}>{navigation.description}</Text>
    <View style={styles.actions}>
      <Button title="Cancel" onPress={onClose} />
      <Button title="Navigate" onPress={() => onNavigate(navigation.route)} />
    </View>
  </View>
)

// Use custom component
presentNavigation(navigationData, {
  onNavigate: handleNavigate,
  renderContent: (props) => <CustomNavigationPreview {...props} />
})
```

### Custom Animations

```tsx
presentNavigation(navigationData, {
  onNavigate: handleNavigate,
  variant: 'sheet',
  animationDuration: 300,
  onOpenStart: () => console.log('Opening preview...'),
  onOpenEnd: () => console.log('Preview opened!'),
  onCloseStart: () => console.log('Closing preview...'),
  onCloseEnd: () => console.log('Preview closed!')
})
```

## Platform Support

- ✅ iOS
- ✅ Android
- ✅ Expo (with required dependencies)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.
