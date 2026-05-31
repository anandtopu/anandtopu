/* global React */
const { useState, useEffect, useRef } = React;

/* ----------------------------------------------------------------
   Icons — lucide-style, 24x24, 1.75 stroke (matches design system)
---------------------------------------------------------------- */
const PATHS = {
  git: '<circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6.5L5 18a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-8.5V3"/><path d="M7.5 15h9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  brain: '<path d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0z"/><path d="M12 5a3 3 0 0 1 6 0 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 0z"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><path d="M9 13h.01M15 13h.01"/><path d="M2 13v2M22 13v2"/>',
  code: '<path d="m16 18 4-6-4-6"/><path d="m8 6-4 6 4 6"/>',
  terminal: '<path d="m4 17 6-5-6-5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 3.8 5.8 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z"/>',
  link: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>',
  gauge: '<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="m13.4 10.6 2.6-2.6"/><path d="M21 12a9 9 0 1 0-18 0"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  arrowUR: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
  linkedin: '<rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m9 13-1 8 4-3 4 3-1-8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  star: '<path d="m12 3 2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 18l-5.9 3 1.1-6.5L2.5 9.9l6.6-1z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
};
function Icon({ name, size = 18, sw = 1.75, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}
      dangerouslySetInnerHTML={{ __html: PATHS[name] || "" }} />
  );
}

/* count-up hook */
function useCountUp(target, run, dur = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const safety = setTimeout(() => setVal(target), dur + 250);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, [run, target]);
  return val;
}

/* in-view hook */
function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ----------------------------------------------------------------
   Top bar
---------------------------------------------------------------- */
function TopBar({ d }) {
  return (
    <div className="topbar">
      <div className="mark"><Icon name="git" size={15} sw={2} /></div>
      <div className="crumb"><b>{d.handle}</b><span className="slash">/</span>profile</div>
      <div className="spacer" />
      <div className="status-live"><span className="dot-live" /> available · architecture &amp; agents</div>
      <a className="btn btn-primary" href={d.links.github} target="_blank" rel="noopener">
        <Icon name="git" size={14} sw={2} /> Follow
      </a>
    </div>
  );
}

/* ----------------------------------------------------------------
   Left rail
---------------------------------------------------------------- */
function Rail({ d }) {
  return (
    <aside className="rail">
      <div className="id-card">
        <div className="avatar">
          <span className="ring" />
          AT
          <span className="pres" />
        </div>
        <div>
          <h1 className="id-name">{d.name}</h1>
          <div className="id-handle">@{d.handle}</div>
          <div className="id-role">{d.role}</div>
          <div className="id-meta">
            <div className="row"><Icon name="building" size={14} /> <b>{d.company}</b></div>
            <div className="row"><Icon name="pin" size={14} /> {d.location}</div>
          </div>
          <div className="rail-actions">
            <a className="btn btn-primary full" href={d.links.github} target="_blank" rel="noopener">
              <Icon name="git" size={14} sw={2} /> Follow
            </a>
            <a className="btn btn-outline btn-icon" href={d.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
              <Icon name="linkedin" size={15} />
            </a>
            <a className="btn btn-outline btn-icon" href={d.links.credly} target="_blank" rel="noopener" aria-label="Credly">
              <Icon name="award" size={15} />
            </a>
          </div>
          <div className="rail-stats">
            <div className="cell"><div className="n">25+</div><div className="l">Certs</div></div>
            <div className="cell"><div className="n">30+</div><div className="l">Badges</div></div>
            <div className="cell"><div className="n">3</div><div className="l">Clouds</div></div>
          </div>
        </div>
      </div>

      <div className="term">
        <div className="term-bar">
          <span className="tdot" /><span className="tdot" /><span className="tdot" />
          <span className="ttl">~/focus.sh</span>
        </div>
        <div className="term-body">
          {d.focus.map((f, i) => (
            <div className="ln" key={i}><span className="k">{f.k}</span><span className="cmt">{"  # " + f.v}</span></div>
          ))}
          <div className="ln"><span className="cmt">$</span><span className="term-cursor" /></div>
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------------------------------------------
   Section header
---------------------------------------------------------------- */
function SecHead({ num, title, desc, id }) {
  return (
    <div className="sec-head" id={id}>
      <span className="num">{num}</span>
      <h2>{title}</h2>
      {desc && <span className="desc">{desc}</span>}
    </div>
  );
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function StatCell({ s, run }) {
  const v = useCountUp(s.v, run);
  return (
    <div className="s">
      <div className="v">{v}<span className="u">{s.suffix}</span></div>
      <div className="k">{s.k}</div>
    </div>
  );
}
function Hero({ d }) {
  const [run, setRun] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRun(true), 150); return () => clearTimeout(t); }, []);
  return (
    <section className="section" style={{ marginTop: 0 }}>
      <div className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Solution Architect · AI Systems</div>
          <h1>I design and ship <span className="hl">production-grade AI platforms.</span></h1>
          <p className="lede">{d.lede}</p>
          <div className="hero-signals">
            {d.signals.map((s, i) => (
              <span className="chip" key={i}><span className="ci" />{s}</span>
            ))}
          </div>
        </div>
        <div className="statbar">
          {d.heroStats.map((s, i) => <StatCell key={i} s={s} run={run} />)}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Tech stack
---------------------------------------------------------------- */
function Stack({ d }) {
  return (
    <section className="section">
      <SecHead num="01" title="Tech Stack" desc="The tools behind the platforms — AI, backend, data, and infra." />
      <div className="stack-grid">
        {d.stack.map((row, i) => (
          <div className="stack-row" key={i}>
            <div className="lbl">{row.label}</div>
            <div className="items">
              {row.items.map((it, j) => <span className="chip" key={j}><span className="ci" />{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.PX = { Icon, useCountUp, useInView, TopBar, Rail, SecHead, Hero, StatCell, Stack };
