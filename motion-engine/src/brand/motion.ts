import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// House easing: fast attack, long smooth settle.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// Spring tuned for premium UI entrances (no bounce-y wobble).
export const SPRING = {damping: 200, stiffness: 120, mass: 0.9} as const;
export const SNAPPY = {damping: 18, stiffness: 180, mass: 0.7} as const;

/** 0 → 1 spring progress starting at `delay` frames. */
export const useEnter = (delay = 0, config: typeof SPRING | typeof SNAPPY = SPRING) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config});
};

/** Clamped eased interpolation between two frames. */
export const useTween = (from: number, to: number, range: [number, number] = [0, 1]) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], range, {
    easing: easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
