import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  LuArrowUp,
  LuArrowUpRight,
  LuDownload,
  LuGitCommitHorizontal,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuPhone,
} from 'react-icons/lu';
import { contact, dictionaries, roleSpans, type Lane, type Locale, type Project, type Role } from '@/content';
import { GraphCell, mainThrough, type Curve, type Node, type Segment } from './Graph';
import { GraphMotion } from './GraphMotion';
import { LangSwitch } from './LangSwitch';
import { Terminal } from './Terminal';

type RowProps = {
  segments: Segment[];
  nodes?: Node[];
  curves?: Curve[];
  lane?: string;
  className?: string;
  children: ReactNode;
  as?: 'div' | 'article' | 'li' | 'header';
  id?: string;
  labelledBy?: string;
};

function Row({ segments, nodes, curves, lane, className = '', children, as: Tag = 'div', id, labelledBy }: RowProps) {
  return (
    <Tag className={`row ${className}`} data-row="" data-lane={lane} id={id} aria-labelledby={labelledBy}>
      <GraphCell segments={segments} nodes={nodes} curves={curves} />
      <div className="row-body">{children}</div>
    </Tag>
  );
}

function SectionHead({ id, title, intro, segments = mainThrough }: { id: string; title: string; intro: string; segments?: Segment[] }) {
  return (
    <Row segments={segments} className="row--section-head">
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <p className="section-intro">{intro}</p>
    </Row>
  );
}

function ProjectRow({ p, privateLabel }: { p: Project; privateLabel: string }) {
  const onMain = p.lane === 'main';
  return (
    <Row
      as="article"
      lane={p.lane}
      className="row--project"
      segments={onMain ? mainThrough : [...mainThrough, { col: 1, lane: p.lane, span: 'mid' }]}
      nodes={[{ col: 0, lane: p.lane, kind: onMain ? 'commit' : 'merge' }]}
      curves={
        onMain
          ? []
          : [
              { from: 0, to: 1, lane: p.lane, at: 'below' },
              { from: 1, to: 0, lane: p.lane, at: 'bottom' },
            ]
      }
      labelledBy={`p-${p.id}`}
    >
      <div className="project">
        <div className="project-main">
          <h3 id={`p-${p.id}`} className="project-name">
            {p.name}
          </h3>
          <p className="project-meta">
            <span className="lane-dot" data-lane={p.lane} aria-hidden="true" />
            {p.org}
            <span className="sep" aria-hidden="true">
              ·
            </span>
            <time>{p.period}</time>
          </p>
          <p className="project-summary">{p.summary}</p>
          <ul className="points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>

        <aside className="project-side">
          {p.images && (
            <div className="shots">
              {p.images.map((img) => (
                <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 900px) 92vw, 420px" />
              ))}
            </div>
          )}
          <ul className="tags" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {p.links.length > 0 ? (
            <ul className="project-links">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
                    {l.label}
                    <LuArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="private-note">{privateLabel}</p>
          )}
        </aside>
      </div>
    </Row>
  );
}

// Lane slots for the experience graph; roles that never share a row may share a slot.
const roleCol: Partial<Record<Lane, number>> = { rendair: 1, decode: 2, epicure: 3, onedev: 1, cyos: 4 };

type RowGraph = { segments: Segment[]; nodes: Node[]; curves: Curve[] };

/**
 * Lays roles out as real branches, newest start first: each lane forks from
 * main below its first commit, runs through every row its dates overlap,
 * and merges back into main above (or stays open as a tip when ongoing).
 */
function experienceGraph(roles: Role[]): { head: RowGraph; rows: RowGraph[] } {
  const span = (r: Role) => roleSpans[r.id];
  const head: RowGraph = { segments: [{ col: 0, lane: 'main', span: 'full' }], nodes: [], curves: [] };
  const rows: RowGraph[] = roles.map(() => ({ segments: [{ col: 0, lane: 'main', span: 'full' }], nodes: [], curves: [] }));

  roles.forEach((r, i) => {
    const c = roleCol[r.lane] ?? 1;
    const [, until] = span(r);
    let m = i;
    while (m > 0 && (until === null || span(roles[m - 1])[0] <= until)) m--;

    if (until === null) {
      head.segments.push({ col: c, lane: r.lane, span: 'bottom' });
      head.nodes.push({ col: c, lane: r.lane, kind: 'tip' });
      for (let j = 0; j < i; j++) rows[j].segments.push({ col: c, lane: r.lane, span: 'full' });
      rows[i].segments.push({ col: c, lane: r.lane, span: 'top' });
    } else if (m < i) {
      rows[m].segments.push({ col: c, lane: r.lane, span: 'bottom' });
      rows[m].curves.push({ from: 0, to: c, lane: r.lane, at: 'top' });
      for (let j = m + 1; j < i; j++) rows[j].segments.push({ col: c, lane: r.lane, span: 'full' });
      rows[i].segments.push({ col: c, lane: r.lane, span: 'top' });
    } else {
      rows[i].curves.push({ from: 0, to: c, lane: r.lane, at: 'top' });
    }
    rows[i].nodes.push({ col: c, lane: r.lane, kind: 'commit' });
    rows[i].curves.push({ from: c, to: 0, lane: r.lane, at: 'below' });
  });

  return { head, rows };
}

export function Page({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const roles = [...t.roles].sort((a, b) => (roleSpans[a.id][0] < roleSpans[b.id][0] ? 1 : -1));
  const exp = experienceGraph(roles);

  return (
    <>
      <GraphMotion />
      <a className="skip" href="#work">
        {t.nav.work}
      </a>

      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href={locale === 'pt' ? '/pt/' : '/'}>
            <LuGitCommitHorizontal aria-hidden="true" />
            <span>ricini.dev</span>
          </a>
          <nav aria-label="Primary" className="nav">
            <a href="#work">{t.nav.work}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#stack">{t.nav.stack}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <LangSwitch locale={locale} label={t.nav.switchLabel} />
        </div>
      </header>

      <main className="page">
        {/* HEAD */}
        <Row segments={[{ col: 0, lane: 'main', span: 'bottom' }]} nodes={[{ col: 0, lane: 'main', kind: 'head' }]} className="row--hero">
          <div className="hero">
            <div className="hero-copy">
              <h1 className="name">Luiz Ricini</h1>
              <p className="subject">{t.hero.subject}</p>
              <p className="hero-body">{t.hero.body}</p>
              <ul className="refs" aria-label="Status">
                <li className="ref ref--head">{t.hero.refs[0]}</li>
                <li className="ref ref--tag">
                  <span className="pulse" aria-hidden="true" />
                  {t.hero.refs[1]}
                </li>
              </ul>
              <p className="author">
                <code>
                  {t.hero.author}: Luiz Ricini &lt;{contact.email}&gt;
                </code>
                <code>{t.hero.based}</code>
              </p>
              <div className="actions">
                <a className="btn btn--primary" href={`mailto:${contact.email}`}>
                  <LuMail aria-hidden="true" />
                  {t.hero.cta.email}
                </a>
                <a className="btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <LuLinkedin aria-hidden="true" />
                  {t.hero.cta.linkedin}
                </a>
                <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">
                  <LuGithub aria-hidden="true" />
                  {t.hero.cta.github}
                </a>
                <a className="btn" href={contact.cv} download>
                  <LuDownload aria-hidden="true" />
                  {t.hero.cta.cv}
                </a>
              </div>
            </div>
            <Terminal title={t.hero.terminalTitle} log={t.hero.log} />
          </div>
        </Row>

        {/* Work */}
        <section id="work" aria-labelledby="work-title" className="section">
          <SectionHead id="work-title" title={t.work.title} intro={t.work.intro} />
          {t.projects.map((p) => (
            <ProjectRow key={p.id} p={p} privateLabel={t.work.private} />
          ))}
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="experience-title" className="section">
          <Row {...exp.head} className="row--section-head row--exp-head">
            <h2 id="experience-title" className="section-title">
              {t.experience.title}
            </h2>
            <p className="section-intro">{t.experience.intro}</p>
          </Row>
          <ol className="roles">
            {roles.map((r, i) => {
              return (
                <Row key={r.id} as="li" lane={r.lane} className="row--role" {...exp.rows[i]}>
                  <div className="role">
                    <p className="role-when">
                      <time>{r.start}</time>
                      <span aria-hidden="true"> — </span>
                      <time>{r.end ?? t.experience.present}</time>
                      <span className="role-state" data-state={r.end ? 'merged' : 'head'}>
                        {r.end ? t.experience.merged : t.experience.head}
                      </span>
                    </p>
                    <div className="role-what">
                      <h3 className="role-company">{r.company}</h3>
                      <p className="role-title">
                        {r.title}
                        <span className="sep" aria-hidden="true">
                          ·
                        </span>
                        {r.kind}
                        <span className="sep" aria-hidden="true">
                          ·
                        </span>
                        {r.place}
                      </p>
                      <ul className="points points--tight">
                        {r.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Row>
              );
            })}
          </ol>
          <Row segments={mainThrough} nodes={[{ col: 0, lane: 'main', kind: 'commit' }]} className="row--role row--edu">
            <div className="role">
              <p className="role-when">
                <time>{t.education.period}</time>
              </p>
              <div className="role-what">
                <h3 className="role-company">{t.education.school}</h3>
                <p className="role-title">{t.education.note}</p>
              </div>
            </div>
          </Row>
        </section>

        {/* Stack */}
        <section id="stack" aria-labelledby="stack-title" className="section">
          <SectionHead id="stack-title" title={t.stack.title} intro={t.stack.intro} />
          <Row segments={mainThrough}>
            <dl className="stack">
              {t.stack.groups.map((g) => (
                <div key={g.name} className="stack-group">
                  <dt>{g.name}</dt>
                  <dd>
                    <ul>
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Row>
          <Row segments={mainThrough} className="row--quote">
            <figure className="quote">
              <blockquote lang="en">
                <p>{t.quote.text}</p>
              </blockquote>
              {t.quote.note && <p className="quote-note">{t.quote.note}</p>}
              <figcaption>
                <strong>{t.quote.author}</strong>
                <span>{t.quote.role}</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                  {t.quote.label}
                  <LuArrowUpRight aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </Row>
        </section>
      </main>

      {/* Contact */}
      <footer id="contact" className="close" aria-labelledby="contact-title">
        <div className="close-inner">
          <Row segments={[{ col: 0, lane: 'main', span: 'top' }]} nodes={[{ col: 0, lane: 'main', kind: 'head' }]} className="row--close">
            <h2 id="contact-title" className="close-title">
              {t.contact.title}
            </h2>
            <p className="close-body">{t.contact.body}</p>
            <a className="close-email" href={`mailto:${contact.email}`}>
              {contact.email}
              <LuArrowUpRight aria-hidden="true" />
            </a>
            <ul className="close-grid">
              <li>
                <span className="close-label">{t.contact.phone}</span>
                <a href={contact.phoneHref}>
                  <LuPhone aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="close-label">CV</span>
                <a href={contact.cv} download>
                  <LuDownload aria-hidden="true" />
                  {t.contact.cv}
                </a>
              </li>
              <li>
                <span className="close-label">{t.contact.elsewhere}</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <LuLinkedin aria-hidden="true" />
                  linkedin.com/in/luiz-ricini
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer">
                  <LuGithub aria-hidden="true" />
                  github.com/luizricini
                </a>
              </li>
            </ul>
          </Row>
          <div className="colophon">
            <p>
              © {new Date().getFullYear()} Luiz Ricini. {t.footer.built}
            </p>
            <a href="#top" className="to-top">
              <LuArrowUp aria-hidden="true" />
              {t.footer.top}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
