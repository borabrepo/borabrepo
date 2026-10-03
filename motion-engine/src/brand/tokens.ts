// Chronixel design system — the single source of truth for every scene.
// Never hard-code colors or fonts inside a scene; import them from here.

export const colors = {
  background: '#0A0A0C',
  panel: '#141418',
  surface: '#F4F4F6',
  text: '#F4F4F6',
  textMuted: 'rgba(244, 244, 246, 0.55)',
  accent: '#E10600',
  accentAlt: '#FF5500',
  gridLine: 'rgba(244, 244, 246, 0.05)',
  panelBorder: 'rgba(244, 244, 246, 0.12)',
  // Keying background only. Must never appear in foreground elements.
  chroma: '#00FF00',
} as const;

export const gradients = {
  accent: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentAlt} 100%)`,
} as const;

export const typography = {
  // Headings: ExtraBold, letters almost touching.
  headingWeight: 800,
  headingTracking: '-0.05em',
  headingLineHeight: 0.95,
  // Labels: 1–4 words, bold, off-white.
  labelWeight: 700,
  labelTracking: '-0.02em',
} as const;

export const radii = {
  panel: 28,
  chip: 999,
} as const;

export const FPS = 30;

export const formats = {
  vertical: {width: 1080, height: 1920},
  square: {width: 1080, height: 1080},
  landscape: {width: 1920, height: 1080},
} as const;

export type Format = keyof typeof formats;
