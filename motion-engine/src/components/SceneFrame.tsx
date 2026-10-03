import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './Background';
import {SceneModeProvider, type SceneProps} from './SceneMode';

/**
 * Wrap every scene in this. It paints the background and constrains content
 * to the active layout region (full frame, or one half for webcam splits).
 * Children should position themselves relative to this region, not the frame.
 */
export const SceneFrame: React.FC<SceneProps & {children: React.ReactNode}> = ({
  children,
  ...mode
}) => {
  const half = mode.layout !== 'full';

  return (
    <SceneModeProvider value={mode}>
      <AbsoluteFill>
        <Background />
        <AbsoluteFill
          style={{
            width: half ? '50%' : '100%',
            left: mode.layout === 'right' ? '50%' : 0,
            overflow: 'hidden',
          }}
        >
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneModeProvider>
  );
};
