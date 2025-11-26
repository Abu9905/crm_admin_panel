import React, { useMemo, useState } from "react";
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaPalette,
  FaCopy,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { usePanelAccess } from "../../contexts/PanelAccessContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const donutColors = ["#2563eb", "#f97316", "#facc15", "#22c55e", "#a855f7"];
const funnelColors = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#8b5cf6"];
const marketColors = ["#22d3ee", "#34d399", "#a855f7", "#f472b6", "#94a3b8"];

const reportTrendData = [
  { label: "Day 1", generated: 12 },
  { label: "Day 5", generated: 18 },
  { label: "Day 9", generated: 24 },
  { label: "Day 13", generated: 28 },
  { label: "Day 17", generated: 34 },
  { label: "Day 21", generated: 30 },
  { label: "Day 25", generated: 35 },
  { label: "Day 29", generated: 38 },
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

const funnelStageData = [
  { stage: "Leads", total: 520 },
  { stage: "Qualified", total: 380 },
  { stage: "Proposal", total: 210 },
  { stage: "Negotiation", total: 140 },
  { stage: "Converted", total: 85 },
];

const activityLogs = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new lead",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated deal status",
    time: "3 hours ago",
    type: "info",
  },
  {
    id: 3,
    user: "Bob Johnson",
    action: "Deleted contact",
    time: "5 hours ago",
    type: "warning",
  },
  {
    id: 4,
    user: "Alice Williams",
    action: "Exported data",
    time: "1 day ago",
    type: "info",
  },
  {
    id: 5,
    user: "John Doe",
    action: "Changed settings",
    time: "1 day ago",
    type: "success",
  },
];

const AdminPanel = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      name: "John Doe",
      email: "user@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-01-15 09:15 AM",
    },
    {
      id: 3,
      name: "Jane Manager",
      email: "manager@example.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2024-01-15 11:20 AM",
    },
    {
      id: 4,
      name: "Sofia Patel",
      email: "sofia.patel@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2024-01-10 02:45 PM",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
  });

  const {
    panels,
    availableModules,
    createPanel,
    assignPanelToUser,
    toggleUserModule,
    getUserPanelConfig,
  } = usePanelAccess();

  const defaultDraftModules = useMemo(
    () => availableModules.slice(0, 4).map((module) => module.id),
    [availableModules]
  );

  const [panelDraft, setPanelDraft] = useState({
    name: "New Sales Squad",
    description: "Curated deck for fresh hires",
    accent: "#2563eb",
    modules: defaultDraftModules,
  });

  const stats = useMemo(
    () => ({
      totalUsers: users.length,
      activeUsers: users.filter((user) => user.status === "Active").length,
      totalLeads: 5200,
      totalDeals: 342,
      conversionRate: "27.5%",
      revenue: "$128K",
    }),
    [users]
  );

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }
    return users.filter((user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return;
    }

    const userRecord = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: "Never",
    };

    setUsers((prev) => [...prev, userRecord]);
    if (panels.length) {
      assignPanelToUser(userRecord.id, panels[0].id);
    }
    setNewUser({ name: "", email: "", role: "User", password: "" });
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setShowModal(true);
  };

  const handleUpdateUser = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUser.id
          ? { ...user, name: newUser.name, email: newUser.email, role: newUser.role }
          : user
      )
    );
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "User", password: "" });
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const handlePanelDraftChange = (field, value) => {
    setPanelDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handlePanelDraftModuleToggle = (moduleId) => {
    setPanelDraft((prev) => {
      const exists = prev.modules.includes(moduleId);
      return {
        ...prev,
        modules: exists
          ? prev.modules.filter((id) => id !== moduleId)
          : [...prev.modules, moduleId],
      };
    });
  };

  const handleCreatePanel = (event) => {
    event.preventDefault();
    if (!panelDraft.name.trim() || !panelDraft.modules.length) {
      return;
    }
    createPanel(panelDraft);
    setPanelDraft({
      name: "",
      description: "",
      accent: panelDraft.accent,
      modules: defaultDraftModules,
    });
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      <div className="flex-1 space-y-6">
        <header className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">
              Salesbudge HQ
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Control Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Build user panels, monitor performance, and control access in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <FaUserPlus /> Invite teammate
            </button>
            <button
              onClick={() => setPanelDraft((prev) => ({ ...prev, name: "", description: "" }))}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              <FaPalette /> Quick theme
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Report Overview
                </h2>
                <p className="text-xs text-gray-500">Line Graph · 30 Days</p>
              </div>
              <button className="text-sm text-blue-600 flex items-center gap-2">
                <FaCopy /> Export
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">245</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">Total Reports</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">87%</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">Completion</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-500">12</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">New</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer>
                <LineChart data={reportTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ stroke: "#bfdbfe", strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="generated" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Lead Overview
                </h2>
                <p className="text-xs text-gray-500">Doughnut · 30 Days</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                158 Total
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={leadSources} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                    {leadSources.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={donutColors[index % donutColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {leadSources.map((source, index) => (
                <div key={source.name} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: donutColors[index % donutColors.length] }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{source.name}</p>
                    <p className="text-xs text-gray-500">{source.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales Forecasting
              </h2>
              <span className="text-sm text-gray-500">Line Graph · 30 Days</span>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-2xl font-bold text-red-500">$128K</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">Forecasted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">$86K</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">Committed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500">72%</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">Accuracy</p>
              </div>
            </div>
            <div className="h-48">
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
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Market Overview
              </h2>
              <span className="text-sm text-gray-500">Bar Graph · 30 Days</span>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-2xl font-bold text-emerald-500">5.2K</p>
                <p className="text-xs text-gray-500">Impressions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-500">3.8%</p>
                <p className="text-xs text-gray-500">CTR</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-500">$2.14</p>
                <p className="text-xs text-gray-500">CPC</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer>
                <BarChart data={marketPerformance}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="channel" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="ctr" radius={[8, 8, 0, 0]}>
                    {marketPerformance.map((entry, index) => (
                      <Cell key={`cell-${entry.channel}`} fill={marketColors[index % marketColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Leads Funnel
              </h2>
              <span className="text-sm text-gray-500">Bar Graph · 30 Days</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={funnelStageData}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="stage" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                    {funnelStageData.map((entry, index) => (
                      <Cell key={`cell-${entry.stage}`} fill={funnelColors[index % funnelColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Panel Builder
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                {panels.length} templates
              </span>
            </div>
            <form className="space-y-4" onSubmit={handleCreatePanel}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500">Panel Name</label>
                  <input
                    type="text"
                    value={panelDraft.name}
                    onChange={(event) => handlePanelDraftChange("name", event.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. DNP Recovery Desk"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Accent Color</label>
                  <input
                    type="color"
                    value={panelDraft.accent}
                    onChange={(event) => handlePanelDraftChange("accent", event.target.value)}
                    className="w-full mt-1 h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Description</label>
                <textarea
                  value={panelDraft.description}
                  onChange={(event) => handlePanelDraftChange("description", event.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  rows={2}
                  placeholder="Tell your reps what this view optimizes for"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Modules</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableModules.map((module) => {
                    const ModuleIcon = module.icon;
                    const enabled = panelDraft.modules.includes(module.id);
                    return (
                      <button
                        type="button"
                        key={module.id}
                        onClick={() => handlePanelDraftModuleToggle(module.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          enabled
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        <ModuleIcon /> {module.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Create template
              </button>
            </form>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Access Control
              </h2>
              <p className="text-sm text-gray-500">
                Assign tailored panels and toggle widget-level access per user.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Search user"
                />
              </div>
              <button className="px-4 py-2 rounded-full border text-sm flex items-center gap-2 dark:border-gray-600">
                <FaFilter /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 uppercase text-left">
                  <th className="py-3">User</th>
                  <th className="py-3">Panel Template</th>
                  <th className="py-3">Modules</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUsers.map((user) => {
                  const { panel, modules } = getUserPanelConfig(user.id);
                  return (
                    <tr key={user.id} className="text-sm text-gray-700 dark:text-gray-200">
                      <td className="py-4">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </td>
                      <td className="py-4">
                        <select
                          value={panel?.id || ""}
                          onChange={(event) => assignPanelToUser(user.id, event.target.value)}
                          className="px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                          {panels.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-gray-500 mt-1">
                          {panel?.description}
                        </p>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-2">
                          {availableModules.map((module) => {
                            const ModuleIcon = module.icon;
                            const enabled = modules.includes(module.id);
                            return (
                              <button
                                key={`${user.id}-${module.id}`}
                                onClick={() => toggleUserModule(user.id, module.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition-colors ${
                                  enabled
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-gray-50 text-gray-500 border-gray-200"
                                }`}
                              >
                                <ModuleIcon />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-3 text-base">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit user"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={
                              user.status === "Active"
                                ? "text-amber-500 hover:text-amber-600"
                                : "text-green-500 hover:text-green-600"
                            }
                            title={user.status === "Active" ? "Deactivate" : "Activate"}
                          >
                            {user.status === "Active" ? <FaUserTimes /> : <FaUserCheck />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-600"
                            title="Delete user"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className="w-full xl:w-80 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            Activity summary
          </h2>
          <div className="space-y-3">
            <div className="border rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Active users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeUsers}
              </p>
            </div>
            <div className="border rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Last invoice</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.revenue}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-full"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-full"
            />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm text-gray-500">Contact us</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              +91-9686705904
            </p>
            <p className="text-sm text-gray-500 break-words">
              Neamatullahmdmuslim@gmail.com
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Activity feed
            </h3>
            <span className="text-xs text-gray-500">Live</span>
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    log.type === "success"
                      ? "bg-green-100 text-green-600"
                      : log.type === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {log.type === "success" ? (
                    <FaCheckCircle />
                  ) : log.type === "warning" ? (
                    <FaTimesCircle />
                  ) : (
                    <FaBell />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {log.user}
                  </p>
                  <p className="text-xs text-gray-500">{log.action}</p>
                  <p className="text-[11px] text-gray-400">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingUser ? "Update user" : "Invite new user"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                  setNewUser({ name: "", email: "", role: "User", password: "" });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimesCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500">Full name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Role</label>
                <select
                  value={newUser.role}
                  onChange={(event) => setNewUser({ ...newUser, role: event.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {!editingUser && (
                <div>
                  <label className="text-xs font-semibold text-gray-500">Temporary password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {editingUser ? "Save changes" : "Send invite"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setNewUser({ name: "", email: "", role: "User", password: "" });
                  }}
                  className="flex-1 py-2.5 rounded-lg border dark:border-gray-600 text-gray-600 dark:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
