import { resolveSizeStyle } from '../internal/resolveSize'

describe('resolveSizeStyle', () => {
  it('returns no constraints for undefined', () => {
    expect(resolveSizeStyle(undefined)).toEqual({})
  })

  it("returns no constraints for 'auto'", () => {
    expect(resolveSizeStyle('auto')).toEqual({})
  })

  it('treats a number as maxHeight', () => {
    expect(resolveSizeStyle(420)).toEqual({ maxHeight: 420 })
  })

  it('passes through maxHeight and maxWidth from an object', () => {
    expect(resolveSizeStyle({ maxHeight: 480, maxWidth: 320 })).toEqual({
      maxHeight: 480,
      maxWidth: 320,
    })
  })

  it('accepts a partial object', () => {
    expect(resolveSizeStyle({ maxWidth: 300 })).toEqual({ maxWidth: 300 })
    expect(resolveSizeStyle({ maxHeight: 500 })).toEqual({ maxHeight: 500 })
  })

  it('ignores non-numeric values in the object', () => {
    expect(resolveSizeStyle({} as never)).toEqual({})
  })
})
