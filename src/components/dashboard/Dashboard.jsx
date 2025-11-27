import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const reportOverviewData = [
  { label: "Day 1", value: 12 },
  { label: "Day 5", value: 18 },
  { label: "Day 9", value: 24 },
  { label: "Day 13", value: 28 },
  { label: "Day 17", value: 34 },
  { label: "Day 21", value: 30 },
  { label: "Day 25", value: 35 },
  { label: "Day 29", value: 38 },
];

const leadSources = [
  { name: "Website", value: 45 },
  { name: "Social", value: 25 },
  { name: "Referral", value: 15 },
  { name: "Direct", value: 10 },
  { name: "Other", value: 5 },
];

const salesForecastData = [
  { label: "Day 1", forecasted: 18, committed: 12 },
  { label: "Day 5", forecasted: 22, committed: 15 },
  { label: "Day 9", forecasted: 27, committed: 19 },
  { label: "Day 13", forecasted: 30, committed: 22 },
  { label: "Day 17", forecasted: 32, committed: 24 },
  { label: "Day 21", forecasted: 35, committed: 26 },
  { label: "Day 25", forecasted: 37, committed: 28 },
  { label: "Day 29", forecasted: 40, committed: 31 },
];

const marketPerformance = [
  { channel: "Google Ads", ctr: 32 },
  { channel: "Facebook", ctr: 26 },
  { channel: "Email", ctr: 21 },
  { channel: "Organic", ctr: 17 },
  { channel: "Direct", ctr: 12 },
];

const leadsFunnelData = [
  { stage: "Leads", total: 520 },
  { stage: "Qualified", total: 380 },
  { stage: "Proposal", total: 210 },
  { stage: "Negotiation", total: 140 },
  { stage: "Converted", total: 85 },
];

const donutColors = ["#2563eb", "#f97316", "#facc15", "#22c55e", "#a855f7"];
const funnelColors = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#8b5cf6"];
const marketColors = ["#22d3ee", "#34d399", "#a855f7", "#f472b6", "#94a3b8"];

const statCards = [
  { label: "Total Reports", value: "245" },
  { label: "Completion", value: "87%" },
  { label: "New", value: "12" },
];

const leadSummary = [
  { label: "Total Leads", value: "158" },
  { label: "Conversion", value: "158" },
  { label: "New Leads", value: "158" },
];

const funnelSummary = [
  { label: "Leads", value: "5.2K" },
  { label: "Qualified", value: "1000" },
  { label: "Proposal", value: "77" },
  { label: "Negotiation", value: "55" },
  { label: "Converted", value: "85" },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <section className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Report Overview</h2>
              <p className="text-xs text-gray-500">Line Graph · 30 Days</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <button className="px-2 sm:px-3 py-1 rounded-full border text-xs">Line Graph</button>
              <button className="px-2 sm:px-3 py-1 rounded-full border text-xs">30 Days</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {statCards.map((card) => (
              <div key={card.label} className="text-center">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">{card.label}</p>
              </div>
            ))}
          </div>
          <div className="h-48 sm:h-56 lg:h-60">
            <ResponsiveContainer>
              <LineChart data={reportOverviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: "#bfdbfe", strokeWidth: 2 }} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Lead Overview</h2>
              <p className="text-xs text-gray-500">Doughnut · 30 Days</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <button className="px-2 sm:px-3 py-1 rounded-full border text-xs">Doughnut</button>
              <button className="px-2 sm:px-3 py-1 rounded-full border text-xs">30 Days</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {leadSummary.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="h-48 sm:h-56 lg:h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={leadSources} innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {leadSources.map((entry, index) => (
                    <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {leadSources.map((source, index) => (
              <div key={source.name} className="flex items-center gap-2 sm:gap-3">
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: donutColors[index % donutColors.length] }}
                />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">{source.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{source.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <section className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Sales Forecasting</h2>
              <p className="text-xs text-gray-500">Line Graph · 30 Days</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 text-center flex-wrap">
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">$128K</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">Forecasted</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-500">$86K</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">Committed</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-500">72%</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">Accuracy</p>
              </div>
            </div>
          </div>
          <div className="h-48 sm:h-56 lg:h-60">
            <ResponsiveContainer>
              <LineChart data={salesForecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="forecasted" stroke="#f87171" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="committed" stroke="#fb923c" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Market Overview</h2>
              <p className="text-xs text-gray-500">Bar Graph · 30 Days</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center w-full sm:w-auto">
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-500">5.2K</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Impression</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-500">3.8%</p>
                <p className="text-[10px] sm:text-xs text-gray-500">CTR</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-500">$2.14</p>
                <p className="text-[10px] sm:text-xs text-gray-500">CPC</p>
              </div>
            </div>
          </div>
          <div className="h-48 sm:h-56 lg:h-60">
            <ResponsiveContainer>
              <BarChart data={marketPerformance}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="channel" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="ctr" radius={[8, 8, 0, 0]}>
                  {marketPerformance.map((entry, index) => (
                    <Cell key={entry.channel} fill={marketColors[index % marketColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Leads Funnel</h2>
            <p className="text-xs text-gray-500">Bar Graph · 30 Days</p>
          </div>
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {funnelSummary.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer>
              <LineChart data={reportOverviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer>
              <BarChart data={leadsFunnelData}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="stage" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {leadsFunnelData.map((entry, index) => (
                    <Cell key={entry.stage} fill={funnelColors[index % funnelColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
