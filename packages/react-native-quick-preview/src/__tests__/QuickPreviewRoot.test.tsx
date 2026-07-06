import React from 'react'
import { Text } from 'react-native'
import { render, screen } from '@testing-library/react-native'

// File-scoped reanimated mock. The global mock (react-native-reanimated/mock)
// pulls in real reanimated → react-native-worklets (ESM), which this jest setup
// can't parse. This test only needs the tree to render, not real animation, so
// a lightweight passthrough is enough and keeps the global jest config untouched.
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires -- jest.mock factories are hoisted above imports, so require is required here
  const { View, ScrollView, Text: RNText } = require('react-native')
  return {
    __esModule: true,
    default: { View, ScrollView, Text: RNText, createAnimatedComponent: (c: unknown) => c },
    useAnimatedStyle: () => ({}),
    useSharedValue: (v: unknown) => ({ value: v }),
    withTiming: (v: unknown) => v,
    withSpring: (v: unknown) => v,
    Easing: new Proxy({}, { get: () => (x: unknown) => x }),
    runOnJS:
      (fn: (...args: unknown[]) => unknown) =>
      (...args: unknown[]) =>
        fn(...args),
  }
})

import { QuickPreviewRoot } from '../internal/QuickPreviewRoot'

// Regression: the peek must not crash the host app when no <SafeAreaProvider>
// is mounted. QuickPreviewRoot previously called useSafeAreaInsets(), which
// throws "No safe area value available" without a provider. It now reads
// SafeAreaInsetsContext (null when unprovided) and falls back to zero insets.
// The jest-setup safe-area mock has no provider, so useContext returns null
// here. The inset read is variant-independent (it happens before the
// popover/sheet branch), so the popover case fully covers the fix — the sheet
// variant additionally pulls in gesture-handler's GestureDetector, which needs
// real reanimated internals and is unrelated to this regression.
describe('QuickPreviewRoot without a SafeAreaProvider', () => {
  it('renders its children instead of throwing', () => {
    expect(() =>
      render(
        <QuickPreviewRoot onRequestClose={() => {}} options={{ variant: 'popover' }}>
          <Text>peek content</Text>
        </QuickPreviewRoot>
      )
    ).not.toThrow()
    expect(screen.getByText('peek content')).toBeTruthy()
  })
})
