import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaShareAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

// Layout for Data section (Image 1 – three info cards)
const DataLeadLayout = ({ lead, onBack }) => {
  const initial = lead.name?.charAt(0)?.toUpperCase() || "N";

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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-sm px-6 py-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
            {initial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {lead.name}
              </h1>
              <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                <FaEdit />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              +91 {lead.mobile} | {lead.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {lead.location || "Mumbai, Maharastra"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <span>Merge</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <span>Assign lead</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer">
            <IoLogoWhatsapp />
            <span>Whatsapp</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Details
          </h2>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Name :</span>
              <span className="text-gray-900">{lead.name}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Mobile :</span>
              <span className="text-gray-900">+91 {lead.mobile}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Email :</span>
              <span className="text-gray-900 break-all">{lead.email}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Company :</span>
              <span className="text-gray-900">#Upify</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">
                Industry :
              </span>
              <span className="text-gray-900">Tech</span>
            </div>
          </div>
        </div>

        {/* Lead Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Lead Information
          </h2>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Status :</span>
              <span className="text-blue-600 font-medium">
                {lead.status || "New Lead"}
              </span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Source :</span>
              <span className="text-gray-900">{lead.source}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">Owner :</span>
              <span className="text-gray-900">{lead.owner}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">
                Location :
              </span>
              <span className="text-gray-900">
                {lead.location || "Mumbai"}
              </span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500 font-medium">
                Last contact :
              </span>
              <span className="text-gray-900">Today</span>
            </div>
          </div>
        </div>

        {/* Tasks & Activities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tasks & Activities
          </h2>
          <div className="h-px bg-gray-200 mb-4" />
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="w-40 text-gray-500 font-medium">
                Pending Task :
              </span>
              <span className="text-gray-900">2</span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500 font-medium">
                Last note :
              </span>
              <span className="text-gray-900">
                Interested in product demo
              </span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500 font-medium">
                Next Action :
              </span>
              <span className="text-gray-900">schedule meeting</span>
            </div>
            <div className="flex">
              <span className="w-40 text-gray-500 font-medium">
                Priority :
              </span>
              <span className="text-gray-900">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout for Leads section (Image 2 – form with side panels)
const LeadsLeadLayout = ({ lead, onBack }) => {
  const initial = lead.name?.charAt(0)?.toUpperCase() || "N";

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
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <span>Merge</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <span>Assign lead</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs md:text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <FaShareAlt />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-xs md:text-sm hover:bg-green-600 cursor-pointer">
            <IoLogoWhatsapp />
            <span>Whatsapp</span>
          </button>
        </div>
      </div>

      {/* Main content layout – left form + right info cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Lead details form-style card (left, spans 2 cols on xl) */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Leads Details :{" "}
              <span className="font-normal text-gray-700">{lead.name}</span>
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-xs md:text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">
                Edit
              </button>
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
                  disabled
                  value={lead.name}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Expected Revenue
                </label>
                <input
                  disabled
                  value="50,000.00"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Next Follow - Up On
                </label>
                <input
                  disabled
                  value="Not scheduled"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Mobile Number *
                </label>
                <input
                  disabled
                  value={lead.mobile}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Email Address
                </label>
                <input
                  disabled
                  value={lead.email}
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
                  disabled
                  value="7457865556"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Lead Owner *
                </label>
                <input
                  disabled
                  value={lead.owner}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 text-xs font-medium">
                    Expected Closing Date
                  </label>
                  <input
                    disabled
                    value="25-Nov-2023"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-xs font-medium">
                    Lead Stage
                  </label>
                  <input
                    disabled
                    value={lead.status || "Connected"}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-xs font-medium">
                  Next Follow - Up Note
                </label>
                <input
                  disabled
                  value="No Notes available"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 text-sm"
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
              <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium cursor-default">
                Whatsapp
              </button>
              <button className="pb-2 text-gray-500 cursor-default">
                Calls
              </button>
              <button className="pb-2 text-gray-500 cursor-default">
                Activity
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="max-w-xl rounded-2xl bg-green-50 px-4 py-3 text-sm text-gray-800">
                <span className="font-semibold text-gray-900">
                  {lead.name}:
                </span>{" "}
                Hi, I'm interested in your CRM software. Can you send me more
                details?
              </div>
              <div className="max-w-xl rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-800 ml-6">
                <span className="font-semibold text-gray-900">
                  {lead.owner}:
                </span>{" "}
                Sure, I’ll share the details and schedule a quick demo call.
              </div>
              <div className="max-w-xl rounded-2xl bg-green-50 px-4 py-3 text-sm text-gray-800">
                <span className="font-semibold text-gray-900">
                  {lead.name}:
                </span>{" "}
                Thank you, looking forward to it.
              </div>
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
                  value="Aug_Campaign"
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
                  value="Aug_Campaign"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Campaign Content</p>
                <input
                  disabled
                  value="Google Ad Campaign"
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
                <div>
                  <p className="text-gray-600 mb-1">Created Time</p>
                  <input
                    disabled
                    value="11-Jul-2024 03:17PM"
                    className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Modified Time</p>
                  <input
                    disabled
                    value="11-Jul-2024 03:17PM"
                    className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Last Viewed Time</p>
                  <input
                    disabled
                    value="11-Jul-2024 03:17PM"
                    className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                  />
                </div>
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
                  value="Not available"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Last Call Status</p>
                <input
                  disabled
                  value="Not available"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-1">Is Call Missed?</p>
                <input
                  disabled
                  value="Yes"
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-gray-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndividualLeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const lead = state?.lead;
  const section = state?.section?.toLowerCase();

  if (!lead) {
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
    return <LeadsLeadLayout lead={lead} onBack={() => navigate(-1)} />;
  }

  // Default / Data section layout
  return <DataLeadLayout lead={lead} onBack={() => navigate(-1)} />;
};

export default IndividualLeadDetails;
