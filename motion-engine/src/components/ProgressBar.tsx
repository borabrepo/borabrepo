import React from 'react';
import {colors, gradients} from '../brand/tokens';
import {useSceneMode} from './SceneMode';

/** Horizontal progress bar; `progress` is 0 → 1. Speed / savings metaphor. */
export const ProgressBar: React.FC<{progress: number; width?: number | string; height?: number}> = ({
  progress,
  width = '100%',
  height = 18,
}) => {
  const {isChroma} = useSceneMode();
  return (
    <div
      style={{
        width,
        height,
        borderRadius: height,
        backgroundColor: isChroma ? colors.background : 'rgba(244,244,246,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
          height: '100%',
          borderRadius: height,
          background: isChroma ? colors.accent : gradients.accent,
          boxShadow: isChroma ? 'none' : `0 0 24px ${colors.accent}`,
        }}
      />
    </div>
  );
};
