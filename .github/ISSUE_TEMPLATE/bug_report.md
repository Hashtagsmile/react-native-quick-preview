---
name: Bug report
about: Report a problem with react-native-quick-preview
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## Description

A clear and concise description of the bug.

## Steps to reproduce

1. ...
2. ...
3. ...

## Expected behavior

What you expected to happen.

## Actual behavior

What actually happened.

## Environment

- **Device:** [e.g. iPhone 14, Samsung Galaxy S23]
- **OS:** [e.g. iOS 17.0, Android 14]
- **React Native:** [e.g. 0.79.5]
- **Expo:** [e.g. 53] (if applicable)
- **react-native-quick-preview:** [e.g. 2.0.0]
- **react-native-reanimated:** [e.g. 3.17.4]

## Code example

```tsx
import { useQuickPreview } from 'react-native-quick-preview'

function Example() {
  const { present } = useQuickPreview()
  // Minimal reproduction here
}
```

## Additional context

- When did this start happening?
- Does it happen on both iOS and Android?
- Any console errors or warnings?
- Does it reproduce in the example app?

## Checklist

- [ ] I searched existing issues for duplicates
- [ ] I included a minimal code example
- [ ] `PreviewProvider` is mounted (inside `GestureHandlerRootView`)
- [ ] All peer dependencies are installed
