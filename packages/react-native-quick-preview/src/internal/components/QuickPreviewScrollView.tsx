import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

/**
 * A gesture-aware `ScrollView` for use inside preview content. Use it instead of
 * a plain `ScrollView` so that scrolling the content and the swipe-to-dismiss
 * gesture don't fight each other. Accepts all `ScrollViewProps`.
 *
 * @example
 * ```tsx
 * present(
 *   <QuickPreviewScrollView>
 *     <LongArticle />
 *   </QuickPreviewScrollView>,
 *   { variant: 'sheet', size: { maxHeight: 520 } }
 * )
 * ```
 */
export function QuickPreviewScrollView(props: ScrollViewProps) {
  return <ScrollView nestedScrollEnabled {...props} />
}
