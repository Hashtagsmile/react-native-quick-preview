# Expo QuickPreview example

The example app for [`react-native-quick-preview`](../../packages/react-native-quick-preview), built with Expo Router.

It demonstrates the library in real-world scenarios:

- E-commerce product previews
- News article teasers
- Travel destination quick views
- The `QuickPreviewPressable` addon and custom layouts

## Running the example

Prerequisites: Node 18+, dependencies installed in the monorepo root (`npm install`), and the library built (`npm run build`).

```bash
# from the repo root
npm run example
# or target a platform
npm run example:ios
npm run example:android
```

Run the app in the iOS Simulator, an Android emulator, or on a device with Expo Go.

## Structure

```
apps/expo-quick-preview-example/
├── app/             # Expo Router pages
├── components/      # Example components
└── data/            # Example data sets
```

## What you'll see

- Long-press cards to open a quick preview
- Swipe down or tap the backdrop to dismiss
- Tap to navigate to a detail screen
- Popover and sheet variants across different content types
