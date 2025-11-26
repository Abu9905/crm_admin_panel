import React from "react";

const SettingsCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 shadow dark:shadow-gray-900 rounded-lg hover:shadow-lg dark:hover:shadow-gray-800 transition">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 shadow mb-3 text-gray-700 dark:text-gray-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</h3>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{description}</p>
    </div>
  );
};

export default SettingsCard;
