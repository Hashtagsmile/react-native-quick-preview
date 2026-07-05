import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { QuickPreview } from '../QuickPreviewAPI'
import type { QuickPreviewOptions } from '../types'

export type QuickPreviewPressableProps = {
  children: React.ReactNode
  /** Called for a normal tap (e.g., navigate) */
  onPress?: () => void
  /** Return the preview node to present */
  renderPreview: () => React.ReactNode
  /** Options forwarded to QuickPreview.present */
  previewOptions?: Partial<QuickPreviewOptions>
  /** Long-press delay (ms). Default 350 */
  delay?: number
  /** Press-down scale. Default 0.98 */
  scale?: number
  /**
   * Called on the JS thread when the long press activates, right before the
   * preview opens. Wire up haptics here, e.g.:
   *   onLongPressStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
   * The library deliberately does not import expo-haptics itself: an optional
   * require would break Metro bundling for apps that don't have it installed.
   */
  onLongPressStart?: () => void
  /** Disable all interactions */
  disabled?: boolean
  /** Style applied to the animated wrapper (the thing that scales) */
  style?: StyleProp<ViewStyle>
  /** Accessibility */
  accessible?: boolean
  accessibilityLabel?: string
  testID?: string
}

export function QuickPreviewPressable({
  children,
  onPress,
  renderPreview,
  previewOptions,
  delay = 350,
  scale = 0.98,
  onLongPressStart,
  disabled = false,
  style,
  accessible,
  accessibilityLabel,
  testID,
}: QuickPreviewPressableProps) {
  const s = useSharedValue(1)

  // Runs on the JS thread: renderPreview() creates React elements, which must
  // never happen on the UI thread inside a worklet.
  const openPreview = () => {
    onLongPressStart?.()
    QuickPreview.present(renderPreview(), {
      variant: 'popover',
      dismissOnBackdropPress: true,
      ...previewOptions,
    })
  }

  const longPress = Gesture.LongPress()
    .enabled(!disabled)
    .minDuration(delay)
    .onTouchesDown(() => {
      s.value = withTiming(scale, { duration: 90 })
    })
    .onFinalize(() => {
      s.value = withTiming(1, { duration: 120 })
    })
    .onStart(() => {
      runOnJS(openPreview)()
    })

  const tap = Gesture.Tap()
    .enabled(!disabled)
    .maxDuration(220)
    .onTouchesDown(() => {
      s.value = withTiming(scale, { duration: 90 })
    })
    .onFinalize(() => {
      s.value = withTiming(1, { duration: 120 })
    })
    .onEnd(() => {
      if (onPress) runOnJS(onPress)()
    })

  const gesture = Gesture.Exclusive(longPress, tap)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }))

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[animated, style]}
        accessible={accessible}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}
