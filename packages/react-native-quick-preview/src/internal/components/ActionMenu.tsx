import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// gesture-handler's Pressable: RN's own touchables don't reliably receive taps
// inside the preview overlay (see README, "Tappable preview content").
import { Pressable } from 'react-native-gesture-handler'
import type { QuickPreviewAction } from '../../types'
import type { Palette } from '../theme'

/**
 * The context-menu rows rendered with a preview. Pressing a row closes the
 * preview first, then runs the action — so an action that navigates doesn't
 * race the dismissal.
 */
export function ActionMenu({
  actions,
  palette,
  onRequestClose,
  variant,
}: {
  actions: QuickPreviewAction[]
  palette: Palette
  onRequestClose: () => void
  variant: 'popover' | 'sheet'
}) {
  return (
    <View
      style={[
        variant === 'popover' ? styles.popoverMenu : styles.sheetMenu,
        { backgroundColor: palette.menu },
        variant === 'sheet' && { borderTopColor: palette.separator },
      ]}
      accessibilityRole="menu"
    >
      {actions.map((action, i) => (
        <Pressable
          key={`${action.title}-${i}`}
          disabled={action.disabled}
          onPress={() => {
            if (action.disabled) return
            onRequestClose()
            action.onPress()
          }}
          accessibilityRole="menuitem"
          accessibilityLabel={action.title}
          accessibilityState={{ disabled: !!action.disabled }}
          style={({ pressed }) => [
            styles.row,
            i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: palette.separator },
            pressed && { backgroundColor: palette.separator },
            action.disabled && styles.disabled,
          ]}
        >
          <Text
            style={[styles.title, { color: action.destructive ? palette.destructive : palette.text }]}
            numberOfLines={1}
          >
            {action.title}
          </Text>
          {action.icon ? <View style={styles.icon}>{action.icon}</View> : null}
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  popoverMenu: {
    marginTop: 10,
    minWidth: 220,
    maxWidth: 300,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
  },
  sheetMenu: {
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  title: { fontSize: 16, flexShrink: 1 },
  icon: { marginLeft: 12 },
  disabled: { opacity: 0.4 },
})
