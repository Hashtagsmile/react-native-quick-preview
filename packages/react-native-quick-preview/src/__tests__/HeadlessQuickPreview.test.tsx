import React from 'react'
import { Text } from 'react-native'
import { render, screen } from '@testing-library/react-native'

jest.mock('../internal/QuickPreviewRoot', () => ({
  QuickPreviewRoot: (props: { children: React.ReactNode }) =>
    props.children as React.ReactElement,
}))

import { QuickPreview as QuickPreviewComponent } from '../headless/QuickPreview'

describe('headless QuickPreviewComponent', () => {
  it('renders nothing when not visible', () => {
    render(
      <QuickPreviewComponent visible={false} onClose={() => {}}>
        <Text>hidden</Text>
      </QuickPreviewComponent>
    )
    expect(screen.queryByText('hidden')).toBeNull()
  })

  it('renders children when visible', () => {
    render(
      <QuickPreviewComponent visible onClose={() => {}}>
        <Text>shown</Text>
      </QuickPreviewComponent>
    )
    expect(screen.getByText('shown')).toBeTruthy()
  })

  it('renders without a portal when portal={false}', () => {
    render(
      <QuickPreviewComponent visible portal={false} onClose={() => {}}>
        <Text>no portal</Text>
      </QuickPreviewComponent>
    )
    expect(screen.getByText('no portal')).toBeTruthy()
  })
})
