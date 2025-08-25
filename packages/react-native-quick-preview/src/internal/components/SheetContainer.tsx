import React from 'react'
import { View, StyleSheet, AccessibilityRole } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import type { QuickPreviewOptions } from '../../types'

export function SheetContainer({
  children,
  options,
  insets,
  onRequestClose,
}: {
  children: React.ReactNode
  options?: QuickPreviewOptions
  insets: { top: number; bottom: number }
  onRequestClose: () => void
}) {
  const translateY = useSharedValue(1000)
  const dismissOnPanDown = options?.dismissOnPanDown ?? true

  React.useEffect(() => {
    translateY.value = withSpring(0, { damping: 18, stiffness: 180 })
  }, [translateY])

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!dismissOnPanDown) return
      translateY.value = Math.max(0, e.translationY)
    })
    .onEnd((e) => {
      const shouldClose = e.velocityY > 1000 || translateY.value > 140
      if (shouldClose) {
        translateY.value = withTiming(800, { duration: 200 }, (finished) => {
          if (finished) runOnJS(onRequestClose)()
        })
      } else {
        translateY.value = withSpring(0, { damping: 18, stiffness: 180 })
      }
    })

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.sheet, style, { paddingBottom: Math.max(insets.bottom, 12) }]}
        accessibilityRole={options?.accessibilityRole ?? 'dialog' as AccessibilityRole}
        accessibilityLabel={options?.accessibilityLabel ?? 'Quick preview'}
      >
        <View style={styles.grabber} />
        {children}
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
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 3,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 8,
  },
})
