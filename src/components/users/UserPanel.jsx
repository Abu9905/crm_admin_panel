import React from "react";
import {
  FaUserPlus,
  FaPhoneSlash,
  FaEnvelopeOpenText,
  FaWhatsapp,
  FaHandshake,
  FaUserFriends,
  FaMinusCircle,
  FaPhone,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";

const topInsights = [
  { id: "new", label: "New Lead", value: 54, icon: <FaUserPlus className="text-blue-600 text-2xl" /> },
  { id: "missed", label: "Missed Calls", value: 3, icon: <FaPhoneSlash className="text-red-500 text-2xl" /> },
  { id: "unreadMail", label: "Unread Email", value: 14, icon: <FaEnvelopeOpenText className="text-indigo-500 text-2xl" /> },
  { id: "unreadWa", label: "Unread WA", value: 57, icon: <FaWhatsapp className="text-green-500 text-2xl" /> },
  { id: "reengaged", label: "Re Engaged", value: 34, icon: <FaHandshake className="text-blue-600 text-2xl" /> },
  { id: "prospect", label: "Prospect", value: 23, icon: <FaUserFriends className="text-blue-400 text-2xl" /> },
  { id: "untouched", label: "Untouched", value: 65, icon: <FaMinusCircle className="text-gray-500 text-2xl" /> },
  { id: "dnp1", label: "DNP", value: 21, icon: <FaPhone className="text-blue-600 text-2xl" /> },
  { id: "dnp2", label: "DNP", value: 21, icon: <FaPhone className="text-blue-600 text-2xl" /> },
  { id: "dnp3", label: "DNP", value: 21, icon: <FaPhone className="text-blue-600 text-2xl" /> },
];

const leadFunnelData = [
  { stage: "Leads", total: 500 },
  { stage: "Qualified", total: 320 },
  { stage: "Proposal", total: 180 },
  { stage: "Negotiation", total: 90 },
  { stage: "Converted", total: 40 },
];

const approvals = [
  { label: "Approval Sent", value: 67 },
  { label: "Approval Received", value: 55 },
  { label: "All Approvals", value: 21 },
];

const performanceMetrics = [
  { label: "Avg Call", value: "2m 15s" },
  { label: "Follow Up", value: "34" },
  { label: "Calls Done", value: "21" },
  { label: "Meetings", value: "5" },
];

const UserPanel = () => {
  const { user } = useAuth();

  return (
    <div className="w-full space-y-6">
      <header className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Available
            </div>
            <div>Last Date 12-09-2025</div>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Refresh
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">Today's Task</button>
          <button className="px-5 py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold shadow">Over dues</button>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name || "agent"}. Track your lead activity and approvals in one glance.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {topInsights.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Lead Funnel</h2>
              <p className="text-sm text-gray-500">5.2K Total Leads</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <button className="px-3 py-1 rounded-full border">Bar Graph</button>
              <button className="px-3 py-1 rounded-full border">30 Days</button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={leadFunnelData}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="stage" tick={{ fill: "#9ca3af", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#f472b6" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Approvals</h2>
          <div className="space-y-3">
            {approvals.map((item) => (
              <div
                key={item.label}
                className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-center bg-gray-50 dark:bg-gray-900/40"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPanel;
