// src/index.ts

// core
export { PreviewProvider } from './context'
export { useQuickPreview } from './useQuickPreview'

// ✅ static API (Gorhom-style)
export { QuickPreview } from './QuickPreviewAPI'

// ✅ headless component exported with a different name
export { QuickPreview as QuickPreviewComponent } from './headless/QuickPreview'

// types / helpers
export type {
  QuickPreviewOptions,
  QuickPreviewVariant,
  QuickPreviewSize,
  QuickPreviewController,
} from './types'
export { QuickPreviewScrollView } from './internal/components/QuickPreviewScrollView'


// Addons
export { QuickPreviewPressable } from './addons/QuickPreviewPressable'
