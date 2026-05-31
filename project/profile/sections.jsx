/* global React, PX */
const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;
const { Icon: IconB, SecHead: SecHeadB, useInView: useInViewB } = window.PX;

/* ----------------------------------------------------------------
   Projects (filterable)
---------------------------------------------------------------- */
const CAT_META = {
  ai:   { label: "AI Systems & Agents", color: "var(--accent)", bg: "var(--accent-bg)" },
  dist: { label: "Distributed Systems", color: "var(--info)",   bg: "var(--info-bg)" },
};
function ProjectCard({ p }) {
  const meta = CAT_META[p.cat];
  return (
    <a className={"proj" + (p.feat ? " feat" : "")} href={p.url} target="_blank" rel="noopener"
       style={{ "--cat": meta.color, "--cat-bg": meta.bg }}>
      <div className="proj-top">
        <div className="proj-ico"><IconB name={p.icon} size={19} /></div>
        <div className="proj-head">
          <div className="proj-name">
            {p.name}
            {p.feat && <span className="feat-badge">flagship</span>}
            <span style={{ flex: 1 }} />
            <span className="proj-arrow"><IconB name="arrowUR" size={17} /></span>
          </div>
          <div className="proj-tagline">{p.tagline}</div>
        </div>
      </div>
      <p className="proj-desc">{p.desc}</p>
      <div className="proj-tags">
        {p.tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
      </div>
      <div className="proj-meta">
        <span className="m"><span className="sw" style={{ background: meta.color }} />{meta.label}</span>
        <span className="m"><IconB name="git" size={13} /> {p.url.replace("https://github.com/", "")}</span>
      </div>
    </a>
  );
}
function Projects({ d }) {
  const [filter, setFilter] = useStateB("all");
  const counts = {
    all: d.projects.length,
    ai: d.projects.filter(p => p.cat === "ai").length,
    dist: d.projects.filter(p => p.cat === "dist").length,
  };
  const shown = d.projects.filter(p => filter === "all" || p.cat === filter);
  const tabs = [
    { id: "all", label: "All", n: counts.all },
    { id: "ai", label: "AI Systems", n: counts.ai },
    { id: "dist", label: "Distributed", n: counts.dist },
  ];
  return (
    <section className="section">
      <SecHeadB num="02" title="Featured Projects" desc="Production-shaped systems — RAG, agents, schedulers, caches." />
      <div className="tabs" role="tablist">
        {tabs.map(t => (
          <button key={t.id} className={"tab" + (filter === t.id ? " active" : "")}
            onClick={() => setFilter(t.id)} role="tab" aria-selected={filter === t.id}>
            {t.label} <span className="cnt">{t.n}</span>
          </button>
        ))}
      </div>
      <div className="proj-grid">
        {shown.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>

      <div style={{ marginTop: 26 }}>
        <div className="sec-head" style={{ marginBottom: 16 }}>
          <span className="num">02.b</span><h2 style={{ fontSize: 15 }}>Learning &amp; Knowledge</h2>
        </div>
        <div className="learn-grid">
          {d.learning.map((l, i) => (
            <a className="learn" key={i} href={l.url} target="_blank" rel="noopener">
              <div className="lnico"><IconB name="book" size={15} /></div>
              <div>
                <div className="lnt">{l.name}</div>
                <div className="lns">{l.sub}</div>
              </div>
              <span className="lnarrow"><IconB name="arrowUR" size={15} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Certifications
---------------------------------------------------------------- */
function Certs({ d }) {
  const [filter, setFilter] = useStateB("all");
  const [openBadges, setOpenBadges] = useStateB(false);
  const provCount = (id) => d.certs.filter(c => c.p === id).length;
  const provColor = (id) => (d.certProviders.find(p => p.id === id) || {}).color;
  const provName = (id) => (d.certProviders.find(p => p.id === id) || {}).name;
  const shown = d.certs.filter(c => filter === "all" || c.p === filter);
  const tabs = [{ id: "all", label: "All", n: d.certs.length },
    ...d.certProviders.map(p => ({ id: p.id, label: p.name, n: provCount(p.id) }))];
  return (
    <section className="section">
      <SecHeadB num="03" title="Certifications" desc="25+ verified credentials across GCP, AWS, Azure, O'Reilly & IBM." />

      <div className="cert-summary">
        {d.certProviders.map(p => (
          <div className="cs-pill" key={p.id}>
            <span className="pd" style={{ background: p.color }} />
            <span className="pn">{p.name}</span>
            <span className="pc">{provCount(p.id)}</span>
          </div>
        ))}
      </div>

      <div className="tabs" role="tablist">
        {tabs.map(t => (
          <button key={t.id} className={"tab" + (filter === t.id ? " active" : "")}
            onClick={() => setFilter(t.id)}>
            {t.label} <span className="cnt">{t.n}</span>
          </button>
        ))}
      </div>

      <div className="cert-grid">
        {shown.map((c, i) => (
          <div className="cert" key={i}>
            <div className="cert-top">
              <span className="cert-prov"><span className="pd" style={{ background: provColor(c.p) }} />{provName(c.p)}</span>
              <span className="cert-exp">{c.e}</span>
            </div>
            <div className="cert-name">{c.n}</div>
            <a className="cert-verify" href={d.links.credly} target="_blank" rel="noopener">
              <IconB name="check" size={12} /> verified on Credly
            </a>
          </div>
        ))}
      </div>

      <div className="skill-badges">
        <button className={"sb-toggle" + (openBadges ? " open" : "")} onClick={() => setOpenBadges(o => !o)}>
          <IconB name="award" size={16} />
          View 30+ Google Cloud skill badges
          <span className="chev"><IconB name="chevron" size={16} /></span>
        </button>
        {openBadges && (
          <div className="sb-body">
            {d.skillBadges.map((b, i) => (
              <div className="sb-item" key={i}><span className="sbn">{b[0]}</span><span className="sbd">{b[1]}</span></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Credly skills (evidence bars)
---------------------------------------------------------------- */
function Skills({ d }) {
  const [ref, seen] = useInViewB({ threshold: 0.2 });
  const max = Math.max(...d.skills.map(s => s.c));
  return (
    <section className="section">
      <SecHeadB num="04" title="Credly Verified Skills" desc="Evidence depth — badge count behind each verified skill." />
      <div className="skills-grid" ref={ref}>
        {d.skills.map((s, i) => (
          <div className="skill" key={i}>
            <span className="sn">{s.n}</span>
            <span className="sc">{s.c} badges</span>
            <div className="track">
              <div className="fill" style={{ width: seen ? (s.c / max * 100) + "%" : 0, transitionDelay: (i * 55) + "ms" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Activity — heatmap + languages
---------------------------------------------------------------- */
function Heatmap() {
  const [ref, seen] = useInViewB({ threshold: 0.15 });
  // deterministic pseudo-random levels
  const WEEKS = 52, DAYS = 7;
  const cells = useRefB(null);
  if (!cells.current) {
    const arr = [];
    let s = 1337;
    const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    for (let w = 0; w < WEEKS; w++) {
      const col = [];
      const seasonal = 0.35 + 0.45 * Math.sin((w / WEEKS) * Math.PI * 1.6 + 0.6);
      for (let dday = 0; dday < DAYS; dday++) {
        const weekend = (dday === 0 || dday === 6) ? 0.5 : 1;
        const r = rnd() * seasonal * weekend;
        let lvl = 0;
        if (r > 0.5) lvl = 4; else if (r > 0.34) lvl = 3; else if (r > 0.2) lvl = 2; else if (r > 0.08) lvl = 1;
        col.push(lvl);
      }
      arr.push(col);
    }
    cells.current = arr;
  }
  return (
    <div className="panel" ref={ref}>
      <div className="panel-head">
        <span className="pt">Contribution activity</span>
        <span className="ps">last 12 months</span>
      </div>
      <div className="heatmap">
        {cells.current.map((col, w) => (
          <div className="hm-col" key={w}>
            {col.map((lvl, dday) => (
              <div key={dday} className={"hm-cell" + (seen ? " in" : "")}
                style={{ background: `var(--lvl${lvl})`, transitionDelay: (seen ? (w * 9 + dday * 4) : 0) + "ms" }} />
            ))}
          </div>
        ))}
      </div>
      <div className="hm-legend">
        less
        <span className="sq" style={{ background: "var(--lvl0)" }} />
        <span className="sq" style={{ background: "var(--lvl1)" }} />
        <span className="sq" style={{ background: "var(--lvl2)" }} />
        <span className="sq" style={{ background: "var(--lvl3)" }} />
        <span className="sq" style={{ background: "var(--lvl4)" }} />
        more
      </div>
    </div>
  );
}
function Languages({ d }) {
  const [ref, seen] = useInViewB({ threshold: 0.2 });
  return (
    <div className="panel" ref={ref}>
      <div className="panel-head">
        <span className="pt">Languages</span>
        <span className="ps">by repo weight</span>
      </div>
      <div className="lang-list">
        <div className="lang-bar">
          {d.languages.map((l, i) => (
            <div className="lang-seg" key={i} style={{ width: seen ? l.pct + "%" : 0, background: l.c, transitionDelay: (i * 80) + "ms" }} />
          ))}
        </div>
        <div className="lang-keys">
          {d.languages.map((l, i) => (
            <span className="lang-key" key={i}>
              <span className="lk" style={{ background: l.c }} /><b>{l.n}</b> <span className="pct">{l.pct}%</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function Activity({ d }) {
  return (
    <section className="section">
      <SecHeadB num="05" title="GitHub Activity" desc="Where the commits land — cadence and language mix." />
      <div className="activity">
        <Heatmap />
        <div className="activity-2">
          <Languages d={d} />
          <div className="panel">
            <div className="panel-head">
              <span className="pt">Cadence</span>
              <span className="ps">CST · UTC−6</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
              <CadenceRow label="Most productive" value="evenings & weekends" icon="zap" />
              <CadenceRow label="Primary domains" value="AI platforms · distributed systems" icon="cpu" />
              <CadenceRow label="Always learning" value="100 Days of ML · HF Agents · O'Reilly" icon="book" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function CadenceRow({ label, value, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div className="lnico" style={{ width: 32, height: 32, flex: "0 0 32px" }}><IconB name={icon} size={15} /></div>
      <div>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
        <div style={{ fontSize: 13.5, color: "var(--fg-soft)", fontWeight: 500, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Connect + footer
---------------------------------------------------------------- */
function Connect({ d }) {
  return (
    <section className="section">
      <div className="connect">
        <h2>Let's build something that ships.</h2>
        <p>Always open to discussing AI system architecture, agentic workflows, and platform-engineering challenges.</p>
        <div className="connect-actions">
          <a className="btn btn-primary" href={d.links.linkedin} target="_blank" rel="noopener"><IconB name="linkedin" size={15} /> Connect on LinkedIn</a>
          <a className="btn btn-outline" href={d.links.credly} target="_blank" rel="noopener"><IconB name="award" size={15} /> View certifications</a>
          <a className="btn btn-outline" href={d.links.github} target="_blank" rel="noopener"><IconB name="git" size={14} sw={2} /> Follow on GitHub</a>
        </div>
      </div>
      <div className="footer">
        <span className="q">"The best architecture is the one that disappears — letting AI do the work."</span>
        <span className="meta">anandtopu · {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}

Object.assign(window.PX, { Projects, Certs, Skills, Activity, Connect });
