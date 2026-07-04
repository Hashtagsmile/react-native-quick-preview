---
name: Feature request
about: Suggest an idea for react-native-quick-preview
title: '[FEATURE] '
labels: ['enhancement', 'needs-triage']
assignees: ''
---

## Feature description

A clear and concise description of the feature.

## Use case

- What problem does it solve?
- Who would benefit from it?

## Proposed API

If applicable, sketch how you'd like to use it:

```tsx
import { useQuickPreview } from 'react-native-quick-preview'

function Example() {
  const { present } = useQuickPreview()

  present(<Content />, {
    variant: 'popover',
    // new option here
  })
}
```

## Alternatives considered

Other approaches you've thought about, including workarounds you're using today.

## Platform considerations

- [ ] iOS
- [ ] Android

## Checklist

- [ ] I searched existing issues for duplicates
- [ ] This fits the library's scope (headless quick previews)
- [ ] I provided a clear use case
