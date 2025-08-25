import React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

export function QuickPreviewScrollView(props: ScrollViewProps) {
  return <ScrollView nestedScrollEnabled {...props} />
}
