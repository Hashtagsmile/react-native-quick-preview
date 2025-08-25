// src/QuickPreviewAPI.ts
import type { QuickPreviewController, QuickPreviewOptions } from './types'
import type React from 'react'

// Persist across Fast Refresh / HMR
const STORE = Symbol.for('rnqp.controller')
type Store = { controller: QuickPreviewController | null }
const g = globalThis as any
const store: Store = g[STORE] || (g[STORE] = { controller: null })

function warn() {
  // __DEV__ is provided by RN/Metro; if TS complains, declare it in a globals.d.ts
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // eslint-disable-next-line no-console
    console.warn('[react-native-quick-preview] PreviewProvider not mounted yet.')
  }
}

export const QuickPreview = {
  /** Called internally by <PreviewProvider /> */
  _set(c: QuickPreviewController | null) {
    store.controller = c
  },

  present(node: React.ReactNode, opts?: Partial<QuickPreviewOptions>) {
    const c = store.controller
    c ? c.present(node, opts) : warn()
  },

  close() {
    const c = store.controller
    c ? c.close() : warn()
  },

  update(opts: Partial<QuickPreviewOptions>) {
    const c = store.controller
    c ? c.update(opts) : warn()
  },

  isOpen() {
    return !!store.controller?.isOpen()
  },

  /** Dev/test convenience (don’t use in app code) */
  __unsafe_getController(): QuickPreviewController | null {
    return store.controller
  },
} as const
