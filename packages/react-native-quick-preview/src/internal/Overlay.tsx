import React from 'react'

/**
 * A minimal in-house portal. `PreviewProvider` renders an overlay layer above
 * the app; components anywhere below it (the headless `QuickPreviewComponent`)
 * mount nodes into that layer by key. Replaces `react-native-portalize`, which
 * is unmaintained, so apps have one less dependency to install.
 */
type OverlayApi = {
  mount: (key: string, node: React.ReactNode) => void
  unmount: (key: string) => void
}

export const OverlayContext = React.createContext<OverlayApi | null>(null)

export function useOverlayLayer() {
  const [nodes, setNodes] = React.useState<Record<string, React.ReactNode>>({})
  const api = React.useMemo<OverlayApi>(
    () => ({
      mount: (key, node) => setNodes(prev => ({ ...prev, [key]: node })),
      unmount: key =>
        setNodes(prev => {
          if (!(key in prev)) return prev
          const next = { ...prev }
          delete next[key]
          return next
        }),
    }),
    []
  )
  const layer = Object.keys(nodes).map(key => (
    <React.Fragment key={key}>{nodes[key]}</React.Fragment>
  ))
  return { api, layer }
}

let nextId = 0

/**
 * Render `children` into the nearest overlay layer. With no `PreviewProvider`
 * above, renders in place so nothing silently disappears.
 */
export function OverlayPortal({ children }: { children: React.ReactNode }) {
  const overlay = React.useContext(OverlayContext)
  const [key] = React.useState(() => `rnqp-overlay-${nextId++}`)

  React.useLayoutEffect(() => {
    overlay?.mount(key, children)
  }, [overlay, key, children])

  React.useLayoutEffect(() => {
    return () => overlay?.unmount(key)
  }, [overlay, key])

  return overlay ? null : <>{children}</>
}
