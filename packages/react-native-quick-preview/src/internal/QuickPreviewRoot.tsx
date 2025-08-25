import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuickPreviewOptions } from '../types'
import { Backdrop } from './components/Backdrop'
import { SheetContainer } from './components/SheetContainer'
import { PopoverContainer } from './components/PopoverContainer'

export function QuickPreviewRoot({
  options,
  onRequestClose,
  children,
}: {
  options?: QuickPreviewOptions
  onRequestClose: () => void
  children: React.ReactNode
}) {
  const { top, bottom } = useSafeAreaInsets()
  const variant = options?.variant ?? 'popover'
  const dismissOnBackdropPress = options?.dismissOnBackdropPress ?? true

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

  React.useEffect(() => {
    cbs.current.onOpenStart?.()
    opacity.value = withTiming(1, { duration: 180 }, finished => {
      if (finished) cbs.current.onOpenEnd?.()
    })
    return () => {
      cbs.current.onCloseStart?.()
      cbs.current.onCloseEnd?.()
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const containerStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none" accessibilityViewIsModal>
      <Animated.View style={[StyleSheet.absoluteFill, containerStyle]} pointerEvents="box-none">
        <Backdrop
          onPress={dismissOnBackdropPress ? onRequestClose : undefined}
          dismissOnBackdropPress={dismissOnBackdropPress}
        />
        {variant === 'sheet' ? (
          <SheetContainer insets={{ top, bottom }} options={options} onRequestClose={onRequestClose}>
            {children}
          </SheetContainer>
        ) : (
          <PopoverContainer insets={{ top, bottom }} options={options} onRequestClose={onRequestClose}>
            {children}
          </PopoverContainer>
        )}
      </Animated.View>
    </View>
  )
}
