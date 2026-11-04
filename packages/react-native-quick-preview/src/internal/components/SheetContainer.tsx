import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import type { QuickPreviewOptions } from '../../types'
import { resolveSizeStyle } from '../resolveSize'
import type { Palette } from '../theme'
import { ActionMenu } from './ActionMenu'

export function SheetContainer({
  children,
  options,
  palette,
  insets,
  onRequestClose,
  closing = false,
  onExited,
}: {
  children: React.ReactNode
  options?: QuickPreviewOptions
  palette: Palette
  insets: { top: number; bottom: number }
  onRequestClose: () => void
  closing?: boolean
  onExited?: () => void
}) {
  const { height: windowHeight } = useWindowDimensions()
  const translateY = useSharedValue(1000)
  const dismissOnPanDown = options?.dismissOnPanDown ?? true

  React.useEffect(() => {
    // Smooth slide up, no spring bounce.
    translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) })
  }, [translateY])

  // Exit: slide down from wherever the sheet is (including mid-swipe).
  React.useEffect(() => {
    if (!closing) return
    const done = () => onExited?.()
    translateY.value = withTiming(windowHeight, { duration: 220, easing: Easing.in(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(done)()
    })
  }, [closing])

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!dismissOnPanDown) return
      translateY.value = Math.max(0, e.translationY)
    })
    .onEnd((e) => {
      const shouldClose = e.velocityY > 1000 || translateY.value > 140
      if (shouldClose) {
        // The exit animation continues the slide from the finger's position.
        runOnJS(onRequestClose)()
      } else {
        translateY.value = withTiming(0, { duration: 240, easing: Easing.out(Easing.cubic) })
      }
    })

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const sizeStyle = resolveSizeStyle(options?.size)

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: palette.container, paddingBottom: Math.max(insets.bottom, 12) },
          sizeStyle,
          options?.containerStyle,
          style,
        ]}
        accessibilityRole={options?.accessibilityRole}
        accessibilityLabel={options?.accessibilityLabel ?? 'Quick preview'}
      >
        <View style={[styles.grabber, { backgroundColor: palette.grabber }]} />
        {children}
        {options?.actions && options.actions.length > 0 ? (
          <ActionMenu
            actions={options.actions}
            palette={palette}
            onRequestClose={onRequestClose}
            variant="sheet"
          />
        ) : null}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
})
