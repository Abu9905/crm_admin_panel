import React from "react";
// import FeatureCard from "./FeatureCard";
import { FaPlug, FaChartPie, FaCode, FaEnvelope, FaSms, FaWhatsapp, FaFacebook, FaGoogle, FaCogs, FaUsers, FaClipboardList, FaFileAlt } from "react-icons/fa";
import MarketingCard from "./MarketingCard";

const features = [
  { icon: <FaPlug className="text-gray-700 dark:text-gray-300" />, title: "Integration", description: "Connect your marketing tools and platforms" },
  { icon: <FaChartPie className="text-gray-700 dark:text-gray-300" />, title: "ROI Configuration", description: "Configure and track marketing ROI" },
  { icon: <FaCode className="text-gray-700 dark:text-gray-300" />, title: "API Setup", description: "Configure API connections" },
  { icon: <FaEnvelope className="text-gray-700 dark:text-gray-300" />, title: "Email Campaigns", description: "Create and manage email campaigns" },
  { icon: <FaSms className="text-gray-700 dark:text-gray-300" />, title: "SMS Campaigns", description: "Create and manage SMS campaigns" },
  { icon: <FaWhatsapp className="text-green-500" />, title: "WA Campaigns", description: "Create WhatsApp campaigns" },
  { icon: <FaFacebook className="text-blue-600" />, title: "FB Campaigns", description: "Create Facebook campaigns" },
  { icon: <FaGoogle className="text-red-500" />, title: "Google Ads", description: "Manage Google Ads campaigns" },
  { icon: <FaCogs className="text-gray-700 dark:text-gray-300" />, title: "Automation", description: "Automate marketing workflows" },
  { icon: <FaUsers className="text-gray-700 dark:text-gray-300" />, title: "Lead Segmentation", description: "Segment leads for targeted campaigns" },
  { icon: <FaClipboardList className="text-gray-700 dark:text-gray-300" />, title: "Auditions Manager", description: "Manage marketing auditions" },
  { icon: <FaFileAlt className="text-gray-700 dark:text-gray-300" />, title: "Template Creating", description: "Create marketing templates" },
];

const Marketing = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {features.map((feature, idx) => (
        <MarketingCard key={idx} {...feature} />
      ))}
    </div>
  );
};

export default Marketing;
