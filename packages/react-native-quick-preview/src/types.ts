import type React from 'react'
import type { AccessibilityRole } from 'react-native'

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
