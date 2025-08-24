---
name: 🐛 Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## 🐛 Bug Description

A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## ✅ Expected Behavior

A clear and concise description of what you expected to happen.

## ❌ Actual Behavior

A clear and concise description of what actually happened.

## 📱 Environment

**Device:** [e.g. iPhone 14, Samsung Galaxy S23]
**OS:** [e.g. iOS 17.0, Android 14]
**React Native:** [e.g. 0.76.3]
**Expo:** [e.g. ~53.0.0] (if applicable)
**react-native-quick-preview:** [e.g. 1.0.0]

## 📸 Screenshots/Videos

If applicable, add screenshots or videos to help explain your problem.

## 💻 Code Example

```tsx
import React, { useState } from 'react';
import { QuickPreview } from 'react-native-quick-preview';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <QuickPreview>
      visible={visible}
      onClose={() => setVisible(false)}
    >
      {/* Your content */}
    </QuickPreview>
  );
}
```

## 🔍 Additional Context

Add any other context about the problem here, such as:
- When did this start happening?
- Does it happen on both iOS and Android?
- Are there any console errors?
- Does it happen in the example app?

## 📋 Checklist

- [ ] I have searched existing issues to avoid duplicates
- [ ] I have provided all required information
- [ ] I have tested on both iOS and Android (if applicable)
- [ ] I have included a code example
- [ ] I have checked the documentation
