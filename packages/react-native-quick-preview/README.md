# react-native-quick-preview

[![npm](https://img.shields.io/npm/v/react-native-quick-preview.svg)](https://www.npmjs.com/package/react-native-quick-preview)
[![CI](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml/badge.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/blob/main/LICENSE)

A headless quick-preview modal for React Native — long-press an item, peek at its content, swipe down to dismiss. Think Instagram's long-press preview, with an API in the style of Gorhom Bottom Sheet: mount one provider, then present any content from anywhere.

- Headless: you render the preview content, the library handles presentation
- Two variants: centered `popover` and bottom `sheet`
- Present from a hook (`useQuickPreview`) or a static API (`QuickPreview.present`) — works outside React components
- Swipe-to-dismiss, backdrop press, Android back button
- Screen-reader announcements and accessibility labels
- Full TypeScript types, CJS + ESM builds

![Demo](https://raw.githubusercontent.com/Hashtagsmile/react-native-quick-preview/main/demogif.gif)

## Installation

```bash
npm install react-native-quick-preview
```

Peer dependencies (skip any your app already has):

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context
npm install react-native-portalize
```

For bare React Native, install the same packages with npm and follow each library's setup guide. `react-native-reanimated` requires its Babel plugin — Expo includes this via `babel-preset-expo`.

Optional: `expo-haptics` for haptic feedback in `QuickPreviewPressable`.

## Quick start

Mount the provider once, near the root of your app (inside `GestureHandlerRootView`):

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PreviewProvider } from 'react-native-quick-preview'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreviewProvider>
        <YourApp />
      </PreviewProvider>
    </GestureHandlerRootView>
  )
}
```

Then present any content from any screen:

```tsx
import { View, Text, Pressable } from 'react-native'
import { useQuickPreview } from 'react-native-quick-preview'

function ProductCard({ product }: { product: Product }) {
  const { present } = useQuickPreview()

  return (
    <Pressable
      onLongPress={() =>
        present(
          <View style={{ backgroundColor: '#fff', padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>{product.name}</Text>
            <Text>{product.description}</Text>
          </View>,
          { variant: 'popover', dismissOnBackdropPress: true }
        )
      }
    >
      <Text>{product.name}</Text>
    </Pressable>
  )
}
```

## Presenting from outside components

`QuickPreview` is a static handle to the same controller — usable in event handlers, services, or anywhere React context isn't available. It warns (in dev) and no-ops if the provider isn't mounted.

```tsx
import { QuickPreview } from 'react-native-quick-preview'

QuickPreview.present(<MyPreviewContent />, { variant: 'sheet' })
QuickPreview.update({ size: { maxHeight: 480 } })
QuickPreview.isOpen() // boolean
QuickPreview.close()
```

## QuickPreviewPressable

A drop-in wrapper that wires up the long-press-to-preview / tap-to-navigate pattern, with a press-down scale animation and optional haptics:

```tsx
import { QuickPreviewPressable } from 'react-native-quick-preview'

<QuickPreviewPressable
  onPress={() => router.push(`/product/${product.id}`)}
  renderPreview={() => <ProductPreview product={product} />}
  previewOptions={{ variant: 'popover' }}
  delay={350}          // long-press delay in ms
  haptics="medium"     // 'light' | 'medium' | 'heavy' | false (needs expo-haptics)
>
  <ProductCard product={product} />
</QuickPreviewPressable>
```

## Scrollable previews

Use `QuickPreviewScrollView` instead of a plain `ScrollView` inside preview content so scrolling and the swipe-to-dismiss gesture don't fight each other:

```tsx
import { QuickPreviewScrollView } from 'react-native-quick-preview'

present(
  <QuickPreviewScrollView>
    <LongArticleContent />
  </QuickPreviewScrollView>,
  { variant: 'sheet' }
)
```

## API reference

### `present(node, options?)`

Available from `useQuickPreview()` and `QuickPreview`. Presents `node` as the preview content. Calling it while a preview is open replaces the content.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'popover' \| 'sheet'` | `'popover'` | Centered card or bottom sheet |
| `size` | `'auto' \| number \| { maxHeight?, maxWidth? }` | `'auto'` | Constrains the preview container |
| `dismissOnBackdropPress` | `boolean` | `true` | Close when the backdrop is tapped |
| `dismissOnPanDown` | `boolean` | `true` | Close on swipe-down gesture |
| `accessibilityLabel` | `string` | — | Label announced for the preview container |
| `onOpenStart` / `onOpenEnd` | `() => void` | — | Open animation lifecycle |
| `onCloseStart` / `onCloseEnd` | `() => void` | — | Close animation lifecycle |

### Controller

Both `useQuickPreview()` and the static `QuickPreview` expose:

| Method | Description |
| --- | --- |
| `present(node, options?)` | Open a preview with the given content |
| `close()` | Dismiss the current preview |
| `update(options)` | Merge new options into the open preview |
| `isOpen()` | Whether a preview is currently open |

### Exports

| Export | Kind | Purpose |
| --- | --- | --- |
| `PreviewProvider` | Component | Hosts the preview layer; mount once at the root |
| `useQuickPreview` | Hook | Controller from React context (throws outside the provider) |
| `QuickPreview` | Object | Static controller handle (safe no-op before mount) |
| `QuickPreviewPressable` | Component | Long-press-to-preview wrapper with tap-through |
| `QuickPreviewScrollView` | Component | Gesture-aware ScrollView for preview content |
| `QuickPreviewComponent` | Component | Low-level headless component, for fully custom hosts |
| `QuickPreviewOptions`, `QuickPreviewVariant`, `QuickPreviewSize`, `QuickPreviewController` | Types | Public TypeScript types |

## Accessibility

- Open/close is announced to screen readers (`AccessibilityInfo.announceForAccessibility`)
- The Android hardware back button closes an open preview
- `accessibilityLabel` on the container is forwarded to assistive tech
- The backdrop is an accessible "close" target

## Example app

The [repository](https://github.com/Hashtagsmile/react-native-quick-preview) contains an Expo example app with e-commerce, article and travel preview patterns:

```bash
git clone https://github.com/Hashtagsmile/react-native-quick-preview.git
cd react-native-quick-preview
npm install
npm run build
npm run example
```

## Versioning

This package follows semver. See the [CHANGELOG](https://github.com/Hashtagsmile/react-native-quick-preview/blob/main/CHANGELOG.md) for release notes. Version 2.0.0 replaced the v1 `<QuickPreview visible onClose>` component API with the provider + controller architecture documented here — v1 code will not compile against v2.

## License

MIT © Oliver Lindblad
