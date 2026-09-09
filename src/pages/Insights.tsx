import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const trendData = [
  { month: "Jan", judicial: 420, bureaucratic: 310 },
  { month: "Feb", judicial: 480, bureaucratic: 395 },
  { month: "Mar", judicial: 510, bureaucratic: 420 },
  { month: "Apr", judicial: 590, bureaucratic: 460 },
  { month: "May", judicial: 640, bureaucratic: 510 },
  { month: "Jun", judicial: 720, bureaucratic: 570 },
  { month: "Jul", judicial: 810, bureaucratic: 620 },
  { month: "Aug", judicial: 870, bureaucratic: 680 },
  { month: "Sep", judicial: 920, bureaucratic: 710 },
];

const deptData = [
  { dept: "Revenue Dept", complaints: 1840 },
  { dept: "Municipal Corp", complaints: 1620 },
  { dept: "District Courts", complaints: 2210 },
  { dept: "PWD", complaints: 980 },
  { dept: "Education", complaints: 640 },
  { dept: "Land Records", complaints: 1120 },
  { dept: "Police Dept", complaints: 880 },
];

const judicialPie = [
  { name: "Hearing postponed", value: 38 },
  { name: "Case pending 3+ yrs", value: 27 },
  { name: "Judgment delay", value: 19 },
  { name: "Case backlog", value: 11 },
  { name: "Other", value: 5 },
];

const bureauPie = [
  { name: "Application pending", value: 32 },
  { name: "Excessive paperwork", value: 24 },
  { name: "Repeated approvals", value: 21 },
  { name: "Process delay", value: 14 },
  { name: "Other", value: 9 },
];

const PIE_COLORS = ["#502D55", "#935073", "#B07090", "#F6DBC0", "#E8C4A0"];

const hotspots = [
  { city: "New Delhi", count: 2840, trend: "+12%" },
  { city: "Mumbai", count: 2210, trend: "+8%" },
  { city: "Bengaluru", count: 1720, trend: "+15%" },
  { city: "Chennai", count: 1380, trend: "+5%" },
  { city: "Kolkata", count: 1190, trend: "+9%" },
  { city: "Hyderabad", count: 980, trend: "+18%" },
];

const kpis = [
  { label: "Total Grievances", value: "12,847", sub: "All time", color: "bg-violet text-cream" },
  { label: "Active", value: "3,429", sub: "In progress", color: "bg-plum text-cream" },
  { label: "Resolved", value: "8,694" , sub: "67.7% rate", color: "bg-emerald-700 text-white" },
  { label: "Escalated", value: "724", sub: "Requires action", color: "bg-red-700 text-white" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-plum/15 rounded-xl px-4 py-3 shadow-lg text-xs">
        <p className="font-semibold text-violet mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Header */}
      <div className="bg-violet py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-peach/50 text-xs font-semibold tracking-widest uppercase mb-2">Public Dashboard</p>
            <h1 className="font-body text-4xl lg:text-5xl text-cream font-semibold">Governance Intelligence</h1>
            <p className="text-peach/60 mt-2 text-sm">Aggregated & anonymised data — updated daily</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-peach/70 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live data — Sep 2026
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className={`${k.color} rounded-2xl p-6 shadow-sm`}>
              <div className="text-3xl mb-3">{k.icon}</div>
              <p className="font-body text-3xl font-bold mb-0.5">{k.value}</p>
              <p className="text-sm font-medium opacity-80">{k.label}</p>
              <p className="text-xs opacity-55 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* AI Insight card */}
        <div className="bg-violet/8 border border-violet/20 rounded-2xl p-6 flex items-start gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-plum text-cream px-2.5 py-0.5 rounded-full tracking-wide">AI DETECTED AN EMERGING PATTERN</span>
            </div>
            <p className="font-body text-lg text-violet font-semibold mb-1">
              Surge in approval delay complaints across North India
            </p>
            <p className="text-violet/65 text-sm leading-relaxed">
              Repeated complaints related to prolonged approval delays in land mutation and building permit processing have increased by 34% in Delhi NCR over the last 60 days. This appears systemic rather than isolated.
            </p>
          </div>
          <button className="shrink-0 bg-violet text-cream text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-violet-light transition-colors">
            View Pattern
          </button>
        </div>

        {/* Trend chart */}
        <div className="bg-white border border-plum/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-body text-xl text-violet font-semibold">Grievance Trends — 2026</h2>
              <p className="text-violet/45 text-sm mt-0.5">Monthly filings by category</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet inline-block" /> Judicial</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-plum inline-block" /> Bureaucratic</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gJudicial" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#502D55" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#502D55" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gBureau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#935073" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#935073" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#935073" strokeOpacity={0.08} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#502D55", opacity: 0.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#502D55", opacity: 0.5 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="judicial" name="Judicial" stroke="#502D55" strokeWidth={2.5} fill="url(#gJudicial)" dot={false} activeDot={{ r: 5, fill: "#502D55" }} />
              <Area type="monotone" dataKey="bureaucratic" name="Bureaucratic" stroke="#935073" strokeWidth={2.5} fill="url(#gBureau)" dot={false} activeDot={{ r: 5, fill: "#935073" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two-column section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Department bar chart */}
          <div className="bg-white border border-plum/10 rounded-2xl p-6">
            <h2 className="font-body text-xl text-violet font-semibold mb-1">Top Departments by Complaints</h2>
            <p className="text-violet/45 text-sm mb-6">Recurring complaint sources</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#935073" strokeOpacity={0.07} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#502D55", opacity: 0.45 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: "#502D55", opacity: 0.65 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="complaints" name="Complaints" fill="#502D55" radius={[0, 6, 6, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie charts */}
          <div className="space-y-4">
            {/* Judicial distribution */}
            <div className="bg-white border border-plum/10 rounded-2xl p-5">
              <h3 className="font-body text-base text-violet font-semibold mb-4">Judicial Delay Breakdown</h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={judicialPie} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={2}>
                      {judicialPie.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {judicialPie.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-violet/70 text-xs">{d.name}</span>
                      </div>
                      <span className="text-violet font-semibold text-xs">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bureaucratic distribution */}
            <div className="bg-white border border-plum/10 rounded-2xl p-5">
              <h3 className="font-body text-base text-violet font-semibold mb-4"> Bureaucratic Delay Breakdown</h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={bureauPie} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={2}>
                      {bureauPie.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-1.5">
                  {bureauPie.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-violet/70 text-xs">{d.name}</span>
                      </div>
                      <span className="text-violet font-semibold text-xs">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspot table */}
        <div className="bg-white border border-plum/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-body text-xl text-violet font-semibold">High-Risk Locations</h2>
              <p className="text-violet/45 text-sm mt-0.5">Cities with highest grievance concentration</p>
            </div>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-semibold border border-red-200">⚠ Emerging Backlog Hotspots</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-plum/10">
                  <th className="text-left text-violet/45 text-xs uppercase tracking-wide pb-3 font-semibold">#</th>
                  <th className="text-left text-violet/45 text-xs uppercase tracking-wide pb-3 font-semibold">City</th>
                  <th className="text-right text-violet/45 text-xs uppercase tracking-wide pb-3 font-semibold">Grievances</th>
                  <th className="text-right text-violet/45 text-xs uppercase tracking-wide pb-3 font-semibold">30-day Trend</th>
                  <th className="text-left text-violet/45 text-xs uppercase tracking-wide pb-3 font-semibold pl-6">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-plum/6">
                {hotspots.map((h, i) => (
                  <tr key={h.city} className="hover:bg-plum/3 transition-colors">
                    <td className="py-3 text-violet/40 font-semibold">{i + 1}</td>
                    <td className="py-3 text-violet font-medium">{h.city}</td>
                    <td className="py-3 text-right text-violet font-semibold">{h.count.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span className="text-red-600 font-semibold text-xs">{h.trend}</span>
                    </td>
                    <td className="py-3 pl-6">
                      <div className="w-full bg-plum/10 rounded-full h-1.5 w-32">
                        <div
                          className="h-1.5 bg-violet rounded-full"
                          style={{ width: `${(h.count / 2840) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Avg resolution times */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Avg. Resolution — Judicial", value: "18.4 days" },
            { label: "Avg. Resolution — Bureaucratic", value: "12.7 days" },
            { label: "AI Pre-solved Rate", value: "68%" },
            { label: "Escalation Rate", value: "5.6%" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-plum/10 rounded-2xl p-5">
              <div className="text-2xl mb-3">{s.icon}</div>
              <p className="font-body text-2xl text-violet font-bold mb-1">{s.value}</p>
              <p className="text-violet/50 text-xs leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-violet/30 text-xs pb-4">
          All data is aggregated and anonymised. No personal citizen information is displayed. Last updated: 1 Sep 2026, 08:00 IST
        </p>
      </div>
    </div>
  );
}
