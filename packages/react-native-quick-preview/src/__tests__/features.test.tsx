import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { act, fireEvent, render, screen, within } from '@testing-library/react-native'

// Same lightweight passthrough as QuickPreviewRoot.test.tsx: these tests cover
// what renders and what presses do, not real animation.
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires -- jest.mock factories are hoisted above imports, so require is required here
  const { View, ScrollView, Text: RNText } = require('react-native')
  return {
    __esModule: true,
    default: { View, ScrollView, Text: RNText, createAnimatedComponent: (c: unknown) => c },
    useAnimatedStyle: (fn: () => unknown) => fn(),
    useSharedValue: (v: unknown) => ({ value: v }),
    withTiming: (v: unknown) => v,
    withSpring: (v: unknown) => v,
    withDelay: (_ms: number, v: unknown) => v,
    Easing: new Proxy({}, { get: () => (x: unknown) => x }),
    runOnJS:
      (fn: (...args: unknown[]) => unknown) =>
      (...args: unknown[]) =>
        fn(...args),
  }
})

// GH3's real GestureDetector needs reanimated internals the passthrough above
// doesn't provide; the sheet's pan gesture isn't under test here.
jest.mock('react-native-gesture-handler', () => ({
  ...jest.requireActual('react-native-gesture-handler'),
  GestureDetector: ({ children }: { children: React.ReactNode }) => children,
}))

import { QuickPreviewRoot } from '../internal/QuickPreviewRoot'
import { PreviewProvider } from '../context'
import { QuickPreview } from '../QuickPreviewAPI'
import { QuickPreview as QuickPreviewComponent } from '../headless/QuickPreview'
import { QuickPreviewPressable } from '../addons/QuickPreviewPressable'

function bg(testIdOrLabel: string) {
  const el = screen.getByLabelText(testIdOrLabel)
  return StyleSheet.flatten(el.props.style)?.backgroundColor
}

describe('actions', () => {
  it('renders each action and runs it after closing', () => {
    const onClose = jest.fn()
    const share = jest.fn(() => expect(onClose).toHaveBeenCalled())
    render(
      <QuickPreviewRoot
        onRequestClose={onClose}
        options={{ actions: [{ title: 'Share', onPress: share }, { title: 'Delete', destructive: true, onPress: () => {} }] }}
      >
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(screen.getByText('Delete')).toBeTruthy()
    fireEvent.press(screen.getByLabelText('Share'))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(share).toHaveBeenCalledTimes(1)
  })

  it('ignores presses on disabled actions', () => {
    const onPress = jest.fn()
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ actions: [{ title: 'Nope', disabled: true, onPress }] }}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    fireEvent.press(screen.getByLabelText('Nope'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders actions in the sheet variant too', () => {
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ variant: 'sheet', actions: [{ title: 'Save', onPress: () => {} }] }}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(screen.getByText('Save')).toBeTruthy()
  })
})

describe('theming', () => {
  it('defaults to a white container', () => {
    render(
      <QuickPreviewRoot onRequestClose={() => {}}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(bg('Quick preview')).toBe('#FFFFFF')
  })

  it('uses the dark palette for colorScheme="dark"', () => {
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ colorScheme: 'dark' }}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(bg('Quick preview')).toBe('#1C1C1E')
  })

  it('lets containerStyle override the palette', () => {
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ containerStyle: { backgroundColor: 'tomato' } }}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(bg('Quick preview')).toBe('tomato')
  })

  it('renders a custom backdrop', () => {
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ renderBackdrop: () => <View testID="blur" /> }}>
        <Text>card</Text>
      </QuickPreviewRoot>
    )
    expect(screen.getByTestId('blur')).toBeTruthy()
  })
})

describe('origin morph', () => {
  it('still shows the card if the frame never reports a measurement', () => {
    jest.useFakeTimers()
    render(
      <QuickPreviewRoot onRequestClose={() => {}} options={{ origin: { x: 10, y: 20, width: 100, height: 100 } }}>
        <Text>morph</Text>
      </QuickPreviewRoot>
    )
    act(() => jest.advanceTimersByTime(200))
    expect(screen.getByText('morph')).toBeTruthy()
    jest.useRealTimers()
  })
})

describe('PreviewProvider defaultOptions', () => {
  it('applies defaults, and present() options override them', () => {
    render(
      <PreviewProvider defaultOptions={{ colorScheme: 'dark' }}>
        <View />
      </PreviewProvider>
    )
    act(() => QuickPreview.present(<Text>a</Text>))
    expect(bg('Quick preview')).toBe('#1C1C1E')

    act(() => QuickPreview.present(<Text>b</Text>, { colorScheme: 'light' }))
    expect(bg('Quick preview')).toBe('#FFFFFF')
    act(() => QuickPreview.close())
  })
})

describe('built-in overlay (no react-native-portalize)', () => {
  it('renders the headless component into the provider overlay and removes it on hide', () => {
    function App({ visible }: { visible: boolean }) {
      return (
        <PreviewProvider>
          <View testID="screen">
            <QuickPreviewComponent visible={visible} onClose={() => {}}>
              <Text>overlay content</Text>
            </QuickPreviewComponent>
          </View>
        </PreviewProvider>
      )
    }
    const { rerender } = render(<App visible />)
    expect(screen.getByText('overlay content')).toBeTruthy()
    // Mounted in the overlay layer, not inside the screen subtree. (The open
    // preview is accessibilityViewIsModal, so the screen is a11y-hidden.)
    const screenView = screen.getByTestId('screen', { includeHiddenElements: true })
    expect(within(screenView).queryByText('overlay content', { includeHiddenElements: true })).toBeNull()

    rerender(<App visible={false} />)
    expect(screen.queryByText('overlay content')).toBeNull()
  })
})

describe('exit animation', () => {
  it('keeps the preview mounted while it animates out, then removes it', () => {
    jest.useFakeTimers()
    render(
      <PreviewProvider>
        <View />
      </PreviewProvider>
    )
    act(() => QuickPreview.present(<Text>leaving</Text>))
    act(() => QuickPreview.close())
    // Closed for the API straight away, still on screen for the animation.
    expect(QuickPreview.isOpen()).toBe(false)
    expect(screen.getByText('leaving', { includeHiddenElements: true })).toBeTruthy()

    act(() => jest.advanceTimersByTime(500))
    expect(screen.queryByText('leaving', { includeHiddenElements: true })).toBeNull()
    jest.useRealTimers()
  })

  it('a new present() during the exit wins over the old exit', () => {
    jest.useFakeTimers()
    render(
      <PreviewProvider>
        <View />
      </PreviewProvider>
    )
    act(() => QuickPreview.present(<Text>first</Text>))
    act(() => QuickPreview.close())
    act(() => QuickPreview.present(<Text>second</Text>))
    act(() => jest.advanceTimersByTime(500))
    expect(screen.getByText('second')).toBeTruthy()
    expect(QuickPreview.isOpen()).toBe(true)
    act(() => QuickPreview.close())
    act(() => jest.advanceTimersByTime(500))
    jest.useRealTimers()
  })

  it('fires onCloseStart, then onCloseEnd after the exit', () => {
    jest.useFakeTimers()
    const onCloseStart = jest.fn()
    const onCloseEnd = jest.fn()
    render(
      <PreviewProvider>
        <View />
      </PreviewProvider>
    )
    act(() => QuickPreview.present(<Text>x</Text>, { onCloseStart, onCloseEnd }))
    act(() => QuickPreview.close())
    expect(onCloseStart).toHaveBeenCalledTimes(1)
    expect(onCloseEnd).not.toHaveBeenCalled()
    act(() => jest.advanceTimersByTime(500))
    expect(onCloseEnd).toHaveBeenCalledTimes(1)
    expect(onCloseStart).toHaveBeenCalledTimes(1)
    jest.useRealTimers()
  })
})

describe('QuickPreviewPressable', () => {
  function setup(props: Partial<React.ComponentProps<typeof QuickPreviewPressable>> = {}) {
    const onPress = jest.fn()
    const onPreviewPress = jest.fn()
    render(
      <PreviewProvider>
        <QuickPreviewPressable
          accessibilityLabel="Item"
          onPress={onPress}
          onPreviewPress={onPreviewPress}
          renderPreview={() => <Text>peek body</Text>}
          {...props}
        >
          <Text>item</Text>
        </QuickPreviewPressable>
      </PreviewProvider>
    )
    return { onPress, onPreviewPress }
  }
  const a11y = (name: string) => ({ nativeEvent: { actionName: name } })

  it('opens the preview from the screen-reader "Show preview" action', () => {
    jest.useFakeTimers()
    setup()
    const item = screen.getByLabelText('Item')
    expect(item.props.accessibilityActions).toContainEqual({ name: 'longpress', label: 'Show preview' })
    act(() => fireEvent(item, 'accessibilityAction', a11y('longpress')))
    act(() => jest.advanceTimersByTime(150))
    expect(screen.getByText('peek body')).toBeTruthy()
    act(() => QuickPreview.close())
    act(() => jest.advanceTimersByTime(500))
    jest.useRealTimers()
  })

  it('maps the "activate" action to onPress', () => {
    const { onPress } = setup()
    fireEvent(screen.getByLabelText('Item'), 'accessibilityAction', a11y('activate'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('tapping the preview closes it and calls onPreviewPress (peek and pop)', () => {
    jest.useFakeTimers()
    const { onPreviewPress } = setup()
    act(() => fireEvent(screen.getByLabelText('Item'), 'accessibilityAction', a11y('longpress')))
    act(() => jest.advanceTimersByTime(150))
    fireEvent.press(screen.getByText('peek body'))
    expect(onPreviewPress).toHaveBeenCalledTimes(1)
    expect(QuickPreview.isOpen()).toBe(false)
    act(() => jest.advanceTimersByTime(500))
    jest.useRealTimers()
  })

  it('ignores accessibility actions when disabled', () => {
    const { onPress } = setup({ disabled: true })
    fireEvent(screen.getByLabelText('Item'), 'accessibilityAction', a11y('activate'))
    expect(onPress).not.toHaveBeenCalled()
  })
})
