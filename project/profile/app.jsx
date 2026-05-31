/* global React, ReactDOM, PROFILE, PX */
const { TopBar, Rail, Hero, Stack, Projects, Certs, Skills, Activity, Connect } = window.PX;

function App() {
  const d = window.PROFILE;
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <React.Fragment>
      <TopBar d={d} />
      <div className="wrap">
        <div className="layout">
          <Rail d={d} />
          <main>
            <Hero d={d} />
            <div className="reveal"><Stack d={d} /></div>
            <div className="reveal"><Projects d={d} /></div>
            <div className="reveal"><Certs d={d} /></div>
            <div className="reveal"><Skills d={d} /></div>
            <div className="reveal"><Activity d={d} /></div>
            <div className="reveal"><Connect d={d} /></div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
