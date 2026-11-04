import type React from 'react'
import type { AccessibilityRole, StyleProp, ViewStyle } from 'react-native'

/**
 * Color scheme for the built-in chrome (container background, action menu,
 * grabber, backdrop). Your own content is never restyled.
 * - `'light'` — white containers (default, matches 2.0).
 * - `'dark'` — dark containers.
 * - `'system'` — follows the device appearance via `useColorScheme()`.
 *
 * @defaultValue `'light'`
 */
export type QuickPreviewColorScheme = 'light' | 'dark' | 'system'

/**
 * A row in the context menu shown with the preview (below the popover, or at
 * the bottom of the sheet). Pressing an action closes the preview, then calls
 * `onPress`.
 *
 * @example
 * ```tsx
 * { title: 'Share', icon: <ShareIcon />, onPress: share }
 * { title: 'Delete', destructive: true, onPress: remove }
 * ```
 */
export type QuickPreviewAction = {
  /** Row label. */
  title: string
  /** Called after the preview closes. */
  onPress: () => void
  /** Optional element rendered at the trailing edge of the row (e.g. an icon). */
  icon?: React.ReactNode
  /** Render the row in the destructive (red) style. */
  destructive?: boolean
  /** Show the row dimmed and ignore presses. */
  disabled?: boolean
}

/**
 * The on-screen rect (window coordinates, as returned by `measureInWindow`) of
 * the element the preview was opened from. When set, the popover grows out of
 * this rect instead of fading in at the center. `QuickPreviewPressable` sets it
 * for you.
 */
export type QuickPreviewOrigin = { x: number; y: number; width: number; height: number }

/**
 * How the preview is presented.
 * - `'popover'` — a centered card that scales in.
 * - `'sheet'` — a panel that slides up from the bottom and can be swiped down to dismiss.
 *
 * @defaultValue `'popover'`
 */
export type QuickPreviewVariant = 'popover' | 'sheet'

/**
 * Constrains the preview container's size.
 * - `'auto'` — size to the content (default).
 * - `number` — a maximum height in points.
 * - `{ maxHeight, maxWidth }` — explicit maximum dimensions in points.
 *
 * @defaultValue `'auto'`
 */
export type QuickPreviewSize =
  | 'auto'
  | number
  | { maxHeight?: number; maxWidth?: number }

/**
 * Options for a single presentation, passed to {@link QuickPreviewController.present}
 * (or `QuickPreview.present`, or as `previewOptions` on `QuickPreviewPressable`).
 *
 * @example
 * ```tsx
 * present(<Card />, {
 *   variant: 'sheet',
 *   size: { maxHeight: 480 },
 *   dismissOnPanDown: true,
 * })
 * ```
 */
export type QuickPreviewOptions = {
  /**
   * Centered `'popover'` or bottom `'sheet'`.
   * @defaultValue `'popover'`
   */
  variant?: QuickPreviewVariant
  /**
   * Constrain the container size. A number caps the height; an object caps
   * `maxHeight`/`maxWidth`; `'auto'` sizes to the content.
   * @defaultValue `'auto'`
   */
  size?: QuickPreviewSize
  /**
   * Close the preview when the backdrop (the area outside it) is tapped.
   * @defaultValue `true`
   */
  dismissOnBackdropPress?: boolean
  /**
   * Close the preview when it is swiped down. Applies to the `'sheet'` variant only.
   * @defaultValue `true`
   */
  dismissOnPanDown?: boolean
  /**
   * Context-menu actions rendered with the preview — below the popover card,
   * or at the bottom of the sheet. Works identically on iOS and Android.
   */
  actions?: QuickPreviewAction[]
  /**
   * Grow the popover out of this rect (window coordinates). Set automatically
   * by `QuickPreviewPressable`; pass it yourself when presenting imperatively
   * from a measured view. Ignored by the `'sheet'` variant.
   */
  origin?: QuickPreviewOrigin
  /**
   * Color scheme for the built-in container, menu and backdrop.
   * @defaultValue `'light'`
   */
  colorScheme?: QuickPreviewColorScheme
  /**
   * Extra style for the preview container (the popover card or the sheet) —
   * e.g. `backgroundColor`, `borderRadius`, shadows.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Backdrop color behind the preview.
   * @defaultValue `'rgba(0,0,0,0.5)'` (light), `'rgba(0,0,0,0.6)'` (dark)
   */
  backdropColor?: string
  /**
   * Render a custom backdrop instead of the solid color — e.g. a blur:
   * `renderBackdrop: () => <BlurView intensity={40} style={StyleSheet.absoluteFill} />`.
   * It's rendered full-screen under the preview and fades in; backdrop-press
   * dismissal still works on top of it.
   */
  renderBackdrop?: () => React.ReactNode
  /** Accessibility label announced for the preview container. */
  accessibilityLabel?: string
  /** Accessibility role for the preview container. */
  accessibilityRole?: AccessibilityRole
  /** Called on the JS thread when the open animation starts. */
  onOpenStart?: () => void
  /** Called when the open animation finishes. */
  onOpenEnd?: () => void
  /** Called when the close animation starts. */
  onCloseStart?: () => void
  /** Called when the close animation finishes and the preview is unmounted. */
  onCloseEnd?: () => void
}

/**
 * The imperative controller returned by {@link useQuickPreview} and exposed as the
 * static `QuickPreview` handle. Use it to open, update, and close previews.
 */
export type QuickPreviewController = {
  /**
   * Present `node` as the preview. Calling this while a preview is already open
   * replaces its content and options.
   * @param node - the React element to show inside the preview.
   * @param opts - presentation options ({@link QuickPreviewOptions}).
   */
  present: (node: React.ReactNode, opts?: Partial<QuickPreviewOptions>) => void
  /** Dismiss the current preview. No-op if nothing is open. */
  close: () => void
  /** Merge new options into the currently open preview (e.g. switch `variant`). */
  update: (opts: Partial<QuickPreviewOptions>) => void
  /** Whether a preview is currently open. */
  isOpen: () => boolean
}
