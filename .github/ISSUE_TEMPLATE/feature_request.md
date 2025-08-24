---
name: 💡 Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: ['enhancement', 'needs-triage']
assignees: ''
---

## 💡 Feature Description

A clear and concise description of the feature you'd like to see.

## 🎯 Use Case

Describe the use case and why this feature would be valuable:
- What problem does it solve?
- Who would benefit from it?
- How would it improve the developer experience?

## 💭 Proposed Solution

A clear and concise description of what you want to happen.

## 🔄 Alternative Solutions

A clear and concise description of any alternative solutions or features you've considered.

## 📱 Platform Considerations

- [ ] iOS
- [ ] Android
- [ ] Web (if applicable)
- [ ] Other platforms

## 💻 Code Example

If applicable, provide a code example of how you'd like to use this feature:

```tsx
import React, { useState } from 'react';
import { QuickPreview } from 'react-native-quick-preview';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <QuickLQuickPreview>
      visible={visible}
      onClose={() => setVisible(false)}
      // New prop or feature here
    >
      {/* Your content */}
    </QuickPreview>
  );
}
```

## 🎨 Design Considerations

If this involves UI changes, describe:
- How should it look?
- Should it be customizable?
- Any accessibility considerations?

## 📋 Checklist

- [ ] I have searched existing issues to avoid duplicates
- [ ] This feature fits the library's scope and purpose
- [ ] I have provided a clear use case
- [ ] I have considered platform compatibility
- [ ] I have provided a code example (if applicable)

## 🔗 Related Issues

Link any related issues here.

## 📚 Additional Context

Add any other context, screenshots, or mockups about the feature request here.
