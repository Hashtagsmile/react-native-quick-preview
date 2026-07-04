# Contributing to react-native-quick-preview

Thanks for your interest in contributing! This document covers how to report issues, propose changes, and get a pull request merged.

## Reporting bugs

Check existing issues first to avoid duplicates. A useful bug report includes:

- A clear title and description of the problem
- Steps to reproduce, expected vs. actual behavior
- Environment details: React Native version, platform (iOS/Android), device or emulator, Expo version if applicable
- A minimal code example, and screenshots or a screen recording if the issue is visual

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

## Suggesting features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Explain the use case, why it belongs in this library (it's intentionally headless and small), and sketch how the API would look.

## Pull requests

### Setup

```bash
git clone https://github.com/<your-fork>/react-native-quick-preview.git
cd react-native-quick-preview
npm install
npm run build      # build the library
npm run example    # run the Expo example app
```

Requires Node 18+ and npm 10.

### Workflow

1. Create a branch from `main` (`feat/your-feature` or `fix/your-bug`).
2. Make your changes in `packages/react-native-quick-preview/src/`.
3. Verify locally — the same checks CI runs:
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```
4. Test the behavior in the example app on iOS and/or Android.
5. Update documentation (package README, example app) when the public API changes, and add an entry to `CHANGELOG.md` under an "Unreleased" heading.
6. Open a PR against `main` and make sure CI is green.

### Commit messages

Use Conventional Commits:

```
feat(pressable): add configurable long-press delay
fix(sheet): prevent backdrop tap during close animation
docs(readme): update peer dependency instructions
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

### Code style

- TypeScript with strict typing; avoid `any`
- JSDoc comments on public APIs
- Follow the existing formatting and import organization; `npm run lint` must pass with no errors

### Manual testing checklist

- [ ] Works on iOS and Android
- [ ] Popover and sheet variants open, close, and swipe-dismiss correctly
- [ ] Screen-reader announcements and labels work
- [ ] No warnings or errors in the Metro console
- [ ] `type-check`, `lint`, and `build` all pass

## Project structure

```
packages/react-native-quick-preview/
├── src/
│   ├── index.ts               # Public exports
│   ├── context.tsx            # PreviewProvider + controller context
│   ├── QuickPreviewAPI.ts     # Static QuickPreview handle
│   ├── useQuickPreview.ts     # Hook
│   ├── types.ts               # Public types
│   ├── headless/              # Low-level headless component
│   ├── internal/              # Containers, backdrop, scroll view
│   └── addons/                # QuickPreviewPressable
└── tsup.config.ts             # Build configuration

apps/expo-quick-preview-example/   # Expo Router example app
```

## Releases (maintainers)

1. Bump `version` in `packages/react-native-quick-preview/package.json`.
2. Move the "Unreleased" CHANGELOG entries under the new version heading.
3. Commit, push, and wait for CI to pass.
4. Run the **Release** workflow from the GitHub Actions tab — it publishes to npm with provenance and creates the tag and GitHub Release.

## Community

Be respectful and constructive. For questions, open a GitHub issue or discussion. All contributors are credited in the GitHub contributors list and release notes for significant work.
