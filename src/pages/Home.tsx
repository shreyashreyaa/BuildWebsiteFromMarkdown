import type { Page } from "../App";

interface Props {
  navigate: (p: Page) => void;
}

const steps = [
  {
    n: "01",
    icon: "",
    title: "Describe your issue",
    desc: "Type or speak your grievance in your language. Plain words are enough , no legal jargon needed.",
  },
  {
    n: "02",
    icon: "",
    title: "SAHAI checks for a solution",
    desc: "Our AI analyses your issue and checks if an existing process or remedy can help you right now.",
  },
  {
    n: "03",
    icon: "",
    title: "Submit and track if needed",
    desc: "If official intervention is required, SAHAI helps you file and track your grievance with the right authority.",
  },
];

const trust = [
  { icon: "", label: "Transparent status", desc: "Track every step of your grievance in real time." },
  { icon: "", label: "AI-assisted routing", desc: "Smart classification ensures it reaches the right desk." },
  { icon: "", label: "Citizen-controlled", desc: "You decide when to submit. No forced escalation." },
  { icon: "", label: "Secure handling", desc: "Your data is encrypted and anonymised for reporting." },
];

export default function Home({ navigate }: Props) {
  return (
    <div className="font-body">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-violet relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-plum/20 rounded-full blur-[110px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-plum/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,rgba(107,61,114,0.15),transparent_65%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-stretch">

            {/* Left: copy */}
            <div className="flex flex-col">
              <p className="text-peach/50 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                AI-Powered Grievance Intelligence
              </p>
              <h1 className="font-body text-[clamp(2.8rem,6vw,5rem)] leading-[0.93] text-cream font-semibold tracking-tight mb-7">
                REPORT.<br />
                <span className="text-peach">PREDICT.</span><br />
                RESOLVE.
              </h1>
              <p className="text-peach/65 text-lg leading-relaxed max-w-md mb-10">
                SAHAI uses AI to understand your issue, suggest simple solutions when possible, and route genuine grievances to the right authority.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("check")}
                  className="bg-peach text-violet font-semibold px-8 py-3.5 rounded-full hover:bg-cream transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Check My Issue
                </button>
                <button
                  onClick={() => navigate("track")}
                  className="border border-peach/30 text-cream px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  Track Grievance
                </button>
              </div>
            </div>

            {/* Right: glassmorphic domain cards — vertically centered on REPORT., nudged left */}
            <div className="flex flex-col justify-between gap-4 -ml-8" style={{ marginTop: "calc(0.75rem + 1.25rem)" }}>
              {/* Judicial card */}
              <div
                className="group cursor-pointer rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/40"
                style={{
                  background: "linear-gradient(145deg, rgba(29,64,175,0.5) 0%, rgba(37,99,235,0.32) 100%)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
                onClick={() => navigate("submit")}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-body text-cream text-lg font-semibold">Judicial Delays</h3>
                  <span className="text-blue-300/50 group-hover:translate-x-1 transition-transform text-base">→</span>
                </div>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-4">
                  Case pending? Hearing delayed? Facing repeated judicial delays?
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Case backlog", "Hearing delay", "Judgment pending"].map((t) => (
                    <span
                      key={t}
                      className="text-blue-200/80 text-xs px-3 py-1 rounded-full border border-blue-400/20"
                      style={{ background: "rgba(37,99,235,0.2)" }}
                    >{t}</span>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("submit"); }}
                  className="text-blue-300 text-sm font-semibold hover:text-cream transition-colors"
                >
                  Report Judicial Issue →
                </button>
              </div>

              {/* Bureaucratic card */}
              <div
                className="group cursor-pointer rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/40"
                style={{
                  background: "linear-gradient(145deg, rgba(29,64,175,0.5) 0%, rgba(37,99,235,0.32) 100%)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
                onClick={() => navigate("submit")}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-body text-cream text-lg font-semibold">Bureaucratic Delays</h3>
                  <span className="text-blue-300/50 group-hover:translate-x-1 transition-transform text-base">→</span>
                </div>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-4">
                  Stuck in approvals, paperwork, regulations or government services?
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Approvals", "Documentation", "Application pending"].map((t) => (
                    <span
                      key={t}
                      className="text-blue-200/80 text-xs px-3 py-1 rounded-full border border-blue-400/20"
                      style={{ background: "rgba(37,99,235,0.2)" }}
                    >{t}</span>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("submit"); }}
                  className="text-blue-300 text-sm font-semibold hover:text-cream transition-colors"
                >
                  Report Administrative Issue →
                </button>
              </div>
            </div>

          </div>

          {/* Stats bar — outside grid, sits below both columns */}
          <div className="flex gap-10 pt-6 mt-14 border-t border-white/10">
            {[
              { n: "12,847", l: "Grievances filed" },
              { n: "68%", l: "Resolved by AI guidance" },
              { n: "4.2 days", l: "Avg. resolution time" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-body text-2xl text-peach font-semibold">{s.n}</p>
                <p className="text-cream/45 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-step process ───────────────────────────────────── */}
      <section className="bg-cream-light py-20 border-b border-plum/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-2">How it works</p>
            <h2 className="font-body text-3xl lg:text-4xl text-violet font-semibold">
              Three steps to resolution
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-plum/30 to-transparent z-0 translate-x-0" />
                )}
                <div className="bg-white rounded-2xl border border-plum/10 p-7 relative z-10 hover:shadow-lg hover:shadow-plum/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-body text-4xl text-violet/10 font-bold">{s.n}</span>
                  </div>
                  <h3 className="font-body text-lg text-violet font-semibold mb-2">{s.title}</h3>
                  <p className="text-violet/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust section ────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-3">Why SAHAI</p>
              <h2 className="font-body text-3xl lg:text-4xl text-violet font-semibold mb-4 leading-tight">
                Your complaint. Your voice. Your visibility.
              </h2>
              <p className="text-violet/60 leading-relaxed text-base mb-8">
                SAHAI does not just collect complaints — it tries to prevent unnecessary filings and identifies serious systemic problems that need official attention.
              </p>
              <button
                onClick={() => navigate("check")}
                className="bg-violet text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-violet-light transition-colors shadow-md hover:shadow-lg"
              >
                Check your issue now
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="bg-violet py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-body text-3xl text-cream font-semibold mb-4">
            Resolve what can be solved.
            <span className="text-peach italic"> Escalate what needs attention.</span>
          </h2>
          <p className="text-peach/60 mb-8">
            AI-powered grievance intelligence for faster, simpler governance.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
          </div>
        </div>
      </section>
    </div>
  );
}
