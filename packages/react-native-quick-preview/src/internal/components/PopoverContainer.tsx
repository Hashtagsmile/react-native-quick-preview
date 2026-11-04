import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import type { QuickPreviewOptions } from '../../types'
import { resolveSizeStyle } from '../resolveSize'
import type { Palette } from '../theme'
import { ActionMenu } from './ActionMenu'

// If the frame can't be measured (unusual hosts, tests), don't leave the card
// invisible: fall back to the plain center pop-in after this long.
const MEASURE_FALLBACK_MS = 120

export function PopoverContainer({
  children,
  options,
  palette,
  insets: _insets,
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
  const origin = options?.origin
  const actions = options?.actions
  const { width: windowWidth } = useWindowDimensions()

  const frameRef = React.useRef<View>(null)
  const startedRef = React.useRef(false)
  // Where the card started (relative to its resting place), so it can shrink
  // back into the same item on close.
  const originTransformRef = React.useRef<{ x: number; y: number; scale: number } | null>(null)

  const scale = useSharedValue(0.96)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0)
  const menuOpacity = useSharedValue(0)

  const animateIn = React.useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    const ease = Easing.out(Easing.cubic)
    // Smooth ease-out, no spring overshoot — from the item (morph) or a quick
    // center pop when there's no origin.
    const duration = origin ? 280 : 200
    scale.value = withTiming(1, { duration, easing: ease })
    translateX.value = withTiming(0, { duration, easing: ease })
    translateY.value = withTiming(0, { duration, easing: ease })
    opacity.value = withTiming(1, { duration: origin ? 120 : 160, easing: Easing.out(Easing.quad) })
    menuOpacity.value = withDelay(origin ? 140 : 80, withTiming(1, { duration: 160 }))
  }, [origin, scale, translateX, translateY, opacity, menuOpacity])

  React.useEffect(() => {
    if (!origin) {
      animateIn()
      return
    }
    const t = setTimeout(animateIn, MEASURE_FALLBACK_MS)
    return () => clearTimeout(t)
    // mount-only: the entrance runs once per presentation
  }, [])

  // Morph: measure where the card will land, then start it at the item's rect
  // (centered on the item, scaled to roughly its size) and animate home.
  const onFrameLayout = React.useCallback(() => {
    if (!origin || startedRef.current) return
    frameRef.current?.measureInWindow((x, y, w, h) => {
      if (startedRef.current || !w || !h) return
      const s = Math.min(Math.max(Math.min(origin.width / w, origin.height / h), 0.2), 1)
      const dx = origin.x + origin.width / 2 - (x + w / 2)
      const dy = origin.y + origin.height / 2 - (y + h / 2)
      originTransformRef.current = { x: dx, y: dy, scale: s }
      translateX.value = dx
      translateY.value = dy
      scale.value = s
      animateIn()
    })
  }, [origin, animateIn, translateX, translateY, scale])

  // Exit: shrink back into the item it grew from, or a quick fade without one.
  React.useEffect(() => {
    if (!closing) return
    const done = () => onExited?.()
    const ease = Easing.in(Easing.cubic)
    const back = originTransformRef.current
    menuOpacity.value = withTiming(0, { duration: 90 })
    if (back) {
      translateX.value = withTiming(back.x, { duration: 220, easing: ease })
      translateY.value = withTiming(back.y, { duration: 220, easing: ease })
      scale.value = withTiming(back.scale, { duration: 220, easing: ease })
      opacity.value = withDelay(120, withTiming(0, { duration: 100 }, finished => {
        if (finished) runOnJS(done)()
      }))
    } else {
      scale.value = withTiming(0.96, { duration: 150, easing: ease })
      opacity.value = withTiming(0, { duration: 150 }, finished => {
        if (finished) runOnJS(done)()
      })
    }
  }, [closing])

  const card = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  const menu = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ translateY: (1 - menuOpacity.value) * -6 }],
  }))

  const { maxHeight, maxWidth } = resolveSizeStyle(options?.size)
  // Like the native menu: anchor the actions on the side the item came from.
  const menuOnRight = !!origin && origin.x + origin.width / 2 > windowWidth / 2

  return (
    <View style={[StyleSheet.absoluteFill, styles.center]} pointerEvents="box-none">
      <View style={[styles.column, maxWidth != null && { maxWidth }]} pointerEvents="box-none">
        {/* Untransformed frame: measured for the morph, so the card's own
            transform never skews the measurement. */}
        <View ref={frameRef} collapsable={false} onLayout={onFrameLayout} style={styles.frame}>
          <Animated.View
            style={[
              styles.card,
              { backgroundColor: palette.container },
              maxHeight != null && { maxHeight },
              options?.containerStyle,
              card,
            ]}
            accessibilityRole={options?.accessibilityRole}
            accessibilityLabel={options?.accessibilityLabel ?? 'Quick preview'}
          >
            {children}
          </Animated.View>
        </View>
        {actions && actions.length > 0 ? (
          <Animated.View style={[menuOnRight ? styles.menuRight : styles.menuLeft, menu]}>
            <ActionMenu
              actions={actions}
              palette={palette}
              onRequestClose={onRequestClose}
              variant="popover"
            />
          </Animated.View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  column: {
    maxWidth: 520,
    width: '92%',
    maxHeight: '86%',
  },
  frame: { flexShrink: 1 },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    flexShrink: 1,
  },
  menuLeft: { alignItems: 'flex-start' },
  menuRight: { alignItems: 'flex-end' },
})
