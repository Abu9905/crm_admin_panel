import {
  FaUsers,
  FaUserCog,
  FaUsersCog,
  FaCogs,
  FaBell,
  FaEllipsisH,
  FaPhone,
  FaFileInvoice,
  FaDatabase,
  FaUpload,
  FaLock,
  FaChartPie,
} from "react-icons/fa";
import SettingsCard from "./SettingsCard";

const features = [
  { icon: <FaUsers className="text-gray-700 dark:text-gray-300" />, title: "Users", description: "Manage system users" },
  { icon: <FaUserCog className="text-gray-700 dark:text-gray-300" />, title: "Lead Setting", description: "Configure and track marketing ROI" },
  { icon: <FaUsersCog className="text-gray-700 dark:text-gray-300" />, title: "Team Alignment", description: "Configure team settings" },
  { icon: <FaCogs className="text-gray-700 dark:text-gray-300" />, title: "Campaign Settings", description: "Configure campaign parameters" },
  { icon: <FaBell className="text-gray-700 dark:text-gray-300" />, title: "Notification/Calls", description: "Configure notifications and calls" },
  { icon: <FaEllipsisH className="text-gray-700 dark:text-gray-300" />, title: "Others", description: "Additional settings" },
  { icon: <FaPhone className="text-gray-700 dark:text-gray-300" />, title: "Cloud Telephony", description: "Configure cloud telephony settings" },
  { icon: <FaFileInvoice className="text-gray-700 dark:text-gray-300" />, title: "Billings", description: "Manage billing and payments" },
  { icon: <FaDatabase className="text-gray-700 dark:text-gray-300" />, title: "Export Data", description: "Export system data" },
  { icon: <FaUpload className="text-gray-700 dark:text-gray-300" />, title: "Import Data", description: "Import data into the system" },
  { icon: <FaLock className="text-gray-700 dark:text-gray-300" />, title: "Privacy & Security", description: "Configure privacy and security settings" },
  { icon: <FaChartPie className="text-gray-700 dark:text-gray-300" />, title: "ROI Configuration", description: "Configure and track marketing ROI" },
];

const Settings = () => {
  return (
    <>
    <p className="font-semibold ml-3 sm:ml-7 text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">Settings Tools</p>
 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-6 pb-4">
        
      {features.map((feature, idx) => (
        <SettingsCard key={idx} {...feature} />
      ))}
    </div>
       </>
  );
};

export default Settings;
