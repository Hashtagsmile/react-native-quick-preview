import React from 'react'
import { Portal } from 'react-native-portalize'
import { QuickPreviewOptions } from '../types'
import { QuickPreviewRoot } from '../internal/QuickPreviewRoot'

export type HeadlessQuickPreviewProps = {
  visible: boolean
  onClose: () => void
  portal?: boolean
} & Partial<QuickPreviewOptions> & {
  children: React.ReactNode
}

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
  return portal ? <Portal>{node}</Portal> : node
}
