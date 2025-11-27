const MarketingCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 shadow dark:shadow-gray-900 rounded-lg hover:shadow-lg dark:hover:shadow-gray-800 transition">
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-700 shadow mb-2 sm:mb-3 text-gray-700 dark:text-gray-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{title}</h3>

      {/* Description */}
      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{description}</p>
    </div>
  );
};

export default MarketingCard;
