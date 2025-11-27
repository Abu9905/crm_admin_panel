import { useMemo, useState, useEffect } from "react";
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
const STATUS_OPTIONS = FILTER_OPTIONS.filter((option) => option !== "All Data");
const DEFAULT_COLUMNS = {
  leadId: true,
  name: true,
  mobile: true,
  email: true,
  source: true,
  status: true,
  location: true,
  owner: true,
};
const COLUMN_LABELS = {
  leadId: "Lead ID",
  name: "Name",
  mobile: "Mobile number",
  email: "Email Id",
  source: "Source",
  status: "Status",
  location: "Location",
  owner: "Lead owner",
};

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
  const [leadRows, setLeadRows] = useState(leads);
  const [filter, setFilter] = useState("All Data");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [search, setSearch] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("New Lead");
  const [bulkOwner, setBulkOwner] = useState("");
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    mobile: "",
    email: "",
    source: "Facebook",
    status: "New Lead",
    location: "",
    owner: "",
  });
  const [visibleColumns, setVisibleColumns] = useState(() => ({ ...DEFAULT_COLUMNS }));

  const navigate = useNavigate();
  const location = useLocation();
  const { category, subCategory } = useParams();

  const availableSources = useMemo(() => {
    const uniqueSources = Array.from(new Set(leadRows.map((lead) => lead.source)));
    return ["All Sources", ...uniqueSources];
  }, [leadRows]);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

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
    setActivePanel(null);
  }, [category, subCategory]);

  const filteredLeads = useMemo(() => {
    let rows = leadRows;

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
          lead.id.toLowerCase().includes(term) ||
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.mobile.toLowerCase().includes(term) ||
          lead.source.toLowerCase().includes(term) ||
          lead.status.toLowerCase().includes(term) ||
          lead.location.toLowerCase().includes(term) ||
          lead.owner.toLowerCase().includes(term)
      );
    }
    return rows;
  }, [leadRows, filter, sourceFilter, search]);

  const filteredLeadIds = filteredLeads.map((lead) => lead.id);
  const allFilteredSelected = filteredLeadIds.length > 0 && filteredLeadIds.every((id) => selectedLeadIds.includes(id));

  const toggleLeadSelection = (leadId) => {
    setSelectedLeadIds((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (!filteredLeadIds.length) return;
    if (allFilteredSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !filteredLeadIds.includes(id)));
    } else {
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...filteredLeadIds])));
    }
  };

  const handleBulkApply = () => {
    if (!selectedLeadIds.length) return;
    setLeadRows((prev) =>
      prev.map((lead) =>
        selectedLeadIds.includes(lead.id)
          ? {
              ...lead,
              status: bulkStatus,
              owner: bulkOwner.trim() ? bulkOwner : lead.owner,
            }
          : lead
      )
    );
    setSelectedLeadIds([]);
    setBulkOwner("");
    setActivePanel(null);
  };

  const handleNewLeadSubmit = (event) => {
    event.preventDefault();
    if (!newLeadForm.name.trim() || !newLeadForm.mobile.trim() || !newLeadForm.email.trim()) {
      return;
    }

    setLeadRows((prev) => {
      const maxId = prev.reduce((max, lead) => Math.max(max, parseInt(lead.id, 10)), 0);
      const nextId = String(maxId + 1).padStart(4, "0");

      return [
        {
          ...newLeadForm,
          id: nextId,
        },
        ...prev,
      ];
    });

    setNewLeadForm({
      name: "",
      mobile: "",
      email: "",
      source: "Facebook",
      status: "New Lead",
      location: "",
      owner: "",
    });
    setActivePanel(null);
  };

  const handleColumnToggle = (columnKey) => {
    setVisibleColumns((prev) => {
      const nextValue = !prev[columnKey];
      if (!nextValue) {
        const enabledCount = Object.values(prev).filter(Boolean).length;
        if (enabledCount === 1) {
          return prev;
        }
      }
      return { ...prev, [columnKey]: nextValue };
    });
  };

  const handleResetColumns = () => {
    setVisibleColumns({ ...DEFAULT_COLUMNS });
  };

  const visibleColumnCount = useMemo(() => Object.values(visibleColumns).filter(Boolean).length, [visibleColumns]);
  const section = location.state?.section;

  return (
    <div className="space-y-3 sm:space-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="text-xs sm:text-sm text-gray-500">
          Home <span className="mx-1 sm:mx-2 text-gray-400">›</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">Leads Management</span>
        </div>
        {search.trim() && (
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredLeads.length}
            </span>{" "}
            result{filteredLeads.length !== 1 ? "s" : ""} found
            {filter !== "All Data" && ` for "${filter}"`}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <label className="text-xs sm:text-sm font-medium text-gray-500">Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#0e2a8a] text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 shadow focus:outline-none"
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow transition ${
              activePanel === "bulk"
                ? "bg-[#0b2070] text-white"
                : "bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
            }`}
            onClick={() => togglePanel("bulk")}
          >
            <FaUsers className="text-xs sm:text-sm" /> <span className="hidden sm:inline">Bulk Activity</span><span className="sm:hidden">Bulk</span>
          </button>
          <button
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow transition ${
              activePanel === "newLead"
                ? "bg-[#0b2070] text-white"
                : "bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
            }`}
            onClick={() => togglePanel("newLead")}
          >
            <FaPlus className="text-xs sm:text-sm" /> <span className="hidden sm:inline">New Lead</span><span className="sm:hidden">New</span>
          </button>
          <button
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow transition ${
              activePanel === "columns"
                ? "bg-[#0b2070] text-white"
                : "bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
            }`}
            onClick={() => togglePanel("columns")}
          >
            <FaTable className="text-xs sm:text-sm" /> <span className="hidden sm:inline">Column</span><span className="sm:hidden">Col</span>
          </button>
          <button
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow transition ${
              activePanel === "filter"
                ? "bg-[#0e2a8a] text-white border border-[#0e2a8a]"
                : "bg-white dark:bg-gray-800 text-[#0e2a8a] border border-[#0e2a8a] hover:bg-[#0e2a8a] hover:text-white"
            }`}
            onClick={() => togglePanel("filter")}
          >
            <FaFilter className="text-xs sm:text-sm" /> Filter
          </button>
        </div>
      </div>

      {activePanel === "bulk" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 space-y-3 sm:space-y-4">
          {selectedLeadIds.length ? (
            <>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">
                    {selectedLeadIds.length} lead{selectedLeadIds.length > 1 ? "s" : ""} selected
                  </p>
                  <p className="text-xs text-gray-500">
                    Apply a new status or temporary owner to every selected record.
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#0e2a8a]"
                  onClick={() => setSelectedLeadIds([])}
                >
                  Clear selection
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={bulkStatus}
                    onChange={(e) => setBulkStatus(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Owner (optional)</label>
                  <input
                    type="text"
                    value={bulkOwner}
                    onChange={(e) => setBulkOwner(e.target.value)}
                    placeholder="Assign a teammate"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200"
                  onClick={() => setActivePanel(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
                  onClick={handleBulkApply}
                >
                  Apply changes
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Select at least one lead checkbox in the table above to start a bulk action.
            </p>
          )}
        </div>
      )}

      {activePanel === "newLead" && (
        <form
          className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 space-y-3 sm:space-y-4"
          onSubmit={handleNewLeadSubmit}
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">Capture a lead without leaving the table.</p>
            <p className="text-xs text-gray-500">
              Required fields: name, mobile, email. Everything else is optional and can be updated later.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Full name *</label>
              <input
                type="text"
                value={newLeadForm.name}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                placeholder="e.g. Priya Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mobile number *</label>
              <input
                type="text"
                value={newLeadForm.mobile}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, mobile: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                placeholder="10-digit contact"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email *</label>
              <input
                type="email"
                value={newLeadForm.email}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                placeholder="user@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Source</label>
              <select
                value={newLeadForm.source}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, source: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
              >
                {(availableSources.filter((source) => source !== "All Sources").length
                  ? availableSources.filter((source) => source !== "All Sources")
                  : ["Facebook"]
                ).map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select
                value={newLeadForm.status}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
              <input
                type="text"
                value={newLeadForm.location}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                placeholder="City"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Owner</label>
              <input
                type="text"
                value={newLeadForm.owner}
                onChange={(e) => setNewLeadForm((prev) => ({ ...prev, owner: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                placeholder="Assign rep (optional)"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200"
              onClick={() => {
                setNewLeadForm({
                  name: "",
                  mobile: "",
                  email: "",
                  source: "Facebook",
                  status: "New Lead",
                  location: "",
                  owner: "",
                });
                setActivePanel(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
            >
              Add lead
            </button>
          </div>
        </form>
      )}

      {activePanel === "columns" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">Show or hide table columns.</p>
              <p className="text-xs text-gray-500">{visibleColumnCount} of 8 columns visible.</p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-[#0e2a8a]"
              onClick={handleResetColumns}
            >
              Reset to default
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(visibleColumns).map(([key, value]) => {
              const disabled = value && visibleColumnCount === 1;
              return (
                <label
                  key={key}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${
                    value ? "border-[#0e2a8a] bg-[#0e2a8a]/10 text-[#0e2a8a]" : "border-gray-200 text-gray-600"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleColumnToggle(key)}
                    disabled={disabled}
                    className="form-checkbox text-[#0e2a8a]"
                  />
                  <span>{COLUMN_LABELS[key]}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {activePanel === "filter" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              >
                {availableSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, name, email, mobile, source, status, location, or owner..."
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm w-full md:w-64 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200"
              onClick={() => {
                setSourceFilter("All Sources");
                setSearch("");
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0e2a8a] text-white hover:bg-[#0b2070]"
              onClick={() => setActivePanel(null)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#0f2c8c] text-white text-xs sm:text-sm">
              <th className="py-3 sm:py-4 px-2 sm:px-4 w-10 sm:w-12">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 sm:h-4 sm:w-4 rounded border-white/40 bg-transparent"
                    checked={allFilteredSelected}
                    onChange={handleSelectAll}
                  />
              </th>
                {visibleColumns.leadId && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Lead ID</th>
                )}
                {visibleColumns.name && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Name</th>
                )}
                {visibleColumns.mobile && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Mobile number</th>
                )}
                {visibleColumns.email && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Email Id</th>
                )}
                {visibleColumns.source && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Source</th>
                )}
                {visibleColumns.status && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Status</th>
                )}
                {visibleColumns.location && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Location</th>
                )}
                {visibleColumns.owner && (
              <th className="py-3 sm:py-4 px-2 sm:px-4 text-left font-semibold whitespace-nowrap">Lead owner</th>
                )}
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => {
                const isSelected = selectedLeadIds.includes(lead.id);
            return (
            <tr
              key={lead.id}
                    className={`border-t border-gray-100 dark:border-gray-700 transition cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-blue-900/40"
                        : "bg-white dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
              onClick={() =>
                navigate(`/layout/lead-management/leads/${lead.id}`, {
                  state: { lead, section },
                })
              }
            >
                <td className="py-2 sm:py-3 px-2 sm:px-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300"
                    checked={isSelected}
                    onChange={() => toggleLeadSelection(lead.id)}
                  />
                </td>
                    {visibleColumns.leadId && (
                      <td
                        className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                  <Link
                    to={`/layout/lead-management/leads/${lead.id}`}
                    state={{ lead, section }}
                    className="hover:underline text-gray-900 dark:text-white"
                  >
                    #{lead.id}
                  </Link>
                </td>
                    )}
                    {visibleColumns.name && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-200">{lead.name}</td>
                    )}
                    {visibleColumns.mobile && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{lead.mobile}</td>
                    )}
                    {visibleColumns.email && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-all">{lead.email}</td>
                    )}
                    {visibleColumns.source && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{lead.source}</td>
                    )}
                    {visibleColumns.status && (
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <span
                          className={`inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${
                            statusColors[lead.status] || "bg-gray-400 text-white"
                          }`}
                  >
                    {lead.status}
                  </span>
                </td>
                    )}
                    {visibleColumns.location && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{lead.location}</td>
                    )}
                    {visibleColumns.owner && (
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{lead.owner}</td>
                    )}
              </tr>
            );
            })}
            {!filteredLeads.length && (
              <tr>
                  <td colSpan={1 + visibleColumnCount} className="py-10 text-center text-gray-500 text-sm">
                  No leads match the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-100 dark:border-gray-700 px-3 sm:px-6 py-2 sm:py-3 bg-[#f5f5f5] dark:bg-gray-900/40">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>Records Per Page</span>
            <div className="w-10 sm:w-12 h-6 sm:h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              20
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <button className="p-1.5 sm:p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800">{`⏮`}</button>
            <button className="p-1.5 sm:p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800">{`◀`}</button>
            <span className="font-semibold text-gray-800 dark:text-gray-200">1 - 20 / 500</span>
            <button className="p-1.5 sm:p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800">{`▶`}</button>
            <button className="p-1.5 sm:p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800">{`⏭`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
