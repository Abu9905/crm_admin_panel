import { useState, useEffect, useCallback } from "react";
import {
  FaSyncAlt,
  FaUserPlus,
  FaPhoneSlash,
  FaEnvelope,
  FaWhatsapp,
  FaHandshake,
  FaUsers,
  FaMinusCircle,
  FaPhone,
  FaHandPaper,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { dashboardAPI, generateMockDashboardData } from "../../services/api";

// Lead metrics configuration
const leadMetricsConfig = [
  {
    id: "newLead",
    label: "New Lead",
    icon: FaUserPlus,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "missedCalls",
    label: "Missed Calls",
    icon: FaPhoneSlash,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-500/20",
    borderColor: "border-red-200 dark:border-red-500/30",
  },
  {
    id: "unreadEmail",
    label: "Unread Email",
    icon: FaEnvelope,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "unreadWA",
    label: "Unread WA",
    icon: FaWhatsapp,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-500/20",
    borderColor: "border-green-200 dark:border-green-500/30",
  },
  {
    id: "reEngaged",
    label: "Re Engaged",
    icon: FaHandshake,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "prospect",
    label: "Prospect",
    icon: FaUsers,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "untouched",
    label: "Untouched",
    icon: FaMinusCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "attempt",
    label: "Attempt",
    icon: FaPhone,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "onHold",
    label: "On Hold",
    icon: FaHandPaper,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    borderColor: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "enrolled",
    label: "Enrolled",
    icon: FaCheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-500/20",
    borderColor: "border-green-200 dark:border-green-500/30",
  },
];

const funnelColors = ["#ec4899", "#3b82f6", "#eab308", "#14b8a6", "#a855f7"];

// Performance metrics configuration
const performanceMetricsConfig = [
  { id: "totalCalls", label: "Total Calls" },
  { id: "totalTalk", label: "Total Talk" },
  { id: "aveCallDuration", label: "Ave Call Duration" },
  { id: "leadWorked", label: "Lead Worked" },
  { id: "followUpCreated", label: "Follow Up Created" },
  { id: "firstCall", label: "First Call" },
  { id: "demoDone", label: "Demo Done" },
  { id: "prospects1", label: "Prospects" },
  { id: "prospects2", label: "Prospects" },
  { id: "prospects3", label: "Prospects" },
];

// Generate mock data function
const generateMockData = () => {
  const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    leadMetrics: leadMetricsConfig.map((config) => ({
      ...config,
      value: randomBetween(3, 100),
      change: (Math.random() * 20 - 10).toFixed(1),
    })),
    leadFunnel: [
      { stage: "Leads", total: randomBetween(400, 600) },
      { stage: "Qualified", total: randomBetween(300, 400) },
      { stage: "Proposal", total: randomBetween(200, 250) },
      { stage: "Negotiation", total: randomBetween(100, 150) },
      { stage: "Converted", total: randomBetween(40, 80) },
    ],
    approvals: [
      { label: "Approval Sent", value: randomBetween(50, 80) },
      { label: "Approval Received", value: randomBetween(40, 70) },
      { label: "All Approvals", value: randomBetween(15, 30) },
    ],
    performance: performanceMetricsConfig.map((config) => ({
      ...config,
      value:
        config.id === "aveCallDuration"
          ? `${randomBetween(2, 8)}M`
          : randomBetween(10, 100),
    })),
    totalLeads: (Math.random() * 2 + 4).toFixed(1) + "K",
    lastUpdated: new Date(),
  };
};

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chartView, setChartView] = useState("bar");
  const [timeRange, setTimeRange] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  // Fetch data function
  const fetchData = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }
        setError(null);

        // Try to fetch from API, fallback to mock data
        let dashboardData;
        try {
          const response = await dashboardAPI.getAllDashboardData(timeRange);
          dashboardData = response;
        } catch (apiError) {
          console.warn("API not available, using mock data:", apiError);
          dashboardData = generateMockDashboardData(timeRange);
        }

        // Transform API data to match our component structure
        const transformedData = {
          leadMetrics: leadMetricsConfig.map((config, index) => ({
            ...config,
            value:
              dashboardData.leadMetrics?.[index]?.value ||
              Math.floor(Math.random() * 100) + 10,
            change:
              dashboardData.leadMetrics?.[index]?.change ||
              (Math.random() * 20 - 10).toFixed(1),
          })),
          leadFunnel: dashboardData.leadsFunnel?.chartData?.map(
            (item, idx) => ({
              stage:
                item.name ||
                ["Leads", "Qualified", "Proposal", "Negotiation", "Converted"][
                  idx
                ],
              total: item.value || Math.floor(Math.random() * 500) + 50,
            })
          ) || [
            { stage: "Leads", total: 480 },
            { stage: "Qualified", total: 350 },
            { stage: "Proposal", total: 220 },
            { stage: "Negotiation", total: 120 },
            { stage: "Converted", total: 50 },
          ],
          approvals: [
            {
              label: "Approval Sent",
              value: Math.floor(Math.random() * 30) + 50,
            },
            {
              label: "Approval Received",
              value: Math.floor(Math.random() * 30) + 40,
            },
            {
              label: "All Approvals",
              value: Math.floor(Math.random() * 20) + 15,
            },
          ],
          performance: performanceMetricsConfig.map((config) => ({
            ...config,
            value:
              config.id === "aveCallDuration"
                ? `${Math.floor(Math.random() * 6) + 2}M`
                : Math.floor(Math.random() * 90) + 10,
          })),
          totalLeads: dashboardData.leadsFunnel?.metrics?.leads || "5.2K",
          lastUpdated: new Date(),
        };

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
        // Use mock data as fallback
        setData(generateMockData());
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [timeRange]
  );

  // Initial load and timeRange change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(true);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleTimeRangeChange = (days) => {
    setTimeRange(parseInt(days));
  };

  // Calculate max value for Y-axis
  const getMaxYValue = () => {
    if (!data?.leadFunnel) return 500;
    const max = Math.max(...data.leadFunnel.map((item) => item.total));
    return Math.ceil(max / 100) * 100 + 100;
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <FaSpinner className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-500 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="w-full flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
          User Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Last Date {data?.lastUpdated ? formatDate(data.lastUpdated) : "N/A"}
          </span>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            <FaSyncAlt
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      {/* Lead Metrics KPI Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {data?.leadMetrics?.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 shadow-sm dark:shadow-gray-900/40 hover:shadow-md dark:hover:shadow-gray-900/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`rounded-lg p-2 sm:p-2.5 transition-all duration-300 group-hover:scale-110 ${metric.bgColor} ${metric.color} border ${metric.borderColor}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value?.toLocaleString()}
                </p>
                {metric.change && (
                  <span
                    className={`text-[10px] sm:text-xs font-medium ${
                      parseFloat(metric.change) >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {parseFloat(metric.change) >= 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Lead Funnel and Approvals Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Lead Funnel */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 space-y-4 sm:space-y-5 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Lead Funnel
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Total Leads: {data?.totalLeads || "5.2K"}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={chartView}
                onChange={(e) => setChartView(e.target.value)}
                className="flex-1 sm:flex-none text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="bar">Bar Graph</option>
                <option value="line">Line Graph</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="flex-1 sm:flex-none text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "bar" ? (
                <BarChart data={data?.leadFunnel || []}>
                  <CartesianGrid
                    vertical={false}
                    stroke="#e5e7eb"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="stage"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, getMaxYValue()]}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(59,130,246,0.08)" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                    {(data?.leadFunnel || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={funnelColors[index % funnelColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={data?.leadFunnel || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="stage"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, getMaxYValue()]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6" }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-pink-500"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Lead Funnel
            </span>
          </div>
        </div>

        {/* Approvals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Approvals
          </h2>
          <div className="space-y-4">
            {data?.approvals?.map((approval) => (
              <div
                key={approval.label}
                className="space-y-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {approval.label}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {approval.value}
                  </p>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                    style={{ width: `${(approval.value / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Performance */}
      <section className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Performance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {data?.performance?.map((metric, index) => (
            <div
              key={`${metric.id}-${index}`}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/60 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                {metric.label}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;

