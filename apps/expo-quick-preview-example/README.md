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
├── app/
│   ├── (tabs)/
│   │   ├── start.tsx        # pitch + imperative useQuickPreview hero + gallery
│   │   ├── api.tsx          # the 3 code entry points (hook / static / headless)
│   │   └── components.tsx   # QuickPreviewPressable, QuickPreviewScrollView, options playground
│   └── detail.tsx           # shared navigation target
├── components/              # PreviewCard + PreviewTile (shared)
├── theme.ts                 # colors / spacing / radius / type
└── data/                    # demo data
```

Three tabs, one concept each: **Start** (what it does), **API** (how to call it from code),
**Components** (the declarative wrappers + every option).

## What you'll see

- Long-press cards to open a quick preview
- Tap the preview to navigate, or swipe / tap outside to dismiss
- Popover and sheet variants, plus the full option surface (size, dismiss flags, lifecycle callbacks)
