import type { QuickPreviewSize } from '../types'

/**
 * Turn the public `size` option into container style constraints.
 * 'auto' (or undefined) applies nothing; a number caps the height;
 * an object caps height and/or width.
 */
export function resolveSizeStyle(
  size?: QuickPreviewSize
): { maxHeight?: number; maxWidth?: number } {
  if (size == null || size === 'auto') return {}
  if (typeof size === 'number') return { maxHeight: size }
  const out: { maxHeight?: number; maxWidth?: number } = {}
  if (typeof size.maxHeight === 'number') out.maxHeight = size.maxHeight
  if (typeof size.maxWidth === 'number') out.maxWidth = size.maxWidth
  return out
}
