import React, {createContext, useContext} from 'react';
import type {Format} from '../brand/tokens';

/**
 * Scene-wide render modes, set once per composition through props.
 *
 * background
 *   - "cinematic": dark #0A0A0C + grid + ambient glow (default)
 *   - "chroma":    flat #00FF00 for DaVinci Resolve 3D Keyer. Every component
 *                  reads this and drops glass, blur, glow and shadows so the
 *                  foreground stays 100% opaque with sharp edges.
 * layout
 *   - "full":  use the whole frame
 *   - "left" / "right": content lives in that half; the other half is left
 *              empty for webcam placement.
 */
export type BackgroundMode = 'cinematic' | 'chroma';
export type LayoutMode = 'full' | 'left' | 'right';

export type SceneProps = {
  format: Format;
  background: BackgroundMode;
  layout: LayoutMode;
};

export const defaultSceneProps: SceneProps = {
  format: 'vertical',
  background: 'cinematic',
  layout: 'full',
};

const SceneModeContext = createContext<SceneProps>(defaultSceneProps);

export const SceneModeProvider: React.FC<{value: SceneProps; children: React.ReactNode}> = ({
  value,
  children,
}) => <SceneModeContext.Provider value={value}>{children}</SceneModeContext.Provider>;

export const useSceneMode = () => {
  const mode = useContext(SceneModeContext);
  return {...mode, isChroma: mode.background === 'chroma'};
};
