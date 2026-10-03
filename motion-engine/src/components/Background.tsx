import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../brand/tokens';
import {useSceneMode} from './SceneMode';

const GRID = 72;

export const Background: React.FC = () => {
  const {isChroma} = useSceneMode();
  const frame = useCurrentFrame();

  if (isChroma) {
    // Pure flat key color: no gradient, texture, glow, or vignette.
    return <AbsoluteFill style={{backgroundColor: colors.chroma}} />;
  }

  const drift = (frame * 0.25) % GRID;

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px)`,
          backgroundSize: `${GRID}px ${GRID}px`,
          backgroundPosition: `0px ${drift}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 40% at 50% 35%, rgba(225, 6, 0, 0.10) 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.7) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
