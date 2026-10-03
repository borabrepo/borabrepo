import React from 'react';
import {colors, radii} from '../brand/tokens';
import {useSceneMode} from './SceneMode';

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  highlighted?: boolean;
};

/** Glassmorphic card. Falls back to a solid, sharp-edged card in chroma mode. */
export const GlassPanel: React.FC<Props> = ({children, style, highlighted}) => {
  const {isChroma} = useSceneMode();

  const base: React.CSSProperties = isChroma
    ? {
        backgroundColor: colors.panel,
        border: `4px solid ${highlighted ? colors.accent : colors.panel}`,
      }
    : {
        background: 'linear-gradient(160deg, rgba(244,244,246,0.08) 0%, rgba(20,20,24,0.85) 60%)',
        border: `1.5px solid ${highlighted ? colors.accentAlt : colors.panelBorder}`,
        boxShadow: highlighted
          ? `0 0 0 1px ${colors.accent}, 0 30px 80px rgba(225, 6, 0, 0.25)`
          : '0 30px 80px rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(18px)',
      };

  return (
    <div style={{borderRadius: radii.panel, padding: 40, ...base, ...style}}>{children}</div>
  );
};
