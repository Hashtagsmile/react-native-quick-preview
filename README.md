# react-native-quick-preview

[![npm](https://img.shields.io/npm/v/react-native-quick-preview.svg)](https://www.npmjs.com/package/react-native-quick-preview)
[![CI](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml/badge.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Long-press an item to peek at its content, swipe down to dismiss. A headless quick-preview library for React Native: mount one `PreviewProvider`, then `present()` any content from a hook or a static handle.

This is the development monorepo. **If you just want to use the library, read the [package README](packages/react-native-quick-preview/README.md)** for installation, quick start and the full API. It's the same document you see on [npm](https://www.npmjs.com/package/react-native-quick-preview).

<p align="center">
  <img src="./demogif.gif" alt="Quick preview demo" width="420" />
</p>

## Repository layout

```
├── packages/
│   └── react-native-quick-preview/    # The published library
│       ├── src/
│       │   ├── index.ts               # Public exports
│       │   ├── context.tsx            # PreviewProvider + controller context
│       │   ├── QuickPreviewAPI.ts     # Static QuickPreview handle
│       │   ├── useQuickPreview.ts     # Hook
│       │   ├── types.ts               # Public types
│       │   ├── headless/              # Low-level headless component
│       │   ├── internal/              # Containers, backdrop, scroll view
│       │   └── addons/                # QuickPreviewPressable
│       └── tsup.config.ts             # CJS + ESM + d.ts build
├── apps/
│   └── expo-quick-preview-example/    # Expo example app (Expo Router)
├── .github/workflows/                 # CI + release automation
└── CHANGELOG.md                       # Release history
```

## Development

Requires Node 18+ and npm 10 (npm workspaces).

```bash
git clone https://github.com/Hashtagsmile/react-native-quick-preview.git
cd react-native-quick-preview
npm install

npm run build        # build the library (tsup: CJS + ESM + types)
npm run type-check   # TypeScript, no emit
npm run lint         # ESLint over the library source
npm run example      # start the Expo example app
```

The example app consumes the library through a `file:` reference, so rebuild with `npm run build` to see library changes in the example.

The example app in `apps/expo-quick-preview-example` shows the patterns the library is meant for: product previews in a grid, article teasers, travel cards. Long-press to open, swipe down to close, tap to navigate. Run it with Expo Go or a simulator (`npm run example:ios` / `npm run example:android`).

## CI and releases

CI ([ci.yml](.github/workflows/ci.yml)) runs on every push and PR to `main`: install, type check, lint, unit tests, build, and a `npm pack --dry-run` to verify what would be published.

Releases are automatic. When the package version changes on `main`, the [release workflow](.github/workflows/release.yml) re-runs all checks, publishes to npm with provenance, then tags `v<version>` and creates a GitHub Release. If the version is already on npm it does nothing, so ordinary pushes are safe. It needs an `NPM_TOKEN` repository secret (npm automation token). It can also be run manually from the Actions tab, including as a dry run.

To cut a release:

1. Bump `version` in `packages/react-native-quick-preview/package.json`
2. Add a section to [CHANGELOG.md](CHANGELOG.md)
3. Push (or merge) to `main` — the rest happens on its own

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: fork, branch from `main`, make sure `npm run type-check`, `npm run lint` and `npm run build` pass, and open a PR.

## License

MIT © [Oliver Lindblad](https://github.com/Hashtagsmile)
