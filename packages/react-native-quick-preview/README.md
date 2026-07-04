# react-native-quick-preview

[![npm](https://img.shields.io/npm/v/react-native-quick-preview.svg)](https://www.npmjs.com/package/react-native-quick-preview)
[![CI](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml/badge.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/blob/main/LICENSE)

Long-press an item to peek at its content, swipe down to dismiss. The kind of preview you know from Instagram or iOS Peek & Pop, as a small headless library for React Native.

I wanted this pattern in my own apps and couldn't find a maintained library for it, so I built one. The API follows the approach popularized by [Gorhom's bottom sheet](https://github.com/gorhom/react-native-bottom-sheet): mount a provider once, then present from anywhere.

![Demo](https://raw.githubusercontent.com/Hashtagsmile/react-native-quick-preview/main/demogif.gif)

What you get:

- Headless: you render the preview content, the library handles presentation, gestures and dismissal
- Two variants: centered `popover` and bottom `sheet`
- Present from a hook, or from a static handle that also works outside React components
- Swipe-to-dismiss, backdrop press, Android back button handling
- Screen reader announcements and accessibility labels
- TypeScript types, CJS + ESM builds, zero dependencies of its own

## Installation

```bash
npm install react-native-quick-preview
```

Peer dependencies (skip any your app already has):

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-safe-area-context
npm install react-native-portalize
```

Bare React Native works too: install the same packages with npm and follow each library's setup guide. Note that `react-native-reanimated` needs its Babel plugin; Expo sets this up for you via `babel-preset-expo`.

If you want haptic feedback in `QuickPreviewPressable`, also install `expo-haptics`. It's optional and detected at runtime.

## Quick start

Mount the provider once near the root of your app, inside `GestureHandlerRootView`:

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

Then present content from any screen:

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
          { variant: 'popover' }
        )
      }
    >
      <Text>{product.name}</Text>
    </Pressable>
  )
}
```

That's the whole integration. The preview renders in a portal above your app, so it doesn't matter where in the tree you call `present` from.

## Presenting from outside components

`QuickPreview` is a static handle to the same controller. Use it in event handlers, services, or anywhere React context isn't available. Before the provider mounts it's a safe no-op (with a warning in dev builds).

```tsx
import { QuickPreview } from 'react-native-quick-preview'

QuickPreview.present(<MyPreviewContent />, { variant: 'sheet' })
QuickPreview.update({ size: { maxHeight: 480 } })
QuickPreview.isOpen() // boolean
QuickPreview.close()
```

## QuickPreviewPressable

Most of the time you want the same thing: long-press opens a preview, a normal tap navigates. `QuickPreviewPressable` wires that up, including a press-down scale animation and optional haptics:

```tsx
import { QuickPreviewPressable } from 'react-native-quick-preview'

<QuickPreviewPressable
  onPress={() => router.push(`/product/${product.id}`)}
  renderPreview={() => <ProductPreview product={product} />}
  previewOptions={{ variant: 'popover' }}
  delay={350}          // long-press delay in ms
  haptics="medium"     // 'light' | 'medium' | 'heavy' | false
>
  <ProductCard product={product} />
</QuickPreviewPressable>
```

## Scrollable previews

If the preview content scrolls, use `QuickPreviewScrollView` instead of a plain `ScrollView`. Otherwise the scroll gesture and the swipe-to-dismiss gesture fight each other.

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

Available from `useQuickPreview()` and the static `QuickPreview`. Presents `node` as the preview content. Calling it while a preview is open replaces the content.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'popover' \| 'sheet'` | `'popover'` | Centered card or bottom sheet |
| `size` | `'auto' \| number \| { maxHeight?, maxWidth? }` | `'auto'` | Constrains the preview container |
| `dismissOnBackdropPress` | `boolean` | `true` | Close when the backdrop is tapped |
| `dismissOnPanDown` | `boolean` | `true` | Close on swipe-down gesture |
| `accessibilityLabel` | `string` | | Label announced for the preview container |
| `onOpenStart` / `onOpenEnd` | `() => void` | | Open animation lifecycle |
| `onCloseStart` / `onCloseEnd` | `() => void` | | Close animation lifecycle |

### Controller

Both `useQuickPreview()` and the static `QuickPreview` expose:

| Method | Description |
| --- | --- |
| `present(node, options?)` | Open a preview with the given content |
| `close()` | Dismiss the current preview |
| `update(options)` | Merge new options into the open preview |
| `isOpen()` | Whether a preview is currently open |

### Exports

| Export | Purpose |
| --- | --- |
| `PreviewProvider` | Hosts the preview layer; mount once at the root |
| `useQuickPreview` | Controller from React context (throws outside the provider) |
| `QuickPreview` | Static controller handle (safe no-op before mount) |
| `QuickPreviewPressable` | Long-press-to-preview wrapper with tap-through |
| `QuickPreviewScrollView` | Gesture-aware ScrollView for preview content |
| `QuickPreviewComponent` | Low-level headless component, for fully custom hosts |
| `QuickPreviewOptions`, `QuickPreviewVariant`, `QuickPreviewSize`, `QuickPreviewController` | Public TypeScript types |

## Accessibility

Open and close are announced to screen readers via `AccessibilityInfo.announceForAccessibility`, the Android hardware back button closes an open preview, the backdrop is an accessible close target, and `accessibilityLabel` on the container is forwarded to assistive tech.

## Example app

The [repo](https://github.com/Hashtagsmile/react-native-quick-preview) contains an Expo example app with e-commerce, article and travel preview patterns:

```bash
git clone https://github.com/Hashtagsmile/react-native-quick-preview.git
cd react-native-quick-preview
npm install
npm run build
npm run example
```

## Versioning

This package follows semver. Release notes live in the [CHANGELOG](https://github.com/Hashtagsmile/react-native-quick-preview/blob/main/CHANGELOG.md).

Heads up if you're coming from 1.x: version 2.0.0 replaced the old `<QuickPreview visible onClose>` component with the provider + controller architecture described above. v1 code will not compile against v2. The changelog has migration notes.

## License

MIT © Oliver Lindblad
