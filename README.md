# React Native QuickLook Workspace

[![npm](https://img.shields.io/npm/v/react-native-quicklook.svg)](https://www.npmjs.com/package/react-native-quicklook)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A monorepo containing the **`react-native-quicklook`** library and an **Expo example app** showcasing its usage.

> ⚡ Gorhom Bottom Sheet–style experience, but for **quick previews**.  
> A **headless**, customizable Quick Look modal for React Native.

---

## ✨ Features

- 🎨 **Beautiful Animations**: Smooth fade, scale, and swipe-to-close animations
- 🎯 **Universal Content**: Works with any content type (products, articles, profiles, etc.)
- 🎛️ **Highly Customizable**: Themes, animations, behavior, and styling
- ♿ **Accessibility First**: Full screen reader support and keyboard navigation
- 📱 **Cross-Platform**: Works seamlessly on iOS and Android
- 🔧 **TypeScript Ready**: Full type safety and IntelliSense support
- ⚡ **Performance Optimized**: Uses native drivers for smooth 60fps animations
- 🎪 **Headless Design**: No opinionated UI, you control the content
- 🔄 **Gesture Support**: Swipe to close, tap to navigate, long press to open

---

## 📁 Structure

```
├── packages/
│   └── react-native-quicklook/     # The library package
│       ├── src/
│       │   ├── QuickLook.tsx       # Main component
│       │   ├── QuickLookProperties.ts # Public types
│       │   └── index.ts            # Entry point
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts
│       └── README.md
├── apps/
│   └── expo-quicklook-example/     # Expo example app
│       ├── app/                    # Expo Router pages
│       ├── components/             # Example components
│       ├── data/                   # Example data
│       ├── package.json
│       └── app.json
├── .changeset/                     # Versioning (Changesets)
├── .github/workflows/release.yml   # CI release workflow
├── package.json                    # Root workspace config
├── CONTRIBUTING.md
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo --version`)
- Expo Go app (SDK 53) or iOS Simulator/Android Emulator

### Install & Run

```bash
# 1) Clone
git clone <repository-url>
cd rn-quicklook-workspace

# 2) Install
npm install

# 3) Build the library
npm run build

# 4) Start the example app
npm run example
```

Open **Expo Go** on your device (SDK 53) or run an iOS/Android emulator to view the demo.

---

## 📦 Library (packages/react-native-quicklook)

A **headless** quick preview modal component for React Native with smooth animations, swipe-to-close, and full accessibility.

**Install (in your app):**
```bash
npm install react-native-quicklook
# or
yarn add react-native-quicklook
```

**Basic usage:**
```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { QuickLook } from 'react-native-quicklook';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Show Quick Look</Text>
      </TouchableOpacity>

      <QuickLook visible={visible} onClose={() => setVisible(false)}>
        <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quick Preview Content</Text>
          <Text style={{ marginTop: 10 }}>Render any custom content inside.</Text>
        </View>
      </QuickLook>
    </View>
  );
}
```

**Advanced usage with long press:**
```tsx
<TouchableOpacity
  onLongPress={() => setQuickLookVisible(true)}
  delayLongPress={500}
>
  <Image source={{ uri: product.image }} />
  <Text>{product.name}</Text>
  
  <QuickLook
    visible={quickLookVisible}
    onClose={() => setQuickLookVisible(false)}
    onPressCard={() => {
      setQuickLookVisible(false);
      navigation.navigate('ProductDetail', { id: product.id });
    }}
    enableSwipeToClose
    closeOnBackdropPress
    theme="dark"
    animationDuration={300}
  >
    {/* Your custom content */}
  </QuickLook>
</TouchableOpacity>
```

---

## 📱 Example App (apps/expo-quicklook-example)

Demonstrates multiple patterns:
- 🛍️ E‑commerce product previews
- 📰 Article previews
- ✈️ Travel destination peeks
- Long‑press to open, **swipe down** to close, **tap to navigate**

**Run directly:**
```bash
cd apps/expo-quicklook-example
npm start
```

The example consumes the package via workspace reference (`"react-native-quicklook": "workspace:*"`), so local library changes appear instantly after `npm run build`.

---

## 🧭 Versioning & Releases (Changesets)

We use **Changesets** for semantic versioning and npm releases.

```bash
# Create a changeset (choose patch/minor/major)
npx changeset

# Apply versions & update changelogs
npm run version-packages

# Publish to npm
npm run release

# Push tags & commits
git push --follow-tags
```

CI can publish automatically via **.github/workflows/release.yml** (set `NPM_TOKEN` in repo secrets).

---

## 🛠 Development Scripts

From the repo root:

```bash
npm run build        # builds the library
npm run dev          # optional: watch mode if configured
npm run example      # starts Expo example app
npm run type-check   # TypeScript
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### 🐛 Reporting Issues
- Use the [issue template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include reproduction steps and device info
- Check existing issues first

### 💡 Feature Requests
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the use case and benefits
- Consider if it fits the library's scope

### 🔧 Pull Requests
1. **Fork** the repository  
2. **Create** a feature branch (`feat/your-feature` or `fix/your-bug`)  
3. **Develop** against the monorepo:
   ```bash
   npm install
   npm run build           # builds the package
   npm run example         # runs the Expo demo app
   npm run type-check
   ```
4. **Add tests/docs** where helpful  
5. **Create a changeset**:
   ```bash
   npx changeset
   ```
   - Select the package: `react-native-quicklook`  
   - Choose bump type (patch/minor/major)  
   - Add a short summary  
6. **Commit** using Conventional Commits (preferred):  
   - `feat: add swipeThreshold prop`  
   - `fix: prevent backdrop tap when content animates`  
7. **Open a PR** and ensure CI passes

### ✅ Local Testing Checklist
- [ ] Package builds (`npm run build`)  
- [ ] Example app runs (`npm run example`)  
- [ ] QuickLook opens, closes, and swipes as expected  
- [ ] No red screens / warnings in Expo  
- [ ] A11y: labels present, focus reasonable

---

## 📚 Docs & Links

- **Package (npm):** https://www.npmjs.com/package/react-native-quicklook  
- **Library README:** `packages/react-native-quicklook/README.md`  
- **Example App README:** `apps/expo-quicklook-example/README.md`  
- **Issues / Features:** https://github.com/yourusername/react-native-quicklook/issues

---

## 🧑‍💻 Author

**Oliver Lindblad** — Made with ❤️ for the React Native community.

---

## 📄 License

MIT © Oliver Lindblad
