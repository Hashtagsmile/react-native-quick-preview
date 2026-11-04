import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { QuickPreviewOptions } from '../types'
import { Backdrop } from './components/Backdrop'
import { SheetContainer } from './components/SheetContainer'
import { PopoverContainer } from './components/PopoverContainer'
import { usePalette } from './theme'

// The exit animation normally reports completion itself; this only guarantees
// the preview unmounts if that callback never arrives (unusual hosts, tests).
const EXIT_FALLBACK_MS = 400

export function QuickPreviewRoot({
  options,
  onRequestClose,
  closing = false,
  onClosed,
  children,
}: {
  options?: QuickPreviewOptions
  onRequestClose: () => void
  /** True once close() was called: play the exit animation, then call onClosed. */
  closing?: boolean
  /** Called once the exit animation has finished. */
  onClosed?: () => void
  children: React.ReactNode
}) {
  // Read insets from context directly so a missing <SafeAreaProvider> degrades
  // to zero insets instead of throwing. useSafeAreaInsets() would crash the host
  // app when no provider is mounted; the peek only needs insets to clear the
  // notch / home indicator, so zero is a safe fallback (provider still recommended).
  const insets = React.useContext(SafeAreaInsetsContext)
  const top = insets?.top ?? 0
  const bottom = insets?.bottom ?? 0
  const variant = options?.variant ?? 'popover'
  const dismissOnBackdropPress = options?.dismissOnBackdropPress ?? true
  const palette = usePalette(options?.colorScheme)

  const opacity = useSharedValue(0)

  const cbs = React.useRef({
    onOpenStart: options?.onOpenStart,
    onOpenEnd: options?.onOpenEnd,
    onCloseStart: options?.onCloseStart,
    onCloseEnd: options?.onCloseEnd,
  })
  React.useEffect(() => {
    cbs.current = {
      onOpenStart: options?.onOpenStart,
      onOpenEnd: options?.onOpenEnd,
      onCloseStart: options?.onCloseStart,
      onCloseEnd: options?.onCloseEnd,
    }
  }, [options?.onOpenStart, options?.onOpenEnd, options?.onCloseStart, options?.onCloseEnd])

  // Lifecycle callbacks run on the JS thread. Animation completion callbacks
  // run on the UI thread, so they reach these through runOnJS.
  const fireOpenEnd = React.useCallback(() => cbs.current.onOpenEnd?.(), [])

  const closeStartedRef = React.useRef(false)
  const closedRef = React.useRef(false)
  const onClosedRef = React.useRef(onClosed)
  onClosedRef.current = onClosed

  const finishClose = React.useCallback(() => {
    if (closedRef.current) return
    closedRef.current = true
    cbs.current.onCloseEnd?.()
    onClosedRef.current?.()
  }, [])

  React.useEffect(() => {
    cbs.current.onOpenStart?.()
    opacity.value = withTiming(1, { duration: 180 }, finished => {
      if (finished) runOnJS(fireOpenEnd)()
    })
    return () => {
      // Unmounted without an exit animation (provider unmounted, headless
      // component hidden): still report the close.
      if (!closeStartedRef.current) cbs.current.onCloseStart?.()
      if (!closedRef.current) cbs.current.onCloseEnd?.()
    }
    // run once (mount-only effect)
  }, [])

  React.useEffect(() => {
    if (!closing || closeStartedRef.current) return
    closeStartedRef.current = true
    cbs.current.onCloseStart?.()
    const t = setTimeout(finishClose, EXIT_FALLBACK_MS)
    return () => clearTimeout(t)
  }, [closing, finishClose])

  const containerStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <View
      style={StyleSheet.absoluteFill}
      // While closing, let touches reach the app straight away.
      pointerEvents={closing ? 'none' : 'box-none'}
      accessibilityViewIsModal={!closing}
    >
      <Animated.View style={[StyleSheet.absoluteFill, containerStyle]} pointerEvents="box-none">
        <Backdrop
          onPress={dismissOnBackdropPress ? onRequestClose : undefined}
          dismissOnBackdropPress={dismissOnBackdropPress}
          color={options?.backdropColor ?? palette.backdrop}
          renderBackdrop={options?.renderBackdrop}
          closing={closing}
        />
        {variant === 'sheet' ? (
          <SheetContainer
            palette={palette}
            insets={{ top, bottom }}
            options={options}
            onRequestClose={onRequestClose}
            closing={closing}
            onExited={finishClose}
          >
            {children}
          </SheetContainer>
        ) : (
          <PopoverContainer
            palette={palette}
            insets={{ top, bottom }}
            options={options}
            onRequestClose={onRequestClose}
            closing={closing}
            onExited={finishClose}
          >
            {children}
          </PopoverContainer>
        )}
      </Animated.View>
    </View>
  )
}
