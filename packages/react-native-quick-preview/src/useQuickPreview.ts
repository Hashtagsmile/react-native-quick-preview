import React from 'react'
import { QuickPreviewContext } from './context'
import type { QuickPreviewController } from './types'

/**
 * Access the {@link QuickPreviewController} to open, update, and close previews
 * from inside a React component. Must be called under a mounted `<PreviewProvider>`.
 *
 * @throws if used outside of a `<PreviewProvider>`.
 * @returns the controller: `{ present, close, update, isOpen }`.
 *
 * @example
 * ```tsx
 * function ProductCard({ product }) {
 *   const { present } = useQuickPreview()
 *   return (
 *     <Pressable onLongPress={() => present(<ProductPreview product={product} />, { variant: 'sheet' })}>
 *       <Thumbnail source={product.image} />
 *     </Pressable>
 *   )
 * }
 * ```
 */
export function useQuickPreview(): QuickPreviewController {
  const ctx = React.useContext(QuickPreviewContext)
  if (!ctx) throw new Error('useQuickPreview must be used within <PreviewProvider>')
  return ctx
}
