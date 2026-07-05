# Changelog

All notable changes to `react-native-quick-preview` are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.0] - Unreleased

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

### Internal

- Unit test suite (Jest + Testing Library) covering the provider contract, the static handle, size resolution, and the headless component; tests run in CI on Node 18/20/22.
- Removed a dead v1 types file; the library now lints with zero warnings.

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
