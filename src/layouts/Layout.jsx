import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";
import { FaSignOutAlt, FaUserCircle, FaSearch, FaTimes, FaBars, FaTimes as FaTimesClose } from "react-icons/fa";

// Mock data for global search (in production, this would come from API/context)
const mockLeads = [
  { id: "0001", name: "Neamatullah Meer", email: "Neamatullahmdmuslim31@gmail.com", mobile: "7457863240", type: "lead" },
  { id: "0002", name: "Neamatullah Meer", email: "Neamatullahmdmuslim31@gmail.com", mobile: "7457863240", type: "lead" },
  { id: "0003", name: "Neamatullah Meer", email: "Neamatullahmdmuslim31@gmail.com", mobile: "7457863240", type: "lead" },
  { id: "0004", name: "Neamatullah Meer", email: "Neamatullahmdmuslim31@gmail.com", mobile: "7457863240", type: "lead" },
  { id: "0005", name: "Neamatullah Meer", email: "Neamatullahmdmuslim31@gmail.com", mobile: "7457863240", type: "lead" },
];

const mockDeals = [
  { id: "0001", name: "Neamatullah Meer", email: "Neamatullahmdmuslim3l@gmail.com", mobile: "7457863240", type: "deal" },
  { id: "0002", name: "Neamatullah Meer", email: "Neamatullahmdmuslim3l@gmail.com", mobile: "7457863240", type: "deal" },
  { id: "0003", name: "Neamatullah Meer", email: "Neamatullahmdmuslim3l@gmail.com", mobile: "7457863240", type: "deal" },
];

export default function Layout() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isUserPanelRoute = location.pathname.startsWith("/layout/user-panel");
  const isDashboardRoute = location.pathname.startsWith("/layout/dashboard");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Global search functionality
  const allSearchableItems = useMemo(() => {
    return [...mockLeads, ...mockDeals];
  }, []);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const term = query.toLowerCase();
    const results = allSearchableItems
      .filter((item) => {
        return (
          item.id.toLowerCase().includes(term) ||
          item.name.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term) ||
          item.mobile.toLowerCase().includes(term)
        );
      })
      .slice(0, 8); // Limit to 8 results

    setSearchResults(results);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (item) => {
    if (item.type === "lead") {
      navigate(`/layout/lead-management/leads/${item.id}`, {
        state: { lead: item },
      });
    } else if (item.type === "deal") {
      navigate(`/layout/lead-management/deals/${item.id}`, {
        state: { deal: item },
      });
    }
    setSearchQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="flex px-3 sm:px-4 md:px-7 bg-white dark:bg-gray-800 border-2 dark:border-gray-700 py-2 justify-between items-center flex-shrink-0">
        <div className="flex gap-2 sm:gap-4 md:gap-8 items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <FaTimesClose className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <FaBars className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <img
            className="h-[12px] sm:h-[14px] md:h-[16px] w-[30px] sm:w-[35px] md:w-[40px] dark:brightness-0 dark:invert"
            src="/menu.png"
            alt="img"
          />
          <img
            className="h-[32px] sm:h-[40px] md:h-[46px] w-[35px] sm:w-[45px] md:w-[50px] dark:brightness-0 dark:invert hidden sm:block"
            src="/logo.png"
            alt="img"
          />
          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none" ref={searchRef}>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xs sm:text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(true)}
                placeholder="Search leads, deals..."
                className="pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow dark:shadow-gray-900 w-full sm:w-[280px] md:w-[320px] lg:w-[386px] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes className="text-xs sm:text-sm" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                ref={resultsRef}
                className="absolute top-full left-0 mt-2 w-full sm:w-[280px] md:w-[320px] lg:w-[386px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                  </p>
                </div>
                {searchResults.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleResultClick(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {item.type === "lead" ? "Lead" : "Deal"}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {item.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                          ID: {item.id} • {item.mobile}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showResults && searchQuery.trim() && searchResults.length === 0 && (
              <div
                ref={resultsRef}
                className="absolute top-full left-0 mt-2 w-full sm:w-[280px] md:w-[320px] lg:w-[386px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900 z-50 p-4"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          {/* Mobile right sidebar toggle */}
          {(isUserPanelRoute || isDashboardRoute) && (
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle right sidebar"
            >
              <FaBars className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {/* User Info Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FaUserCircle className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" />
              <div className="hidden sm:block text-xs sm:text-sm">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role || "Role"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors"
              title="Logout"
            >
              <FaSignOutAlt className="text-xs sm:text-sm" />
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 bg-slate-100 dark:bg-gray-900 overflow-x-visible overflow-y-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar (always visible on the left on desktop, toggleable on mobile) */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <SidebarAdmin onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Section */}
        <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto relative z-0">
          {/* Main Content changes here */}
          <main className="p-2 sm:p-4 flex gap-4 sm:gap-6 flex-wrap overflow-y-auto flex-1 relative z-0">
            <Outlet />
          </main>
        </div>

        {/* Right Sidebar (Activity summary etc.) */}
        {isUserPanelRoute ? (
          // Show task-focused sidebar only on User Panel
          <>
            {/* Mobile Overlay */}
            {rightSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setRightSidebarOpen(false)}
              />
            )}
            <div className={`fixed lg:static inset-y-0 right-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
              rightSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            } w-[280px] sm:w-[320px] lg:w-[18vw] max-w-[90vw] lg:max-w-none mr-0 lg:mr-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900 p-4 flex flex-col`}>
            <div className="flex gap-3">
              <button className="flex-1 bg-[#153984] hover:bg-[#0f3174] text-white py-2 rounded-[18px] font-semibold text-sm shadow">
                Today's Task
              </button>
              <button className="flex-1 bg-[#153984] hover:bg-[#0f3174] text-white py-2 rounded-[18px] font-semibold text-sm shadow">
                Over dues
              </button>
            </div>
            <div className="mt-4 flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner dark:shadow-gray-900/60" />
          </div>
          </>
        ) : isDashboardRoute ? (
          // Show activity summary sidebar only on Dashboard (default after login)
          <>
            {/* Mobile Overlay */}
            {rightSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setRightSidebarOpen(false)}
              />
            )}
            <div className={`fixed lg:static inset-y-0 right-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
              rightSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            } w-[280px] sm:w-[320px] lg:w-[18vw] max-w-[90vw] lg:max-w-none mr-0 lg:mr-4 border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 flex flex-col px-3 py-6 space-y-6 sm:space-y-10 overflow-hidden`}>
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">
              Activity summary
            </h2>

            {/* Active user box */}
            <div className="w-full border dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900 p-4 flex items-center justify-center hover:shadow-md dark:hover:shadow-gray-800 cursor-pointer bg-white dark:bg-gray-700">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Active user
              </span>
            </div>

            {/* Last invoice box */}
            <div className="w-full border dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900 p-4 flex items-center justify-center hover:shadow-md dark:hover:shadow-gray-800 cursor-pointer bg-white dark:bg-gray-700">
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Last invoice
              </span>
            </div>

            {/* App store buttons */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-28 sm:w-36"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-28 sm:w-36"
              />
            </div>

            {/* Contact Info */}
            <div className="mt-4 sm:mt-6 text-center space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
                Contact us
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                +91-9686705904
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                Neamatullahmdmuslim@gmail.com
              </p>
            </div>
          </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
