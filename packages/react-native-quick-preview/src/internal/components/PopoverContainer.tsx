import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import type { QuickPreviewOptions } from '../../types'
import { resolveSizeStyle } from '../resolveSize'

export function PopoverContainer({
  children,
  options,
  insets: _insets,
  onRequestClose: _onRequestClose, // kept for API parity with SheetContainer
}: {
  children: React.ReactNode
  options?: QuickPreviewOptions
  insets: { top: number; bottom: number }
  onRequestClose: () => void
}) {
  const scale = useSharedValue(0.96)
  const opacity = useSharedValue(0)

  React.useEffect(() => {
    // Smooth ease-out, no spring overshoot — a clean, quick "pop" in.
    scale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) })
    opacity.value = withTiming(1, { duration: 160, easing: Easing.out(Easing.quad) })
  }, [scale, opacity])

  const container = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const sizeStyle = resolveSizeStyle(options?.size)

  return (
    <View style={[StyleSheet.absoluteFill, styles.center]} pointerEvents="box-none">
      <Animated.View
        style={[styles.card, sizeStyle, container]}
        accessibilityRole={options?.accessibilityRole}
        accessibilityLabel={options?.accessibilityLabel ?? 'Quick preview'}
      >
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  card: {
    maxWidth: 520,
    width: '92%',
    maxHeight: '86%',
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 3,
  },
})
