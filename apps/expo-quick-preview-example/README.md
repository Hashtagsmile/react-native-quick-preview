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
│   │   ├── examples.tsx     # gallery: a card per use case → opens the example screen
│   │   └── api.tsx          # code entry points (hook / static / headless / scrollview)
│   ├── examples/
│   │   ├── feed.tsx         # social Explore grid   → popover peek of a post
│   │   ├── shop.tsx         # e-commerce grid       → bottom-sheet quick-view
│   │   ├── music.tsx        # track list            → peek with Play
│   │   ├── chat.tsx         # messages thread       → peek a shared link's destination
│   │   ├── places.tsx       # map cards             → sheet place peek
│   │   └── people.tsx       # team directory        → profile peek with quick actions
│   └── detail.tsx           # full page (shared navigation target)
├── components/              # one *Preview per context + shared ExampleHeader
├── theme.ts                 # colors / spacing / radius / type
└── data/                    # demo data
```

Two tabs: **Examples** — a gallery of real-world screens (feed, shop, music, chat, places,
team), each showing quick preview in a context you already know — and **API**, the code
reference. New use cases are added as gallery cards, so the tab bar never grows.

## What you'll see

Long-press anything to peek, tap the peek to open it. Across the examples you'll see both
variants (popover / sheet) and the tap-through pattern in six real contexts — plus the
cross-platform link preview in **chat** that Expo Router's `Link.Preview` only does on iOS.
