import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SourceInfoCard from "../leads/SourceInfoCard";

const IndividualDealDetails = () => {
  const [activeTab, setActiveTab] = useState("whatsapp");

  // Get deal data from router
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const deal = location.state?.deal; // deal object passed from DealsTable

  if (!deal) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <p>No deal data found for ID #{id}</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pl-3 sm:pl-4 pr-3 sm:pr-6 py-3 sm:py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Deals Details : {deal.name}</h1>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition">Edit</button>
          <button className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition">Delete</button>
          <button className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-800 transition">Bake</button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row py-3 gap-4 p-2 sm:p-3 md:p-4">
        {/* Left Form */}
        <div className="w-full md:w-[43vw] rounded p-3 sm:p-4 space-y-3 sm:space-y-4">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
            Requirement for WA automation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Contact Name *</label>
              <input
                type="text"
                value={deal.name || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Alternative Number</label>
              <input
                type="text"
                value={deal.mobile || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Email Address</label>
              <input
                type="email"
                value={deal.email || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Lead Owner *</label>
              <input
                type="text"
                value={deal.owner || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Source</label>
              <input
                type="text"
                value={deal.source || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Status</label>
              <input
                type="text"
                value={deal.status || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Location</label>
              <input
                type="text"
                value={deal.location || "Not available"}
                readOnly
                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full md:max-w-[25vw] gap-2 sm:gap-3 p-2 sm:p-0">
          <SourceInfoCard/>
          <SourceInfoCard/>
          <SourceInfoCard/>
          <SourceInfoCard/>
          <SourceInfoCard/>
          <SourceInfoCard/>
        </div>

        {/* Right Info Cards */}
        {/* <div className="w-full flex flex-wrap md:w-[30vw]  gap-4">
          {[
            { title: "Source Info", data: [["Lead Source", deal.source], ["Lead Owner", deal.owner]] },
            { title: "Campaign Info", data: [["Status", deal.status], ["Location", deal.location]] },
          ].map((card, idx) => (
            <div key={idx} className="bg-blue-100 rounded w-[12vw] max-h-fit py-4 px-2 shadow">
              <h3 className="text-sm font-semibold mb-2">{card.title}</h3>
              <div className="space-y-1 text-xs">
                {card.data.map(([label, value], i) => (
                  <p key={i}>
                    <span className="font-medium">{label}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Communication Tabs */}
    <div className="h-fit mt-4 sm:mt-0">
  <div className="shadow rounded bg-white dark:bg-gray-800">
    {/* Tabs */}
    <div className="flex border-b dark:border-gray-700 overflow-x-auto">
      {["whatsapp", "calls", "activity"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm capitalize cursor-pointer whitespace-nowrap ${
            activeTab === tab
              ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Content */}
    <div className="p-3 sm:p-4 text-xs sm:text-sm">
      {activeTab === "whatsapp" && (
        <div className="space-y-3">
          {/* Incoming message */}
          <div className="flex">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-2 sm:p-3 w-full sm:w-[70%] md:w-[30vw] max-w-md rounded">
              {deal.name}: Hi, I'm interested in your CRM software. Can you send me more details?
            </div>
          </div>

          {/* Outgoing message */}
          <div className="flex justify-end">
            <div className="bg-gray-300 dark:bg-gray-700 dark:text-gray-200 p-2 sm:p-3 rounded w-full sm:w-[70%] md:w-[30vw] max-w-md">
              You: Sure! I'll send you the details shortly.
            </div>
          </div>
        </div>
      )}
      {activeTab === "calls" && <p className="text-gray-600 dark:text-gray-400">No call history available.</p>}
      {activeTab === "activity" && <p className="text-gray-600 dark:text-gray-400">No activity found.</p>}
    </div>
  </div>
</div>

    </div>
  );
};

export default IndividualDealDetails;
