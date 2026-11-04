/* eslint-env jest */

// Official mock: shared values and animations resolve synchronously.
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

require('react-native-gesture-handler/jestSetup')

// Faithful mock: SafeAreaInsetsContext is a real React context whose value is
// null when no <SafeAreaProvider> is mounted (matching the real package), so the
// library's zero-inset fallback is exercised. SafeAreaProvider supplies insets.
jest.mock('react-native-safe-area-context', () => {
  const React = require('react')
  const ZERO = { top: 0, bottom: 0, left: 0, right: 0 }
  const SafeAreaInsetsContext = React.createContext(null)
  return {
    SafeAreaInsetsContext,
    useSafeAreaInsets: () => ZERO,
    SafeAreaProvider: ({ children }) =>
      React.createElement(SafeAreaInsetsContext.Provider, { value: ZERO }, children),
  }
})
