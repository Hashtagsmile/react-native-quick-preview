import React from 'react'
import { BackHandler, AccessibilityInfo } from 'react-native'
import { Host, Portal } from 'react-native-portalize'
import { QuickPreviewOptions, QuickPreviewController } from './types'
import { QuickPreviewRoot } from './internal/QuickPreviewRoot'
import { QuickPreview as QuickPreviewStatic } from './QuickPreviewAPI' // ✅ only this

export const QuickPreviewContext = React.createContext<QuickPreviewController | null>(null)

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode | null>(null)
  const [options, setOptions] = React.useState<QuickPreviewOptions | undefined>(undefined)
  const openRef = React.useRef(false)

  const announce = React.useCallback((msg: string) => {
    try { AccessibilityInfo.announceForAccessibility?.(msg) } catch {}
  }, [])

  const close = React.useCallback(() => {
    if (!openRef.current) return
    openRef.current = false
    setContent(null)
    setOptions(undefined)
    announce('Quick preview closed')
  }, [announce])

  const present = React.useCallback(
    (node: React.ReactNode, opts?: Partial<QuickPreviewOptions>) => {
      setOptions(prev => ({ ...prev, ...opts }))
      openRef.current = true
      setContent(() => node)
      announce('Quick preview opened')
    },
    [announce]
  )

  const update = React.useCallback((opts: Partial<QuickPreviewOptions>) => {
    setOptions(prev => ({ ...prev, ...opts }))
  }, [])

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (openRef.current) { close(); return true }
      return false
    })
    return () => sub.remove()
  }, [close])

  const value = React.useMemo<QuickPreviewController>(
    () => ({ present, close, update, isOpen: () => openRef.current }),
    [present, close, update]
  )

  // Register the static API (layout effect = available ASAP)
  React.useLayoutEffect(() => {
    QuickPreviewStatic._set(value)
    return () => QuickPreviewStatic._set(null)
  }, [value])

  return (
    <QuickPreviewContext.Provider value={value}>
      <Host>
        {children}
        {content ? (
          <Portal>
            <QuickPreviewRoot options={options} onRequestClose={close}>
              {content}
            </QuickPreviewRoot>
          </Portal>
        ) : null}
      </Host>
    </QuickPreviewContext.Provider>
  )
}
