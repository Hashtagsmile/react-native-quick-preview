# react-native-quicklook

A beautiful, customizable quick preview modal component for React Native.  
Think **Gorhom Bottom Sheet**, but for quick previews.

Perfect for:
- Instagram-style **long-press previews**
- 🛍️ **E-commerce product quick views**
- 📰 **Article teasers**
- ✈️ **Travel destination peeks**
- …any content that needs a **quick peek before full navigation**

---

## ✨ Features

- 🎨 Smooth **fade, scale, and swipe-to-close animations**
- 🎯 **Universal content** – works with any layout (products, posts, etc.)
- 🎛️ **Customizable** – theme, behavior, styling, backdrop
- ♿ **Accessibility ready** – screen reader & keyboard navigation
- 📱 **Cross-platform** – iOS & Android
- 🔧 **TypeScript support**
- ⚡ **Performance optimized** – native drivers

---

## 📦 Installation

```bash
npm install react-native-quicklook
# or
yarn add react-native-quicklook
```

---

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { QuickLook } from 'react-native-quicklook';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Show Quick Look</Text>
      </TouchableOpacity>

      <QuickLook visible={visible} onClose={() => setVisible(false)}>
        <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quick Preview Content</Text>
          <Text style={{ marginTop: 10 }}>Any custom content goes here.</Text>
        </View>
      </QuickLook>
    </View>
  );
}
```

---

## 📖 Usage Examples

### 🛍️ E-commerce Product Quick View
```tsx
<QuickLook visible={visible} onClose={onClose} onPressCard={onViewDetails}>
  <View>
    <Image source={{ uri: product.image }} style={{ width: '100%', height: 200 }} />
    <Text>{product.name}</Text>
    <Text>{product.price}</Text>
  </View>
</QuickLook>
```

### 📰 Article Preview
```tsx
<QuickLook visible={visible} onClose={onClose} theme="dark">
  <View style={{ backgroundColor: '#1a1a1a' }}>
    <Image source={{ uri: article.coverImage }} style={{ width: '100%', height: 200 }} />
    <Text style={{ color: '#fff' }}>{article.title}</Text>
    <Text style={{ color: '#ccc' }}>{article.excerpt}</Text>
  </View>
</QuickLook>
```

### ✈️ Travel Destination Peek
```tsx
<QuickLook visible={visible} onClose={onClose}>
  <Image source={{ uri: destination.image }} style={{ width: '100%', height: 200 }} />
  <Text>{destination.title}</Text>
  <Text>From ${destination.price}</Text>
</QuickLook>
```

---

## 🎛️ API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Controls modal visibility |
| `onClose` | `() => void` | **required** | Called when modal closes |
| `onPressCard` | `() => void` | `undefined` | Card press handler |
| `children` | `React.ReactNode` | `undefined` | Content to render |
| `theme` | `'light' \| 'dark'` | `'light'` | Overlay theme |
| `backdropOpacity` | `number` | `0.5 / 0.8` | Overlay opacity |
| `animationDuration` | `number` | `220` | Animation duration |
| `closeOnBackdropPress` | `boolean` | `true` | Close on backdrop press |
| `closeOnBackButton` | `boolean` | `true` | Close on Android back button |
| `enableSwipeToClose` | `boolean` | `true` | Swipe down to close |
| `swipeThreshold` | `number` | `80` | Swipe distance threshold |
| `unmountOnExit` | `boolean` | `true` | Unmount when hidden |
| `avoidKeyboard` | `boolean` | `false` | Avoid keyboard overlap |
| `renderBackdrop` | `(opacity) => ReactNode` | `undefined` | Custom backdrop |
| `onBackdropPress` | `() => void` | `undefined` | Backdrop press handler |
| `testID` | `string` | `'quicklook'` | Test identifier |
| `accessibilityLabel` | `string` | `'Quick look'` | A11y label |
| `stylesOverride` | `object` | `{}` | Override default styles |

---

## 🎨 Customization

### Custom Backdrop
```tsx
<QuickLook
  visible={visible}
  onClose={onClose}
  renderBackdrop={(opacity) => (
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,0,0,0.5)', opacity }]} />
  )}
>
  {/* content */}
</QuickLook>
```

### Custom Styles
```tsx
<QuickLook
  visible={visible}
  onClose={onClose}
  stylesOverride={{
    container: { borderRadius: 24, backgroundColor: '#000' },
    overlay: { backgroundColor: 'rgba(0,0,0,0.9)' }
  }}
>
  {/* content */}
</QuickLook>
```

---

## 🧪 Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';

test('QuickLook closes on backdrop press', () => {
  const onClose = jest.fn();
  const { getByTestId } = render(
    <QuickLook visible={true} onClose={onClose} testID="quicklook">
      <Text>Test content</Text>
    </QuickLook>
  );

  fireEvent.press(getByTestId('ql-backdrop'));
  expect(onClose).toHaveBeenCalled();
});
```

---

## 📱 Platform Support
- ✅ iOS 12+
- ✅ Android API 21+
- ✅ Expo SDK 48+

---

## 📄 License

MIT © Your Name
