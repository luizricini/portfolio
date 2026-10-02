import type { Shipped } from '@/content';
import { GraphCell } from './Graph';

/** Hero plate: recent shipped work as a single-lane merge log, newest first. */
export function Terminal({ title, log }: { title: string; log: Shipped[] }) {
  return (
    <figure className="terminal">
      <div className="terminal-bar">
        <code className="terminal-title">
          <span className="terminal-prompt">$</span> {title}
        </code>
      </div>
      <ol className="terminal-log">
        {log.map((c, i) => (
          <li key={`${c.date}-${c.text}`} className="terminal-row" data-lane={c.lane}>
            <GraphCell
              className="graph--mini"
              segments={[{ col: 0, lane: 'main', span: i === 0 ? 'bottom' : 'full' }]}
              nodes={[{ col: 0, lane: c.lane, kind: 'merge' }]}
            />
            <code className="t-hash">{c.date}</code>
            <code className="t-ref" data-lane={c.lane}>
              {c.ref}
            </code>
            <code className="t-subject">{c.text}</code>
          </li>
        ))}
      </ol>
    </figure>
  );
}
