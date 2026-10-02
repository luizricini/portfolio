import type { CSSProperties } from 'react';
import type { Lane } from '@/content';

/**
 * One row of a git-style branch graph, rendered the way `git log --graph`
 * draws it: each row owns its slice of every lane, so rows stacked in a
 * column read as one continuous graph.
 *
 * Columns are lane slots (0 = main). Vertical positions are relative to the
 * row's node line (--node-y) and a fixed bend height (--bend):
 *   full   whole row
 *   top    row top → node
 *   bottom node → row bottom
 *   below  node + bend → row bottom
 *   mid    node + bend → row bottom − bend
 * Curves bend between two columns: `top` (row top → node), `below`
 * (node → node + bend) and `bottom` (last bend of the row).
 */
export const COLS = 5;

export type Segment = { col: number; lane: Lane; span: 'full' | 'top' | 'bottom' | 'below' | 'mid' };
export type Node = { col: number; lane: Lane; kind: 'commit' | 'merge' | 'head' | 'tip' };
export type Curve = { from: number; to: number; lane: Lane; at: 'top' | 'below' | 'bottom' };

const col = (n: number) => ({ '--col': n }) as CSSProperties;

export function GraphCell({
  segments,
  nodes = [],
  curves = [],
  className = '',
}: {
  segments: Segment[];
  nodes?: Node[];
  curves?: Curve[];
  className?: string;
}) {
  return (
    <div className={`graph ${className}`} aria-hidden="true">
      {segments.map((s, i) => (
        <span key={i} className="g-line" data-lane={s.lane} data-span={s.span} style={col(s.col)} />
      ))}
      {curves.map((c, i) => (
        <svg key={i} className="g-curve" data-lane={c.lane} data-at={c.at} viewBox={`0 0 ${COLS} 30`} preserveAspectRatio="none">
          <path
            d={`M ${c.from + 0.5} 0 C ${c.from + 0.5} 16, ${c.to + 0.5} 14, ${c.to + 0.5} 30`}
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
        </svg>
      ))}
      {nodes.map((n, i) => (
        <span key={i} className="g-node" data-lane={n.lane} data-kind={n.kind} style={col(n.col)} />
      ))}
    </div>
  );
}

/** A row whose only lane is main running straight through. */
export const mainThrough: Segment[] = [{ col: 0, lane: 'main', span: 'full' }];
