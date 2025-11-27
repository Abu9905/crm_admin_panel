import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaShareAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

// Layout for Data section (Image 1 – three info cards)
const DataLeadLayout = ({ lead, onBack, onUpdate }) => {
  const initial = lead.name?.charAt(0)?.toUpperCase() || "N";
  const [activeAction, setActiveAction] = useState(null);
  const [mergeTarget, setMergeTarget] = useState("");
  const [assignee, setAssignee] = useState(lead.owner || OWNER_OPTIONS[0]);
  const [quickWhatsappMessage, setQuickWhatsappMessage] = useState(
    "Hi, looping back on the proposal we sent."
  );
  const [toast, setToast] = useState(null);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingLeadInfo, setIsEditingLeadInfo] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    name: lead.name || "",
    mobile: lead.mobile || "",
    email: lead.email || "",
    company: lead.company || "#Upify",
    industry: lead.industry || "Tech",
  });
  const [leadInfoForm, setLeadInfoForm] = useState({
    status: lead.status || "New Lead",
    source: lead.source || "Facebook",
    owner: lead.owner || OWNER_OPTIONS[0],
    location: lead.location || "Mumbai",
    lastContact: lead.lastContact || "Today",
  });
  const [tasks, setTasks] = useState([
    { id: 1, title: "Share latest pricing deck", priority: "High", done: false },
    { id: 2, title: "Schedule discovery call", priority: "Medium", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setAssignee(lead.owner || OWNER_OPTIONS[0]);
    setPersonalForm({
      name: lead.name || "",
      mobile: lead.mobile || "",
      email: lead.email || "",
      company: lead.company || "#Upify",
      industry: lead.industry || "Tech",
    });
    setLeadInfoForm({
      status: lead.status || "New Lead",
      source: lead.source || "Facebook",
      owner: lead.owner || OWNER_OPTIONS[0],
      location: lead.location || "Mumbai",
      lastContact: lead.lastContact || "Today",
    });
  }, [lead]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleActionPanel = (action) => {
    setActiveAction((prev) => (prev === action ? null : action));
  };

  const handleMerge = () => {
    if (!mergeTarget.trim()) return;
    setToast(`Merge request with #${mergeTarget} logged`);
    setMergeTarget("");
    setActiveAction(null);
  };

  const handleAssign = () => {
    onUpdate({ owner: assignee });
    setToast(`Lead assigned to ${assignee}`);
    setActiveAction(null);
  };

  const shareLink =
    typeof window !== "undefined" ? `${window.location.origin}/layout/lead-management/leads/${lead.id}` : "";

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setToast("Share link copied");
    } catch {
      setToast("Copy unsupported, please copy manually");
    }
  };

  const handleWhatsappSend = () => {
    if (!quickWhatsappMessage.trim()) return;
    setToast("Whatsapp opened in new tab");
    const phone = (personalForm.mobile || "").replace(/\D/g, "");
    if (phone && typeof window !== "undefined") {
      const encoded = encodeURIComponent(quickWhatsappMessage.trim());
      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank", "noopener");
    }
    setQuickWhatsappMessage("");
    setActiveAction(null);
  };

  const savePersonal = () => {
    onUpdate({
      name: personalForm.name,
      mobile: personalForm.mobile,
      email: personalForm.email,
      company: personalForm.company,
      industry: personalForm.industry,
    });
    setIsEditingPersonal(false);
    setToast("Personal details updated");
  };

  const saveLeadInfo = () => {
    onUpdate({
      status: leadInfoForm.status,
      source: leadInfoForm.source,
      owner: leadInfoForm.owner,
      location: leadInfoForm.location,
      lastContact: leadInfoForm.lastContact,
    });
    setIsEditingLeadInfo(false);
    setToast("Lead information updated");
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      priority: "Low",
      done: false,
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask("");
    setToast("Task added");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 py-4 md:px-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-4 cursor-pointer"
      >
        <FaArrowLeft className="text-xs" />
        <span>Back to lead</span>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700 truncate">
          {lead.name}
        </span>
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-sm px-6 py-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
            {initial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {personalForm.name}
              </h1>
              <button
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => setIsEditingPersonal(true)}
              >
                <FaEdit />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              +91 {personalForm.mobile || lead.mobile} | {personalForm.email || lead.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {leadInfoForm.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${
              activeAction === "merge" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => toggleActionPanel("merge")}
          >
            <span>Merge</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${
              activeAction === "assign" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => toggleActionPanel("assign")}
          >
            <span>Assign lead</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${
              activeAction === "share" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => {
              toggleActionPanel("share");
              handleShare();
            }}
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer ${
              activeAction === "whatsapp" ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => toggleActionPanel("whatsapp")}
          >
            <IoLogoWhatsapp />
            <span>Whatsapp</span>
          </button>
        </div>
      </div>

      {activeAction && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 space-y-3">
          {activeAction === "merge" && (
            <>
              <p className="text-sm text-gray-600">Merge into another record by ID.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  value={mergeTarget}
                  onChange={(event) => setMergeTarget(event.target.value)}
                  placeholder="Enter target lead ID"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleMerge}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                >
                  Queue merge
                </button>
              </div>
            </>
          )}

          {activeAction === "assign" && (
            <>
              <p className="text-sm text-gray-600">Reassign ownership instantly.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <select
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {OWNER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                >
                  Assign
                </button>
              </div>
            </>
          )}

          {activeAction === "share" && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Link copied to clipboard.</p>
              <code className="text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg break-all">
                {shareLink}
              </code>
            </div>
          )}

          {activeAction === "whatsapp" && (
            <>
              <p className="text-sm text-gray-600">Send a quick template.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <textarea
                  value={quickWhatsappMessage}
                  onChange={(event) => setQuickWhatsappMessage(event.target.value)}
                  rows={2}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleWhatsappSend}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
              <p className="text-xs text-gray-500">Tap edit to quickly update contact info.</p>
            </div>
            <div className="flex gap-2">
              {isEditingPersonal ? (
                <>
                  <button
                    className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600"
                    onClick={() => {
                      setPersonalForm({
                        name: lead.name || "",
                        mobile: lead.mobile || "",
                        email: lead.email || "",
                        company: lead.company || "#Upify",
                        industry: lead.industry || "Tech",
                      });
                      setIsEditingPersonal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white"
                    onClick={savePersonal}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600"
                  onClick={() => setIsEditingPersonal(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            {[
              { label: "Name", key: "name" },
              { label: "Mobile", key: "mobile", prefix: "+91 " },
              { label: "Email", key: "email" },
              { label: "Company", key: "company" },
              { label: "Industry", key: "industry" },
            ].map(({ label, key, prefix }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="w-32 text-gray-500 font-medium">{label} :</span>
                {isEditingPersonal ? (
                  <input
                    value={personalForm[key]}
                    onChange={(event) => setPersonalForm((prev) => ({ ...prev, [key]: event.target.value }))}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                  />
                ) : (
                  <span className="text-gray-900 break-all">
                    {prefix ? `${prefix}${personalForm[key]}` : personalForm[key]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lead Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Lead Information</h2>
              <p className="text-xs text-gray-500">Update status, owner, or source instantly.</p>
            </div>
            <div className="flex gap-2">
              {isEditingLeadInfo ? (
                <>
                  <button
                    className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600"
                    onClick={() => {
                      setLeadInfoForm({
                        status: lead.status || "New Lead",
                        source: lead.source || "Facebook",
                        owner: lead.owner || OWNER_OPTIONS[0],
                        location: lead.location || "Mumbai",
                        lastContact: lead.lastContact || "Today",
                      });
                      setIsEditingLeadInfo(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white"
                    onClick={saveLeadInfo}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600"
                  onClick={() => setIsEditingLeadInfo(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="w-32 text-gray-500 font-medium">Status :</span>
              {isEditingLeadInfo ? (
                <select
                  value={leadInfoForm.status}
                  onChange={(event) => setLeadInfoForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-blue-600 font-medium">{leadInfoForm.status}</span>
              )}
            </div>
            {[
              { label: "Source", key: "source" },
              { label: "Owner", key: "owner", options: OWNER_OPTIONS },
              { label: "Location", key: "location" },
              { label: "Last contact", key: "lastContact" },
            ].map(({ label, key, options }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="w-32 text-gray-500 font-medium">{label} :</span>
                {isEditingLeadInfo ? (
                  options ? (
                    <select
                      value={leadInfoForm[key]}
                      onChange={(event) => setLeadInfoForm((prev) => ({ ...prev, [key]: event.target.value }))}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={leadInfoForm[key]}
                      onChange={(event) => setLeadInfoForm((prev) => ({ ...prev, [key]: event.target.value }))}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                    />
                  )
                ) : (
                  <span className="text-gray-900">{leadInfoForm[key]}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks & Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks & Activities</h2>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500">Add quick task</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="e.g. Confirm contract draft"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                />
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
                    task.done ? "border-green-200 bg-green-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className={`text-sm ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wide text-gray-500">{task.priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}
    </div>
  );
};

const OWNER_OPTIONS = ["Ramij raj", "Priya Menon", "Rakesh Iyer", "Aarav Shah", "Zohra Ali"];
const STATUS_OPTIONS = ["New Lead", "Hot Lead", "Warm Lead", "Cold Lead", "Gold Lead", "Unread"];

// Layout for Leads section (Image 2 – form with side panels)
const LeadsLeadLayout = ({ lead, onBack, onUpdate }) => {
  const initial = lead.name?.charAt(0)?.toUpperCase() || "N";
  const ownerOptions = OWNER_OPTIONS;
  const statusOptions = STATUS_OPTIONS;

  const buildFormState = useMemo(
    () => ({
      contactName: lead.name || "",
      expectedRevenue: lead.expectedRevenue || "50,000.00",
      nextFollowOn: lead.nextFollowOn || "Not scheduled",
      mobileNumber: lead.mobile || "",
      emailAddress: lead.email || "",
      alternativeNumber: lead.alternativeNumber || "7457865556",
      leadOwner: lead.owner || ownerOptions[0],
      expectedClosingDate: lead.expectedClosingDate || "25-Nov-2023",
      leadStage: lead.status || "New Lead",
      nextFollowNote: lead.nextFollowNote || "No Notes available",
      location: lead.location || "Mumbai",
      campaignTerm: lead.campaignTerm || "Aug_Campaign",
      campaignName: lead.campaignName || "Aug_Campaign",
      campaignContent: lead.campaignContent || "Google Ad Campaign",
      createdTime: lead.createdTime || "11-Jul-2024 03:17PM",
      modifiedTime: lead.modifiedTime || "11-Jul-2024 03:17PM",
    }),
    [lead]
  );

  const [formState, setFormState] = useState(buildFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCommTab, setActiveCommTab] = useState("Whatsapp");
  const [composerMessage, setComposerMessage] = useState("");
  const [conversationLog, setConversationLog] = useState([
    {
      id: 1,
      sender: lead.name,
      role: "lead",
      message: "Hi, I'm interested in your CRM software. Can you send me more details?",
      time: "Today · 09:05 AM",
    },
    {
      id: 2,
      sender: lead.owner,
      role: "owner",
      message: "Sure, I’ll share the details and schedule a quick demo call.",
      time: "Today · 09:20 AM",
    },
    {
      id: 3,
      sender: lead.name,
      role: "lead",
      message: "Thank you, looking forward to it.",
      time: "Today · 09:32 AM",
    },
  ]);
  const [callLog] = useState([
    { id: 1, type: "Inbound", summary: "Discussed pricing and onboarding", time: "11 Jul · 01:20 PM" },
    { id: 2, type: "Outbound", summary: "Left voicemail regarding demo slot", time: "10 Jul · 05:42 PM" },
  ]);
  const [activityLog, setActivityLog] = useState([
    { id: 1, title: "Created deal", time: "11 Jul · 03:17 PM", owner: lead.owner },
    { id: 2, title: "Shared deck with prospect", time: "12 Jul · 10:05 AM", owner: lead.owner },
  ]);
  const [newActivity, setNewActivity] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [mergeTarget, setMergeTarget] = useState("");
  const [quickWhatsappMessage, setQuickWhatsappMessage] = useState(
    "Hi, just sharing the latest deck for your review."
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setFormState(buildFormState);
  }, [buildFormState]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate({
      name: formState.contactName,
      mobile: formState.mobileNumber,
      email: formState.emailAddress,
      owner: formState.leadOwner,
      status: formState.leadStage,
      location: formState.location,
      nextFollowOn: formState.nextFollowOn,
      nextFollowNote: formState.nextFollowNote,
    });
    setIsEditing(false);
    setToast("Lead details updated");
  };

  const handleCancelEdit = () => {
    setFormState(buildFormState);
    setIsEditing(false);
  };

  const appendConversation = (message, role = "owner") => {
    if (!message.trim()) return;
    setConversationLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: role === "lead" ? formState.contactName : formState.leadOwner,
        role,
        message: message.trim(),
        time: "Just now",
      },
    ]);
  };

  const handleSendComposerMessage = () => {
    appendConversation(composerMessage, "owner");
    setComposerMessage("");
    setToast("Message logged to timeline");
  };

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    const now = new Date();
    setActivityLog((prev) => [
      {
        id: now.getTime(),
        title: newActivity,
        time: now.toLocaleString(),
        owner: formState.leadOwner,
      },
      ...prev,
    ]);
    setNewActivity("");
    setToast("Activity added");
  };

  const toggleActionPanel = (action) => {
    setActiveAction((prev) => (prev === action ? null : action));
  };

  const handleAssign = () => {
    onUpdate({ owner: formState.leadOwner });
    setToast(`Lead assigned to ${formState.leadOwner}`);
    setActiveAction(null);
  };

  const handleMerge = () => {
    if (!mergeTarget.trim()) return;
    setToast(`Merge request for #${mergeTarget} recorded`);
    setMergeTarget("");
    setActiveAction(null);
  };

  const shareLink =
    typeof window !== "undefined" ? `${window.location.origin}/layout/lead-management/leads/${lead.id}` : "";

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setToast("Share link copied");
    } catch {
      setToast("Copy not supported, please copy manually");
    }
  };

  const handleQuickWhatsapp = () => {
    if (!quickWhatsappMessage.trim()) return;
    appendConversation(quickWhatsappMessage, "owner");
    const phone = (formState.mobileNumber || lead.mobile || "").replace(/\D/g, "");
    if (phone && typeof window !== "undefined") {
      const encoded = encodeURIComponent(quickWhatsappMessage.trim());
      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank", "noopener");
    }
    setQuickWhatsappMessage("");
    setToast("Whatsapp message sent");
    setActiveAction(null);
  };

  const latestActivity = activityLog[0];

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] px-4 py-4 md:px-8 overflow-y-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-4 cursor-pointer"
      >
        <FaArrowLeft className="text-xs" />
        <span>Back to lead</span>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700 truncate">
          {lead.name}
        </span>
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-sm px-6 py-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
            {initial}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {lead.name}
              </h1>
              <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                <FaEdit />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              +91 {lead.mobile} &nbsp;|&nbsp; {lead.email}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {lead.location || "Mumbai"} • Lead Owner:{" "}
              <span className="font-medium">{lead.owner}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm ${
              activeAction === "merge" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => toggleActionPanel("merge")}
          >
            <span>Merge</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm ${
              activeAction === "assign" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => toggleActionPanel("assign")}
          >
            <span>Assign lead</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm ${
              activeAction === "share" ? "border-blue-600 text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            } cursor-pointer`}
            onClick={() => {
              toggleActionPanel("share");
              handleShare();
            }}
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm cursor-pointer ${
              activeAction === "whatsapp" ? "bg-green-600 text-white" : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={() => toggleActionPanel("whatsapp")}
          >
            <IoLogoWhatsapp />
            <span>Whatsapp</span>
          </button>
        </div>
      </div>

      {activeAction && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 space-y-3">
          {activeAction === "merge" && (
            <>
              <p className="text-sm text-gray-600">Merge this record into another lead by ID.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  value={mergeTarget}
                  onChange={(event) => setMergeTarget(event.target.value)}
                  placeholder="Enter target lead ID"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleMerge}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                >
                  Queue merge
                </button>
              </div>
            </>
          )}

          {activeAction === "assign" && (
            <>
              <p className="text-sm text-gray-600">Assign a different owner without opening any modal.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <select
                  value={formState.leadOwner}
                  onChange={(event) => handleInputChange("leadOwner", event.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {ownerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                >
                  Assign
                </button>
              </div>
            </>
          )}

          {activeAction === "share" && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">Link copied! Share it with your teammates instantly.</p>
              <code className="text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg break-all">{shareLink}</code>
            </div>
          )}

          {activeAction === "whatsapp" && (
            <>
              <p className="text-sm text-gray-600">Send a quick Whatsapp follow-up.</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <textarea
                  value={quickWhatsappMessage}
                  onChange={(event) => setQuickWhatsappMessage(event.target.value)}
                  rows={2}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleQuickWhatsapp}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main content layout – left form + right info cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Lead details form-style card (left, spans 2 cols on xl) */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Leads Details :{" "}
              <span className="font-normal text-gray-700">{lead.name}</span>
            </h2>
            <div className="flex gap-3 flex-wrap">
              {isEditing ? (
                <>
                  <button
                    className="px-4 py-2 text-xs md:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-xs md:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="px-4 py-2 text-xs md:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              <button className="px-4 py-2 text-xs md:text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer">
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Contact / revenue / owner / follow-up */}
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Contact Name *
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.contactName}
                  onChange={(event) => handleInputChange("contactName", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Expected Revenue
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.expectedRevenue}
                  onChange={(event) => handleInputChange("expectedRevenue", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Next Follow - Up On
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.nextFollowOn}
                  onChange={(event) => handleInputChange("nextFollowOn", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Mobile Number *
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.mobileNumber}
                  onChange={(event) => handleInputChange("mobileNumber", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Email Address
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.emailAddress}
                  onChange={(event) => handleInputChange("emailAddress", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Right column – owner / stage / dates */}
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Alternative Number
                </label>
                <input
                  disabled={!isEditing}
                  value={formState.alternativeNumber}
                  onChange={(event) => handleInputChange("alternativeNumber", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Lead Owner *
                </label>
                <select
                  disabled={!isEditing}
                  value={formState.leadOwner}
                  onChange={(event) => handleInputChange("leadOwner", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                >
                  {ownerOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 text-xs font-medium">
                    Expected Closing Date
                  </label>
                  <input
                    disabled={!isEditing}
                    value={formState.expectedClosingDate}
                    onChange={(event) => handleInputChange("expectedClosingDate", event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs font-medium">
                    Lead Stage
                  </label>
                  <select
                    disabled={!isEditing}
                    value={formState.leadStage}
                    onChange={(event) => handleInputChange("leadStage", event.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Next Follow - Up Note
                </label>
                <textarea
                  disabled={!isEditing}
                  value={formState.nextFollowNote}
                  onChange={(event) => handleInputChange("nextFollowNote", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Communication section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Communication
            </h3>
            <div className="border-b border-gray-200 flex gap-6 text-sm">
              {["Whatsapp", "Calls", "Activity"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 font-medium ${
                    activeCommTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveCommTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {activeCommTab === "Whatsapp" && (
                <>
                  {conversationLog.map((entry) => (
                    <div
                      key={entry.id}
                      className={`max-w-xl rounded-2xl px-4 py-3 text-sm text-gray-800 ${
                        entry.role === "lead" ? "bg-green-50" : "bg-gray-100 ml-auto"
                      }`}
                    >
                      <span className="font-semibold text-gray-900">{entry.sender}:</span> {entry.message}
                      <p className="text-[11px] text-gray-500 mt-1">{entry.time}</p>
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      value={composerMessage}
                      onChange={(event) => setComposerMessage(event.target.value)}
                      placeholder="Type an update to log"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleSendComposerMessage}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                    >
                      Log message
                    </button>
                  </div>
                </>
              )}

              {activeCommTab === "Calls" && (
                <div className="space-y-3">
                  {callLog.map((log) => (
                    <div key={log.id} className="rounded-2xl bg-gray-50 px-4 py-3 text-sm">
                      <p className="font-semibold text-gray-900">{log.type}</p>
                      <p className="text-gray-700">{log.summary}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeCommTab === "Activity" && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      value={newActivity}
                      onChange={(event) => setNewActivity(event.target.value)}
                      placeholder="Add a note (e.g. Demo booked)"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleAddActivity}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                    >
                      Add note
                    </button>
                  </div>
                  {activityLog.map((log) => (
                    <div key={log.id} className="rounded-2xl bg-gray-50 px-4 py-3 text-sm">
                      <p className="font-semibold text-gray-900">{log.title}</p>
                      <p className="text-xs text-gray-500">
                        {log.time} · {log.owner}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side info columns */}
        <div className="space-y-4">
          {/* Source Info */}
          <div className="rounded-2xl bg-[#e5edff] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Source Info
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <p className="text-gray-600 mb-1">Lead Source</p>
                <input
                  disabled
                  value={lead.source}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Campaign Term</p>
                <input
                  disabled
                  value={formState.campaignTerm}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Lead Date</p>
                <input
                  disabled
                  value="31-Jul-2024"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Campaign Info */}
          <div className="rounded-2xl bg-[#e5edff] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Campaign Info
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <p className="text-gray-600 mb-1">Campaign Name</p>
                <input
                  disabled
                  value={formState.campaignName}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Campaign Content</p>
                <input
                  disabled
                  value={formState.campaignContent}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Created By</p>
                <input
                  disabled
                  value="Admin"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Timeline Info */}
          <div className="rounded-2xl bg-[#e5edff] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Timeline Info
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="grid grid-cols-1 gap-3">
                {["Created Time", "Modified Time", "Last Viewed Time"].map((label, index) => (
                  <div key={label}>
                    <p className="text-gray-600 mb-1">{label}</p>
                    <input
                      disabled
                      value={
                        index === 0
                          ? formState.createdTime
                          : index === 1
                          ? formState.modifiedTime
                          : latestActivity?.time || formState.modifiedTime
                      }
                      className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call Status / Last Call Info */}
          <div className="rounded-2xl bg-[#e5edff] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Call Status
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <p className="text-gray-600 mb-1">Last Call Time</p>
                <input
                  disabled
                  value={callLog[0]?.time || "Not available"}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Last Call Status</p>
                <input
                  disabled
                  value={callLog[0]?.type || "Not available"}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Is Call Missed?</p>
                <input
                  disabled
                  value={callLog[0]?.type === "Inbound" ? "No" : "Yes"}
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}
    </div>
  );
};

const IndividualLeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const lead = state?.lead;
  const section = state?.section?.toLowerCase();
  const [leadDetails, setLeadDetails] = useState(lead);

  useEffect(() => {
    if (lead) {
      setLeadDetails(lead);
    }
  }, [lead]);

  if (!leadDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <p>No lead data found for ID #{id}</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isLeadsSection = section === "leads";

  if (isLeadsSection) {
    return (
      <LeadsLeadLayout
        lead={leadDetails}
        onBack={() => navigate(-1)}
        onUpdate={(updates) => setLeadDetails((prev) => ({ ...prev, ...updates }))}
      />
    );
  }

  // Default / Data section layout
  return (
    <DataLeadLayout
      lead={leadDetails}
      onBack={() => navigate(-1)}
      onUpdate={(updates) => setLeadDetails((prev) => ({ ...prev, ...updates }))}
    />
  );
};

export default IndividualLeadDetails;
