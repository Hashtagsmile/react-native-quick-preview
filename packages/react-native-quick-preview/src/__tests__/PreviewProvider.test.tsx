import React from 'react'
import { Text } from 'react-native'
import { render, screen, act, renderHook } from '@testing-library/react-native'

import type { QuickPreviewOptions } from '../types'

// Record the options QuickPreviewRoot receives so option semantics can be
// asserted precisely, without rendering reanimated/gesture internals.
const mockRootSpy = jest.fn()
jest.mock('../internal/QuickPreviewRoot', () => ({
  QuickPreviewRoot: (props: {
    options?: QuickPreviewOptions
    onRequestClose: () => void
    children: React.ReactNode
  }) => {
    mockRootSpy(props)
    return props.children as React.ReactElement
  },
}))

// Imported after the mock so the provider picks it up.
import { PreviewProvider } from '../context'
import { useQuickPreview } from '../useQuickPreview'
import { QuickPreview } from '../QuickPreviewAPI'
import type { QuickPreviewController } from '../types'

function lastRootOptions(): QuickPreviewOptions | undefined {
  return mockRootSpy.mock.calls[mockRootSpy.mock.calls.length - 1][0].options
}

function setup() {
  let controller: QuickPreviewController
  function Grab() {
    controller = useQuickPreview()
    return null
  }
  render(
    <PreviewProvider>
      <Grab />
    </PreviewProvider>
  )
  // @ts-expect-error assigned during render
  return controller
}

beforeEach(() => {
  mockRootSpy.mockClear()
})

describe('useQuickPreview', () => {
  it('throws outside the provider', () => {
    expect(() => renderHook(() => useQuickPreview())).toThrow(
      'useQuickPreview must be used within <PreviewProvider>'
    )
  })
})

describe('PreviewProvider', () => {
  it('presents and closes content', () => {
    const controller = setup()
    expect(controller.isOpen()).toBe(false)
    expect(screen.queryByText('preview body')).toBeNull()

    act(() => controller.present(<Text>preview body</Text>))
    expect(controller.isOpen()).toBe(true)
    expect(screen.getByText('preview body')).toBeTruthy()

    act(() => controller.close())
    expect(controller.isOpen()).toBe(false)
    expect(screen.queryByText('preview body')).toBeNull()
  })

  it('replaces content when present is called while open', () => {
    const controller = setup()
    act(() => controller.present(<Text>first</Text>))
    act(() => controller.present(<Text>second</Text>))
    expect(screen.queryByText('first')).toBeNull()
    expect(screen.getByText('second')).toBeTruthy()
  })

  it('does NOT leak options from a previous presentation', () => {
    const controller = setup()
    act(() =>
      controller.present(<Text>a</Text>, {
        variant: 'sheet',
        size: 300,
        dismissOnPanDown: false,
      })
    )
    expect(lastRootOptions()).toMatchObject({ variant: 'sheet', size: 300 })

    act(() => controller.close())
    act(() => controller.present(<Text>b</Text>, { variant: 'popover' }))

    const opts = lastRootOptions()
    expect(opts?.variant).toBe('popover')
    expect(opts?.size).toBeUndefined()
    expect(opts?.dismissOnPanDown).toBeUndefined()
  })

  it('update() merges into the current options', () => {
    const controller = setup()
    act(() => controller.present(<Text>a</Text>, { variant: 'sheet' }))
    act(() => controller.update({ size: { maxHeight: 480 } }))

    expect(lastRootOptions()).toMatchObject({
      variant: 'sheet',
      size: { maxHeight: 480 },
    })
  })

  it('close() is idempotent', () => {
    const controller = setup()
    act(() => controller.present(<Text>a</Text>))
    act(() => controller.close())
    expect(() => act(() => controller.close())).not.toThrow()
    expect(controller.isOpen()).toBe(false)
  })

  it('wires the static QuickPreview handle while mounted', () => {
    setup()
    act(() => QuickPreview.present(<Text>via static</Text>))
    expect(screen.getByText('via static')).toBeTruthy()
    expect(QuickPreview.isOpen()).toBe(true)

    act(() => QuickPreview.close())
    expect(QuickPreview.isOpen()).toBe(false)
  })

  it('unregisters the static handle on unmount', () => {
    function Noop() {
      return null
    }
    const { unmount } = render(
      <PreviewProvider>
        <Noop />
      </PreviewProvider>
    )
    unmount()

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    QuickPreview.present(<Text>after unmount</Text>)
    expect(warn).toHaveBeenCalled()
    expect(QuickPreview.isOpen()).toBe(false)
    warn.mockRestore()
  })
})
