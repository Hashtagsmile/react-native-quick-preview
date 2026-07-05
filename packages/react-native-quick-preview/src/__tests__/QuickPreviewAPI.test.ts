import { QuickPreview } from '../QuickPreviewAPI'
import type { QuickPreviewController } from '../types'

function makeController(): jest.Mocked<QuickPreviewController> {
  return {
    present: jest.fn(),
    close: jest.fn(),
    update: jest.fn(),
    isOpen: jest.fn().mockReturnValue(false),
  }
}

describe('QuickPreview static handle', () => {
  afterEach(() => {
    QuickPreview._set(null)
    jest.restoreAllMocks()
  })

  it('is a safe no-op before the provider mounts', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => {
      QuickPreview.present('content')
      QuickPreview.close()
      QuickPreview.update({ variant: 'sheet' })
    }).not.toThrow()
    expect(QuickPreview.isOpen()).toBe(false)
    // dev builds warn so the silent no-op is discoverable
    expect(warn).toHaveBeenCalledWith(
      '[react-native-quick-preview] PreviewProvider not mounted yet.'
    )
  })

  it('delegates to the registered controller', () => {
    const controller = makeController()
    QuickPreview._set(controller)

    QuickPreview.present('node', { variant: 'sheet' })
    expect(controller.present).toHaveBeenCalledWith('node', { variant: 'sheet' })

    QuickPreview.update({ size: 300 })
    expect(controller.update).toHaveBeenCalledWith({ size: 300 })

    QuickPreview.close()
    expect(controller.close).toHaveBeenCalled()

    controller.isOpen.mockReturnValue(true)
    expect(QuickPreview.isOpen()).toBe(true)
  })

  it('stops delegating after the controller unregisters', () => {
    const controller = makeController()
    QuickPreview._set(controller)
    QuickPreview._set(null)
    jest.spyOn(console, 'warn').mockImplementation(() => {})

    QuickPreview.close()
    expect(controller.close).not.toHaveBeenCalled()
    expect(QuickPreview.isOpen()).toBe(false)
  })
})
