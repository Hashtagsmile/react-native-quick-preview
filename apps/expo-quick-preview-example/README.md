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
│   │   ├── feed.tsx         # Instagram-style feed: long-press a photo → popover peek → post
│   │   ├── shop.tsx         # e-commerce store: long-press a product → sheet quick-view → product
│   │   └── api.tsx          # code entry points (hook / static / headless / scrollview)
│   └── detail.tsx           # full post / product page (shared navigation target)
├── components/              # PostPreview + ProductPreview (the peek content)
├── theme.ts                 # colors / spacing / radius / type
└── data/                    # demo data
```

The app leads with two real use cases — a social **Feed** and an e-commerce **Shop** — so you
can see *why* you'd want quick preview, then an **API** tab for *how* to call it.

## What you'll see

- **Feed:** long-press a photo to peek the post, tap the peek to open it (popover variant)
- **Shop:** long-press a product for a bottom-sheet quick-view with price + rating, tap to buy (sheet variant)
- **API:** the hook, the static handle, the headless component, and scrollable previews — with copy-paste code
