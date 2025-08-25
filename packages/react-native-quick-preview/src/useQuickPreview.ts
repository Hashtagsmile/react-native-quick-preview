import React from 'react'
import { QuickPreviewContext } from './context'

export function useQuickPreview() {
  const ctx = React.useContext(QuickPreviewContext)
  if (!ctx) throw new Error('useQuickPreview must be used within <PreviewProvider>')
  return ctx
}
