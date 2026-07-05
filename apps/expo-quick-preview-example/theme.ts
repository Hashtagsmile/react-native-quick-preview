// Single source of truth for the example app's visual system.
// One accent, one near-black, one muted gray, one page background.
export const colors = {
  accent: '#0095f6',
  text: '#111111',
  textMuted: '#6c757d',
  surface: '#ffffff', // cards / previews
  background: '#ffffff', // page background
  panel: '#f7f7f8', // rows / control panels
  code: '#1a1a1a', // code block background (API screen)
  codeText: '#ffffff',
  border: '#e5e7eb',
  tileBg: '#eeeeee',
  danger: '#ff6b6b',
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 }

export const radius = { sm: 8, md: 10, lg: 14, card: 12 }

export const type = {
  h1: { fontSize: 28, fontWeight: '800' as const, color: colors.text },
  title: { fontSize: 18, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 14, color: colors.text },
  muted: { fontSize: 13, color: colors.textMuted },
}
