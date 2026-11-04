import { useColorScheme } from 'react-native'
import type { QuickPreviewColorScheme } from '../types'

export type Palette = {
  container: string
  menu: string
  separator: string
  text: string
  destructive: string
  grabber: string
  backdrop: string
}

const LIGHT: Palette = {
  container: '#FFFFFF',
  menu: '#FFFFFF',
  separator: 'rgba(60,60,67,0.18)',
  text: '#000000',
  destructive: '#FF3B30',
  grabber: 'rgba(0,0,0,0.2)',
  backdrop: 'rgba(0,0,0,0.5)',
}

const DARK: Palette = {
  container: '#1C1C1E',
  menu: '#2C2C2E',
  separator: 'rgba(84,84,88,0.6)',
  text: '#FFFFFF',
  destructive: '#FF453A',
  grabber: 'rgba(255,255,255,0.3)',
  backdrop: 'rgba(0,0,0,0.6)',
}

/** Resolve the chrome palette for a color scheme. `'system'` follows the device. */
export function usePalette(scheme: QuickPreviewColorScheme = 'light'): Palette {
  const device = useColorScheme()
  const resolved = scheme === 'system' ? (device === 'dark' ? 'dark' : 'light') : scheme
  return resolved === 'dark' ? DARK : LIGHT
}
