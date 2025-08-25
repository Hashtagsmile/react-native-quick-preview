import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export function Backdrop({
  onPress,
  dismissOnBackdropPress = true,
}: {
  onPress?: () => void
  dismissOnBackdropPress?: boolean
}) {
  const opacity = useSharedValue(0)
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 160 })
    return () => { opacity.value = 0 }
  }, [opacity])

  const style = useAnimatedStyle(() => ({
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={style} pointerEvents={dismissOnBackdropPress && onPress ? 'auto' : 'none'}>
      {dismissOnBackdropPress && onPress ? (
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
