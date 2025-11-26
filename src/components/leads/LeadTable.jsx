import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { FaFilter, FaPlus, FaTable, FaUsers } from "react-icons/fa";

const leads = [
  {
    id: "0001",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "New Lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0002",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Hot Lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0003",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Warm Lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0004",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Cold Lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0005",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Gold Lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0006",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0007",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0008",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0009",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0010",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0011",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim31@gmail.com",
    source: "Facebook",
    status: "Unread",
    location: "Mumbai",
    owner: "Ramij raj",
  },
];

const statusColors = {
  "New Lead": "bg-[#22c55e] text-white",
  "Hot Lead": "bg-[#f97316] text-white",
  "Warm Lead": "bg-[#fb923c] text-white",
  "Cold Lead": "bg-[#3b82f6] text-white",
  "Gold Lead": "bg-[#a855f7] text-white",
  Unread: "bg-[#1d4ed8] text-white",
};

const FILTER_OPTIONS = ["All Data", "New Lead", "Hot Lead", "Warm Lead", "Cold Lead", "Gold Lead", "Unread"];

// Map URL categories (left menu: New Data, Junk, etc.) to status filters
const CATEGORY_STATUS_MAP = {
  "new-leads": "New Lead",
  "hot-leads": "Hot Lead",
  "warm-leads": "Warm Lead",
  "cold-leads": "Cold Lead",
  "gold-leads": "Gold Lead",
  unread: "Unread",
  junk: "Unread",
};

const LeadTable = () => {
  const [filter, setFilter] = useState("All Data");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [search, setSearch] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { category, subCategory } = useParams();

  // When user navigates via left menu (e.g. New Data, Junk),
  // auto-apply the corresponding status filter based on the URL.
  useEffect(() => {
    const key = (subCategory || category || "").toLowerCase();
    const statusFromCategory = CATEGORY_STATUS_MAP[key];

    if (statusFromCategory) {
      setFilter(statusFromCategory);
    } else {
      setFilter("All Data");
    }
  }, [category, subCategory]);

  const filteredLeads = useMemo(() => {
    let rows = leads;

    // Status filter (top "All Data" dropdown)
    if (filter !== "All Data") {
      rows = rows.filter((lead) => lead.status === filter);
    }

    // Advanced filters (opened via Filter button)
    if (sourceFilter !== "All Sources") {
      rows = rows.filter((lead) => lead.source === sourceFilter);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      rows = rows.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.mobile.toLowerCase().includes(term)
      );
    }

    return rows;
  }, [filter, sourceFilter, search]);

  return (
    <div className="space-y-4 w-full">
      <div className="text-sm text-gray-500">
        Home <span className="mx-2 text-gray-400">›</span>
        <span className="font-medium text-gray-700">Leads Management</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-500">Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#0e2a8a] text-white text-sm font-semibold rounded-xl px-4 py-2 shadow focus:outline-none"
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0e2a8a] text-white rounded-xl shadow hover:bg-[#0b2070] transition">
            <FaUsers /> Bulk Activity
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0e2a8a] text-white rounded-xl shadow hover:bg-[#0b2070] transition">
            <FaPlus /> New Lead
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0e2a8a] text-white rounded-xl shadow hover:bg-[#0b2070] transition">
            <FaTable /> Column
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white text-[#0e2a8a] border border-[#0e2a8a] rounded-xl shadow hover:bg-[#0e2a8a] hover:text-white transition"
            onClick={() => setShowAdvancedFilters((open) => !open)}
          >
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              >
                <option value="All Sources">All Sources</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email or mobile"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full md:w-64 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200"
              onClick={() => {
                setSourceFilter("All Sources");
                setSearch("");
              }}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
              onClick={() => setShowAdvancedFilters(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-[#0f2c8c] text-white text-sm">
              <th className="py-4 px-4 w-12">
                <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-white/40 bg-transparent" />
              </th>
              <th className="py-4 px-4 text-left font-semibold">Lead ID</th>
              <th className="py-4 px-4 text-left font-semibold">Name</th>
              <th className="py-4 px-4 text-left font-semibold">Mobile number</th>
              <th className="py-4 px-4 text-left font-semibold">Email Id</th>
              <th className="py-4 px-4 text-left font-semibold">Source</th>
              <th className="py-4 px-4 text-left font-semibold">Status</th>
              <th className="py-4 px-4 text-left font-semibold">Location</th>
              <th className="py-4 px-4 text-left font-semibold">Lead owner</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
            const section = location.state?.section;
            return (
            <tr
              key={lead.id}
              className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              onClick={() =>
                navigate(`/layout/lead-management/leads/${lead.id}`, {
                  state: { lead, section },
                })
              }
            >
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded border-gray-300"
                  />
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200" onClick={(e) => e.stopPropagation()}>
                  <Link
                    to={`/layout/lead-management/leads/${lead.id}`}
                    state={{ lead, section }}
                    className="hover:underline text-gray-900 dark:text-white"
                  >
                    #{lead.id}
                  </Link>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">{lead.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.mobile}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.email}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.source}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || "bg-gray-400 text-white"}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.location}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{lead.owner}</td>
              </tr>
            );
            })}
            {!filteredLeads.length && (
              <tr>
                <td colSpan="9" className="py-10 text-center text-gray-500 text-sm">
                  No leads match the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-100 dark:border-gray-700 px-6 py-3 bg-[#f5f5f5] dark:bg-gray-900/40">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Records Per Page</span>
            <div className="w-12 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700">
              20
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-white">{`⏮`}</button>
            <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-white">{`◀`}</button>
            <span className="font-semibold text-gray-800">1 - 20 / 500</span>
            <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-white">{`▶`}</button>
            <button className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-white">{`⏭`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
