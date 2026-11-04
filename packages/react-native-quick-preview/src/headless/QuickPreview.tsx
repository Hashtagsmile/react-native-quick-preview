import React from 'react'
import { QuickPreviewOptions } from '../types'
import { QuickPreviewRoot } from '../internal/QuickPreviewRoot'
import { OverlayPortal } from '../internal/Overlay'

/**
 * Props for the controlled, headless `QuickPreviewComponent`. Extends
 * {@link QuickPreviewOptions} (so `variant`, `size`, `dismissOn*`, and the
 * lifecycle callbacks are all accepted).
 */
export type HeadlessQuickPreviewProps = {
  /** Whether the preview is shown. You own this state. */
  visible: boolean
  /** Called when the preview requests to close (backdrop press, swipe, back button). */
  onClose: () => void
  /**
   * Render into the `PreviewProvider` overlay above the app. Disable to render
   * in place (e.g. inside your own full-screen overlay).
   * @defaultValue `true`
   */
  portal?: boolean
} & Partial<QuickPreviewOptions> & {
  /** The preview content. */
  children: React.ReactNode
}

/**
 * A controlled, headless preview component — you own the `visible` state. Useful
 * when you prefer a declarative component over the imperative
 * {@link useQuickPreview} hook or the static `QuickPreview` handle.
 *
 * Exported as `QuickPreviewComponent`.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false)
 * <QuickPreviewComponent visible={visible} onClose={() => setVisible(false)} variant="sheet">
 *   <Card />
 * </QuickPreviewComponent>
 * ```
 */
export function QuickPreview({
  visible,
  onClose,
  portal = true,
  children,
  ...opts
}: HeadlessQuickPreviewProps) {
  if (!visible) return null
  const node = (
    <QuickPreviewRoot options={opts} onRequestClose={onClose}>
      {children}
    </QuickPreviewRoot>
  )
  return portal ? <OverlayPortal>{node}</OverlayPortal> : node
}
