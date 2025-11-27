import { useState, useRef, useEffect } from "react";
import { FaChartLine, FaUsers, FaDollarSign, FaBullhorn, FaFilter, FaChevronDown } from "react-icons/fa";

const iconMap = {
  "Report Overview": FaChartLine,
  "Lead Overview": FaUsers,
  "Sales Forecasting": FaDollarSign,
  "Market Overview": FaBullhorn,
  "Leads Funnel": FaFilter,
};

const colorMap = {
  "Report Overview": "text-blue-600",
  "Lead Overview": "text-purple-600",
  "Sales Forecasting": "text-red-600",
  "Market Overview": "text-green-600",
  "Leads Funnel": "text-green-600",
};

const Card = ({ title, children, graphType, timePeriod, onGraphTypeChange, onTimePeriodChange, graphTypeOptions }) => {
  const [isGraphTypeOpen, setIsGraphTypeOpen] = useState(false);
  const [isTimePeriodOpen, setIsTimePeriodOpen] = useState(false);
  const graphTypeRef = useRef(null);
  const timePeriodRef = useRef(null);

  const Icon = iconMap[title] || FaChartLine;
  const iconColor = colorMap[title] || "text-blue-600";

  // Default graph type options based on title
  const defaultGraphOptions = title === "Lead Overview" 
    ? ["Doughnut", "Pie", "Bar Graph", "Line Graph"]
    : ["Line Graph", "Bar Graph"];

  const options = graphTypeOptions || defaultGraphOptions;
  const timePeriodOptions = ["7 Days", "30 Days", "90 Days"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (graphTypeRef.current && !graphTypeRef.current.contains(event.target)) {
        setIsGraphTypeOpen(false);
      }
      if (timePeriodRef.current && !timePeriodRef.current.contains(event.target)) {
        setIsTimePeriodOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`${iconColor} text-xl`} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {(graphType !== undefined || timePeriod !== undefined) && (
          <div className="flex items-center gap-2">
            {graphType !== undefined && (
              <div className="relative" ref={graphTypeRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGraphTypeOpen(!isGraphTypeOpen);
                    setIsTimePeriodOpen(false);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center gap-1.5"
                >
                  {graphType}
                  <FaChevronDown className={`text-[10px] transition-transform ${isGraphTypeOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGraphTypeOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          onGraphTypeChange?.(option);
                          setIsGraphTypeOpen(false);
                        }}
                        className={`w-full text-left text-xs px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          graphType === option
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {timePeriod !== undefined && (
              <div className="relative" ref={timePeriodRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTimePeriodOpen(!isTimePeriodOpen);
                    setIsGraphTypeOpen(false);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center gap-1.5"
                >
                  {timePeriod}
                  <FaChevronDown className={`text-[10px] transition-transform ${isTimePeriodOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTimePeriodOpen && (
                  <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                    {timePeriodOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          onTimePeriodChange?.(option);
                          setIsTimePeriodOpen(false);
                        }}
                        className={`w-full text-left text-xs px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          timePeriod === option
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;

