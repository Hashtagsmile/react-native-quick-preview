import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export function Backdrop({
  onPress,
  dismissOnBackdropPress = true,
  color,
  renderBackdrop,
}: {
  onPress?: () => void
  dismissOnBackdropPress?: boolean
  color: string
  renderBackdrop?: () => React.ReactNode
}) {
  const opacity = useSharedValue(0)
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 160 })
    return () => { opacity.value = 0 }
  }, [opacity])

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }))
  const interactive = dismissOnBackdropPress && !!onPress

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, style]}
      pointerEvents={interactive ? 'auto' : 'none'}
    >
      {renderBackdrop ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {renderBackdrop()}
        </View>
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: color }]} pointerEvents="none" />
      )}
      {interactive ? (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel="Close preview"
        />
      ) : null}
    </Animated.View>
  )
}
