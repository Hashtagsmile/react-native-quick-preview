# react-native-quick-preview

[![npm](https://img.shields.io/npm/v/react-native-quick-preview.svg)](https://www.npmjs.com/package/react-native-quick-preview)
[![CI](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml/badge.svg)](https://github.com/Hashtagsmile/react-native-quick-preview/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A headless quick-preview modal for React Native. Long-press an item, peek at its content, swipe down to dismiss — Instagram-style previews with a Gorhom-Bottom-Sheet-style API: mount one `PreviewProvider`, then `present()` any content from a hook or a static handle.

This is the development monorepo. **If you just want to use the library, start with the [package README](packages/react-native-quick-preview/README.md)** — it has installation, quick start, and the full API reference. It's also what you see on [npm](https://www.npmjs.com/package/react-native-quick-preview).

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

The example app consumes the library through a `file:` reference to `packages/react-native-quick-preview`, so rebuild (`npm run build`) to see library changes in the example.

### Example app

`apps/expo-quick-preview-example` demonstrates the real-world patterns: e-commerce product previews, article previews, travel destination peeks, long-press to open, swipe down to close, tap to navigate. Run it with Expo Go or a simulator:

```bash
npm run example        # from the repo root
npm run example:ios    # or target a platform directly
npm run example:android
```

## CI and releases

- **CI** ([ci.yml](.github/workflows/ci.yml)) runs on every push and PR to `main`: install, type check, lint, build, and a `npm pack --dry-run` to verify the publish contents.
- **Release** ([release.yml](.github/workflows/release.yml)) is triggered manually from the Actions tab. It re-runs all checks, publishes to npm with provenance, then tags `v<version>` and creates a GitHub Release. It requires an `NPM_TOKEN` repository secret (npm automation token).

Release steps:

1. Bump `version` in `packages/react-native-quick-preview/package.json` (semver).
2. Add a section to [CHANGELOG.md](CHANGELOG.md).
3. Commit, push, and wait for CI to go green.
4. Run the **Release** workflow from the Actions tab.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). In short: fork, create a `feat/` or `fix/` branch, make sure `npm run type-check`, `npm run lint` and `npm run build` pass, and open a PR. Use the [issue templates](.github/ISSUE_TEMPLATE) for bugs and feature requests.

## License

MIT © [Oliver Lindblad](https://github.com/Hashtagsmile)
