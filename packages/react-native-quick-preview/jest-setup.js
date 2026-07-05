/* eslint-env jest */

// Official mock: shared values and animations resolve synchronously.
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

require('react-native-gesture-handler/jestSetup')

// Portalize renders through a host context; in tests a plain passthrough is enough.
jest.mock('react-native-portalize', () => {
  const React = require('react')
  return {
    Host: ({ children }) => React.createElement(React.Fragment, null, children),
    Portal: ({ children }) => React.createElement(React.Fragment, null, children),
  }
})

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}))
