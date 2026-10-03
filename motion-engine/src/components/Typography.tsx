import React from 'react';
import {colors, gradients, typography} from '../brand/tokens';
import {fontFor, type Script} from '../brand/fonts';
import {useSceneMode} from './SceneMode';

const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

type HeadingProps = {
  children: string;
  size?: number;
  accent?: boolean;
  script?: Script;
  style?: React.CSSProperties;
};

/** Poppins ExtraBold (Cairo for Arabic), very tight tracking. */
export const Heading: React.FC<HeadingProps> = ({children, size = 120, accent, script, style}) => {
  const {isChroma} = useSceneMode();
  const accentStyle: React.CSSProperties = accent
    ? isChroma
      ? {color: colors.accent}
      : {
          backgroundImage: gradients.accent,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }
    : {color: colors.text};

  return (
    <div
      dir={script === 'arabic' ? 'rtl' : undefined}
      style={{
        fontFamily: fontFor(script),
        fontWeight: typography.headingWeight,
        fontSize: size,
        letterSpacing: script === 'arabic' ? 0 : typography.headingTracking,
        lineHeight: typography.headingLineHeight,
        ...accentStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type LabelProps = {
  children: string;
  size?: number;
  muted?: boolean;
  script?: Script;
  style?: React.CSSProperties;
};

/** UI label. On-screen text policy: 1–4 words max. */
export const Label: React.FC<LabelProps> = ({children, size = 40, muted, script, style}) => {
  if (process.env.NODE_ENV !== 'production' && wordCount(children) > 4) {
    console.warn(`[Chronixel] Label exceeds 4 words: "${children}"`);
  }
  return (
    <div
      dir={script === 'arabic' ? 'rtl' : undefined}
      style={{
        fontFamily: fontFor(script),
        fontWeight: typography.labelWeight,
        fontSize: size,
        letterSpacing: script === 'arabic' ? 0 : typography.labelTracking,
        color: muted ? colors.textMuted : colors.text,
        lineHeight: 1.1,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Pill-shaped tag / callout button. */
export const Chip: React.FC<{children: string; accent?: boolean; size?: number}> = ({
  children,
  accent,
  size = 30,
}) => {
  const {isChroma} = useSceneMode();
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: `${size * 0.45}px ${size * 0.9}px`,
        borderRadius: 999,
        background: accent ? (isChroma ? colors.accent : gradients.accent) : colors.panel,
        border: accent || isChroma ? 'none' : `1.5px solid ${colors.panelBorder}`,
      }}
    >
      <Label size={size}>{children}</Label>
    </div>
  );
};
