import React from 'react'
import { BackHandler, AccessibilityInfo, StyleSheet, View } from 'react-native'
import { QuickPreviewOptions, QuickPreviewController } from './types'
import { QuickPreviewRoot } from './internal/QuickPreviewRoot'
import { OverlayContext, useOverlayLayer } from './internal/Overlay'
import { QuickPreview as QuickPreviewStatic } from './QuickPreviewAPI'

export const QuickPreviewContext = React.createContext<QuickPreviewController | null>(null)

/**
 * Hosts the preview layer and registers the controller. Mount this once, near the
 * root of your app, inside a `<GestureHandlerRootView>`. After it's mounted you can
 * present previews via {@link useQuickPreview} or the static `QuickPreview` handle.
 *
 * @example
 * ```tsx
 * <GestureHandlerRootView style={{ flex: 1 }}>
 *   <PreviewProvider>
 *     <YourApp />
 *   </PreviewProvider>
 * </GestureHandlerRootView>
 * ```
 *
 * Pass `defaultOptions` to set app-wide defaults (e.g. `colorScheme: 'system'`);
 * options passed to `present()` override them.
 */
export function PreviewProvider({
  children,
  defaultOptions,
}: {
  children: React.ReactNode
  /** App-wide defaults merged under every presentation's options. */
  defaultOptions?: Partial<QuickPreviewOptions>
}) {
  const [content, setContent] = React.useState<React.ReactNode | null>(null)
  const [options, setOptions] = React.useState<QuickPreviewOptions | undefined>(undefined)
  const openRef = React.useRef(false)
  const { api: overlayApi, layer: overlayLayer } = useOverlayLayer()

  const announce = React.useCallback((msg: string) => {
    // eslint-disable-next-line no-empty
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
      // Replace, don't merge: options from a previous presentation must not
      // leak into the next one. Merging is what update() is for.
      setOptions(opts)
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

  const resolvedOptions = defaultOptions ? { ...defaultOptions, ...options } : options

  return (
    <QuickPreviewContext.Provider value={value}>
      <OverlayContext.Provider value={overlayApi}>
        <View style={styles.host} collapsable={false} pointerEvents="box-none">
          {children}
          {overlayLayer}
          {content ? (
            <QuickPreviewRoot options={resolvedOptions} onRequestClose={close}>
              {content}
            </QuickPreviewRoot>
          ) : null}
        </View>
      </OverlayContext.Provider>
    </QuickPreviewContext.Provider>
  )
}

const styles = StyleSheet.create({
  host: { flex: 1 },
})
