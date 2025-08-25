import type React from 'react'

export type QuickPreviewVariant = 'popover' | 'sheet'
import type { AccessibilityRole } from 'react-native'


export type QuickPreviewSize =
  | 'auto'
  | number
  | { maxHeight?: number; maxWidth?: number }

export type QuickPreviewOptions = {
  variant?: QuickPreviewVariant
  size?: QuickPreviewSize
  dismissOnBackdropPress?: boolean
  dismissOnPanDown?: boolean
  accessibilityLabel?: string
  accessibilityRole?: AccessibilityRole
  onOpenStart?: () => void
  onOpenEnd?: () => void
  onCloseStart?: () => void
  onCloseEnd?: () => void
}

export type QuickPreviewController = {
  present: (node: React.ReactNode, opts?: Partial<QuickPreviewOptions>) => void
  close: () => void
  update: (opts: Partial<QuickPreviewOptions>) => void
  isOpen: () => boolean
}
