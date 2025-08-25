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

type HapticStyle = boolean | 'light' | 'medium' | 'heavy'

function triggerHaptics(style: HapticStyle) {
  try {
    // Optional peer dep: expo-haptics
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Haptics = require('expo-haptics')
    const Map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
    } as const
    const kind = typeof style === 'string' ? Map[style] : Map.medium
    Haptics.impactAsync?.(kind)
  } catch {
    // silently ignore if not installed
  }
}

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
  /** Haptics on long-press start. Default 'medium'. Set false to disable */
  haptics?: HapticStyle
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
  haptics = 'medium',
  disabled = false,
  style,
  accessible,
  accessibilityLabel,
  testID,
}: QuickPreviewPressableProps) {
  const s = useSharedValue(1)

  const pressDown = () => { s.value = withTiming(scale, { duration: 90 }) }
  const pressUp = () => { s.value = withTiming(1, { duration: 120 }) }

  const longPress = Gesture.LongPress()
    .enabled(!disabled)
    .minDuration(delay)
    .onTouchesDown(() => { pressDown() })
    .onFinalize(() => { pressUp() })
    .onStart(() => {
      if (haptics) runOnJS(triggerHaptics)(haptics)
      runOnJS(QuickPreview.present)(
        renderPreview(),
        { variant: 'popover', dismissOnBackdropPress: true, ...previewOptions }
      )
    })

  const tap = Gesture.Tap()
    .enabled(!disabled)
    .maxDuration(220)
    .onTouchesDown(() => { pressDown() })
    .onFinalize(() => { pressUp() })
    .onEnd(() => { onPress && runOnJS(onPress)() })

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
