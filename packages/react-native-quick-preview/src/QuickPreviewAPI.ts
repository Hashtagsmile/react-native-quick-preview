// src/QuickPreviewAPI.ts
import type { QuickPreviewController, QuickPreviewOptions } from './types'
import type React from 'react'

// Persist across Fast Refresh / HMR
const STORE = Symbol.for('rnqp.controller')
type Store = { controller: QuickPreviewController | null }
const g = globalThis as Record<symbol, Store | undefined>
const store: Store = g[STORE] ?? (g[STORE] = { controller: null })

function warn() {
  // __DEV__ is provided by RN/Metro; if TS complains, declare it in a globals.d.ts
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.warn('[react-native-quick-preview] PreviewProvider not mounted yet.')
  }
}

/**
 * A static handle to the same controller as {@link useQuickPreview} — callable
 * from anywhere, including outside React (services, store actions, event handlers).
 * Before `<PreviewProvider>` mounts it is a safe no-op (with a dev warning).
 *
 * @example
 * ```ts
 * import { QuickPreview } from 'react-native-quick-preview'
 *
 * QuickPreview.present(<Card />, { variant: 'sheet' })
 * QuickPreview.update({ size: { maxHeight: 480 } })
 * QuickPreview.close()
 * ```
 */
export const QuickPreview = {
  /** @internal Registered by `<PreviewProvider />`. Not part of the public API. */
  _set(c: QuickPreviewController | null) {
    store.controller = c
  },

  /**
   * Present `node` as the preview. Replaces the content if one is already open.
   * @param node - the React element to show inside the preview.
   * @param opts - presentation options ({@link QuickPreviewOptions}).
   */
  present(node: React.ReactNode, opts?: Partial<QuickPreviewOptions>) {
    const c = store.controller
    c ? c.present(node, opts) : warn()
  },

  /** Dismiss the current preview. No-op if nothing is open. */
  close() {
    const c = store.controller
    c ? c.close() : warn()
  },

  /** Merge new options into the currently open preview. */
  update(opts: Partial<QuickPreviewOptions>) {
    const c = store.controller
    c ? c.update(opts) : warn()
  },

  /** Whether a preview is currently open. */
  isOpen() {
    return !!store.controller?.isOpen()
  },

  /** @internal Dev/test convenience — don't use in app code. */
  __unsafe_getController(): QuickPreviewController | null {
    return store.controller
  },
} as const
