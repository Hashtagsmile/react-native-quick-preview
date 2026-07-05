# Changelog

All notable changes to `react-native-quick-preview` are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-07-05

Complete rewrite from a single controlled component to a headless provider + controller architecture.

### Breaking changes

- The v1 `<QuickPreview visible={...} onClose={...}>` component API is gone. Mount `<PreviewProvider>` once at the app root and present content imperatively instead.
- v1 props (`visible`, `onClose`, `onPressCard`, `enableSwipeToClose`, `closeOnBackdropPress`, `theme`, `animationDuration`) no longer exist. See the migration notes below.
- `react-native-reanimated` (>= 3) is now a required peer dependency, alongside `react-native-gesture-handler`, `react-native-portalize`, and `react-native-safe-area-context`.

### Added

- `PreviewProvider` — hosts the preview layer; single mount point.
- `useQuickPreview()` — hook returning the controller (`present`, `close`, `update`, `isOpen`).
- `QuickPreview` — static controller handle with the same methods, usable outside React components (Gorhom-style). Safe no-op with a dev warning before the provider mounts.
- Two presentation variants: centered `popover` and bottom `sheet`, with `size` constraints (`auto`, fixed number, or `maxHeight`/`maxWidth`).
- `QuickPreviewPressable` — long-press-to-preview wrapper with press-down scale animation, tap-through `onPress`, and optional haptics via `expo-haptics`.
- `QuickPreviewScrollView` — gesture-aware scroll view so scrollable preview content doesn't fight the swipe-to-dismiss gesture.
- `QuickPreviewComponent` — the low-level headless component, exported for fully custom hosts.
- Animation lifecycle callbacks: `onOpenStart`, `onOpenEnd`, `onCloseStart`, `onCloseEnd`.
- Accessibility: screen-reader announcements on open/close, `accessibilityLabel` support, Android hardware back button closes the preview.
- ESM build (`dist/index.mjs`) alongside CJS and TypeScript declarations.

### Fixed

- `react-native-reanimated` was imported by the library but never declared as a peer dependency, crashing consumers that didn't already have it installed.
- Removed invalid `accessibilityRole="dialog"` (not a valid React Native accessibility role) from the popover and sheet containers; modality is handled on the root view.
- `present()` no longer merges options from the previous presentation into the next one — each `present` starts from a clean slate. Merging remains the job of `update()`.
- The `size` option is now actually applied: a number caps the preview's height, an object caps `maxHeight`/`maxWidth`, on both the popover and the sheet.
- `QuickPreviewPressable` no longer `require`s `expo-haptics` at module load. The optional require broke Metro bundling for every app that didn't have expo-haptics installed. Haptics are now injected via the new `onLongPressStart` callback (the `haptics` prop is gone).
- `QuickPreviewPressable` gesture callbacks are now worklet-safe: preview content is created on the JS thread via `runOnJS`, and the press-scale animation mutates the shared value directly inside the worklet instead of calling back into JS.
- Replaced the bouncy spring open animations with smooth ease-out timing. The popover scales in (`0.96 → 1`) and the sheet slides up with `Easing.out(Easing.cubic)` and no spring overshoot — the old `withSpring({ damping: 18 })` was underdamped and visibly bounced.
- Documented that tappable content **inside** a preview must use `react-native-gesture-handler` touchables, not React Native's — the preview renders in a gesture-handler overlay where RN's `Pressable`/`TouchableOpacity` don't reliably receive taps. Updated the example screens accordingly so tap-to-navigate works from an open preview.
- **The `react-native` entry now points to the TypeScript source, not the bundled `dist`.** A library that uses Reanimated worklets must let the *consumer's* Babel plugin transform them — esbuild-bundled output leaves the worklets untransformed, which on Reanimated 4 fails at runtime with "native module that doesn't exist". React Native / Metro now consumes `src`, so the consumer's Reanimated Babel plugin transforms the library's worklets correctly. The compiled `dist` (CJS/ESM/types) is retained for non-RN consumers via `main`/`module`/`types`. (This is the standard distribution model for Reanimated libraries — see [reanimated#4979](https://github.com/software-mansion/react-native-reanimated/discussions/4979).)

### Internal

- Full **TSDoc** across the public API — every `present()` option, the controller methods, the hook, the provider, the headless component props, and the scroll view, with `@example` blocks on the main entry points. The docs are preserved in the shipped `.d.ts`, so consumers get complete autocomplete and hover documentation in their editor.
- Unit test suite (Jest + Testing Library) covering the provider contract, the static handle, size resolution, and the headless component; runs in CI on Node 20/22/24. The library lints with zero warnings.
- Ships the TypeScript **source** to React Native (so the consumer's Reanimated Babel plugin transforms the worklets — see above) alongside compiled CJS/ESM/types for other tools; `__tests__` are excluded from the tarball.
- README documents when to use this library versus native context-menu libraries and Expo Router's `Link.Preview`, with **Requirements**, **Compatibility**, and **Limitations** sections and a 3-step "Add it to your app" guide.
- The example app is a **gallery of seven real-world use cases** — Social Feed (grid → popover peek), Shopping (grid → sheet quick-view), Music (list → peek with Play), Messages (long-press a shared link → peek its destination, the cross-platform answer to Expo Router's iOS-only `Link.Preview`), Places (map with pins → sheet peek), Team (directory → profile peek with quick actions), and Files (Quick Look → image popover / document scroll-sheet) — on Expo SDK 54, verified to bundle on both iOS and Android.

### Migration from 1.x

```tsx
// v1
<QuickPreview visible={visible} onClose={() => setVisible(false)}>
  <Content />
</QuickPreview>

// v2
const { present, close } = useQuickPreview()
present(<Content />, { variant: 'popover', dismissOnBackdropPress: true })
```

## [1.0.5] - 2025-08-24

### Fixed

- Corrected package metadata and repository links.

## [1.0.4] - 2025-08-24

Initial public release.

### Added

- `<QuickPreview>` controlled modal component with fade/scale animations, swipe-to-close, backdrop press handling, light/dark theme, and long-press-to-open examples.

[2.0.0]: https://github.com/Hashtagsmile/react-native-quick-preview/compare/v1.0.5...v2.0.0
[1.0.5]: https://www.npmjs.com/package/react-native-quick-preview/v/1.0.5
[1.0.4]: https://www.npmjs.com/package/react-native-quick-preview/v/1.0.4
