import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../brand/tokens';
import {easeOut} from '../brand/motion';
import {useSceneMode} from './SceneMode';

export type GraphNode = {id: string; x: number; y: number};
export type GraphEdge = {from: string; to: string; delay: number; highlighted?: boolean};

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
  drawDuration?: number;
};

/**
 * Connector lines that draw themselves between node centers. Render the node
 * cards yourself on top (positions are in the same coordinate space).
 * AI / automation metaphor.
 */
export const NodeEdges: React.FC<Props> = ({nodes, edges, width, height, drawDuration = 18}) => {
  const frame = useCurrentFrame();
  const {isChroma} = useSceneMode();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg width={width} height={height} style={{position: 'absolute', left: 0, top: 0}}>
      {edges.map((e) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const t = interpolate(frame, [e.delay, e.delay + drawDuration], [0, 1], {
          easing: easeOut,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const stroke = e.highlighted ? colors.accent : isChroma ? colors.surface : colors.panelBorder;
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={stroke}
            strokeWidth={e.highlighted ? 6 : 3}
            strokeLinecap="round"
            strokeDasharray={len}
            strokeDashoffset={len * (1 - t)}
            style={
              e.highlighted && !isChroma
                ? {filter: `drop-shadow(0 0 10px ${colors.accent})`}
                : undefined
            }
          />
        );
      })}
    </svg>
  );
};
